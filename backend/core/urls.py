from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('hearts/stats/', views.get_hearts_stats, name='hearts-stats'),
    path('hearts/click/', views.click_heart, name='click-heart'),
    path('progress/', views.get_progress, name='get-progress'),
    path('game/result/', views.game_result, name='game-result'),
    path('rewards/', views.get_rewards, name='get-rewards'),
    path('messages/', views.messages_view, name='messages'),
    path('reset/', views.reset_game, name='reset-game'),
]
