from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import ShortMessage, RewardMessage, UserProgress, UserMessage
from .serializers import ShortMessageSerializer, RewardMessageSerializer, UserProgressSerializer, UserMessageSerializer
import random

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'message': 'Login successful'})
    else:
        return Response({'error': 'You forgot already?'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out'})

@api_view(['GET'])
@permission_classes([AllowAny]) # Allows anyone to play the hearts part, or maybe IsAuthenticated? The PRD says Entry -> Login. Hearts are on home page before login? Wait, flow.md: 1. Home Page (Hearts) -> 2. Entry Point -> 3. Login. So hearts are public!
def get_hearts_stats(request):
    total = ShortMessage.objects.count()
    clicked = ShortMessage.objects.filter(is_clicked=True).count()
    return Response({'total': total, 'clicked': clicked})

@api_view(['POST'])
@permission_classes([AllowAny])
def click_heart(request):
    unclicked = ShortMessage.objects.filter(is_clicked=False)
    if not unclicked.exists():
        return Response({'error': 'No more messages'}, status=status.HTTP_400_BAD_REQUEST)
        
    msg = random.choice(list(unclicked))
    msg.is_clicked = True
    msg.save()
    
    # Try to update progress if logged in
    if request.user.is_authenticated:
        progress, _ = UserProgress.objects.get_or_create(user=request.user)
        progress.hearts_clicked += 1
        progress.save()
        
    return Response(ShortMessageSerializer(msg).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_progress(request):
    progress, _ = UserProgress.objects.get_or_create(user=request.user)
    return Response(UserProgressSerializer(progress).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def game_result(request):
    won = request.data.get('won', False)
    progress, _ = UserProgress.objects.get_or_create(user=request.user)
    
    if won:
        progress.game_wins += 1
        # Unlock reward logic
        if progress.game_wins % 25 == 0:
            unlocked_count = RewardMessage.objects.filter(is_unlocked=True).count()
            next_reward = RewardMessage.objects.filter(is_unlocked=False).order_by('order').first()
            if next_reward:
                next_reward.is_unlocked = True
                next_reward.save()
    else:
        progress.game_losses += 1
        
    progress.save()
    return Response(UserProgressSerializer(progress).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_rewards(request):
    rewards = RewardMessage.objects.filter(is_unlocked=True).order_by('order')
    return Response(RewardMessageSerializer(rewards, many=True).data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def messages_view(request):
    if request.method == 'GET':
        msgs = UserMessage.objects.all().order_by('timestamp')
        return Response(UserMessageSerializer(msgs, many=True).data)
    elif request.method == 'POST':
        content = request.data.get('content')
        if not content:
            return Response({'error': 'Content required'}, status=status.HTTP_400_BAD_REQUEST)
        # Assuming frontend user is sending this
        sender_is_user = not request.user.is_staff
        msg = UserMessage.objects.create(sender_is_user=sender_is_user, content=content)
        return Response(UserMessageSerializer(msg).data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def reset_game(request):
    ShortMessage.objects.update(is_clicked=False)
    RewardMessage.objects.update(is_unlocked=False)
    progress, _ = UserProgress.objects.get_or_create(user=request.user)
    progress.hearts_clicked = 0
    progress.game_wins = 0
    progress.game_losses = 0
    progress.save()
    return Response({'message': 'Game reset successfully'})
