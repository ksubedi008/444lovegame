import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import ShortMessage

# Delete old short messages to start fresh
ShortMessage.objects.all().delete()

noun_prefixes = [
    "Your ", "I love your ", "I adore your ", "I cherish your ", 
    "I miss your ", "I'm obsessed with your ", "Everything about your ", 
    "The beauty of your ", "The sweetness of your ", "I admire your ", 
    "I can't get enough of your ", "I'm captivated by your "
]

nouns = [
    "smile", "laugh", "eyes", "voice", "kindness", "touch", 
    "sense of humor", "mind", "passion", "dedication", "warmth", 
    "heart", "hair", "hands", "sneezes", "jokes", "texts", "style", 
    "patience", "resilience", "creativity", "energy", "face", "hugs", 
    "kisses", "soul", "spirit", "loyalty", "honesty", "cuteness", 
    "beauty", "strength", "courage", "dreams", "ambition", "quirks", 
    "imperfections", "laugh lines", "gentleness", "compassion"
]

unique_messages = set()

for prefix in noun_prefixes:
    for noun in nouns:
        unique_messages.add(prefix + noun)

# We need exactly 444 messages. The combination gives 480.
messages_list = list(unique_messages)
random.shuffle(messages_list)
selected_messages = messages_list[:444]

for msg in selected_messages:
    ShortMessage.objects.create(text=msg)

print(f"Successfully loaded {len(selected_messages)} short messages into the database!")
