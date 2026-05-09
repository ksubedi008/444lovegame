from rest_framework import serializers
from django.contrib.auth.models import User
from .models import ShortMessage, RewardMessage, UserProgress, UserMessage

class ShortMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortMessage
        fields = ['id', 'text', 'is_clicked']

class RewardMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RewardMessage
        fields = ['id', 'order', 'content', 'is_unlocked']

class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = ['hearts_clicked', 'game_wins', 'game_losses']

class UserMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMessage
        fields = ['id', 'sender_is_user', 'content', 'timestamp']
