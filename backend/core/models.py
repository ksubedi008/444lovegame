from django.db import models
from django.contrib.auth.models import User

class ShortMessage(models.Model):
    text = models.TextField()
    is_clicked = models.BooleanField(default=False)
    
    def __str__(self):
        return self.text[:50]

class RewardMessage(models.Model):
    order = models.IntegerField(unique=True)
    content = models.TextField()
    is_unlocked = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Reward {self.order}"

class UserProgress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hearts_clicked = models.IntegerField(default=0)
    game_wins = models.IntegerField(default=0)
    game_losses = models.IntegerField(default=0)
    
    def __str__(self):
        return f"Progress for {self.user.username}"

class UserMessage(models.Model):
    sender_is_user = models.BooleanField(default=True)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{'User' if self.sender_is_user else 'Admin'} - {self.timestamp}"
