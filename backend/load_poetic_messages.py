import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import ShortMessage

ShortMessage.objects.all().delete()

# GROUP 1: I didn't [verb], but [consequence]
g1_a = [
    "I didn't plan to need you, but ",
    "I didn't mean to fall, but ",
    "I tried to stay distant, but ",
    "I didn't expect to care this much, but ",
    "I wasn't looking for anything, but ",
    "I tried to push the thoughts away, but ",
    "I wanted to keep my guard up, but ",
    "I told myself not to get attached, but ",
    "I tried to ignore it, but ",
    "I didn't want to complicate things, but ",
    "I tried to just be casual, but ",
    "I thought I could walk away, but ",
    "I didn't notice the moment it began, but "
]
g1_b = [
    "now everything feels wrong without you.",
    "I kept choosing you anyway.",
    "you pulled me closer effortlessly.",
    "I wouldn't change a single thing.",
    "I stayed anyway.",
    "I didn't stop.",
    "now you're all I think about.",
    "I found myself running back to you.",
    "you became my absolute favorite habit.",
    "now I'm completely addicted to you.",
    "my heart decided otherwise.",
    "I forgot how to exist without you.",
    "now I can't imagine my days without your voice."
]

# GROUP 2: You [action], and now [consequence]
g2_a = [
    "You slipped into my thoughts quietly, and now ",
    "You became my comfort without even trying, and now ",
    "You turned simple moments into something unforgettable, and now ",
    "You stayed in my mind long after the conversation ended, and now ",
    "You made distance feel real, and now ",
    "You became something I can't ignore, and now ",
    "You completely changed my world, and now ",
    "You showed me what it means to feel, and now ",
    "You walked in when I least expected it, and now ",
    "You broke down all my walls, and now ",
    "You made me feel so incredibly safe, and now ",
    "You gave me a reason to smile every morning, and now ",
    "You touched my soul without even trying, and now "
]
g2_b = [
    "they don't feel complete unless you're there.",
    "I don't want to exist without you.",
    "I can't imagine my life any other way.",
    "you are my favorite thought.",
    "I don't want an escape.",
    "I keep coming back to you.",
    "I feel the absence of you everywhere.",
    "you are the only thing that makes sense.",
    "I crave your presence constantly.",
    "I just want to hold you forever.",
    "nothing else really matters anymore.",
    "you're all I ever want.",
    "I'm terrified of ever losing you."
]

# GROUP 3: I don't just [verb], I [stronger verb]
g3_a = [
    "I don't just miss you, ",
    "I don't just think of you, ",
    "I don't just remember you, ",
    "I don't just like you, ",
    "I don't just want you here, ",
    "I don't just listen to your words, ",
    "I don't just look at you, ",
    "I don't just wait for you, ",
    "I don't just dream about you, ",
    "I don't just crave your touch, ",
    "I don't just enjoy our time, ",
    "I don't just care about you, ",
    "I don't just hold onto you, "
]
g3_b = [
    "I feel the absolute absence of you.",
    "I stay in those thoughts for a while.",
    "I feel you in my bones.",
    "I feel something incredibly deep.",
    "I desperately need you.",
    "I replay them like they mean more each time.",
    "I get completely lost in you.",
    "I count every single second.",
    "I live for the moments we share.",
    "I physically ache when you're not around.",
    "I cherish every tiny detail about you.",
    "I'd do absolutely anything for you.",
    "I refuse to ever let you go."
]

# GROUP 4: You're not just [noun], you're [stronger noun]
g4_a = [
    "You're not just someone, ",
    "You're not just a moment, ",
    "You're not just in my life, ",
    "You're not just a passing thought, ",
    "You're not just a memory, ",
    "You're not just temporary to me, ",
    "You're not just a phase, ",
    "You're not just a dream, ",
    "You're not just a distraction, ",
    "You're not just a friend, ",
    "You're not just an option, ",
    "You're not just a part of my day, ",
    "You're not just another person, "
]
g4_b = [
    "you're something I feel deeply.",
    "you're a constant in my soul.",
    "you're completely in my head.",
    "you're the silence that feels louder than noise.",
    "you're my entire reality.",
    "you're everything I've ever wanted.",
    "you're the only story I never want to end.",
    "you're my favorite place to be.",
    "you're the very air I breathe.",
    "you're the reason my thoughts don't rest.",
    "you're my absolute priority.",
    "you're the only habit I don't want to break.",
    "you're exactly what I've been looking for."
]

standalone = [
    "Even when you're not here, you are.",
    "I don't want less of you, I want more.",
    "You stayed where others left.",
    "If I had one wish, it would still be you.",
    "And if I had to do it again… I'd still fall for you.",
    "You feel like something I've always known.",
    "You feel like home, even from far away.",
    "You don't leave my mind—you linger.",
    "You don't fade, no matter how much time passes.",
    "I keep finding you in everything I do.",
    "You don't even try, yet you ruin my peace so perfectly.",
    "You're the reason I still believe in something."
]

unique_messages = set(standalone)

for a in g1_a:
    for b in g1_b:
        unique_messages.add(a + b)
for a in g2_a:
    for b in g2_b:
        unique_messages.add(a + b)
for a in g3_a:
    for b in g3_b:
        unique_messages.add(a + b)
for a in g4_a:
    for b in g4_b:
        unique_messages.add(a + b)

messages_list = list(unique_messages)
random.shuffle(messages_list)

selected = messages_list[:444]

for msg in selected:
    ShortMessage.objects.create(text=msg)

print(f"Successfully loaded {len(selected)} poetic short messages into the database!")
