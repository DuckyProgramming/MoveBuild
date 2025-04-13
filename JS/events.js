types.event=[
    {
        name:'',id:0,list:-1,
        pages:[],
    },{
        name:'Dropped Book',id:1,list:0,
        pages:[
            {
                desc:
`You come across what appears to be a book
lying in the dirt. Peering into it, you see
numerous writings on the art of combat.\n
When you pick it up, you notice its extreme length
and the poor condition of its pages. And there seems
to be some sort of energy radiating from it...`,
                option:['Read','Leave'],
                optionDesc:['Lose 4 Health',''],
                link:[1,2],
            },{
                desc:
`The book is extremely long and quite confusing, but manages
to keep you interested. After several hours, you finally
reach the end. You've learned some, but you feel weakened.`,
                option:['Exit'],
                optionDesc:['Add a Card'],
                link:[-1],
            },{
                desc:`You leave, knowing it isn't worth the risk.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Unstable Building',id:2,list:0,
        pages:[
            {
                desc:
`You enter a building, looking for something of value.
But as soon as you step inside, the walls start shaking.
You don't have much time, as the building will collapse any minute,
but there's still enough to grab something before you leave.`,
                option:['Grab the briefcase','Grab the medical kit'],
                optionDesc:['',''],
                link:[1,2,3],
            },{
                desc:
`The building collapses as you carry the heavy case out,
but you get out without major injuries. You get the materials out
of the box and they turn out to be potentially valuable.`,
                option:['Collect the Money'],
                optionDesc:['Gain 300 Currency, Take 20 Damage'],
                link:[-1],
            },{
                desc:`You manage to make it out, and the kit is exactly what it looks like.`,
                option:['Use the Kit'],
                optionDesc:['Heal to Full'],
                link:[-1],
            }
        ],
    },{
        name:'Cliffs',id:3,list:0,
        pages:[
            {
                desc:
`When crossing a large chasm, you fail to watch your step,
and the rock you're standing on collapses beneath your feet,
sending you falling into a gap. You can see the bottom from
where you are, but it is a long drop.`,
                option:['Grab onto the Side','Try to Land on a Ledge','Hope for the Best'],
                optionDesc:['','',''],
                link:[1,2,3],
            },{
                desc:
`With some difficulty, you successfully grab on to the side and
use friction with the edge to slow your fall. You seem to have
dropped some items along the way, but they could be anywhere now.`,
                option:['Get Out of the Hole'],
                optionDesc:['Lose a Random Relic'],
                link:[-1],
            },{
                desc:
`The only ledge you can see is just a little out of reach.
You manage to move over, but the landing knocks you unconscious.
When you get up, your head is spinning, and you forget some
of what you were doing beforehand.`,
                option:['Get Out of the Hole'],
                optionDesc:['Remove 2 Random Cards'],
                link:[-1],
            },{
                desc:
`You land with a crash.
After a minute of lying in pain, you get back up and leave.`,
                option:['Get Out of the Hole'],
                optionDesc:['Lose 13 Health'],
                link:[-1],
            },
        ],
    },{
        name:'Dealer',id:4,list:0,
        pages:[
            {
                desc:
`A mysterious man walks up to you and invites you into
a dark alley. Prepared to fight, you are quite surprised 
when he shows you several boxes Within them are
mysterious liquids and scientific tools.\n
He asks you which you would like to test.`,
                option:['Mixture A','Mixture B','Mixture C','Decline'],
                optionDesc:['Add Mixture A to Deck','Add Mixture B to Deck','Add Mixture C to Deck',''],
                link:[1,1,1,2],
            },{
                desc:`He laughs and hands you the box, leaving into the darkness.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`He looks at you with a disappointed expression, and leaves.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The Bomb',id:5,list:0,
        pages:[
            {
                desc:
`You hear a call and rush over to help. The Management
has planted a bomb in the city. The locals have no
idea how to defuse it, but you might have a guess.`,
                option:['Cut the Red Wire','Cut the Green Wire','Cut the Blue Wire','Back Away'],
                optionDesc:['','','',''],
                link:[1,1,1,3],
            },{
                desc:`You're thanked for preventing needless destruction.`,
                option:['Job Well Done'],
                optionDesc:['Gain 200 Currency'],
                link:[-1],
            },{
                desc:`It blows up in your face. Lucky that it wasn't particularly powerful.`,
                option:['Ouch'],
                optionDesc:['Lose 30 Health'],
                link:[-1],
            },{
                desc:
`You escape the explosion. How are you supposed
to know how to defuse a bomb?`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Bar Fight',id:6,list:0,
        pages:[
            {
                desc:
`You arrive in a bar, hoping to enjoy the evening.
But you are rudely awakened when a man touches your shoulder.
The people here might not know who you are.
But they definitely know that you don't belong here.
His friends surround you, ready to get some information out of you.
Things could quickly get ugly.`,
                option:['Talk Back','Punch Him'],
                optionDesc:['','Start Fight'],
                link:[1,-2],
            },{
                desc:`He asks you where you're from, and why you're here.`,
                option:['Tell the Truth','Punch Him'],
                optionDesc:['','Start Fight'],
                link:[2,-2],
            },{
                desc:
`He looks at you with disapproval, but backs down,
avoiding having to fight. The gang returns to chatting in the back,
while you enjoy some well-earned rest.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`He manages to get in a quick strike.`,
                option:['Fight Back'],
                optionDesc:['Take 6 Damage, Start Fight'],
                link:[-2],
            },
        ],
    },{
        name:'Abandoned Forge',id:7,list:0,
        pages:[
            {
                desc:
`You come across an abandoned forge, complete with tools.
Looks like nobody's used it for a long time.
Despite that, it appears to be in good condition.
You might still be able to use it for its intended purpose.`,
                option:['Use it','Take Tools','Leave'],
                optionDesc:['','',''],
                link:[1,2,3],
            },{
                desc:
`You manage to figure out the methods of the
forge and successfully work with it.`,
                option:['Finish'],
                optionDesc:['Upgrade 1 Card'],
                link:[-1],
            },{
                desc:`
As you attempt to take the tongs from the still-hot furnace,
pain jets through your arm.
You are able to lift them and take them with some difficulty,
but your arm continues to hurt.`,
                option:['Ouch'],
                optionDesc:['Gain a Relic - Bent Pliers, Become Cursed - Pain'],
                link:[-1],
            },{
                desc:`You avoid the forge and continue on your path.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Monkey Master',id:8,list:0,
        pages:[
            {
                desc:
`You're walking through a clearing in the forest
when you hear some rustling in the leaves
Turning around, you're too slow to stop the monkeys
from grabbing you as more and more appear.`,
                option:['Fight the Monkeys','Throw Something Valuable'],
                optionDesc:['Start Fight',''],
                link:[-2,1],
            },{
                desc:`The monkeys run after the object you threw.`,
                option:['Exit'],
                optionDesc:['Lose a Random Relic'],
                link:[-1],
            },
        ],
    },{
        name:'Backseat',id:9,list:0,
        pages:[
            {
                desc:
`You're traveling in the back of a public bus when you realize
that something feels off about the other passengers.
Sure enough, you notice a poorly concealed weapon inside one's coat.
And the other ones probably all did the same.
If they wanted to kill you, it would be easy, now that
they have you surrounded and unprepared.`,
                option:['Attack Them','Jump out of the Window','Act Normal'],
                optionDesc:['Start Fight','',''],
                link:[-2,1,2],
            },{
                desc:
`It's not your best landing, sure, but the bus is
far away before they can get after you.`,
                option:['Exit'],
                optionDesc:['Lose 7 Health'],
                link:[-1],
            },{
                desc:`Well, if they just don't notice...`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`A few minutes later, they jump you simultaneously.`,
                option:['Fight Back'],
                optionDesc:['Start Fight, Lose 5 Health'],
                link:[-2],
            },
        ],
    },{
        name:'The Alley',id:10,list:0,
        pages:[
            {
                desc:
`You notice a strange man hiding in an alley.
When he notices you, he runs off. He turns the corner,
but you still have a chance to chase him down.`,
                option:['Run After Him','Not Worth it'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`He leads you into an alley where his friends lie in wait.`,
                option:['Fight Them'],
                optionDesc:['Start Fight'],
                link:[-2],
            },{
                desc:
`It's not worth going into back
alleys just to stop a mystery man.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Duplication Rock',id:11,list:0,
        pages:[
            {
                desc:
`You find a shiny rock on the ground.
Inside it you can see reflections of yourself that loop on themselves.
You can feel power emanating from within, but nothing inside it feels new.`,
                option:['Smash it','Drop it'],
                optionDesc:['Duplicate a Card',''],
                link:[-1,1],
            },{
                desc:`Somebody else can get more use out of it than you.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Cardboard Box',id:12,list:0,
        pages:[
            {
                desc:
`You notice a box at the bottom of a well.
The box has some labels on it,
stating it to be a Management collection
box for recent excavations on the planet.
The people who intended to carry it probably
dropped it and didn't want to get it back.
Smart choice, the well doesn't look easy to get down.`,
                option:['Climb in','Leave'],
                optionDesc:['Lose 5 Health',''],
                link:[1,-1],
            },{
                desc:
`You climb in, but it's a lot harder
to get down than you expected.
It's almost as if the well is getting deeper...`,
                option:['Continue','Leave'],
                optionDesc:['Lose 5 Health',''],
                link:[2,-1],
            },{
                desc:`Ouch... Is this really worth it?`,
                option:['Continue','Leave'],
                optionDesc:['Lose 5 Health',''],
                link:[3,-1],
            },{
                desc:
`You reach the end of the well and pick up the box.
Inside you find something useful.`,
                option:['Take it'],
                optionDesc:['Gain a Relic'],
                link:[-1],
            },
        ],
    },{
        name:'Glowing Spring',id:13,list:-1,
        pages:[
            {
                desc:
`You encounter a spring filled with shining water.
It looks safe to drink.`,
                option:['Drink','Leave'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`You feel refreshed, like a weight has
been lifted off your shoulders.`,
                option:['Done'],
                optionDesc:['Remove All Curses'],
                link:[-1],
            },{
                desc:
`You're not touching that liquid
until you find out what it is.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Hidden Bank',id:14,list:-1,
        pages:[
            {
                desc:
`You find a crate of money lying open on the
side of the road, overflowing with coins. A sign
nearby says to take only the coins on the outside.`,
                option:['Take the Coins','Smash it'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`You pick up the scattered coins and
leave the rest where you found it.`,
                option:['Take the Money'],
                optionDesc:['Gain 75 Currency'],
                link:[-1],
            },{
                desc:
`You smash the crate and watch as more
and more money streams out.`,
                option:['Take the Money'],
                optionDesc:['Gain 175 Currency, Become Cursed - Regret'],
                link:[-1],
            },
        ],
    },{
        name:'Punching Bag',id:15,list:0,
        pages:[
            {
                desc:
`While resting, you notice an abandoned
punching bag on the ground. Perfect for
testing some of your combat abilities?`,
                option:['Beat it up','Leave it There'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`You have a good time hitting the bag,
until it breaks a few minutes later.`,
                option:['That was Fun'],
                optionDesc:['Upgrade a card'],
                link:[-1],
            },{
                desc:
`It's not good enough.
You finish up and leave the area.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Back-Alley Deal',id:16,list:0,
        pages:[
            {
                desc:
`A mysterious man appears in an alley and offers you a deal.
In return for a card, he'll give you another.
You see a small pack in his hand, but he looks
at you expectedly for your end of the deal.`,
                option:['Hand Him a Card','Back Out'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`You give him a card and he gives you the pack.`,
                option:['Good Deal'],
                optionDesc:['Transform a Card'],
                link:[-1],
            },{
                desc:
`You run off, ending the deal prematurely.
He doesn't follow.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'False Healer',id:17,list:-1,
        pages:[
            {
                desc:
`A strangely-dressed man approaches you on the
road and asks to heal you in return for payment.
It's obvious that he doesn't have the tools
necessary to heal others. You notice immediately.
In a slightly menacing voice, you tell him to back off.\n
"Alright, sorry, okay? I can't heal people,
I just help them unlearn bad habits..."
"I'll do it for free..."`,
                option:['Accept','Refuse'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`He tells you some of the most useless information
you've ever heard. And yet, it's a new perspective.
He escapes when you're not looking,
but you've gotten what you need.`,
                option:['Try it Out'],
                optionDesc:['Remove a Card'],
                link:[-1],
            },{
                desc:`You make him leave. You don't support con men.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Donut',id:18,list:0,
        pages:[
            {
                desc:
`You've grabbed the box containing the supplies
you need, when you notice a donut shop nearby.
When you enter, you realize that this is no ordinary
donut shop. They don't take normal currency.
Whatever's in the box, it can't be
worth more than a donut, right?`,
                option:['Buy a Donut','Keep the Box'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`You trade the box for a donut from the shop.`,
                option:['Eat it'],
                optionDesc:['Gain 5 Max Health'],
                link:[-1],
            },{
                desc:
`You resist the urge and open the box later.
But you really wanted the donut...`,
                option:['Take the Contents'],
                optionDesc:['Gain 2 Relics, Become Cursed - Regret'],
                link:[-1],
            },
        ],
    },{
        name:'Shining Light',id:19,list:0,
        pages:[
            {
                desc:
`In a clearing, you notice a ball of light,
floating in the center of the area.
You feel a warm glow coming from it,
and feel compelled to enter.`,
                option:['Enter the Ball','Ignore it'],
                optionDesc:['Lose 12 Health',''],
                link:[1,2],
            },{
                desc:
`Despite the pain, you see great knowledge
within the ball, feeling invigorated.`,
                option:['Gain Knowledge'],
                optionDesc:['Upgrade 2 Random Cards'],
                link:[-1],
            },{
                desc:
`You go around it,
wondering what it might have been.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Magic Man',id:20,list:0,
        pages:[
            {
                desc:
`A traveling merchant approaches
you and offers his services.
Supposedly, he specializes in healing,
but he doesn't bother to explain how.`,
                option:['Heal','Purify','Refuse'],
                optionDesc:['Lose 35 Currency','Lose 50 Currency',''],
                link:[1,2,3],
            },{
                desc:`A warm golden light envelops your body and dissipates.`,
                option:['Healed'],
                optionDesc:['Heal 15 Health'],
                link:[-1],
            },{
                desc:`A cold blue flame envelops your body and dissipates.`,
                option:['Purified'],
                optionDesc:['Remove a Card'],
                link:[-1],
            },{
                desc:`You can't trust this man, so you refuse his services.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Corruption',id:21,list:0,
        pages:[
            {
                desc:
`As you travel, you are jumped by a man in a suit,
looking around frantically for something.
When he sees you, he hands you a piece of paper and
tells you to keep it safe, but to never give it to anybody.
Seeing your confused expression,
he tries to hand you some money as thanks.`,
                option:['Take it','Decline'],
                optionDesc:['Gain 275 Currency',''],
                link:[1,2],
            },{
                desc:
`He runs off, leaving you with the paper.
You try to read it, but it's all bureaucratic nonsense.`,
                option:['Easy Money'],
                optionDesc:['Become Cursed - Doubt'],
                link:[-1],
            },{
                desc:
`He runs off, still holding the paper,
trying to find more passerby.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Humanic Writings',id:22,list:-1,
        pages:[
            {
                desc:
`Finding a mysterious square rock,
you quickly notice strange scripts on it.
This is the language of the pre-Management humans.
Perhaps a relic of the first colonists.
They only changed their scripts to match the
Management after the Grand Alliance War, after all.
As you continue to read, the meanings become clear.`,
                option:['Elegance','Simplicity'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`The answer was elegance.
Of course.`,
                option:[`That's what it meant`],
                optionDesc:['Remove a Card'],
                link:[-1],
            },{
                desc:`The truth is always simple.`,
                option:[`That's what it meant`],
                optionDesc:['Upgrade All Basic Cards'],
                link:[-1],
            },
        ],
    },{
        name:'Council of Spirits',id:23,list:0,
        pages:[
            {
                desc:
`A group of three apparitions appear around
you as you walk, circling around you.
They talk amongst themselves about you,
before one descends to address you.
"Would you like a taste of our power?"`,
                option:['Accept','Refuse'],
                optionDesc:['Lose 25% Max Health',''],
                link:[1,2],
            },{
                desc:
`As it speaks, you notice it nearing your body as
smoke swirls around you, blocking your vision.
You almost lose consciousness,
but the smoke dissipates before you can.
The things are gone.`,
                option:['Continue'],
                optionDesc:['Add 5 Apparitions to Deck'],
                link:[-1],
            },{
                desc:
`The shape laughs at you before fading away,
returning to the air.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The Bet',id:24,list:0,
        pages:[
            {
                desc:
`Two men sitting across from each other at a
table notice you and ask you to come over.
"Would like to bet on who wins? That would make the
game a little more interesting, don't you agree?"
The other man smiles and stares at you expectantly.`,
                option:['Bet on First Player','Bet on Second Player','Refuse'],
                optionDesc:['Lose 50 Currency','Lose 50 Currency',''],
                link:[1,1,3],
            },{
                desc:
`The man you bet on wins the game.
You receive the return on your bet.`,
                option:['Collect Winnings'],
                optionDesc:['Gain 100 Currency'],
                link:[-1],
            },{
                desc:
`The man you bet on loses the game. The winner
takes your money with him as the two leave.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`The two pay you no mind and continue their game.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Library',id:25,list:0,
        pages:[
            {
                desc:
`You find a large, but abandoned building.
The label on the front marks it to be a library.
Entering, you see rows upon rows of books,
and many spots to read in.`,
                option:['Read','Sleep'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`The book details a group of colonists who left Terra
to preserve the culture destroyed in Americanization.
Atlorium Inc.'s Manager personally met with the
colonists' leader to negotiate the travel expenses.`,
                option:['Interesting Story'],
                optionDesc:['Add a Card'],
                link:[-1],
            },{
                desc:
`You decide that you need to recover,
and that you don't have time for reading.
You wake up feeling refreshed.`,
                option:['Done'],
                optionDesc:['Heal 25 Health'],
                link:[-1],
            },
        ],
    },{
        name:'Forgotten Altar',id:26,list:-1,
        pages:[
            {
                desc:
`In front of you sits an altar to a forgotten god.
Atop the altar sits an ornate female statue
with arms outstretched. She calls out
to you, demanding sacrifice.\n
You want to run, but the doors have shut behind you,
propelled by some sort of force.`,
                option:['Sacrifice','Smash'],
                optionDesc:['Lose 18 Health',''],
                link:[1,2],
            },{
                desc:
`You let some of your blood out and
allow it to seep into the pedestal.
Everything goes dark.
You wake up a short while later feeling new potential.`,
                option:['Leave'],
                optionDesc:['Gain 5 Max Health'],
                link:[-1],
            },{
                desc:
`You smash the statue with a large strike.
The hold of the room ceases. The door swings open.
A dark sound echoes around you, the magic seeping into you.`,
                option:['Exit'],
                optionDesc:['Become Cursed - Decay'],
                link:[-1],
            },
        ],
    },{
        name:'Cursed Tome',id:27,list:-1,
        pages:[
            {
                desc:
`You see an abandoned temple. Within, a book is
opened on a pedestal, flipped to a random page.
You arrive. It's about an abandoned
Management project, known as Godhood.`,
                option:['Read','Stop'],
                optionDesc:['Lose 2 Health',''],
                link:[2,1],
            },{
                desc:`You resist the urge to read and put down the book.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Project Godhood was created by the Great
Manager to unlock the secrets of life.
It was founded under the notion that
control over life was the last frontier`,
                option:['Read','Stop'],
                optionDesc:['Lose 4 Health',''],
                link:[3,1],
            },{
                desc:
`The project specialized in the creation of humanoids
who would be capable of blending among the populace.
Due to the apparent power of this knowledge, the project
was kept secret from all but the most important.`,
                option:['Read','Stop'],
                optionDesc:['Lose 8 Health',''],
                link:[4,1],
            },{
                desc:
`Godhood was shut down by the Great Manager
upon his retirement, to hide the evidence.
The remaining organisms were destroyed, except one,
who was spared after the Director requested her safety.`,
                option:['Take','Stop'],
                optionDesc:['Lose 36 Health',''],
                link:[5,1],
            },{
                desc:
`You pick up the book, feeling drained.
You take it with you on your travels.`,
                option:['Keep it'],
                optionDesc:['Gain a Relic - Audric Codex'],
                link:[-1],
            },
        ],
    },{
        name:'Slaver',id:28,list:0,
        pages:[
            {
                desc:
`A figure jumps you and tries to tase you with a
makeshift staff. You easily dodge out of the way.
"Come quietly, and we won't harm you!"
He doesn't know what you're capable of.`,
                option:['Fight','Persuade'],
                optionDesc:['Start Fight',''],
                link:[-2,1],
            },{
                desc:
`You explain to him how most of the
warriors in the region tend to travel,
so it's easier to capture civilians in the
villages rather than roaming the roads.
While he's distracted, you escape.`,
                option:['Run'],
                optionDesc:['Become Cursed - Guilt'],
                link:[-1],
            },
        ],
    },{
        name:'Mausoleum',id:29,list:0,
        pages:[
            {
                desc:
`Venturing through several tombs, you arrive at the end
of the catacombs. There lies a large coffin covered in gems.
The text on the side is unintelligible, but you can
recognize strange smoke coming out of the sides.`,
                option:['Open the Coffin',`Don't`],
                optionDesc:['Gain a Relic',''],
                link:[1,3],
            },{
                desc:
`You push it open and find a relic within,
which you take with you. The smoke flows around the room
and begins to choke you. You only just make it out.`,
                option:['Take it'],
                optionDesc:['Become Cursed - Writhe'],
                link:[-1],
            },{
                desc:
`You push it open and find a relic within,
which you take with you. The smoke dissipates,
until there's nothing left inside.`,
                option:['Take it'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:"You leave it undisturbed.",
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Closed Chamber',id:30,list:0,
        pages:[
            {
                desc:
`You enter a room, looking for anything of use,
when the door locks behind you.
A screen in the center of the room lights up,
and a voice beguns speaking from within it.
"What are you here for? And more importantly,
what shall be the price?"`,
                option:['Money','Success (Colorless Cards)','Help (Relic)','The Exit'],
                optionDesc:['Lose 8 Health','Lose 8 Health','Lose 24 Health',''],
                link:[1,2,3,4],
            },{
                desc:
`"You never change, do you?"
"Money rains from the sky.`,
                option:['Done'],
                optionDesc:['Gain 45 Currency'],
                link:[0],
            },{
                desc:
`"Maybe this will help?"
A card appears in your hand.`,
                option:['Done'],
                optionDesc:['Gain 1 Uncommon Colorless Card'],
                link:[0],
            },{
                desc:
`"This could be useful."
An relic appears in your hand.`,
                option:['Done'],
                optionDesc:['Gain a Relic'],
                link:[0],
            },{
                desc:
`"Right behind you.
You see the door behind you has opened.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Homeless Man',id:31,list:0,
        pages:[
            {
                desc:
`You encounter a homeless-looking man in a town,
begging for money. When he sees you, he runs up to you.
"Please, can you spare some coin?
I have things I can trade..."`,
                option:['Donate','Rob','Leave'],
                optionDesc:['Lose 50 Currency','',''],
                link:[1,2,4],
            },{
                desc:`You hand him some of your money while he gives you a relic.`,
                option:['Good Deal'],
                optionDesc:['Gain a Relic'],
                link:[-1],
            },{
                desc:
`You grab the relic from his hands and start to escape.
"Have you no shame?" He calls out.
You have no shame.`,
                option:['Run'],
                optionDesc:['Gain a Relic'],
                link:[-1],
            },{
                desc:
`You grab the relic from his hands and start to escape.
"Have you no shame?" He calls out.
You have shame.`,
                option:['Run'],
                optionDesc:['Gain a Relic, Become Cursed - Shame'],
                link:[-1],
            },{
                desc:`You leave him to beg from somebody else.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Vampires',id:32,list:0,
        pages:[
            {
                desc:
`You notice a group of hooded figures on
the street, performing an unknown ritual.
As you approach, they turn to you in unison.
The largest smiles and extends a hand toward you.
"Join us, |0|, and feel the power."`,
                option:['Accept','Refuse'],
                optionDesc:['Lose 25% Max Health, Remove All Basic Attacks',''],
                link:[1,2],
            },{
                desc:
`He pulls you forward and sinks his teeth through your neck.
You feel a dark force moving through your body from the bite.\n
You wake up some time later, alone and hungry.`,
                option:['You Must Feed'],
                optionDesc:['Add 4 Bites to Deck'],
                link:[-1],
            },{
                desc:
`You move back and prepare your weapon.
The figure sighs and turns to leave.
The group morphs into fog and disappear,
leaving you alone once more.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Mind Bloom',id:33,list:0,
        pages:[
            {
                desc:
`While traveling, your thoughts suddenly appear to feel...
real.
Images of occurrences began to flow between your mind
and reality, manifesting themselves in real forms.
The sensation is quickly fleeting. What do you do?`,
                option:['I am Smart','I am Rich','I am Strong'],
                optionDesc:['Upgrade All Cards','Gain 999 Currency','Gain 20 Max Health'],
                link:[1,2,3],
            },{
                desc:`Can it really be this easy?`,
                option:['I am?'],
                optionDesc:['You Can No Longer Heal'],
                link:[-1],
            },{
                desc:`Can it really be this easy?`,
                option:['I am?'],
                optionDesc:['Become Cursed - 2 Normalities'],
                link:[-1],
            },{
                desc:`Can it really be this easy?`,
                option:['I am?'],
                optionDesc:['Become Cursed - Doubt'],
                link:[-1],
            },
        ],
    },{
        name:'Sensory Stone',id:34,list:0,
        pages:[
            {
                desc:
`You discover a glowing tesseract spinning and
shifting gently in the air. When you touch it,
you begin to see a distant memory from within.`,
                option:['Recall','Absorb'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`A flash of thought jumps through your mind.`,
                option:['Accept the Memories'],
                optionDesc:['Add 1 Uncommon Colorless Card'],
                link:[-1],
            },{
                desc:`A flash of thought jumps through your mind.`,
                option:['Accept the Memories'],
                optionDesc:['Add 1 Rare Colorless Card'],
                link:[-1],
            },
        ],
    },{
        name:'Winding Halls',id:35,list:0,
        pages:[
            {
                desc:
`As you slowly make your way up the twisting pathways,
you constantly find yourself losing your way.
The walls and ground seem to inexplicably shift before your eyes.
The constant whispering voices in the back of
your head aren't helping things either.
Passing by a structure you are certain you have previously seen,
you start to question if you are going insane.
You need to change something, and soon.`,
                option:['Embrace Madness','Continue','Head Back'],
                optionDesc:['','',''],
                link:[1,2,3],
            },{
                desc:
`You change the way you think about this place.
Things are beginning to make sense now.
"Maybe those voices were right after all.
Things do seem to make so much more sense now.`,
                option:['Get Out'],
                optionDesc:['Gain 2 Madness, Lose 10 Max Health'],
                link:[-1],
            },{
                desc:
`As you take a moment to stop and carefully
observe the undulating landscape around you,
the hint of a pattern starts to emerge from within
the randomness. Whenever the demented noises
begin to interrupt your thoughts, you struggle
through the mental pain and ignore it.`,
                option:['Get Out'],
                optionDesc:['Become Cursed - Writhe'],
                link:[-1],
            },{
                desc:
`You spend what seems like an eternity lost in the maze.
Slowly, you are able to retrace your steps,
reorient yourself, and make it out.`,
                option:['Get Out'],
                optionDesc:['Lose 5 Max Health'],
                link:[-1],
            },
        ],
    },{
        name:'Luvocorp UFO',id:36,list:0,
        pages:[
            {
                desc:
`You notice a strangely shaped object in the sky. As it
descends toward you, you can make out a logo and the word
"Luvocorp" on the side. It continues its approach, moving
quickly enough that you don't think you can escape.`,
                option:['Hit it','Try to Dodge it'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`You hit the UFO with all of your strength,
causing it to move backwards and land harmlessly nearby.
The driver quickly starts up the engine again and
leaves without you, much to your confusion.`,
                option:[`It's Gone`],
                optionDesc:['Remove a Random Card'],
                link:[-1],
            },{
                desc:
`The UFO continues its downward course and lands directly
on top of you before you can escape, crushing you.
You wake up not long later. The UFO is gone.`,
                option:['Get up'],
                optionDesc:['Lose 6 Health'],
                link:[-1],
            },
        ],
    },{
        name:'Goo Puddle',id:37,list:0,
        pages:[
            {
                desc:
`As you walk through a marsh, the ground
collapses and you fall into a puddle.
It's made of goo, which quickly causes you to sink.
It takes you a few minutes to get out.
All along, the goo burns your skin,
making it even more difficult to escape the goo.
When you get out, you notice that your money is missing.
Looking back into the puddle,
you notice that your money is inside,
along with the money of others who have fallen in.`,
                option:['Gather Money','Leave'],
                optionDesc:['Gain 50 Currency','Lose 25 Currency'],
                link:[1,2],
            },{
                desc:
`Feeling the sting of the goo as the prolonged exposure
starts to melt away at your skin, you get the gold.`,
                option:['Get Out'],
                optionDesc:['Lose 11 Health'],
                link:[-1],
            },{
                desc:`You decide that touching the goo isn't worth it.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Mushrooms',id:38,list:0,
        pages:[
            {
                desc:
`On the ground in front of you are multiple
mushrooms you are unable to identify.
They're blocking the path, so it's impossible
for you to go around the patch.
You could just walk over them, but you
feel like eating one for some reason...`,
                option:['Walk Through Them','Eat One'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`As you step over the mushrooms,
the ground begins to shake.
Ducks infected by the mushrooms appear 
from the dirt and attack you.`,
                option:['Ambushed'],
                optionDesc:['Start Fight'],
                link:[-2],
            },{
                desc:
`You give in to the unnatural desire to eat.
As you consume mushroom after mushroom,
you feel yourself entering into a daze and pass out.
As you wake, you feel very odd.`,
                option:['Get up'],
                optionDesc:['Heal 25 Health, Become Cursed - Parasite'],
                link:[-1],
            },
        ],
    },{
        name:'Mysterious Sphere',id:39,list:0,
        pages:[
            {
                desc:
`A shining sphere juts out of the terrain nearby,
objects appearing to float from within it.
Just as you are about to break it open, you notice
yourself to be surrounded by deactivated automata.`,
                option:['Smash it','Escape'],
                optionDesc:['Gain 3 Relics',''],
                link:[1,2],
            },{
                desc:
`As soon as you smash the sphere open,
the sentries spring up and attack you.`,
                option:['Fight Them'],
                optionDesc:['Start Fight'],
                link:[-2],
            },{
                desc:
`No need to be greedy.
The sentries remain in place.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'This is a Robbery',id:40,list:0,
        pages:[
            {
                desc:
`A man jumps at you from behind a tree and attempts to
hold you at knifepoint, but you spot him and jump back.
Ignoring the miss, he holds the knife and threatens you,
preparing for a possible battle.
"If you want to pass, you'll have to pay up.
All your money will do!"`,
                option:['Resist','Pay Up'],
                optionDesc:['','Lose All Currency'],
                link:[1,2],
            },{
                desc:
`You raise your weapon in defiance. He follows suit.
Before you can strike first, his friend
appears from behind the tree and attacks you.`,
                option:['Battle Him'],
                optionDesc:['Start Fight'],
                link:[-2],
            },{
                desc:
`You hand over your money. He laughs and runs off.
"What a loser, haha!"`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Dangerous Game',id:41,list:0,
        pages:[
            {
                desc:
`You are rudely awakened by gunshots from a nearby forest,
along with two men talking to each other..
Taking a look, you spot a hunter and his companion hunting... something.
You can't really see what it is from where you are.
It at least isn't you, is it?`,
                option:['Join in the Game','Watch the Game','Go Back to Sleep'],
                optionDesc:['','',''],
                link:[1,2,3],
            },{
                desc:
`The hunters are preoccupied,
enough that they don't notice you following them.
But before you get a chance to strike, 
they call it quits and leave for the town.`,
                option:['Leave'],
                optionDesc:['Upgrade a Card'],
                link:[-1],
            },{
                desc:
`The hunters fail to catch their prey, but
they're much more skilled than you initially believed.
You could take this to be a learning experience, or more,
but this is a dangerous game they're playing.`,
                option:['Leave'],
                optionDesc:['Add a Card'],
                link:[-1],
            },{
                desc:
`You get fairly good, albeit short rest.
The hunters are gone by the time you wake up.`,
                option:['Continue'],
                optionDesc:['Heal 10 Health'],
                link:[-1],
            },
        ],
    },{
        name:'Dead Soldier',id:42,list:0,
        pages:[
            {
                desc:
`You notice the body of a Management soldier on
the ground, holding the apparent rank of Corporal.
Unlike most soldiers, he has a name tag, reading
CPL. Ray Earle. But the main item on his body is his pack.
But as you prepare to take his possessions,
you realize that you've seen this trap before.
The Management is known for using its
soldiers long past their lifetimes...`,
                option:['Steal From Him','Leave Him Alone'],
                optionDesc:['',''],
                link:[1,3],
            },{
                desc:
`You carefully pick through his possessions,
only to realize that he probably died of natural causes.
Finding not a single trap on his body,
you take everything you can find of value.`,
                option:['Take stuff'],
                optionDesc:['Gain a Relic, Gain 45 Currency'],
                link:[-1],
            },{
                desc:
`Hearing a beep, you are unable to escape
before the explosion hits. The Management can't
help itself from using underhanded tactics.`,
                option:['Ouch'],
                optionDesc:['Lose 25 Health'],
                link:[-1],
            },{
                desc:`You leave his body where it is and continue on your path.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Antiquarian',id:43,list:0,
        pages:[
            {
                desc:
`Inside a shop, you see rows upon rows of artifacts
The owner, tinkering with something in the back, turns to face you.
"Come on in and buy something,
I've got plenty of products here!"`,
                option:['Buy something','Get Out'],
                optionDesc:['',''],
                link:[-2,1],
            },{
                desc:
`This shop owner isn't a good person,
so you get out before anything can happen.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Bonfire Spirits',id:44,list:0,
        pages:[
            {
                desc:
`You happen upon a group of what looks like
purple fire spirits dancing around a large bonfire.
The spirits toss small bones and fragments
into the fire, which brilliantly erupts each time.
As you approach, the spirits all turn to you, expectantly...`,
                option:['Toss something in','Decline'],
                optionDesc:['Remove a Card, Receive Reward Based on Card',''],
                link:[1,2],
            },{
                desc:`The spirits make no move to stop you from leaving.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`They wait, ready for you to make your offering.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You throw it in, but nothing happens.
Disappointing.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`The flames grow slightly brighter.
The spirits continue dancing.
You feel slightly warmer from their presence.`,
                option:['Leave'],
                optionDesc:['Heal 5 HP'],
                link:[-1],
            },{
                desc:
`The flames erupt, growing significantly stronger.
The spirits dance around you excitedly,
filling you with a sense of warmth.`,
                option:['Leave'],
                optionDesc:['Heal All HP'],
                link:[-1],
            },{
                desc:
`The flames burst outward as the fire explodes in strength.
The spirits dance around you excitedly before merging into you,
filling you with warmth and strength.`,
                option:['Leave'],
                optionDesc:['Heal All HP, Gain 10 Max HP'],
                link:[-1],
            },
        ],
    },{
        name:'Upscaling',id:45,list:0,
        pages:[
            {
                desc:
`You enter a seemingly cheery-looking shop that
seems to relate to what your working on right now.
The proprietor approaches from behind the counter and greets you.
"Hello, |1|, what would you like?" he says politely.\n
You're liking the place, when he looks over you again.
"Actually, we don't serve people like you, not that it's illegal, of course..."\n
He reconsiders the final time. "Fine, what service would you like?"
You could take one of the services, but you would rather punch him.`,
                option:['Adjustments','Cleanup','Punch Him'],
                optionDesc:['Lose 40 Currency','Lose 60 Currency',''],
                link:[1,2,3],
            },{
                desc:
`He completes the service you asked for.
"Okay, now get out."
Should've punched him.`,
                option:['Leave'],
                optionDesc:['Upgrade 2 Random Cards'],
                link:[-1],
            },{
                desc:
`He completes the service you asked for.
"Okay, now get out."
Should've punched him.`,
                option:['Leave'],
                optionDesc:['Remove a Card'],
                link:[-1],
            },{
                desc:
`You hit him so hard that your fist might even hurt a little.
He recoils from the collision. You leave, feeling satisfied.`,
                option:['Serves Him Right'],
                optionDesc:['Lose 1 Health'],
                link:[-1],
            },
        ],
    },{
        name:'Mystery Gift',id:46,list:0,
        pages:[
            {
                desc:
`As you pass by a dumpster,
you notice a strange creature eating something inside.
When it notices you, it drops its food and runs towards you,
trying to take your possessions.`,
                option:['Give it a Relic','Run'],
                optionDesc:['Lose a Random Relic, Gain a Relic - Mandelbox',''],
                link:[1,2],
            },{
                desc:
`When it sees you hand it a relic,
it quickly devours it and hands you a box.`,
                option:['Take it'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`It tries to catch up, but you're way too fast.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Crossroads',id:47,list:0,
        pages:[
            {
                desc:
`The Management has announced a massive
weapons test at the Masurian Lake.
The test is safe for viewers at 20 kilometers,
and it has been announced that all are welcome to view it.
A typical show of force for the Management, they want
the citizens to know what they're up against.`,
                option:['View the Test','Rest'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`You see the absolute power the Management has
created as the Starflame missiles hit the water.
Watching the massive plasma explosions,
you wonder why any of the fighting is even going on at all.
If the Management has four of these on every ship,
they have no reason to even try to fight.
That's probably enough firepower to destroy entire planets...`,
                option:['Beautiful?'],
                optionDesc:['Gain an Item'],
                link:[-1],
            },{
                desc:
`You don't have the additional time
to watch such a meaningless spectacle.
You rest in the meantime while others gather to watch.`,
                option:['Good Rest'],
                optionDesc:['Heal 6 Health'],
                link:[-1],
            },
        ],
    },{
        name:'Fight Club',id:48,list:0,
        pages:[
            {
                desc:
`You stumble across a secret fight club in
the criminal underworld. There are multiple fights
scheduled today, but also some vacancies.`,
                option:['Join a Fight','Bet on a Fight','Ignore it'],
                optionDesc:['Start Fight','',''],
                link:[-2,1,3],
            },{
                desc:`You win the bet and collect winnings.`,
                option:['Win'],
                optionDesc:['Gain 125 Currency'],
                link:[-1],
            },{
                desc:
`You lose the bet,
but at least you didn't get beat up.`,
                option:['Lose'],
                optionDesc:['Lose 125 Currency'],
                link:[-1],
            },{
                desc:`You leave the fight club and go somewhere else.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Gold Bar',id:49,list:0,
        pages:[
            {
                desc:
`In the center of an ancient temple,
you discover that the treasures within are undisturbed.
At the end, you discover a gold bar.
It might not have any direct value, but it may have other uses.`,
                option:['Take it',`Don't`],
                optionDesc:['Gain a Relic',''],
                link:[2,1],
            },{
                desc:`You won't fall for such an obvious trap.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`As you grab the bar, a trapdoor opens in the roof,
causing a giant stone ball to fall in front of you.
You realize the ground is slightly slanted
as the ball begins rolling toward you.`,
                option:['Get Hit','Duck','Run'],
                optionDesc:['','',''],
                link:[3,4,5],
            },{
                desc:
`The full force of the rolling ball nearly flattens you,
but you're able to bring it to a stop.`,
                option:['Ouch'],
                optionDesc:['Lose 16 Health'],
                link:[-1],
            },{
                desc:`The ball rolls over you and ends up at the end of the hall.`,
                option:['Ouch'],
                optionDesc:['Lose 4 Max Health'],
                link:[-1],
            },{
                desc:`You get out of the way, but your foot appears broken...`,
                option:['Ouch'],
                optionDesc:['Become Cursed - Injury'],
                link:[-1],
            },
        ],
    },{
        name:'Bootlegging',id:50,list:0,
        pages:[
            {
                desc:
`A group of men are standing around a
car while one attempts to fix the engine.
As you approach, one picks up his gun and prepares to fire.
You do the same, raising your weapon.
"No need to be so aggressive, okay? We're just doing a little
business here, dealing our product out to customers."
"What's the product?", you reply.
"It's a new type of drink, with some new chemicals mixed in.
It's safe to drink, but I'm afraid it's illegal."
"Isn't that legal, though?", you ask.
"Not exactly. The concentrations of some of
the parts are above regulated levels."
"Anyway, I'll give you a sample if you keep quiet."`,
                option:['Take Some','Refuse'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`He reaches into the trunk, into a box within the trunk,
and pulls out a bottle containing suspicious brown liquid.
"Enjoy your drink!"`,
                option:['Take it'],
                optionDesc:['Gain an Item'],
                link:[-1],
            },{
                desc:`You leave them to do their business alone.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Investments',id:51,list:0,
        pages:[
            {
                desc:
`You walk into an unknown building. On the inside,
the proprietor asks if you are here to invest.
You tell him that you're a traveler,
but he replies that his business are everywhere,
so you'll be able to take money out anywhere.
He tells you that his investments are linked to a
very profitable hedge fund owned by the Management.`,
                option:['Invest','Decline'],
                optionDesc:['Lose 100 Currency',''],
                link:[1,2],
            },{
                desc:
`You hand over your money and he adds your information to a list.
He thanks you for your time as you leave.`,
                option:['Worth it'],
                optionDesc:['Gain a Relic - Stocks'],
                link:[-1],
            },{
                desc:`It's too risky to be putting your money into things right now.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The Message',id:52,list:0,
        pages:[
            {
                desc:
`A man wearing a trenchcoat walks by you. When he gets near,
he quickly hands you a paper ball and runs away.
Unfolding the ball, you find a message from
some sort of organization operating on the planet.
"We would like to meet you tomorrow at our base."
Looks like they've given you directions there as well.`,
                option:['Go There',"Don't"],
                optionDesc:['',''],
                link:[2,1],
            },{
                desc:
`Sounds like a scam.
Nobody transmits messages via paper balls.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`When you arrive, a squad of people jump
out from all sides and attack you.`,
                option:['Run'],
                optionDesc:['Lose 6 Health'],
                link:[-1],
            },{
                desc:
`There's nobody there,
only a drop box and some security systems.`,
                option:['Go Toward the Box','Leave'],
                optionDesc:['Lose 3 Health',''],
                link:[4,5],
            },{
                desc:
`You advance, but the security system
takes a chunk out of you.`,
                option:['Keep Going','Leave'],
                optionDesc:['Lose 3 Health',''],
                link:[6,5],
            },{
                desc:`You leave the box behind and head out.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You pick up the box and find useful equipment inside.`,
                option:['Take it'],
                optionDesc:['Gain a Relic'],
                link:[-1],
            },
        ],
    },{
        name:'Notes',id:53,list:0,
        pages:[
            {
                desc:
`You find a notebook,
seemingly just left on the ground for no reason.
After making sure that there are no traps nearby,
you grab the notebook and read through the first few pages.`,
                option:['Read on','Leave it'],
                optionDesc:['',''],
                link:[2,1],
            },{
                desc:`You let the book stay where you left it.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Within, you see a discussion of the uniqueness of
culture and how it remains despite fierce resistance.`,
                option:['Interesting'],
                optionDesc:['Add a Card'],
                link:[-1],
            },{
                desc:
`Within, you see a discussion of the the future
prospects of Managemental conquests.`,
                option:['Interesting'],
                optionDesc:['Add a Random Card'],
                link:[-1],
            },
        ],
    },{
        name:'Abandoned Home',id:54,list:0,
        pages:[
            {
                desc:
`In a remote area you discover an empty house
that's been turned practically upside down.
Nearly everything that's not nailed down has been taken.
Only some random junk remains inside.
You find the entrance to the basement and enter.
There, most of the objects inside remain intact.
You open up one closet and look inside.
Hundreds of books are inside,
along with many ages of notes.
There's space for one large book in the center, but it's gone.`,
                option:['Take the Stuff','Destroy the Evidence'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`You grab every book you can and
leave the house with the materials.`,
                option:['Keep Them'],
                optionDesc:['Gain a Relic - Survival Notes'],
                link:[-1],
            },{
                desc:
`You get the house burnt down,
along with anything of value inside.`,
                option:['Done'],
                optionDesc:['Gain 55 Currency'],
                link:[-1],
            },
        ],
    },{
        name:'Taxi',id:55,list:0,
        pages:[
            {
                desc:
`You get into a taxi to cross a
non-pedestrian-friendly bridge. "Hello," he says.
"I'm Alexander, your driver. Where would you like to go?"
He accelerates as soon as you tell him your destination.
As he continually speeds up, you begin to get worried.
This is exacerbated when he starts swerving through traffic.
It is at that moment you realize that the
other cars are driving the other way.`,
                option:['Grab the Wheel','Hope for the Best','Jump out the door'],
                optionDesc:['','',''],
                link:[1,2,3],
            },{
                desc:
`You push him out of the way and successfully slow
the taxi down. Other cards turn around the taxi,
While you can't drive, you are able to jump
out and run the rest of the trip on foot.`,
                option:['Escape'],
                optionDesc:['Add a Random Card'],
                link:[-1],
            },{
                desc:
`As you watch, the taxi collides directly
with another and flies off the bridge.
You wake up hours later, in severe pain.`,
                option:['Pain'],
                optionDesc:['Lose 99 Health'],
                link:[-1],
            },{
                desc:
`You get out and land on the pavement.
The taxi goes on and crashes in the distance.
You spend the next few minutes frantically 
dashing between cars to get off the bridge.`,
                option:['Get Out of There'],
                optionDesc:['Lose 9 Health'],
                link:[-1],
            },
        ],
    },{
        name:'Outmonkeyed',id:56,list:0,
        pages:[
            {
                desc:
`You are stopped in the road by a gang of monkeys.
"We'd like your protection payment," the first one says.`,
                option:['How Much?','Attack Him'],
                optionDesc:['','Start Fight'],
                link:[1,-2],
            },{
                desc:`
"40", he answers.
"Standard Management currency."`,
                option:['Pay up','Attack Him'],
                optionDesc:['Lose 40 Currency','Start Fight'],
                link:[2,-2],
            },{
                desc:
`You hand over the money.
The monkeys leave.`,
                option:['Done'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Call of the Void',id:57,list:-1,
        pages:[
            {
                desc:
`You see a sphere floating in the
middle of the air. It's made of nothing.
Like, it's literally nothing.
Not empty space, just nothing at all.
Probably a glitch or something...`,
                option:['Put Something in','Jump in'],
                optionDesc:['Remove a Card','Delete All Cards'],
                link:[1,2],
            },{
                desc:
`You throw the card into the sphere,
where it ceases to exist.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You wake up a short time later.
You've forgotten everything, but,
The Cycle Must Repeat.`,
                option:['Leave'],
                optionDesc:['Add Ouroboros and Ourostep to Deck'],
                link:[-1],
            },
        ],
    },{
        name:'The Mirror',id:58,list:-1,
        pages:[
            {
                desc:
`You see a strange mirror emanating a soft glow nearby.
You can see something reflected back at you,
but it isn't yourself...`,
                option:['Look into it','Look into it'],
                optionDesc:['Duplicate a Card','Duplicate All Cards'],
                link:[1,1],
            },{
                desc:
`You watch as what you see floats out 
of the mirror and into your hand.
As you are left holding it, the mirror disappears.`,
                option:['Take it'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You watch as what you see floats out
of the mirror and into your hand.
As you are left holding it, the mirror disappears.`,
                option:['Take it'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Take Out the Trash',id:59,list:0,
        pages:[
            {
                desc:
`You find your way to the waste disposal site.
Your notice several boxes on the side, containing random stuff.
Suddenly, an employee notices you.
You might be able to grab something before you run.`,
                option:['Grab the "Random" Box','Grab the "Assorted" Box','Run'],
                optionDesc:['','',''],
                link:[1,2,3],
            },{
                desc:`You grab the box, but you can't tell what's inside.`,
                option:['Run'],
                optionDesc:['Add 2 Random Rare Cards'],
                link:[-1],
            },{
                desc:`You grab the box, but you can't tell what's inside.`,
                option:['Run'],
                optionDesc:['Gain a Relic'],
                link:[-1],
            },{
                desc:`You get out of there.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The New Ship',id:60,list:-1,
        pages:[
            {
                desc:
`You didn't even know there's a shipyard on here.
When you arrive, the soldiers in the area let you
through the security clearance and into the main zone.
Looks like an entire lake was drained to build this shipyard.
Weird that they didn't just build it in space.`,
                option:['Tour the shipyard','Rest'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`You tour the shipyard, discovering its many facilities.`,
                option:['Interesting'],
                optionDesc:['Add Glock to Deck'],
                link:[-1],
            },{
                desc:
`You decide that you'll save the
shipyard visit for another time.`,
                option:['Done'],
                optionDesc:['Heal 12 Health'],
                link:[-1],
            },
        ],
    },{
        name:'Fortune Teller',id:61,list:-1,
        pages:[
            {
                desc:
`In a hidden spot in a dark alley of the city,
you spot a strange little tent, nestled among similar other tents.
It seems the other tents are just shops, but this one is a "Fortune Teller".
Entering, you're offered a chance to glimpse your future...`,
                option:['View'],
                optionDesc:['Choose an Arcana to Add to Deck'],
                link:[-1],
            },
        ],
    },{
        name:'Drinking Contest',id:62,list:0,
        pages:[
            {
                desc:
`You enter a bar, finding the atmosphere rowdy,
filled with people partying, drinking, and enjoying themselves.
At a central table, however, several people crowd around a pile
of empty cans and glasses. Nobody recognizes you, but as the
first new person to arrive in some time, you are invited to
join in by the bartender, offering the drinks for free and
showing you the stack of prize money.`,
                option:['Participate','Decline'],
                optionDesc:['Become Cursed - Drunk',''],
                link:[1,2],
            },{
                desc:
`Almost an hour later, your final opponent has had enough
and you are declared the winner. The bartender gives you the
prize money, telling you to come again - you're the reigning
champion now. You're too drunk to respond reasonably.`,
                option:['Take Your Prize'],
                optionDesc:['Gain 400 Currency'],
                link:[-1],
            },{
                desc:
`You shake your head and go to a secluded corner of the bar
where you watch their drinking game go to completion.
At the end, they're barely even awake. Looks like
you dodged a bullet there...`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Memory Gameshow',id:63,list:0,
        pages:[
            {
                desc:
`You find yourself on stage, sitting face-to-face with a
gameshow host, an interesting man with a purple top hat.
"We've been following you for a while now", he says.
"Let's see if you know your past as well as we do.
Tell me, which event was the first you encountered?"`,
                option:['','','','',''],
                optionDesc:['','','','',''],
                link:[2,2,2,2,2],
            },{
                desc:`
"With the information we have here, that seems right.
I guess you win! Go on, take your prize!"
Still not sure what's happening, you're taken
to the prize vault, where your reward is waiting.`,
                option:['Take it'],
                optionDesc:['Gain 2 Relics'],
                link:[-1],
            },{
                desc:`
"That doesn't seem right, unforunately for you.
Looks like your memory is only on part with the Ducks..."
You didn't win the prize this time.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Card Folder',id:64,list:0,
        pages:[
            {
                desc:`
As you watch a group of Management Officers pass you by
on their truck, you see a folder containing tons of pieces
of paper fall out the back. Picking it up, you see many
individual markers for locations within the folder. In
the distance, you can hear the engine sounds getting quieter,
but you know that papers like these have internal codes -
they'll come for you eventually unless you take what you
need and throw the folder away once you're done.
What might you be looking for?`,
                option:['A 1 Cost Card','A 2 Cost Card','Any Cost Card'],
                optionDesc:['','',''],
                link:[1,2,3],
            },{
                desc:
`Finding the designated spot in the folder,
you see only more delimiters within.
What might you be looking for?`,
                option:['An Attack','A Defense','A Skill'],
                optionDesc:['','',''],
                link:[4,4,4],
            },{
                desc:
`Finding the designated spot in the folder,
you see only more delimiters within.
What might you be looking for?`,
                option:['An Attack','A Defense','A Skill'],
                optionDesc:['','',''],
                link:[4,4,4],
            },{
                desc:
`Finding the designated spot in the folder,
you see only more delimiters within.
What might you be looking for?`,
                option:['An Attack','A Defense','A Skill'],
                optionDesc:['','',''],
                link:[4,4,4],
            },{
                desc:
`You take the card you find within and get moving,
throwing the folder somewhere where it'll waste
the Management's time when they search for it.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The Backdoors',id:65,list:0,
        pages:[
            {
                desc:
`You encounter two backdoors seeming floating in space,
opened and revealing a space-like dimension beyond.
They appear suddenly and you've never seen something
like this before. Do you dare to enter?`,
                option:['Enter the Left Door','Enter the Right Door','Leave'],
                optionDesc:['Make a Card Erratic, Become Cursed - Bozo','Make a Card Negative, Become Cursed - Backfire',''],
                link:[1,1,2],
            },{
                desc:
`Entering the door, everything fades to black.
Stars appear in all directions, then disappear.
After a little time wandering in this dimension,
you see another door in space, and waste no
time leaving this strange world.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:'As your turn to leave, the doors disappear.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The Hitman',id:66,list:0,
        pages:[
            {
                desc:
`A man in a dark suit and tie approaches you, a
gun in his hand. "I know what's up ahead," he tells you,
"and I can deal with it, for a price, of course."`,
                option:['Pay','Decline'],
                optionDesc:['Lose 50 Currency',''],
                link:[1,2],
            },{
                desc:
`You give him the requested money.
"Good choice," he responds. "I'll get the job done."`,
                option:['Leave'],
                optionDesc:[`Reduce the Health of this World's Boss by 40%`],
                link:[-1],
            },{
                desc:
`Backing up, you see him looking at you disapprovingly,
before he puts his gun back in his coat and runs off.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:`Navigator's Shed`,id:67,list:0,
        pages:[
            {
                desc:
`You find a Navigator in his workplace, producing maps.
Around in his shop are some completed products,
for a price of course. Finding the one for the local
area, you see a surprising amount of hidden passages
and private roads revealed, but there's no way you're
remembering all this information without buying it.`,
                option:['Buy the Map','Decline'],
                optionDesc:['Lose 40 Currency',''],
                link:[1,2],
            },{
                desc:'You pay the price and he hands the map over.',
                option:['Take the Map'],
                optionDesc:['Gain 2 Free Move'],
                link:[-1],
            },{
                desc:'You leave him to his work.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Basic Card Rebellion',id:68,list:0,
        pages:[
            {
                desc:
`You find a Red soldier on the streets, but he looks
different from the others, with a slightly edited uniform.
When you approach, he tells you that he's part of a branch
group of the Reds working to start a Revolution against
rare cards. "Comrade, join us!" he requests.`,
                option:['Slap Him','Receive a Brochure','Join the Rebellion'],
                optionDesc:['Transform a Basic Card','Double Upgrade a Random Basic Card','Remove a Non-Basic Card'],
                link:[1,2,3],
            },{
                desc:
`Thoroughly beating him up, you reaffirm
you hatred towards those basic cards.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You'll consider the idea of joining.
Basic cards aren't your favorite, but they never did you wrong.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Taking your badge, you accept that
basic cards are sometimes the best.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'DuckTek Disputes',id:69,list:0,
        pages:[
            {
                desc:
`A Duck wearing a lab coat approaches you.
"The Management has taken my technology and violated
DuckTek copyright!" he says. "It's a good thing I
made a counterweapon to their machines!"`,
                option:['Take the Weapon','Beat Him Up','Sneak Away'],
                optionDesc:['','Lose 6 HP',''],
                link:[1,2,3],
            },{
                desc:'You take the gun and he quickly shows you how to use it.',
                option:[`Keep It`],
                optionDesc:['Add EMP Gun to Deck'],
                link:[-1],
            },{
                desc:'You punch him. Management tech is simply superior.',
                option:['Take His Stuff'],
                optionDesc:['Add 3 Random Common Colorless Cards to Deck'],
                link:[-1],
            },{
                desc:'As he rambles, you get away unnoticed.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Purify the Energy',id:70,list:0,
        pages:[
            {
                desc:
`A spirit appears before you, looking you over.
"Your way of utilizing energy is quite inefficient,
I must say", she remarks. "Could you allow my powers
of purifcation to assist you in controlling it?`,
                option:['Accept','Decline'],
                optionDesc:['Lose 1 Base Energy',''],
                link:[1,2],
            },{
                desc:'You feel your energy becoming channeled.',
                option:['You are Energized'],
                optionDesc:['Gain a Relic - Energized Jade'],
                link:[-1],
            },{
                desc:'She snickers and dissipates into the night.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Public Transit',id:71,list:-1,
        pages:[
            {
                desc:
`Having stolen a ticket to the local bus system earlier,
you take a ride down the carefully-planned route. Yet
the stops are unfamiliar and as you continue, you see
that you've lost your sense of location.
Snapping back to reality, you notice that the bus is
reaching its final few stops and most of your fellow
riders have already left. Luckily for you, a map is present
on the wall with details about each upcoming stop.`,
                option:['Get Off at Stop 1','Get Off at Stop 2','Get Off at Stop 3'],
                optionDesc:['Encounter a Battle','Encounter an Elite','Encounter a Random Event'],
                link:[-2,-2,-2],
            },
        ],
    },{
        name:'Too Lucky',id:72,list:0,
        pages:[
            {
                desc:
`You see a large pile of money lying on the ground
in the middle of a forest. There's nothing around you,
just some distant noises of rustling in the trees.`,
                option:['Take it','Leave it'],
                optionDesc:['Gain 450 Currency',''],
                link:[2,1],
            },{
                desc:`You don't trust the pile.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`As you start gathering the money, a strange creature
appears out of the trees, silently, but noticed by you.
"Looks like you're very lucky today..." it hisses,
"If you want that to stay, it'll cost you..."`,
                option:['Give Money Back','Split the Money','Punch Him'],
                optionDesc:['Lose 450 Currency','Lose 300 Currency','Become Cursed - Unfortunate'],
                link:[3,4,5],
            },{
                desc:
`"How generous you are..." it responds,
"You'll be real lucky today for that!"`,
                option:['Leave'],
                optionDesc:['Add a Lucky Charm to Deck'],
                link:[-1],
            },{
                desc:
`"I'll take my cut then..." it says,
before disappearing back into the trees.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Managing to drive him away, your luck
seems to have decreased somewhat.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The Trader',id:73,list:0,
        pages:[
            {
                desc:
`Running into a small shop, the proprietor eager
beckons you to enter. Rather than products, the
shop contains only a counter, where he explains
that he is a collector of rare items and may be
interested in trading with you.`,
                option:['Try Trading','Get Out'],
                optionDesc:['',''],
                link:[-2,1],
            },{
                desc:`You have no interest in such "trade offers".`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Mystery Machine',id:74,list:0,
        pages:[
            {
                desc:
`You find a machine discarded, marked with labels
indicating as a training machine, but has since been
replaced by its owner. It's barely got any battery left,
but you may be able to use it once - if you can
get it working safely, of course.`,
                option:['Press the Green Button','Press the Yellow Button','Flip a Switch'],
                optionDesc:['','Lose 4 Health','Lose 8 Health'],
                link:[1,2,3],
            },{
                desc:
`As you press the green button, the machine lights up,
and you follow its instructions, for the few minutes
before its battery runs out.`,
                option:['Done'],
                optionDesc:['Upgrade a Card'],
                link:[-1],
            },{
                desc:
`As you press the yreen Button, the machine lights up,
beeping loud noises, and you follow its instructions,
for the few minutes before its battery runs out.`,
                option:['Done'],
                optionDesc:['Remove a Card'],
                link:[-1],
            },{
                desc:
`As you press the Green Button, the machine lights up,
rapidly overheating before calming down just in time,
and you follow its instructions, for the few minutes
before its battery runs out.`,
                option:['Done'],
                optionDesc:['Transform a Card'],
                link:[-1],
            },
        ],
    },{
        name:'Late Night Barbecue',id:75,list:0,
        pages:[
            {
                desc:
`You come across a beast girl tending to a stand
surrounded by a pleasant smell. These small businesses
are everywhere now, ever since the new Management
worker regulations on the planet were passed.
Hearing her shouts, you head over.
"Come on," she says, "have some skewers or you
won't have any energy to fight with!"`,
                option:['Grilled Lamprey','Grilled Mushrooms','Decline'],
                optionDesc:['Heal 20 Health','Add a Card',''],
                link:[1,1,2],
            },{
                desc:
`She hands you the skewer.
After eating it, you feel somewhat replenished.`,
                option:['Pay Normally','Run'],
                optionDesc:['Lose 35 Currency',''],
                link:[3,4],
            },{
                desc:`You're not hungry right now.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You pay the price and leave.
She thanks you for the business. Apparently, there
aren't many customers around these days.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`"Don't dine and dash!" she screams out
in a high-pitched voice, but you're too
fast for her to catch.`,
                option:['Escape'],
                optionDesc:['Lose 1 Health'],
                link:[-1],
            },
        ],
    },{
        name:'Lunar Emissary',id:76,list:0,
        pages:[
            {
                desc:
`You watch a glowing white portal appear before you,
and a group of robed men and women step out, wearing
recognizable insignia - they're from the moon.
One notices you and steps over, interested.
"Would you like something from our supply?"`,
                option:['Take a Lunar Peach','Take Some Lunar Soil','Decline'],
                optionDesc:['Gain 16 Max HP, Become Cursed - Lunar Night','Add 2 Lunar Soils to Deck',''],
                link:[1,2,3],
            },{
                desc:
`You take the peach and eat it, feeling
weaker and stronger simultaneously.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:'You take a small sample of soil.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You decline, and the group heads
toward the local Management offices.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The Candidate',id:77,list:0,
        pages:[
            {
                desc:
`You see a large stadium, where an event is taking
place, so you get your free admission and enter.
Within, a man speaks on his electoral campaign, and
how he plans to "Make the Management Great Again."
Once he's done, the viewers filter out, and you
are stopped by a volunteer asking for donations.`,
                option:['Donate','Decline'],
                optionDesc:['Lose 50 Currency',''],
                link:[1,2],
            },{
                desc:
`You hand over your money, get your
proof of donation, and leave.`,
                option:['Leave'],
                optionDesc:['Add a Relic - Proof of Donation'],
                link:[-1],
            },{
                desc:'You ignore him and leave the stadium.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Shadow Fairies',id:78,list:0,
        pages:[
            {
                desc:
`A group of dark fairies flutter around a lantern,
making a variety of sounds and beckoning you to go
over and investigate. But they pay no attention to you.`,
                option:['Join Them','Run'],
                optionDesc:['Lose 20 Health, Remove All Defends',''],
                link:[1,2],
            },{
                desc:
`As you approach, the fairies disperse, before
flying individually towards you and being absorbed.
The darkness passes, light returning to the area around
the lantern, but where did the darkness really go?`,
                option:['The Darkness Continues'],
                optionDesc:['Add 3 Shades to Deck'],
                link:[-1],
            },{
                desc:'They ignore you as you turn to leave.',
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Simulated Violence',id:79,list:0,
        pages:[
            {
                desc:
`You find yourself suddenly transported to an arena
surrounded by fans and with other fighters standing
all around you. This can't be real, you tell yourself.
And sure enough, the dream is weak. Perhaps you could
break out, or maybe it's worth staying within?`,
                option:['Fight the Dream Combatants','Escape'],
                optionDesc:['Lose 26 Health',''],
                link:[1,2],
            },{
                desc:
`After what seems like several hours facing the
other fighters, you finally finish the last one off.
It's at that point that the dream becomes unstable once
more, and you take your change to escape.`,
                option:['Wake Up'],
                optionDesc:['Add a Starry Sky to Deck'],
                link:[-1],
            },{
                desc:'The dream shatters in place as you focus.',
                option:['Wake Up'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Ghostly Dream',id:80,list:0,
        pages:[
            {
                desc:
`Despite being fully awake, you begin to see strange
glowing purple halos in front of you, followed by glowing
butterflies. There's no doubt about it, this is a sudden
dream - better not stay in it too long.`,
                option:['Dream of Oblivion','Dream of Evolution'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`You manage to drive the dream in the
direction you wish, feeling slightly changed.`,
                option:['Wake Up'],
                optionDesc:['Make a Card Ethereal'],
                link:[-1],
            },{
                desc:
`You manage to drive the dream in the
direction you wish, feeling slightly changed.`,
                option:['Wake Up'],
                optionDesc:['Make a Card Exhaust'],
                link:[-1],
            },
        ],
    },{
        name:'Furnace',id:81,list:0,
        pages:[
            {
                desc:
`You run into a group of engineers arguing nearby.
"You forgot to bring any fuel!" one of them tells another,
"and all of us are too weak to power it manually!"
Suddenly one of them notices you and pulls you over.
"Mind helping us start this machine up?"`,
                option:['Power it yourself','Reengineer it','Decline'],
                optionDesc:['Remove 2 Random Attacks','Remove 2 Random Defenses',''],
                link:[1,1,2],
            },{
                desc:'He hands you a little money for the help.',
                option:['Leave'],
                optionDesc:['Gain 5 Currency'],
                link:[-1],
            },{
                desc:'You leave them to argue.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Embrace Pain',id:82,list:0,
        pages:[
            {
                desc:
`As you train, you begin to think that maybe you could get
a little more out of your abilities were you to stretch yourself
just a little farther. It'll hurt, but it might be worth a shot.`,
                option:['Try it',`Don't`],
                optionDesc:['Make a Card Health-Costing',''],
                link:[-1,1],
            },{
                desc:`It just sounds too risky.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Aluminum Mine',id:83,list:0,
        pages:[
            {
                desc:
`You find an aluminum mine nearby and go to investigate.
Sneaking past security, you find that mining really isn't
that interesting of a task. Still, you could steal some of
their materials, at least as much as you can carry.`,
                option:['Take Some Aluminum',`Leave`],
                optionDesc:['Make a Card Foil',''],
                link:[-1,1],
            },{
                desc:`You've got places to be.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Blessings of the Shrine',id:84,list:0,
        pages:[
            {
                desc:
`In the mountains, you find a shrine dedicated to an
unknown god. It's empty at the moment, but it couldn't
hurt to stay for a little while.`,
                option:['Sacrifice','Donate','Leave'],
                optionDesc:['Lose 10 Max HP','Lose 25 Currency',''],
                link:[1,2,3],
            },{
                desc:
`As the pain subsides, you can almost hear the voice
of a god thanking you and promising future blessings.`,
                option:['Leave'],
                optionDesc:['Add a Relic - Miracle Blessing'],
                link:[-1],
            },{
                desc:
`Throwing a few coins into the collection box,
you feel as if you have been blessed.`,
                option:['Leave'],
                optionDesc:['Upgrade a Card'],
                link:[-1],
            },{
                desc:'You leave the shrine and head down the mountain.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The Archivist',id:85,list:0,
        pages:[
            {
                desc:
`In the Management Archives, you find a man moving
papers back and forth, with a lighter handy just in case.
He seems to recognize you.
"Oh, you're one of those people we've been studying.
We know a lot about you and those like you.
I'm willing to tell you about the others for a price."
Who would you like to hear about?`,
                option:['','','','Leave'],
                optionDesc:['Lose 25 Currency, Add a Card','Lose 25 Currency, Add a Card','Lose 25 Currency, Add a Card',''],
                link:[1,1,1,2],
            },{
                desc:'He explains a little and gives you a few pieces of paper.',
                option:['I See'],
                optionDesc:[''],
                link:[0],
            },{
                desc:'You leave him to his work.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Dev Intervention',id:86,list:-1,
        pages:[
            {
                desc:
`A casually-dressed man with wide glasses approaches you,
out of nowhere. "I hope you're having a good time," he says,
"would you consider donating a little so the game can continue?"
You have no idea what he's saying.`,
                option:['Donate','Punch Him'],
                optionDesc:['Lose 150 Currency',''],
                link:[1,2],
            },{
                desc:
`He thanks you and turns away, but when
you turn around, he's long gone.`,
                option:['Leave'],
                optionDesc:['Add an 11 of Nothings to Deck'],
                link:[-1],
            },{
                desc:
`He punches you back. Despite how weak he appeared,
you feel quite a lot weaker now.`,
                option:['Leave'],
                optionDesc:['Add a 1 of Nothings to Deck'],
                link:[-1],
            },
        ],
    },{
        name:'The Murderer',id:87,list:0,
        pages:[
            {
                desc:
`You stumble upon a unique scene - an unknown man is travelling
and talking on his phone, followed by another man with a knife.
The second man creeps up behind the first and raises his weapon...`,
                option:['Help the Victim','Help the Murderer','Run'],
                optionDesc:['Lose 15 Health','',''],
                link:[1,2,3],
            },{
                desc:
`Felling the murderer with a quick slash, you save the victim
from an untimely death. Filled with gratitude, he hands you something.`,
                option:['Take it'],
                optionDesc:['Gain a Relic - Call Button'],
                link:[-1],
            },{
                desc:
`After finishing the job, the murderer
hands you some money to keep quiet.`,
                option:['Take Bribe'],
                optionDesc:['Gain 120 Currency'],
                link:[-1],
            },{
                desc:'You get away and forget about what just happened.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:`Engineer's Pet`,id:88,list:0,
        pages:[
            {
                desc:
`As you walk, a cat appears beside you, suddenly grabbing
one of your items and running off. Following it, it enters a
shed, where an engineer is working on his projects.
"Looks like he likes your stuff, huh?" he tells you.
"If you let him keep it, I'll make it worth your while.`,
                option:['Payment','Repairs','Take it Back'],
                optionDesc:['','',''],
                link:[1,2,3],
            },{
                desc:'Letting him keep your item, he pays you well.',
                option:['Leave'],
                optionDesc:['Gain 325 Currency'],
                link:[-1],
            },{
                desc:'Letting him keep your item, he refines your tools.',
                option:['Leave'],
                optionDesc:['Remove 2 Cards'],
                link:[-1],
            },{
                desc:'Taking it back, you leave his shed.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Trash Compactor',id:89,list:0,
        pages:[
            {
                desc:
`You spot a pile of trash being processed, but it looks
like something useful might be inside. The stuff at the top
doesn't look useful, but maybe there's more valuable items within.`,
                option:[`Search the Top`,'Search Inside','Dive in'],
                optionDesc:['','Lose 10 Health','Lose 30 Health'],
                link:[1,2,3],
            },{
                desc:'You check the items near the top of the trash pile.',
                option:['Take Something'],
                optionDesc:['Gain a Common Relic'],
                link:[-1],
            },{
                desc:'You look inside, digging some things out of the trash.',
                option:['Take Something'],
                optionDesc:['Gain a Uncommon Relic'],
                link:[-1],
            },{
                desc:'Jumping in, you get pretty deep into the trash pile.',
                option:['Take Something'],
                optionDesc:['Gain a Rare Relic'],
                link:[-1],
            },
        ],
    },{
        name:'Bookstore',id:90,list:0,
        pages:[
            {
                desc:
`You find a bookstore ahead of yourself, quaint and empty,
except for a girl tending the shelves. As you enter, she asks
you if you'd like to buy something.`,
                option:['Buy a Book','Decline'],
                optionDesc:['Lose 125 Currency',''],
                link:[1,2],
            },{
                desc:'Paying her, you look to find a book you like.',
                option:['Take a Book','Take a Book'],
                optionDesc:['Add a Relic - A Brief History of Time','Add a Relic - The Road to Reality'],
                link:[-1,-1],
            },{
                desc:'You look over the books and choose not to buy.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Double-Slit Experiment',id:91,list:0,
        pages:[
            {
                desc:
`Breaking into a physicists' laboratory, you find him working
at his new experiment and not paying attention as he sneak in.
Making your way to his storage vault, you find where he's been
storing his spectral creations.
Suddenly, you hear him approaching. There's little time.`,
                option:['Take a Spectral Cube','Take a Jar of Spectral Dust','Run'],
                optionDesc:['Open a Spectral Pack','Add 2 Random Spectral Cards to Deck',''],
                link:[1,1,2],
            },{
                desc:'He sees you, but you get away in time.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:'You manage to escape.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Collection of Misfortune',id:92,list:0,
        pages:[
            {
                desc:
`An aquamarine-haired girl stands in the forest ahead of you.
She notices you right away. "Looks like you're quite cursed.
I could help you with that."`,
                option:['Accept Help','Embrace Her','Leave'],
                optionDesc:['Remove All Curses','Become Cursed, Gain a Relic - Hina Charm',''],
                link:[1,2,3],
            },{
                desc:'She whispers something, and you feel your curses fading away.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`She tries to push you aside, but you can already feel the
cursed energy entering you - you're helping her now.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`She giggles as you leave.
"You're as wary as every, huh?`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Crypto Bro',id:93,list:0,
        pages:[
            {
                desc:
`A man walks up to you, advertisement in hand.
"Invest in Barbcoin!" he tells you. "Guaranteed returns!"
He explains how much your investment could be worth one day.`,
                option:['Invest','Decline'],
                optionDesc:['Lose 60 Currency',''],
                link:[1,2],
            },{
                desc:
`You hand over your money and receive a marker on a ledger.
It'll be worth money at some point, right?`,
                option:['Worth?'],
                optionDesc:['Gain a Relic - Barbcoin'],
                link:[-1],
            },{
                desc:`You're not taking that risk.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Destined Return',id:94,list:0,
        pages:[
            {
                desc:
`You see a familiar tent.
Yes, it's the fortune teller again.
This time, though, the service will be paid...`,
                option:['View','Decline'],
                optionDesc:['Lose 200 Currency, Choose an Arcana to Add to Deck',''],
                link:[-1,-1],
            },
        ],
    },{
        name:'Duck Hunt',id:95,list:0,
        pages:[
            {
                desc:
`A group of hunters carrying rifles emerge out of a forest.
Noticing you, one introduces himself as Hunterbob and asks if
you'd like to go with them on the hunting trip - they've
spotted a bunch of ducks at the nearby lake.`,
                option:['Join Them','Decline'],
                optionDesc:['Start Fight',''],
                link:[-2,1],
            },{
                desc:'You let them leave without you.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Fluffy Duck',id:96,list:0,
        pages:[
            {
                desc:
`Suddenly, you see a fluffy duck rolling down the road.
Moving at a constant fast speed, it looks like getting hit
by him might hurt, but the fluff might cushion the impact.`,
                option:['Brace For Impact','Run'],
                optionDesc:['Become Cursed - Duck Fluff',''],
                link:[1,2],
            },{
                desc:
`While covered in duck fluff, you're unhurt.
Seeing him knocked out, you take what you find on him.`,
                option:['Take His Stuff'],
                optionDesc:['Gain a Relic'],
                link:[-1],
            },{
                desc:'You get out of the way, and he keeps rolling down the road.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Financial Products',id:97,list:0,
        pages:[
            {
                desc:
`An eager duck appears before you, with a disk in his hand.
"For just a small initial price you can win endless riches!" he exclaims.
"Come on, take the deal!"`,
                option:['Buy','Decline'],
                optionDesc:['Lose 65 Currency',''],
                link:[1,2],
            },{
                desc:'Taking your money, he gives you the disk.',
                option:['Take it'],
                optionDesc:['Add a Money Shower to Deck'],
                link:[-1],
            },{
                desc:'Unable to get him to leave, you beat him up.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Coin Flip',id:98,list:0,
        pages:[
            {
                desc:
`Suddenly, you find yourself face-to-face with a man,
with his nametag reading "The Dealer". He asks you if
you'd like a chance to duplicate your best cards -
but with the caveat that you might lose it entirely.`,
                option:['Play','Decline'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`He flips his coin...`,
                option:['Find Out'],
                optionDesc:['Randomly Double or Nothing a Card'],
                link:[-1],
            },{
                desc:
`You turn away, and he packs up and leaves
to find the next victim to scam.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Duck Mines',id:99,list:0,
        pages:[
            {
                desc:
`You encounter a group of work ducks near a mineshaft.
One of them drags a cart of green minerals while another
carries several pickaxes. They look ragged and dirty,
not exactly the richest ducks around. One approaches you.
"Would you be interestesd in buying some of the minerals
from us? I'll give you a discount!"`,
                option:['Buy Titanite','Decline'],
                optionDesc:['Lose 40 Currency, Add a Titanite to Deck',''],
                link:[1,2],
            },{
                desc:
`He hands you the mineral and celebrates with the others,
before they leave as a group down the road.`,
                option:['Take it'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:'They head back to the road, slowly moving.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Fake Adventure',id:100,list:-1,
        pages:[
            {
                desc:
`As you pass through the village at night, you are suddenly surprised by
a girl running toward you, dressed in red shrine maiden's clothing.
"You're the one I've been looking for!" she shouts as she approaches.
With a disapproving look on her face and a talisman in her hand,
she stands before you. "You've been causing some trouble around here,
and it's my task to keep the peace... it's time to fight!"
You're taken by utter surprise and unprepared for a battle,
but it doesn't look like she's messing around.`,
                option:['Act Confused','Bribery','Run'],
                optionDesc:['Lose 15 Health','Lose 33 Currency',''],
                link:[1,2,3],
            },{
                desc:
`Your attempt to feign ignorance doesn't fool her, unfortunately.
She knocks you to the ground, but after beating you up further and examining
you again a few times, concludes that the incident should be resolved.
"No hard feelings!" she shouts out as she runs off, leaving you confused.
"Once you're feeling normal, you can come visit me at the shrine!"
Maybe you'll pass by there in the future.`,
                option:['Get Up'],
                optionDesc:['Choose a Hakurei Tool to Add to Deck'],
                link:[-1],
            },{
                desc:
`Handing a few coins to her, she seems to lose her earlier anger.
"I'm short on money, so I'll leave you be" she tells you, "but try not to 
cause trouble again, alright? Come on, I'll take you to the shrine.
Just don't do anything stupid, and you'll be free to go later."`,
                option:['Follow Her'],
                optionDesc:['Choose a Hakurei Tool to Add to Deck'],
                link:[-1],
            },{
                desc:
`Turning to run, you start to get away, but she pursues. "I knew it!"
she shouts after you. "Get back here, it's time for your exorcism!"
Still, you continue, and it looks like you're just fast enough to escape.
After a lengthy dash, you lose sight of each other. But the
strange encounter resonates with you - something is following you around.`,
                option:['Leave'],
                optionDesc:[`Become Cursed - Reimu's Wrath`],
                link:[-1],
            },
        ],
    },{
        name:'Shining Castle',id:101,list:-1,
        pages:[
            {
                desc:
`The planet used to be covered in castles. They weren't useful
by then of course - warfare outpaced them, but at least they were
architecture. Yet most have long since been demolished. Now, you
find yourself before one of the last. It's said the owner is
gone now, but she moved in following Management relocation efforts.
It's open to the public now, but there's not much of value inside.
Maybe something here is useful?`,
                option:['Take an Item','Take Money'],
                optionDesc:['Add an Inchling Bowl to Deck','Gain 25 Currency'],
                link:[1,2],
            },{
                desc:
`You find at least a few items still in usable condition.
But they're all too small for you, so there's not much you can really take.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:'You grab some coins on the ground and get on your way.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Graveyard',id:102,list:0,
        pages:[
            {
                desc:
`You've found one of the last intact graveyards on the planet.
At least the Management was kind enough not to demolish this one
like the rest. It's not a beautiful place, filled with broken pieces
of wood and a creeping greenish smoke. Clearly there's not much
left here, but you feel an odd peace in such a strange place.`,
                option:['Pay Respects','Steal'],
                optionDesc:['Add a Final Rest to Deck','Gain a Relic'],
                link:[1,2],
            },{
                desc:
`Spending some time there, you ultimately decide to leave.
You've got places to be... there's nothing to do here.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Given the state of destruction the area's in, nobody will notice
if you take what you find. Maybe the Management was right to
recquisition the rest... certainly that's impossible.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Cissni Peak',id:103,list:0,
        pages:[
            {
                desc:
`You have finally reached the top of Cissni Peak, a mountain
known for its unique shape that creates echoes from almost anywhere.
The mountain's been settled for a long time by now, there's amenities
there and everything. You could spent the night here in safety,
or you can go out and hear the echoing for yourself.`,
                option:['Go Outside','Sleep'],
                optionDesc:['Add a Mountain Echo to Deck','Heal 7 Health'],
                link:[1,2],
            },{
                desc:
`You go out during the night and are
mesmerized by the echoes around yourself.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Getting some sleep, you feel refreshed, but by the time you wake up,
there's already too much noise from others to hear anything.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Terminate the Tower',id:104,list:0,
        pages:[
            {
                desc:
`A massive Management watchtower stands before you,
bristling with weapons emplacements and guards. Not an easy task.
The rebels in the area have an assault plan ready, however.
Just before the assault begins, their commander brings you aside.
"A series of enemy outposts on the hill nearby have been detected.
If left alone, they threaten our forces. Optimally, it would be you
who takes those units out. It should just be a few snipers in a hole.
Nothing hard for you, right?"`,
                option:['Accept','Decline'],
                optionDesc:['Start Fight',''],
                link:[-2,-1],
            },
        ],
    },{
        name:'Friendly Duck',id:105,list:0,
        pages:[
            {
                desc:
`You find a duck wearing a bowler hat sitting on the side of
the road. He looks up at you as you arrive with excited eyes.
"I'm saved! You there, would you be so kind as to help an old
duck on his final journey? I ended up here on the way to a
critical meeting in the city of Septar. Bring me there!"
Little does he know, Septar is the capital of Executrix.
You're never going to get there, but he might be a useful ally.`,
                option:['Bring Him Along','Slap Him'],
                optionDesc:['Bowler Duck Will Join Your Team',''],
                link:[1,2],
            },{
                desc:`He gets up and follows you. Who knows how long he'll survive?`,
                option:['Go'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You slap him, sending him into the ground.
You continue on without him.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Fake Adventure',id:106,list:0,
        pages:[
            {
                desc:
`You come across a shrine some distance from the road.
It's empty and doesn't seem to get many visitors,
except for the maiden who notices you right away.
"Welcome to the shrine! You need an incident dealt with,
I presume. Where might it be?"
You respond that you're just here to visit.
She sounds a little disappointed.
"Well then, what are you here to do?"`,
                option:['Ask for Help','Ask For Directions','Nothing'],
                optionDesc:['Lose 25 Currency','Lose 25 Currency',''],
                link:[1,2,3],
            },{
                desc:
`"I'm a little busy right now with other incidents," she replies,
"but feel free to take something that might be useful."`,
                option:['Take Something'],
                optionDesc:['Choose a Hakurei Tool to Add to Deck'],
                link:[-1],
            },{
                desc:
`She explains some directions to you, but you haven't
heard of the places she's talking about.`,
                option:['Leave'],
                optionDesc:['Add Spring-Colored Path to Deck'],
                link:[-1],
            },{
                desc:'She shoots you an annoyed glance as you leave.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Target Practice',id:107,list:0,
        pages:[
            {
                desc:
`You walk into a carnival. Most of the games don't
interest you, but one stand offers "Target Practice"
against some distant objects. The entry fee is on the
cheap side, so maybe it's worth giving it a shot?`,
                option:['Give it a Try','Decline'],
                optionDesc:['Lose 5 Currency',''],
                link:[1,3],
            },{
                desc:`You hit the target! Your aim is a little better now.`,
                option:['Leave'],
                optionDesc:['Upgrade a Card'],
                link:[-1],
            },{
                desc:
`You miss the target.
The proprietor asks if you'd like another attempt.`,
                option:['Try Again','Decline'],
                optionDesc:['Lose 5 Currency',''],
                link:[1,3],
            },{
                desc:
`You decide it's not worth the money.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Broken Bridge',id:108,list:0,
        pages:[
            {
                desc:
`At a river crossing, you find the bridge destroyed.
Several other travelers are there, failing to make
a solution. Some are leaving to go find another
crossing further downriver.`,
                option:['Fix the Bridge','Find Another Crossing'],
                optionDesc:['Remove a Random Card',''],
                link:[1,2],
            },{
                desc:
`You manage to repair the crossing.
The others toss you a few coins as thanks.`,
                option:['Cross'],
                optionDesc:['Gain 35 Currency'],
                link:[-1],
            },{
                desc:`You reach the other crossing and cross successfully.`,
                option:['Cross'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Gaming',id:109,list:0,
        pages:[
            {
                desc:
`You come across an unfamiliar gathering of people.
It looks like they're sitting across from each other
at desks, each using a computer. Perhaps there's
something that's making them all so excited?`,
                option:['Enter','Run Away'],
                optionDesc:['Gain a Relic - Gaming Console, Become Cursed - Gamer',''],
                link:[1,2],
            },{
                desc:
`You leave hours later a changed person.
You might even see yourself returning there later.
You've learned some things... but at what cost?`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You get away from there as fast as possible.
Something about that place, it doesn't smell right.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'News Interview',id:110,list:0,
        pages:[
            {
                desc:
`As part of a rebel publicity stunt, a broadcaster
approaches you to ask for an interview.`,
                option:['Accept','Decline'],
                optionDesc:['',''],
                link:[1,3],
            },{
                desc:
`After some filler questions, he gets to the real one.
"Why are you doing this? What's your ultimate goal?"`,
                option:[`It's for the People!`,`It's for Money!`,`It's for Fun!`],
                optionDesc:['Add a Good News to Deck','Add a Bad News to Deck, Gain 200 Currency','Add Entertaining News to Deck'],
                link:[2,2,2],
            },{
                desc:
`Your answer is broadcasted to the world.
Who knows what they'll think?`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You decline the interview.
You prefer to remain out of the public eye.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'SCT Fighters',id:111,list:0,
        pages:[
            {
                desc:
`As you rest at a "hidden" rebel base, you and your
allies hear a distant noise that can only mean one thing.
The Management SCT Fighters arrive within seconds and fire
indiscriminantly. Several rebels head to the anti-aircraft
weaponry, but are killed by the first salvo. You manage to
dodge, as the fighters prepare for their second attack run.`,
                option:['Man the Guns','Get to Shelter'],
                optionDesc:['Lose 27 Health',''],
                link:[1,2],
            },{
                desc:
`Working with the other defenders, you manage to shoot
down a few SCT Fighters and convince the others to retreat.
The rebels have taken some casualties as well, but your
injuries aren't too bad. With the sky empty, your eyes
return to the landscape before you, dotted with
bodies and the remnants of destroyed fighters.`,
                option:['Take the Parts'],
                optionDesc:['Gain a Relic - SCT Parts'],
                link:[-1],
            },{
                desc:
`Getting deep underground, you and the other survivors
successfully wait out the attacks until the fighters
run out of ammunition and withdraw. But it looks
like a lot of rebels didn't make it out alive...`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Item Shop',id:112,list:0,
        pages:[
            {
                desc:
`You see a small shop on the side of the road,
looks like a store for old tools and equipment.
Maybe it's worth checking out what it has in stock?`,
                option:['Consider Buying','Get Out'],
                optionDesc:['',''],
                link:[-2,1],
            },{
                desc:`You `,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:`Smith's Forge`,id:113,list:0,
        pages:[
            {
                desc:
`You find a still-manned forge where a Smith works,
repairing some older weapons. When you arrive, he asks
if you'd like his services in improving your tools.`,
                option:['Purchase Upgrades','Decline'],
                optionDesc:['Lose 125 Currency, Deluxe Upgrade a Card',''],
                link:[1,2],
            },{
                desc:
`He gets to work and returns your reforged items later.
They look at least a little shinier and higher quality.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You'd rather not pay his hefty prices.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Waste Dump',id:114,list:0,
        pages:[
            {
                desc:
`Arriving at a local waste plant, you're given the
opportunity to try it out, or maybe to buy some of
their equipment. You don't have much use for waste
disposal equipment, but those items may have some
value in the short-term if you have lots of trash.`,
                option:['Throw Something Away','Buy a Trash Can','Buy a Dumpster','Decline'],
                optionDesc:['','Lose 150 Currency','Lose 375 Currency',''],
                link:[1,2,3,4],
            },{
                desc:
`You throw something onto the assembly line and
watch as it is chewed up by the machine, with its
remnants desposited into the plant's many reservoirs.`,
                option:['Leave'],
                optionDesc:['Remove a Card'],
                link:[-1],
            },{
                desc:
`With a trash can in tow, you're able to dispose
of a lot of your old items, freeing up some space
and lightening your load. But you have to return
the trash can - you can't afford their long-term
waste disposal plans.`,
                option:['Leave'],
                optionDesc:['Remove 2 Cards'],
                link:[-1],
            },{
                desc:
`The dumpster you purchased is too heavy for you to move,
but you're able to fill it with trash to your heart's content.`,
                option:['Leave'],
                optionDesc:['Remove 3 Cards'],
                link:[-1],
            },{
                desc:`You'd rather just leave this strange place.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Rooftop Chase',id:115,list:0,
        pages:[
            {
                desc:
`As you chase a target across the rooftops, you suddenly
lose your grip and begin falling towards the ground.`,
                option:['Fall Through a Window','Attempt a Three-Point Landing','Hit the Ground'],
                optionDesc:['','Lose 15 Health','Lose 5 Health'],
                link:[1,2,3],
            },{
                desc:
`You manage to get inside the nearby building,
but the speed of the fall makes you dizzy.`,
                option:['Escape'],
                optionDesc:['Add a Random Card'],
                link:[-1],
            },{
                desc:'You look great, but injure your leg.',
                option:['Get up'],
                optionDesc:['Remove a Card'],
                link:[-1],
            },{
                desc:'You hit the ground hard.',
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Canyon',id:116,list:0,
        pages:[
            {
                desc:
`Navigating through a narrow canyon with little space
to maneuver, you suddenly spot a squad of Management
troops ahead of you. Because of the little space, this
isn't exactly the best battleground to be facing them.`,
                option:['Fight Them','Escape'],
                optionDesc:['Start Fight',''],
                link:[-2,1],
            },{
                desc:
`You escape just barely, with the Management
forces unable to catch you in the terrain.`,
                option:['Escape'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The Negotiator',id:117,list:0,
        pages:[
            {
                desc:
`You receive news that a rebel negotiator has been
ambushed on the way to meet with their Management
counterpart, not by the Management, but by gangsters.
The rebels promise a nice paycheck if you save him,
but even if he dies, this is a good opportunity
to take out some gangster threats.`,
                option:['Take the Mission','Decline'],
                optionDesc:['Start Fight',''],
                link:[-2,1],
            },{
                desc:
`It's too dangerous a job for you.
Those gangster assassins are no joke.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:`Ducky's Chocolate Experience`,id:118,list:0,
        pages:[
            {
                desc:
`You see two ducks, each dressed in strange cothing,
having an argument. Each claims he came up with some
idea first, about a chocolate experience.`,
                option:['Help Ducky Donka','Help Ducky McDuff',`Don't`],
                optionDesc:['Start Fight, Gain a Relic - Ducky Donka Ticket','Start Fight, Gain a Relic - Ducky McDuff Ticket',''],
                link:[-2,-2,1],
            },{
                desc:
`You choose not to take a side in so frivolous
a dispute as the one the ducks are having.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Prison Informant',id:119,list:0,
        pages:[
            {
                desc:
`The prisoner gang has been acting up recently,
you're informed, but there's some good news -
one prisoner with some valuable intel is thinking
about defecting and could join your side.
The rebels tell you the plan - you'll kill the other
prisoners while leaving him alive, so he has every
chance he can get to switch sides. It's unlikely
he'll defect until the others are all defeated,
however, so you'll have to deal with all of them.`,
                option:['Take the Mission','Decline'],
                optionDesc:['Start Fight',''],
                link:[-2,1],
            },{
                desc:
`You decide against it, thinking that it's a trap.
The informant isn't confirmed to be real, after all.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Security Detail',id:120,list:0,
        pages:[
            {
                desc:
`You're offered some extra work protecting a local
rebel-friendly politician as he makes a speech.`,
                option:['Accept','Decline'],
                optionDesc:['Gain 100 Currency',''],
                link:[1,3],
            },{
                desc:`It's easy money, an uneventful day.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`The Management launches a strike and you escort the
politican to safety, but get shot in the process.`,
                option:['Ouch'],
                optionDesc:['Lose 18 Health'],
                link:[-1],
            },{
                desc:
`You know the Management is probably planning something.
Taking the job is too risky.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Mount Hinokizuka',id:121,list:0,
        pages:[
            {
                desc:
`At the base of Mt. Hinokizuka, you see a girl preparing
for the climb. You'd never make it up the mountain yourself,
so you doubt how somebody like her could do it.`,
                option:['Wish Her Luck','Sell Her Equipment','Leave'],
                optionDesc:['','Lose a Random Colorless Card, Gain 300 Currency',''],
                link:[1,2,3],
            },{
                desc:
`She thanks you and hands you a little trinket.
"I have a bunch of these, and there's no use in carrying
them up the mountain, so... I guess you can have one."`,
                option:['Take it'],
                optionDesc:['Gain a Relic - Asagian Charm'],
                link:[-1],
            },{
                desc:
`Giving her some of your equipment, she gives you some money in return.
"There's no reason to carry all this up the mountain...
Guess I'll spend it all while I'm down here!"`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You pass by, leaving her to her task.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Rice Farm',id:122,list:0,
        pages:[
            {
                desc:
`Off the road, you run into a rice farm. It looks like any
other farm, but just on the road, a girl sits in a wooden stall
surrounded by bags of rice. She calls you over as you arrive.
"Would you like some rice?" she says with a smile.`,
                option:['Buy Some Rice','Buy a Meal','Decline'],
                optionDesc:['Lose 50 Currency, Gain a Relic - Rice Grains','Lose 50 Currency, Heal to Full',''],
                link:[1,2,3],
            },{
                desc:
`You take a bag of rice with you for future use.
Cooking rice is easy, right?`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`It's a nice meal, even though it's mostly just rice.
You can tell how much manual labor goes into making it, though.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`She's cute, but you don't need rice now.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Awful Tower',id:123,list:0,
        pages:[
            {
                desc:
`You run into an "attraction" - a multicolored, segmented
building labeled "Awful Tower". The appearance certainly
doesn't suggest a good time, but you look inside anyway.
Apparently, it's a parkour game with rewards within.`,
                option:['Try it','Decline'],
                optionDesc:['',''],
                link:[1,4],
            },{
                desc:
`It's time to begin your climb of Awful Tower.
Looks a little risky...`,
                option:['Begin','Back Away'],
                optionDesc:['',''],
                link:[2,4],
            },{
                desc:
`Continue your climb?`,
                option:['Continue','Stop'],
                optionDesc:['',''],
                link:[3,4],
            },{
                desc:
`Continue your climb?`,
                option:['Continue','Stop'],
                optionDesc:['',''],
                link:[2,4],
            },{
                desc:
`You leave the "attraction" a little disappointed.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Spring is Here!',id:124,list:0,
        pages:[
            {
                desc:
`You start to notice the ground changing. The snow is melting.
Or at least in the mountains it is. The season here aren't that pronounced.
Still, though spring is on its way. But this year, you notice the
Fairy of Spring appear before you.
"Is it time for me to announce spring's arrival?" she asks.
Or would you prefer a little more winter so the other
fairy can do all the work?`,
                option:['Announce Spring','Stay in Winter'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`"Alright!" she says. She heads off towards anybody
she can find, repeating that "Spring is Here!"`,
                option:[`It's Spring`],
                optionDesc:['Add a 1 Cost Card, it Costs 0'],
                link:[-1],
            },{
                desc:
`"Sure!" she says, disappearing.
You wish the Fairy of Winter would actually do something...`,
                option:[`It's Winter`],
                optionDesc:['Upgrade a Card'],
                link:[-1],
            },
        ],
    },{
        name:'Fireflies',id:125,list:0,
        pages:[
            {
                desc:
`In the midst of a clearing in the darkened night forest,
you spot a cloud of fireflies buzzing around seemingly nothing.
They don't notice as you approach their position.`,
                option:['Collect One','Watch Them','Eat Them'],
                optionDesc:['Gain a Relic - Bottled Firefly','Add a Rare Card','Gain 5 Max HP'],
                link:[1,2,3],
            },{
                desc:
`With a swift hand you pinch one and place it in a bottle.
With some training and some luck it could become loyal to you.
Only one way to find out...`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You watch them buzz throughout the night, until they eventaully scatter.
It wasn't much, but for some reason, you feel englightened.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You manage to grab a few before the rest scatter.
They're surprisingly tasty.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Weapon Enlargement',id:126,list:0,
        pages:[
            {
                desc:
`A traveling metalworker offers you an interesting proposition:
with a little extra metal and some reforging, he could make a
weapon far more effective. It'll be heavier, though.`,
                option:['Accept','Decline'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`He asks you what weapon you'd like to "improve".`,
                option:['Give it'],
                optionDesc:['Double an Attack`s Effect, but Double its Cost'],
                link:[-1],
            },{
                desc:'You decline his services.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Goddess of Poverty',id:127,list:0,
        pages:[
            {
                desc:
`In the midst of the darkness, a purple glow surrounds you,
and the Spectre of Poverty appears before you, with an accursed smile.
It's said that she rarely appears to people, but when she does,
it never ends well for them.
"Well, well, well..." she begins. "Are you poor?"`,
                option:[`I'm Poor!`,`I'm not Poor!`],
                optionDesc:['Lose All Currency','Become Cursed - Buy Safety'],
                link:[1,2],
            },{
                desc:
`You feel the coins you have collected being drained,
disappearing into invisible voids, as she laughs, the purple glow
becomeing stronger as it blocks out everything else around.
"Yes... you are poor."`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`She smiles and says something unintelligible as you feel
the coins you have collected becoming increasingly heavy.
"Continue your fantasies," she says. "You'll wish you were poor!"`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Coffee Shop',id:128,list:0,
        pages:[
            {
                desc:
`You enter a small coffee shop, filled with a few people
enjoying their breakfasts. Perhaps you could order something.`,
                option:['Buy Coffee','Buy a Scone','Buy Nothing'],
                optionDesc:['Lose 20 Currency','Lose 25 Currency',''],
                link:[1,2,3],
            },{
                desc:
`You get handed your cup of coffee.
It looks a little better than what you're used to.`,
                option:['Take it'],
                optionDesc:['Gain an Item - Quality Coffee'],
                link:[-1],
            },{
                desc:'You get handed your scone. It looks pretty decent.',
                option:['Eat it'],
                optionDesc:['Gain 3 Max HP'],
                link:[-1],
            },{
                desc:`You don't feel like having anything.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Fairy of Sunlight',id:129,list:-1,
        pages:[
            {
                desc:
`On a particularly sunny day, the rays of light suddenly
seem to focus inward onto you. As you blink, stunned,
the light dissipates, revealing a laughing, smirking fairy.
It looks like she's charging up an even larger beam of light...`,
                option:['Collect Sunlight','Absorb Sunlight','Deflect Sunlight'],
                optionDesc:['Lose 12 Max Health','Become Cursed - Direct Sunlight','Lose 8 Health'],
                link:[1,2,3],
            },{
                desc:
`Using all your power, you manage to collect some of the sunlight
within you, despite feeling your body melting around you as it happens.
When it's all over, the fairy remains there, impressed by your ability.
"You're good with this stuff! Wanna be a team?"`,
                option:['Accept','Decline'],
                optionDesc:['Add Sunny, Glowing Sunlight (Ally Card) to Deck',''],
                link:[4,5],
            },{
                desc:
`Allowing the sunlight to become part of you, you feel strengthened.
But it also feels as if the sunlight is still there within...`,
                option:['Leave'],
                optionDesc:['Deluxe Upgrade 2 Cards'],
                link:[-1],
            },{
                desc:
`You manage to block as much of the sunlight as you can,
but you still get burned a little, though you can also feel
some of the power now coursing through you.
By the time you open your eyes again, the fairy is long gone.`,
                option:['Leave'],
                optionDesc:['Upgrade 2 Cards'],
                link:[-1],
            },{
                desc:
`She begins following you around. Maybe she's not the most
reliable companion, but she's proven her power at the very least.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`After that "prank", you're never gonna work with her.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Gated Temple',id:130,list:0,
        pages:[
            {
                desc:
`You see an abandoned temple. Within, a book is
opened on a pedestal, flipped to a random page.
You arrive. It's about an abandoned
Management project, known as Project Duality.`,
                option:['Read','Stop'],
                optionDesc:['Lose 2 Health',''],
                link:[2,1],
            },{
                desc:`You resist the urge to read and put down the book.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Project Duality was engineered as a counterpart to Project Godhood.
While Project Godhood was about unlocking the source of life, Project
Duality was about creating a device that could shift cosmic objects.
This had already been accomplished using massive attachable engine
rings, but the goal of Project Duality was to move objects from
a distance such that it could move stars or even black holes.`,
                option:['Read','Stop'],
                optionDesc:['Lose 4 Health',''],
                link:[3,1],
            },{
                desc:
`Project Duality went off to a bad start, with engineering faults
and incompetent leadership delaying the beginning of construction.
Three Directors were removed from the Project as delays mounted,
and costs were far overbudget. Ultimately, only the timely intervention
of the Admiral-Manager himself could save the plan, but even he
thought it wasn't worth the expenditures.`,
                option:['Read','Stop'],
                optionDesc:['Lose 8 Health',''],
                link:[4,1],
            },{
                desc:
`The ultimate device, named the Diploid, was completed after
6 years of construction, and used to rearrange stellar objects
to the Management's desires, but only for a few decades before
it was infiltrated by rebel operatives. The fatal weakness of
the Diploid was its weak manpower commitment, resulting in a
frail defense that collapsed quickly, with the rebels managing
to enter the control rooms and disable the device entirely.
It was never repaired. The Admiral-Manager fired those involved
and advised his successors never to repeat their mistakes.`,
                option:['Take','Stop'],
                optionDesc:['Lose 18 Health',''],
                link:[5,1],
            },{
                desc:
`Finishing the chapter, you keep the book.`,
                option:['Keep it'],
                optionDesc:['Gain a Relic - Managerial History'],
                link:[-1],
            },
        ],
    },{
        name:'Maelstrom',id:131,list:0,
        pages:[
            {
                desc:
`In the center of a field, the clouds suddenly rush into
position above, and a torrent of rain begins, along with wind.
The planet's weather is normally very mild, but it's often
said that sometimes, it can become very poor indeed.`,
                option:['Embrace','Channel','Hide'],
                optionDesc:['Add Maelstrom to Deck, Lose 15 Health','Remove 2 Cards, Add Any 2 Random Cards to Deck',''],
                link:[1,2,3],
            },{
                desc:
`You allow the wind to surround you, absorbing its strength.
It dissipates after a few moments, having completed its task.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Your mind becomes gradually absorbed into the weather,
only being freed as it passes.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Getting to nearby shelter, you watch the weather pass by.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Paper Ball Shop',id:132,list:0,
        pages:[
            {
                desc:
`You enter a shop that sells "Paper Balls".
They don't look like they have much value,
but they're collectors' items, apparently.
Maybe it's worth buying one?`,
                option:['Buy a Paper Ball','Buy a Deluxe Paper Ball','Decline'],
                optionDesc:['Lose 25 Currency','Lose 100 Currency',''],
                link:[1,2,3],
            },{
                desc:
`You're handed a paper ball. It's slightly shiny
and might prove to be useful later on.`,
                option:['Take it'],
                optionDesc:['Add a Paper Ball to Deck'],
                link:[-1],
            },{
                desc:
`You get your paper ball, very shiny but quite
fragile as well. Maybe it'll be useful.`,
                option:['Take it'],
                optionDesc:['Add a Deluxe Paper Ball to Deck'],
                link:[-1],
            },{
                desc:`You're not going to buy something so obviously useless.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Counterfeiter',id:133,list:0,
        pages:[
            {
                desc:
`A counterfeiter offers his services for a cheap price.
He claims to be capable of duplicating anything with the right materials,
but his shop is looking a little shady.`,
                option:['Accept','Decline'],
                optionDesc:['Lose 25 Currency',''],
                link:[1,2],
            },{
                desc:`He takes your object and promises to return a "copy".`,
                option:['Leave'],
                optionDesc:['Duplicate a Card, the Copy Costs 1 More'],
                link:[-1],
            },{
                desc:`With something as shady as this, you decide not to take the offer.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'The Traitor',id:134,list:0,
        pages:[
            {
                desc:
`Rebel command approaches you with bad news:
according to their sources, a former friend is
looking to switch sides and is planning to meet
with Management officers. The rebels need your help
in dealing with this threat and offer a good reward.`,
                option:['Take the Mission','Decline'],
                optionDesc:['Gain 200 Currency, Start Fight',''],
                link:[-2,1],
            },{
                desc:
`It sounds like a Management plot to get you to turn
against your allies. Better let the rebels investigate
it more before you make any premature decisions.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Defense Enlargement',id:135,list:0,
        pages:[
            {
                desc:
`At a rebel base, one engineer approaches you with an idea.
He's been experimenting with larger versions of defense tools,
and is interested in testing his techniques on one of yours.`,
                option:['Accept','Decline'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`He asks for a test item.`,
                option:['Give it'],
                optionDesc:['Double a Defense`s Effect, but Double its Cost'],
                link:[-1],
            },{
                desc:`You don't trust this guy.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Netherworld Party',id:136,list:0,
        pages:[
            {
                desc:
`As you pass through a seemingly empty forest,
you find a glowing pinkish portal. Peering through, you
spot a unique sight - ghosts and phantoms, unlike the ones
you're use to as they take forms similar to humans, abound
and celebrate what looks to be the birthday of their ruler,
as she's sitting in the center and talking loudly.
You're probably not welcome, but while they're all distracted
you might be able to steal something through the portal...`,
                option:['Grab Something',`It's Too Risky`],
                optionDesc:['',''],
                link:[1,5],
            },{
                desc:
`You manage to grab a spirit within your hands.
When you secure it in a bottle, it appears to be a bunch
of butterflies hovering around a central spirit flame.
They don't have any physical presence, but you're certain
you'll be able to use them for something.`,
                option:['Keep it'],
                optionDesc:['Gain a Relic - Death Butterflies'],
                link:[-1],
            },{
                desc:
`You manage to grab a sword through the portal without them noticing.
Unfortunately it's a ghost sword and can't slice physical objects,
but you might still be able to use it for something.`,
                option:['Keep it'],
                optionDesc:['Gain a Relic - Ghostblade'],
                link:[-1],
            },{
                desc:
`You fail to grab anything, but a few of the
ghostly lights seem to absort themselves into your hands,
granting you a tiny bit of their power.`,
                option:['Keep it'],
                optionDesc:['Add Temptation of the Next World to Deck'],
                link:[-1],
            },{
                desc:
`As you reach a hand through the portal, you're immediately noticed.
You manage to pull your hand back just in time, and the phantoms
are unable to pass through the portal, securing your safety.
Your hand's a little burnt though.`,
                option:['Leave'],
                optionDesc:['Lose 5 Health'],
                link:[-1],
            },{
                desc:
`You decide that intervening in such a place is risky.
Besides, ghost objects aren't useful in the real world, right?`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Laser Defense Grid',id:137,list:0,
        pages:[
            {
                desc:
`You find the vault you're attempting to breach is guarded
by a series of lasers. It looks like it might be possible to
get through, but there's probably another way.`,
                option:['Sneak Through','Mess with the Electricity','Punch the Wall'],
                optionDesc:['','','Lose 10 Health'],
                link:[1,3,5],
            },{
                desc:
`You manage to get between the lasers successfully
and take the vault's contents.`,
                option:['Take it'],
                optionDesc:['Gain 150 Currency'],
                link:[-1],
            },{
                desc:
`Despite your best attempts, you trip one of the lasers.
You're lucky to escape mostly intact.`,
                option:['Leave'],
                optionDesc:['Lose 10 Health'],
                link:[-1],
            },{
                desc:`Disabling the lasers, you collect the vault's contents.`,
                option:['Take it'],
                optionDesc:['Gain 150 Currency'],
                link:[-1],
            },{
                desc:
`You spend an hour moving around wires, but to no luck.
When the alarms go off, you're forced to make your escape.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Your hand hurts, but you disabled the security at least.
You can go ahead and take what's in the vault.`,
                option:['Take it'],
                optionDesc:['Gain 150 Currency'],
                link:[-1],
            },
        ],
    },{
        name:'Tape',id:138,list:0,
        pages:[
            {
                desc:
`You find a roll of unique tape on the ground.
Maybe you could use it for something.`,
                option:['Combine 2 Cards','Leave'],
                optionDesc:['Choose 2 Cards, When you Draw One, Draw the Other',''],
                link:[-1,1],
            },{
                desc:`You don't need that stuff.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Relic Collector',id:139,list:0,
        pages:[
            {
                desc:
`A collector of rare relics approaches you.
"I can take possession of something you don't need,
for a good price," he offers.`,
                option:['Sell','Sell','Decline'],
                optionDesc:['','',''],
                link:[1,1,2],
            },{
                desc:`You give him the item and he pays you well.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You want to keep your relics.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Card Collector',id:140,list:0,
        pages:[
            {
                desc:
`A duck approaches you, several valuable-looking
cards in his hand. He offers to trade.`,
                option:['Trade a Card','Pay Him','Decline'],
                optionDesc:['','Lose 150 Currency, Add a Rare Card',''],
                link:[1,2,3],
            },{
                desc:
`He takes your card, and you take a look at his wares.
You can take one card of your choice.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`He takes your money, and you take a look at his wares.
You can take one card of your choice.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You don't want his cards.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Hotel Room',id:141,list:0,
        pages:[
            {
                desc:
`You check into your hotel room, but something seems off.`,
                option:['Sweep for Bugs',`Don't Worry About it`],
                optionDesc:['Lose 50 Currency',''],
                link:[1,2],
            },{
                desc:
`You spend several hours taking apart every object in the room.
Eventually you find the bug.`,
                option:['Destroy the Bug'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You're not worried about potential threats in the room.
You just want to have some time to relax.`,
                option:['Sleep'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`A few hours later, you hear a strange beeping sound.
It sounds like a bomb or something, that's all you can figure out.
You make your escape, but without the time to bring things with you.`,
                option:['Escape'],
                optionDesc:['Lose 200 Currency'],
                link:[-1],
            },
        ],
    },{
        name:'Gangster Informant',id:142,list:0,
        pages:[
            {
                desc:
`Some interesting news comes in: there's a gang war
going on in the city. One of the highest-ranking
lieutenants in the gang has contacted the rebels,
and he wants out - and is willing to hand over access
to some of the gangster weapons arsenals.
If you successfully kill the other gangsters,
he'll give it up. You're promised some quick cash
if you take go in to make the deal go smoothly.`,
                option:['Take the Mission','Decline'],
                optionDesc:['Start Fight',''],
                link:[-2,1],
            },{
                desc:
`If this high-rank gangster wants out,
he can do it himself.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Management Informant',id:143,list:0,
        pages:[
            {
                desc:
`Due to recent changes in Management command structure
in the local area, it looks like a member of the
Management military is looking to defect and share secrets.
Once you kill the other Management soldiers there,
the informant is ready to switch sides.`,
                option:['Take the Mission','Decline'],
                optionDesc:['Start Fight',''],
                link:[-2,1],
            },{
                desc:
`The Management would set up a trap like this.
You're not risking yourself for some random guy.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Broken Elevator',id:144,list:0,
        pages:[
            {
                desc:
`The elevator up the building suddenly stops,
but it doesn't seem to be falling, just stuck.
You hear some noise from outside, maybe the enemy
managed to stop your elevator to attack you?`,
                option:['Open the Door','Crawl Out'],
                optionDesc:['','Lose 4 Health'],
                link:[1,2],
            },{
                desc:
`When you open the door, the thugs pour in.
There's not much space to maneuver, so your
only choice is to take them out.`,
                option:['Battle Them'],
                optionDesc:['Start Fight'],
                link:[-2],
            },{
                desc:`You manage to escape, with a few scratches.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Prison Walkway',id:145,list:0,
        pages:[
            {
                desc:
`On your way to take down a high-value target,
you're faced with having to cross over a walkway
in the center of the cell area to avoid other routes
with far more guards. However, the walkway looks like
a good place for the enemy to set up an ambush.`,
                option:['Cross Through','Escape'],
                optionDesc:['Gain 100 Currency',''],
                link:[1,2],
            },{
                desc:
`In the center intersection of the walkway,
four guards, one from each direction, appear,
each holding a shotgun. You're trapped.`,
                option:['Fight Your Way Out'],
                optionDesc:['Start Fight'],
                link:[-2],
            },{
                desc:
`Finding no safe route to pursue the target,
you make a clean getaway out of the prison.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Prison Van',id:146,list:0,
        pages:[
            {
                desc:
`Having been ambushed, you now reside within a
prison van, cuffed, and with one of the guards
bringing you on your way to incarceration.`,
                option:['Try to Break Free','Bribe'],
                optionDesc:['Start Fight','Lose 50 Currency'],
                link:[-2,1],
            },{
                desc:
`Taking the bribe, he lets you escape.
You're grateful to not have to deal with a prison sentence.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Sharks',id:147,list:0,
        pages:[
            {
                desc:
`You're aboard a boat, on your way to scout out a
Management outpost on an island, but the boat
is suddenly surrounded by number of sharks.`,
                option:['Jump Out and Swim','Punch a Shark'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`You manage to swim faster than them and escape.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Your display of dominance doesn't impress the sharks.
You escape, but barely.`,
                option:['Ouch'],
                optionDesc:['Lose 11 Health'],
                link:[-1],
            },{
                desc:
`You punch a shark, and it... explodes?
The rest scatter, and you bring the boat
safely to the Management outpost.`,
                option:['Leave'],
                optionDesc:['Gain a Relic'],
                link:[-1],
            },
        ],
    },{
        name:'Tax Collector',id:148,list:0,
        pages:[
            {
                desc:
`The collectors have finally caught up to you.
You find a stack of paperwork waiting, for your taxes.`,
                option:['Pay Taxes','Evade Taxes','Declare Bankruptcy'],
                optionDesc:['Lose 100 Currency','Remove 3 Random Cards','Lose 20 Currency, Lose 10 Health'],
                link:[1,2,3],
            },{
                desc:`You begrudgingly pay your taxes.`,
                option:['Pay Up'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You manage to fake your way around paying.`,
                option:[`Don't Pay Up`],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You fake some bankruptcy papers.`,
                option:['Pay Up'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Court',id:149,list:0,
        pages:[
            {
                desc:
`For several crimes, you're sent to court.
Before being tried, you're offered a chance to
hire a lawyer from several options.`,
                option:['Hire Meters Bladeworth','Hire Stucken Pained','Defend Yourself'],
                optionDesc:['Lose 250 Currency','Lose 100 Currency',''],
                link:[1,2,3],
            },{
                desc:
`The lawyer you hire successfully defends your innocence.
You're let off without any punishment at all, but it
looks like he's giving you quite the bill.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`The lawyer you hire panics, and it's looking bad for you.
At the very least, however, he gets your crime commuted.
Still, it looks like you'll receive some punishment.`,
                option:['Leave'],
                optionDesc:['Lose 20 Health'],
                link:[-1],
            },{
                desc:
`Your attempt to defend yourself goes poorly fast.
You're found guilty on all charges.`,
                option:['Leave'],
                optionDesc:['Become Cursed - B-B-Busted'],
                link:[-1],
            },
        ],
    },{
        name:'Vending Machine',id:150,list:0,
        pages:[
            {
                desc:
`You find a vending machine in the station you're waiting at.
Seeing nobody around, you push it over, causing the contents
to spill you. The sound of it crashing, however, alerts
some nearby guards and you can hear them approaching.
There's just enough time to grab something.`,
                option:['Grab Something','Grab Something','Grab Something'],
                optionDesc:['Open a Standard Pack','Open a Colorless Pack','Open a Prism Pack'],
                link:[-1,-1,-1],
            },
        ],
    },{
        name:'Podbuilder',id:151,list:0,
        pages:[
            {
                desc:
`You come across a duck who claims to be the "famous"
inventor Destir Duckiz, and he offers to sell you a new
weapon he's been developing, custom-made as well.`,
                option:[`See What He's Offering`,'Decline'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`You get what you pay for.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You're not interested in this hack.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Fake News',id:152,list:0,
        pages:[
            {
                desc:
`You find a stack of newspapers discarded on the ground.
Confused as to why anybody would throw them away, you pick
up the stack, opening one to find a wealth of - fake news.`,
                option:['Read Article','Read Article','Throw it Away'],
                optionDesc:['Add a Rare Card From 3 Choices','Add an Uncommon Card From 12 Choices',''],
                link:[1,1,2],
            },{
                desc:
`You read the article, learning some half-truths.
Nothing much you'll remember, though.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You couldn't care less for such fabrications.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Against the Machine',id:153,list:0,
        pages:[
            {
                desc:
`At one Management laboratory you successfully infiltrate,
you find an entry way toward the interior of a machine.
You can't understand the instructions nearby, but you could
still take a look inside, what can go wrong?`,
                option:['Explore the Inside','Steal Something','Run'],
                optionDesc:['Lose 33 Health','Lose 13 Health',''],
                link:[1,2,3],
            },{
                desc:
`You search around the machinery for some time, finding little.
But, something seems to change within you as you wander...
You eventually make it out, having no idea how long you were in for.`,
                option:['Escape'],
                optionDesc:['Upgrade and Duplicate a Card'],
                link:[-1],
            },{
                desc:
`Spending some time inside the machine, you grab the first
thing that looks valuable and make your escape. You get lost on
the way out, though, and it's been some time before you're free.`,
                option:['Escape'],
                optionDesc:['Transform and Upgrade a Card'],
                link:[-1],
            },{
                desc:`You're not going to mess with that thing.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Rebottler',id:154,list:0,
        pages:[
            {
                desc:
`Stopping for a break, you run into a duck carrying
all sorts of items and potions. He reveals his allegiance with
the rebellion, and offers to sell you something or just
to refill your bags for free.`,
                option:['Make a Purchase','Get a Refill'],
                optionDesc:['Lose 40 Currency, Gain an Item Slot','Fill All Item Slots'],
                link:[1,2],
            },{
                desc:`You buy some extra storage space for a decent price.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`He dumps some items into your bag.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'An Unlikely Ally',id:155,list:0,
        pages:[
            {
                desc:
`Walking through the rebel camp, you come across an
interesting character, $c. Maybe you could spend some
time training alongside them?`,
                option:['Observe Their Strikes','Observe Their Guard','Observe Their Movements'],
                optionDesc:['Add an Attack','Add a Defense','Add a Movement'],
                link:[1,1,1],
            },{
                desc:
`You spend time observing their abilities, maybe
learning a few tricks from what they're able to do.
After a few hours, you decide to part ways.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Prententious Designer',id:156,list:0,
        pages:[
            {
                desc:
`You find an expensive-looking, stylish shop on a
corner and take a look inside. The owner is well-dressed
and has a fancy haircut, and offers his services.
"I only work with the best!" he says.`,
                option:['Remaster','Remake'],
                optionDesc:['Remove an Upgraded Card','Transform an Upgraded Card'],
                link:[1,1],
            },{
                desc:
`"Now that's what I like to see, real quality stuff!"
he says and finishes your service. This being your first
visit to the shop, it's on the house.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Placeholder Event',id:157,list:-1,
        pages:[
            {
                desc:`Stuff happens.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Fairy of Starlight',id:158,list:-1,
        pages:[
            {
                desc:
`During a particularly clear night outside, you hear a noise
from somewhere in the forest. Suddenly, a fairy appears, laughs,
and flies off into the tangled trees and vines.
The stars above you seem to glow brighter, as if beckoning
you to enter the forest. You might just be seeing things...`,
                option:['Chase Her','Stare at the Stars','Stand There'],
                optionDesc:['Lose 12 Max Health','Become Cursed - Starry Glare','Lose 8 Health'],
                link:[1,2,3],
            },{
                desc:
`After what seems to be hours of pursuing her, she
finally tires out, giving you a chance to catch up.
"Got you there!" she says. "You're pretty strong though,
I give you that. Want to be a team?"`,
                option:['Accept','Decline'],
                optionDesc:['Add Star, Showering Starlight (Ally Card) to Deck',''],
                link:[4,5],
            },{
                desc:
`You could've been standing there for just a few minutes,
or maybe it was multiple hours of staring.
Regardless, you finally snap out of it, drained.`,
                option:['Leave'],
                optionDesc:['Transform 3 Cards'],
                link:[-1],
            },{
                desc:
`The glow from above becomes unbearable, but
you refuse to look up or pursue her into the trees.
You hope this nightmare will end soon, and it does,
with everything seemingly returning to normal.`,
                option:['Leave'],
                optionDesc:['Transform a Card'],
                link:[-1],
            },{
                desc:
`She begins following you around. You'll get to used
to having her as an ally eventually.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You don't need her slowing you down.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Short Stay',id:159,list:0,
        pages:[
            {
                desc:
`With only a few hours to stay in town, your time is limited.
Your options, however, seem to be numerous.`,
                option:['Relax','Go Shopping','Explore'],
                optionDesc:['Encounter a Rest Site','Encounter an Shop','Enter a Random Event'],
                link:[-2,-2,-2],
            },
        ],
    },{
        name:'Scrap Ooze',id:160,list:0,
        pages:[
            {
                desc:
`You find a blob of slime that has clearly absorbed far too much
scrap for its own good. It simply lies there, full of stuff.
It looks like there's a few shiny things stuck in the slime,
but also a lot of pain....`,
                option:['Reach in','Leave'],
                optionDesc:['Lose 5 Health',''],
                link:[1,3],
            },{
                desc:`You manage to pull something useful out.`,
                option:['Take it'],
                optionDesc:['Gain a Relic'],
                link:[-1],
            },{
                desc:`You reach in, but find nothing of value.`,
                option:['Try Again','Leave'],
                optionDesc:['Lose 5 Health',''],
                link:[1,3],
            },{
                desc:`You're not gonna risk it.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Collateral Damage',id:161,list:0,
        pages:[
            {
                desc:
`You are tasked with destroying a local Management office,
but find the building to be in the center of a residential
area. There might be some civilians around.`,
                option:['Send Bomb Threats','Use a Weaker Bomb','Ignore the Civilians','Cancel the Plan'],
                optionDesc:['','','',''],
                link:[1,3,4,5],
            },{
                desc:
`Your bomb threats successfully scare off most of the
civilians, and the rest of the plan goes off without a hitch.`,
                option:['Success'],
                optionDesc:['Gain 500 Currency'],
                link:[-1],
            },{
                desc:
`The Management is notified about the threats and
several soldiers ambush you. You barely make it out.`,
                option:['Failure'],
                optionDesc:['Lose 10 Health'],
                link:[-1],
            },{
                desc:
`The smaller bomb doesn't do much damage, but there
are no casualties among the civilians.`,
                option:['Success'],
                optionDesc:['Gain 100 Currency'],
                link:[-1],
            },{
                desc:
`Ignoring the civilians, you successfully carry out the bombing.
But still, you do feel some guilt for how many of them were hurt.`,
                option:['Success'],
                optionDesc:['Gain 500 Currency, Become Cursed - Guilt'],
                link:[-1],
            },{
                desc:`You abandon the plan.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Underground Vault',id:162,list:0,
        pages:[
            {
                desc:
`You reach the Management vault underground.
There's no lock on the door, only a sign that says,
"DO NOT ENTER!"
"THERE ARE NO OBJECTS OF VALUE WTIHIN!"`,
                option:['Destroy the Entrance','Enter the Vault'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`You destroy the entrance, sealing the vault off.
You'll never know what was inside, but your mission's complete.`,
                option:['Leave'],
                optionDesc:['Gain 100 Currency'],
                link:[-1],
            },{
                desc:
`Curiosity gets the better of you and you enter
the vault. Within, you find rows upon rows of barrels,
each labelled with "Nuclear Waste".
You don't feel so good...`,
                option:['Take Nuclear Waste','Run'],
                optionDesc:['Lose 5 Max HP','Lose 1 Max HP'],
                link:[3,4],
            },{
                desc:
`You grab a barrel and escape.
You'll find some use for it, you hope.`,
                option:['Leave'],
                optionDesc:['Gain a Relic - Nuclear Waste'],
                link:[-1],
            },{
                desc:
`You escape, spending as little time in
the radioactivity as possible.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Mob Doctor',id:163,list:0,
        pages:[
            {
                desc:
`You run into what seems to be a normal doctor,
but it takes you only a few minutes to realize he's the
one the gangsters rely on for treatment.
He doesn't recognize you and asks what you're in for,
but you can tell who he is, loud and clear.`,
                option:['Treatment','Bioengineering','Kill Him'],
                optionDesc:['Lose 25 Currency','Lose 25 Currency','Gain 25 Currency'],
                link:[1,2,3],
            },{
                desc:`Despite working for the mob, the doctor knows his stuff.`,
                option:['Done'],
                optionDesc:['Heal 15 Health'],
                link:[-1],
            },{
                desc:
`The operation is quite advanced, but the doctor
sticks by his word and finishes the job.`,
                option:['Done'],
                optionDesc:['Gain 4 Max Health'],
                link:[-1],
            },{
                desc:
`You don't want to risk treatment from this doctor,
so you take him out when you get the chance.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Wheel of Money',id:164,list:0,
        pages:[
            {
                desc:
`You walk into a gameshow, across from a duck.
There's lights everywhere, and a big wheel between you.
Upon it are all kinds of numbers that look to be money.
"Welcome to the Wheel of Money, where you can win big!"
"Want a spin to see your winnings?" he asks.`,
                option:['Spin','Decline'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`You collect your winnings.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You don't want money, for some reason.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Wheel of Getting Stabbed',id:165,list:0,
        pages:[
            {
                desc:
`You are pushed awkwardly into a gameshow.
An annoying-sounding duck with a bowtie welcomes you on stage.
"Welcome to the Wheel of Getting Stabbed, where you... get stabbed!"
Want a spin?"`,
                option:['Spin','Decline'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`You collect your "winnings".`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`"You don't get a choice, buddy!" he tells you angrily.`,
                option:['Spin'],
                optionDesc:[''],
                link:[1],
            },
        ],
    },{
        name:'Monty Hall Problem',id:166,list:0,
        pages:[
            {
                desc:
`On a gameshow, your placed in front of three doors.
One of them contains 500 Standard Management Currency,
and the other two have no prizes at all behind them.
The host, one Monty Hall, offers you a choice.`,
                option:['Choose Door 1','Choose Door 2','Choose Door 3'],
                optionDesc:['','',''],
                link:[1,1,1],
            },{
                desc:
`Standing in front of door %a, Monty Hall then walks
over to door %b and opens it, revealing no money behind it.
He asks if you'd like to switch to door %3 or stay with door %a.`,
                option:['Switch',`Don't Switch`],
                optionDesc:['',''],
                link:[0,0],
            },{
                desc:`Opening your door, you find the money.`,
                option:['Win'],
                optionDesc:['Gain 500 Currency'],
                link:[-1],
            },{
                desc:`Opening your door, you find nothing.`,
                option:['Lose'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Fairy of Moonlight',id:167,list:0,
        pages:[
            {
                desc:
`On a dark night out, the sounds of birds around you
suddenly seem to fade away, drowned out by some imperceivable
force. Unable to move, you look up at the sky, empty except
for the moon. And as you stare, a fairy appears from behind
the trees, snickering as you stand there.`,
                option:['Attack Her',`Don't Move`,'Snap Out of it'],
                optionDesc:['Lose 12 Max Health','Become Cursed - Moon Stillness','Lose 8 Health'],
                link:[1,2,3],
            },{
                desc:
`Breaking free from the pull of the sky, you chase the
fairy down, managing to catch her after some time.
"You're pretty good at this!" she tells you.
"Why not take me with you?"`,
                option:['Accept','Decline'],
                optionDesc:['Add Luna, Silent Moonlight (Ally Card) to Deck',''],
                link:[4,5],
            },{
                desc:
`You stand there for what seems to be the entire night.
By morning, you're able to move again.
You're not sure what happened, but it was
a pretty mesmerizing experience.`,
                option:['Leave'],
                optionDesc:['Remove 3 Cards'],
                link:[-1],
            },{
                desc:
`Shaking yourself free from the trap, you make your getaway.
You don't feel quite the same, but at least you got out
of there without too much injury.`,
                option:['Leave'],
                optionDesc:['Remove a Card'],
                link:[-1],
            },{
                desc:
`She's following you around now.
She's not the most reliable ally to have, that's for sure.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You don't care to entertain this prospect.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Money Math',id:168,list:0,
        pages:[
            {
                desc:
`You walk into a gameshow, and a duck tells you what's going on.
"Let's see how good you are at math!" he says.
"But moreso, let's see how lucky you are!"
A couple of blocks are lowered down, covered in spinning numbers.`,
                option:['Play','Decline'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:`You collect your winnings.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`"You hate money?" he says as you leave.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Drill Zone',id:169,list:0,
        pages:[
            {
                desc:
`You encounter a group of ducks drilling a hole in the
ground next to the road. Several of them seem to be using
the drills, while another few are carrying large rocks out
of the hole. A glimpse of one rock, shiny, catches your eye.
One of the ducks notices you and offers to sell the rock,
for a fairly cheap price.`,
                option:['Buy Anatase','Decline'],
                optionDesc:['Lose 40 Currency, Add a Anatase to Deck',''],
                link:[1,2],
            },{
                desc:
`You take the rock, feeling just slightly scammed.
The ducks return to carry more rocks.`,
                option:['Take it'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:'The ducks get back to their labor.',
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Property Requirements',id:170,list:0,
        pages:[
            {
                desc:
`You are informed of a policy change on the planet.
Apparently, Management planetary military governor
Belich Conoro has, in cooperation with the former nobility,
decreed that only owners of property can participate
in the electoral process from now on.
You might end up without your vote.`,
                option:['Buy Property',`Don't`],
                optionDesc:['Lose 300 Currency','Become Cursed - Disenfranchised'],
                link:[1,2],
            },{
                desc:
`Buying a tiny, undeveloped square of property,
you reaffirm that you can vote.
Was it worth it?`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`You care not for the Management's power games.
But you are disenfranchised now, regardless.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Contaminated Duck',id:171,list:0,
        pages:[
            {
                desc:
`You find a duck on the side of the raod, rolling around.
With a raspy, weak voice, he asks you to take him to a doctor.
He's looks heavy and unsafe to touch though.`,
                option:['Get Him Medical Help','Take His Stuff'],
                optionDesc:['Heal to Full, Gain 200 Currency, Become Cursed - Sickly','Gain 50 Currency'],
                link:[1,2],
            },{
                desc:
`You bring him to the hospital, and he thanks you with some money.
But you think you might've cought something from him...`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
`Leaving him to die, you take the money he has.
It's not much, but it'll do.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Chocolate Factory',id:172,list:0,
        pages:[
            {
                desc:
`You enter a chocolate shop, seeing the many pieces
of chocolate on offer. They look to be from two different
brands. Maybe you should make a purchase?`,
                option:['Buy Ferrero','Buy Lindt','Decline'],
                optionDesc:['Lose 50 Currency','Lose 50 Currency',''],
                link:[1,2,3],
            },{
                desc:
`You grab some shiny chocolate balls and pay the price.
You'll eat them at some point.`,
                option:['Take it'],
                optionDesc:['Add a Ferrero to Deck'],
                link:[-1],
            },{
                desc:
`You grab some shiny chocolate balls and pay the price.
Eventually you'll get to eating them.`,
                option:['Take it'],
                optionDesc:['Add a Lindt to Deck'],
                link:[-1],
            },{
                desc:`You're not will to waste money right now.`,
                option:['Exit'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'HVM Garrison',id:173,list:0,
        pages:[
            {
                desc:
`You a single HVM soldier standing around a truck,
while in the distance you can spot the HVM outpost.
He's distracted, talking to someone on the radio.`,
                option:['Ambush Him','Follow Him'],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
`You sneak up behind him and kill him without trouble.
You seize whatever documents you find and dispose of the body.`,
                option:['Leave'],
                optionDesc:['Gain a Relic - HVM Orders'],
                link:[-1],
            },{
                desc:
`Following the truck, he eventually reaches what looks to be
a drop site. Afterward, he speeds off for a moment, and while
he's gone, the drop arrives.
You take all the supplies, escaping before he returns.`,
                option:['Leave'],
                optionDesc:['Gain 200 Currency, Heal 10 Health'],
                link:[-1],
            },
        ],
    },{
        name:'Guess the Damage',id:174,list:0,
        pages:[
            {
                desc:
`You enter a gameshow, seeing a giant flashing screen.
The announcer's voice rings from around you.
"You have the chance to win a reward, if you answer me this...
How much damage does - deal?"`,
                option:['','','','',''],
                optionDesc:['','','','',''],
                link:[2,2,2,2,2],
            },{
                desc:`
"Congratulations, you're the winner!"
You take your prize and make your getaway.`,
                option:['Take it'],
                optionDesc:['Gain 2 Relics'],
                link:[-1],
            },{
                desc:`
"A reused sound effect of disapproval is heard."
Looks like you didn't win anything.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Wheel of Surprise',id:175,list:0,
        pages:[
            {
                desc:
`You find a duck standing in the midst of an empty field.
He holds what seems to be two dowsing rods, moving them around.
"Looks like there's some treasure here!" he tells you.
"Pay a small fee and it's yours!"`,
                option:['Spin','Decline'],
                optionDesc:['Lose 50 Currency',''],
                link:[1,2],
            },{
                desc:`You get whatever it was that he found.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`There's no way he's being honest.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Ducksquad',id:176,list:0,
        pages:[
            {
                desc:
`A clump of ducks are hiding in the forest talking.
When they see you, they invite you over.
They say they're forming a local resistance force.
One offers to induct you into the group.`,
                option:['Join the Ducksquad','Run'],
                optionDesc:['Add Call Ducksquad to Deck',''],
                link:[1,2],
            },{
                desc:`You learn the way they communicate.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },{
                desc:`You find his proposition pointless.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },{
        name:'Guess the Block',id:177,list:0,
        pages:[
            {
                desc:
`You find yourself faced with yet another gameshow.
This time, you're asked to answer a single question
for a prize: how much block does - give?`,
                option:['','','','',''],
                optionDesc:['','','','',''],
                link:[2,2,2,2,2],
            },{
                desc:`
You picked the right answer and claim your prize.
How do you know this stuff anyway?`,
                option:['Take it'],
                optionDesc:['Gain 400 Currency'],
                link:[-1],
            },{
                desc:`
Canned laughter is heard as a spotlight appears over you.
You're just a bit humiliated.`,
                option:['Leave'],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },/*{
        name:'',id:177,list:0,
        pages:[
            {
                desc:
``,
                option:['',''],
                optionDesc:['',''],
                link:[1,2],
            },{
                desc:
``,
                option:[''],
                optionDesc:[''],
                link:[-1],
            },{
                desc:
``,
                option:[''],
                optionDesc:[''],
                link:[-1],
            },
        ],
    },*/
]