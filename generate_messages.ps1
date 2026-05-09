$intros = @("Happy birthday baby.", "Happy birthday my love.", "Wishing the happiest birthday to my favorite person.", "Happy Birthday gorgeous!", "Happy birthday to the most amazing girl.", "Happy birthday to my beautiful girlfriend.", "Happy birthday sweetheart.", "Happy birthday to my absolute favorite person in the world.")

$dist_feelings = @("Being miles apart today really sucks", "It really hurts that I can't wake you up with a kiss today,", "I know the distance is super tough on us sometimes,", "It breaks my heart a little that I can't be there to see you smile today,", "I hate that we have to be so far apart on your special day,", "Not being able to hold you today is the hardest thing,", "I wish more than anything I could be there with you right now,", "It really sucks not being able to celebrate with you in person,")

$love_reassurances = @("but even with all this distance, I just love you more and more every single day.", "but I hope you know how much I'm thinking about you right now.", "but honestly you are worth every single mile of it.", "but just knowing you're having a good day is all I care about.", "but my feelings for you only get stronger the longer we're apart.", "but you always manage to make me feel so close to you anyway.", "but you are my greatest blessing no matter where we are.", "but no matter the distance, my heart is always right there with you.")

$future_hopes = @("I'm literally counting down the days until I can finally see you again and give you the biggest hug.", "I am so proud of you and I honestly can't wait to close this distance between us for good.", "I really hope today brings you as much happiness as you bring me every day.", "Every single day I spend missing you is just one day closer to being in your arms again.", "I can't wait until the day comes when we don't have to say goodbye through a screen anymore.", "I'm so excited for all the future birthdays we'll get to spend actually together.", "Just hang in there, because soon enough I'll be able to hold you as much as I want.", "I promise the next time I see you I'm going to make up for all the missed hugs and kisses.")

$outros = @("Have the best birthday ever, I love you so much.", "I love you endlessly.", "Keep shining, I'll be celebrating you all day from here.", "Have the best time today and just know my heart is right there with you.", "Enjoy your day to the fullest, you deserve it.", "I'm sending you the biggest virtual hug ever right now.", "I hope you get totally spoiled today, love you.", "Have an amazing day baby, I miss you so much.")

$all_messages = New-Object System.Collections.Generic.List[string]

foreach ($i in $intros) {
    foreach ($d in $dist_feelings) {
        foreach ($l in $love_reassurances) {
            foreach ($f in $future_hopes) {
                foreach ($o in $outros) {
                    $all_messages.Add("$i $d $l $f $o")
                }
            }
        }
    }
}

$selected = $all_messages | Get-Random -Count 500
$output = New-Object System.Collections.Generic.List[string]

for ($idx=0; $idx -lt 500; $idx++) {
    $num = $idx + 1
    $output.Add("$num.")
    $output.Add($selected[$idx])
    $output.Add("")
}

$output | Out-File -FilePath "500_birthday_messages.txt" -Encoding utf8
Write-Output "Successfully generated 500 messages."
