import os
from django.core.management.base import BaseCommand
from core.models import ShortMessage
import re

class Command(BaseCommand):
    help = 'Loads short messages from short_messages.txt'

    def handle(self, *args, **kwargs):
        # Path is relative to manage.py
        file_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))), 'short_messages.txt')
        
        if not os.path.exists(file_path):
            self.stdout.write(self.style.ERROR(f'File not found: {file_path}'))
            return
            
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Parse messages
        # They are separated by numbers like "1.", "2.", "---"
        messages = []
        current_msg = []
        
        for line in content.split('\n'):
            line = line.strip()
            if not line or line == '---' or line == '[... continuing same pattern, all unique, emotional, no repetition ...]':
                continue
            if re.match(r'^\d+\.$', line):
                if current_msg:
                    messages.append('\n'.join(current_msg))
                    current_msg = []
            else:
                current_msg.append(line)
                
        if current_msg:
            messages.append('\n'.join(current_msg))
            
        # Create in DB
        created_count = 0
        for msg_text in messages:
            if not ShortMessage.objects.filter(text=msg_text).exists():
                ShortMessage.objects.create(text=msg_text)
                created_count += 1
                
        self.stdout.write(self.style.SUCCESS(f'Successfully loaded {created_count} messages. Total: {len(messages)}'))
