import os
import django
import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import RewardMessage

# Delete old rewards to start fresh
RewardMessage.objects.all().delete()

# Read the 1000 generated messages
file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '1000_birthday_messages.txt')
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Parse messages (they are separated by numbers like "1.\n")
parts = re.split(r'\d+\.\n', content)
messages = [p.strip() for p in parts if p.strip()]

for i, msg in enumerate(messages):
    RewardMessage.objects.create(order=i+1, content=msg)

print(f"Successfully loaded {len(messages)} long confession rewards!")
