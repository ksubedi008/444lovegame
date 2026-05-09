import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from core.models import UserProgress

if not User.objects.filter(username='ushmal').exists():
    user = User.objects.create_superuser('ushmal', 'ushmal@example.com', 'gudiya')
    print("Superuser ushmal created")
else:
    user = User.objects.get(username='ushmal')
    print("Superuser ushmal already exists")

# Make sure progress exists
if hasattr(user, 'userprogress'):
    print("UserProgress already exists")
else:
    UserProgress.objects.create(user=user)
    print("UserProgress created")
