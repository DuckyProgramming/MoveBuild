class tutorialManager{
    constructor(layer,battle){
        this.layer=layer
        this.battle=battle
        this.tutorial=0
        this.page=0
        this.pages=[]
        this.popups=[]
        this.anim={pages:[]}
        this.active=false
    }
    quickTile(x,y){
        return this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(x,y)].position
    }
    setupTutorial(tutorial){
        this.tutorial=tutorial
        this.active=true
        this.page=0
        transition.trigger=true
        for(let a=0,la=variants.map.length;a<la;a++){
            variants[variants.map[a]]=false
        }
        switch(this.tutorial){
            case 0:
                transition.scene='battle'
                game.player=[0]
                game.deck=[0]
                this.battle.player=[0]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                this.popups=[
                    [],
                    [{x:this.quickTile(1,1).x,y:this.quickTile(1,1).y-50,size:60}],
                    [{x:100,y:500,size:90}],
                    [{x:this.quickTile(1,1).x,y:this.quickTile(1,1).y-50,size:60}],
                    [{x:this.quickTile(2,1).x,y:this.quickTile(2,1).y-50,size:60}],
                    [{x:100,y:500,size:90}],
                    [{x:26,y:578,size:30}],
                    [],
                    [{x:this.quickTile(2,1).x,y:this.quickTile(2,1).y-50,size:60},{x:26,y:578,size:30}],
                    [{x:26,y:454,size:40}],
                    [{x:this.quickTile(0,0).x,y:this.quickTile(0,0).y-50,size:60}],
                    [],
                    [{x:26,y:550,size:40}],
                    [],
                ]
                this.pages=[
`Welcome to MoveBuild!
This is a basic rundown of gameplay.`,
`This is you, take note of your health.
The character next to you is an enemy.`,
`This is your hand, your cards are here.
Click on the Strike to select it.`,
`Click on the enemy to use the Strike on him.
Typically, you must kill all enemies to win a combat.`,
`Here's another enemy. This one is about to attack.
Mouseover him to see details about the attack.`,
`Block reduces damage taken and can prevent HP loss.
Play defend to get block.`,
`End your turn now, the enemy will get a chance to attack.
If you have block, you will be protected from the damage.`,
`On their turn, enemies will attack if possible, and some can move.
Enemy attacks may be offensive, defensive, or status in nature.`,
`You can kill this guy now. End your turn afterward.
Then, go onto the next page.`,
`You gain energy every turn. It starts at 3 per turn.
You need energy to play most cards (some do not cost energy).`,
`You will typically draw a hand of cards each turn, it might look like this.
Since you have 3 energy this turn, you can only use 3 cards.
Find the combination that kills this enemy.`,
`After each battle, you will receive rewards. Click on them to get them.
They can be cards, currency, or other things, such as:
Relics (permanent buff), Items (single use), Upgrade a Card`,
`You can always learn more in the dictionary.`,
`END OF TUTORIAL`,
                ]
            break
            case 1:
                transition.scene='map'
                game.player=[0]
                game.deck=[0]
                this.battle.player=[0]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.nodeManager.setupTutorialMap()
                this.popups=[
                    [],
                    [],
                    [],
                    [{x:68,y:578,size:30},{x:26,y:578,size:30}],
                    [],
                    [],
                    [],
                ]
                this.pages=[
`Most tiles will be either fights, elites or bosses.
Those tiles all involve combat against various levels of enemies.`,
`Here are some of the non-combat nodes.
First, enter the rest site.`,
`Rest sites give you several options for benefits.
Typically, you get Heal (HP) and Upgrade (a card) as options.
You may get more options from relics.`,
`At a shop, you can buy cards, buy packs, remove a card, or buy relics.
Alternate options at the shop (highlighted) include:
Selling relics, Heal (10 HP for 60 Currency)`,
`Unknowns are completely random.
They may be an event, which vary by quality.`,
`Finally, the stash gives you a relic for free.`,
`END OF TUTORIAL`,
                ]
            break
            case 2:
                transition.scene='battle'
                game.player=[0]
                game.deck=[0]
                this.battle.player=[0]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(99)
                this.popups=[[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Cards will often have attributes attached to them.
You may have seen some of them already (such as Fatigue).`,
`Fatigue cards add a Fatigue card to your discard pile.
Fatigue costs 1 and has no effect; it only wastes draw.
Most attack and movement cards have Fatigue.`,
`Exhaust cards go to the exhaust pile when played.
Cards can be exhausted in other ways and also go to the exhaust pile.`,
`Cards in the exhaust pile remain there except for niche situations.
In effect, Exhaust cards can only be used once per combat.
Play in, it should not appear in your discard pile.`,
`Cards that Retain maintain through ending your turn.
End your turn now, it should stay in your hand.`,
`Cards that are Innate always start in your hand.
As in, each battle, you can play it immediately.`,
`Ethereal cards are exhausted if they remain in your hand when your turn ends.
End your turn, the card should disappear, and not appear in your discard pile.`,
`Unplayable cards can't be played from your hand.
Sometimes, they have passive effects, other times, they are useless.`,
`END OF TUTORIAL`,
                ]
            break
            case 3:
                transition.scene='battle'
                game.player=[0]
                game.deck=[0]
                this.battle.player=[0]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialHotkey',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.nodeManager.setupTutorialMap()
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                this.battle.relicManager.addRelic(findInternal('No Effect',types.relic),0)
                this.popups=[[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Hotkeys are an easy way to speed up gameplay.
In battle, here are the most important ones.`,
`End your turn by pressing the enter key.`,
`The number keys can be used to select cards..
Here, it would be: 1. Select the Strike`,
`To choose a target, press the number keys for its coordinates,
and press space to use the card. For this enemy, it would be: 2, 2, space.
Kill him now.`,
`Use the d, r, i and o keys, respectively, to view your
discard pile, draw pile, and to disable and enable viewing your relics and items.
These are not case-sensitive on 1 player, but they are on 2 player.`,
`Use the number keys to take rewards, from top to bottom or left to right.
Enter to skip rewards.`,
`Number keys to select movement location, from left to right.`,
`For other areas, like Rest Sites, Shops, and receiving Perks,
typically, number keys for each option, and Enter to skip.
Try these out in those places.`,
`END OF TUTORIAL`,
                ]
            break
            case 4:
                transition.scene='battle'
                game.player=[0]
                game.deck=[0]
                this.battle.player=[0]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialStatus',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=10
                this.popups=[
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [],
                    [{x:this.quickTile(2,1).x,y:this.quickTile(2,1).y-50,size:60},{x:this.quickTile(2,2).x,y:this.quickTile(2,2).y-50,size:60}],
                    [],
                    [],
                    []
                ]
                this.pages=[
`Here's an enemy. This one has 25 health and deals 10 damage,
so he may be a threat. But he can be beaten with status effects.`,
`Weak causes the afflicted to deal 25% less damage.
Stacks of weak extend the duration, but not the effect.
Weaken this enemy and test if he deals less damage.`,
`Vulnerable causes the afflicted to take 50% more damage.
Stacks of vulnerable extend the duration, but not the effect.
Make this enemy vulnerable, and do extra damage using the Strike.`,
`An enemy's turn can be completely skipped, such as with Stun.
Stun this enemy, and end your turn. He won't get a turn.`,
`Strength is designed to buff yourself. For each stack, you get +10% damage.
Stacks of strength never decay, and last until the end of combat.
Use strength to deal more damage using the strike.`,
`Dexterity is similar to strength, but gives +10% more block for each stack.
They also never decay. Use dexterity to get more block from the defend,
and tank the enemy's attack.`,
`Buffer is a special status effect that completely eliminates the next time
you lose health. Buffer can used to avoid a lot of life loss, but be
careful, as it can be wasted by small amounts of damage.`,
`Keep in mind that you can read the text of unfamiliar status effects by
mouseover on a character. The names of most status effects are self-explanatory.`,
`Some more status effects may be explained in the character tutorials.
Those characters often have status effects that they use often.`,
`Additional information may be found in the dictionary.`,
`END OF TUTORIAL`,
                ]
            break
            case 5:
                transition.scene='battle'
                game.player=[0]
                game.deck=[0]
                this.battle.player=[0]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('Little Guy',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.popups=[[],[],[],[],[],[],[],[],[]]
                this.pages=[
`There are a variety of enemies in Movebuild. The main types of combats
are Enemies, Elites, and Bosses, in that order of difficulty. You usually
have a lot of choice regarding fighting Enemies and Elites.`,
`The first battle in each world is a set easier starting battle,
and the next few battles in World 1 also are slightly easier combats.
World 4 is short and doesn't include any standard battles.`,
`It's worth noting that combats are determined entirely randomly,
except that the same combat cannot appear twice in the same run.
You can view the enemy inside a combat node just before entering it.`,
`Enemies in the late game and most Elites and Bosses have reactionary capabilities.
This means that they may turn around, move, or even attack when you move.
Such enemies are harder to avoid and more dangerous to battle.`,
`Enemy intents are varied and complex, but the symbols used to represent them
should give a decent idea of what they do. Reading their descriptions should
be enough to understand them, as they're mostly self-explanatory.`,
`On multiplayer, or when another sort of ally is present, enemies
will select a target that they will go after. This can change mid-combat.`,
`Attacking enemies will only activate if they have a player or another valid
(non-enemy) target. Once activated for that turn, they will attack regardless
of what they hit (as long as some valid target still exists.)`,
`This makes it possible to get enemies to hit each other by
manipulating their positions or angles they face.`,
`END OF TUTORIAL`,
                ]
            break
            case 6:
                transition.scene='battle'
                game.player=[0]
                game.deck=[0]
                this.battle.player=[0]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialTactic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-3].setMaxHP(5)
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-2].setMaxHP(5)
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                this.popups=[[],[],[],[],[],[],[],[]]
                this.pages=[
`For this tutorial, the focus is on finding the combination of cards
to kill every enemy in one turn. If you fail, going to the next page will
go to the next round, so you can only try again by replaying the tutorial.`,
`Energy is unlimited, the goal is to find the order of the cards and which
enemy to play them in.`,
`Puzzle 1`,
`Puzzle 2`,
`Puzzle 3`,
`Puzzle 4`,
`Puzzle 5`,
`END OF TUTORIAL`,
                ]
            break
            case 7:
                transition.scene='battle'
                game.player=[0]
                game.deck=[0]
                this.battle.player=[0]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.popups=[[],[],[],[],[],[]]
                this.pages=[
`Movebuild has ${constants.playerNumber} playable characters.`,
`Each one has their own set of cards, colored thematically.
Typically, you cannot get cards from another character during normal runs,
though some variants, cards, relics, and items will give these off-color cards.`,
`Each has distinct gimmicks for their cards but not every card serves a gimmick,
many are just there to add more content and to provide variety.`,
`Characters also differ in maximum HP. While this does create a sort of difficulty,
this is meant more in thematics and the characters are meant to be decently balanced.`,
`Aside from just gimmicks, some characters are designed to encourage a specific playstyle.
Despite this, other strategies often remain valid at lower difficulty settings
and it's suggested to try out a variety of playstyles that may also succeed.`,
`END OF TUTORIAL`,
                ]
            break
            case 8:
                transition.scene='battle'
                game.player=[1]
                game.deck=[0]
                this.battle.player=[1]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(20)
                this.popups=[[],[],[],[],[],[],[],[]]
                this.pages=[
`George, the Agent, is fairly simple, but can unleash deadly combos.
His gimmicks include: Combo, Collision, Packs`,
`Combo, at its base, is a counter that increases by one each time you hit an enemy.
There is no limit to combo, and it does not reset after each turn.
Combo can also be gained through certain cards.`,
`Some other cards cost combo to play. These cards will spend the combo after use.
They might also say End Combo, which means you will lose all combo after use.
Using the cards given, kill the enemy.`,
`Because Combo never decays and each hit generates more, getting a lot is easy.
See how much combo you can get!`,
`Conditioning, in comparison, is much simpler. It doubles one block add.
After doubling one block add, one stack of conditioning is removed.
More stacks of conditioning increase the number of block adds doubled.`,
`At the Perk screen, George behaves differently from the other characters.
Rather than being completely random, one card of each option is set.
These are the pack cards. You can typically only get one per game.`,
`The pack cards each give you a selection of other cards to play.
These cards are typically powerful, but fit a distinct theme.
Each one has a different utility, so pick your pack wisely.`,
`END OF TUTORIAL`,
                ]
            break
            case 9:
                transition.scene='battle'
                game.player=[2]
                game.deck=[0]
                this.battle.player=[2]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                this.popups=[[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Lira, the Apprentice, is designed to be fairly simple to play,
possessing many basic cards. However, she still has few gimmicks.
They include: Health, Plant Tiles, Fatigue Manipulation, Poison`,
`While Lira doesn't have much health, that can be increased.
Each point of health is also very valuable because of certain cards.`,
`Some cards, such as Increment, can increase your max health.
They are slow, but keep in mind that they can be played every battle.
Getting Max HP is useful for survival and for having more HP to use for other cards.`,
`Many of Lira's cards either heal or harm you, more often the latter.
Sacrificing HP for damage or block is a tradeoff, but often worth it.
With a lot of HP (sometimes sacrificed), Lira can be very powerful.`,
`For a shorter-term strategy, Lira can access plant tiles.
These tiles have no effect and must be created through certain cards.`,
`Once the tiles are created, however, they can be accessed for various effects.
These can be beneficial or detrimental, so check the characters on plant tiles
before using them, as those characters will be afflicted.`,
`Next, we have Fatigue manipulation. Most other characters are stuck with Fatigue,
but as Lira, there are ways to remove fatigue or capitalize off of it.
But still, Fatigue remains an issue during longer battles.`,
`Finally, Poison acts similarly to Bleed. It deals damage each turn.
It decreases by 1 each turn as well. Unlike Bleed, Poison bypasses Block.`,
`To see the full effect of Poison against this enemy,
end you turn a couple times to let it take damage.`,
`END OF TUTORIAL`,
                ]
            break
            case 10:
                transition.scene='battle'
                game.player=[3]
                game.deck=[0]
                this.battle.player=[3]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(99)
                this.popups=[[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Sakura, the Creation, has gimmicks that are harmful and helpful.
Namely, they are Bleed, Armament, Balance.`,
`Bleed is a status effect that can be applied. It does damage each turn.
After dealing damage, bleed decrements by 1. This means that bleed is not infinite.
Still, bleed can be maintained by applying more bleed, which can be done in various ways.`,
`Often, using bleed boils down to getting as much of it as possible on enemies.
Typically, enemies with block cannot get bleed, so remove their block first.
Otherwise, simply spamming is a good way to stack bleed.`,
`Afterward, playing a bleed build involves surviving while the bleed chips away.
The more bleed, the faster the enemy dies, and the less time you have to survive.`,
`The armament system is fairly complex. At the start of combat, you are armed.
Cards may require armament, but they have powerful effects.`,
`Cards may be labeled with Rearm or Disarm to indicate if they change armament.
When you Disarm, an armament point is created somewhere. Moving there Rearms you.
Many powerful cards involve Disarming, so it is recommended to find a way to Rearm.`,
`Balance is a counter, starting from 0, that can go up to 10.
Cards marked as X Balance will increase balance by X.
If balance ever goes above 10, it breaks, causing it to reset to 0 but ending your turn.`,
`Balance cards are often powerful, but you must keep in mind how much balance they give.
If you must break balance, do so when you were going to end your turn anyway.`,
`END OF TUTORIAL`,
                ]
            break
            case 11:
                transition.scene='battle'
                game.player=[4]
                game.deck=[0]
                this.battle.player=[4]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialStatus',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(35)
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=5
                this.popups=[[],[],[],[],[],[]]
                this.pages=[
`Certes, the Phantasm, is one of the more confined characters.
Her primary mechanic is Shivs.`,
`Shivs are the central mechanic of her strategy. They are a free, low-damage card.
The mechanics around shivs relate to getting more of them, and increasing their damage.
Getting Shivs as Certes is not hard, but getting them economically is a challenge.`,
`It is important to not get to many Shivs, as they are not Ethereal.
If a target for a Shiv is not found, it will remain in your deck, wasting draw.`,
`Shivs benefit from the ability to create them and add additional attributes to them.
They also benefit from being counting for a number of cards when played.`,
`Generally, Certes benefits from playing large numbers of cards.
There are lots of ways to work around this concept.`,
`END OF TUTORIAL`,
                ]
            break
            case 12:
                transition.scene='battle'
                game.player=[5]
                game.deck=[0]
                this.battle.player=[5]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(99)
                this.popups=[[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Azis, the Executor, is one of the harder characters to play.
He has several gimmicks: Orbs, Countdowns, and Energy manipulation.`,
`Orbs are held in orb slots. Typically, you have four.
Holding an orb means putting in the first available slot.`,
`If no slot is available, the first orb you have will be evoked.
Evoke causes an orb's effect to trigger, the orb is then removed.
Orbs can be evoked in other ways, such as through cards.`,
`When an orb is evoked because you are out of slots, it evokes on yourself.
Most evoking cards let you choose between yourself and some enemies.`,
`The effect of an orb when evoked varies by type of orb.
Some do damage, some give block, some are buffs, some are nerfs.
The following are the types of orbs:`,
`The basic orb does 12 damage.
The shield orb adds 16 block.`,
`When you find the other orbs in-game, you can check their
effects by looking through their entries in the dictionary.`,
`You can reposition orbs when you need to, to get the best orb first.
Click on an orb to position it as the first orb.`,
`Orbs can be improved through focus,
and enemies can be made weak to orbs using Node.`,
`END OF TUTORIAL`,
                ]
            break
            case 13:
                transition.scene='battle'
                game.player=[6]
                game.deck=[0]
                this.battle.player=[6]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                this.popups=[[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Donakho, the Builder is a unique character, as he doesn't do everything himself.
He can build constructs, which fight on your side. These constructs vary in use.
In addition, he can make use of card upgrading and transformation.`,
`First, to build constructs, you need both metal and a blueprint.
Metal is a basic resource that can be gained in a number of ways.
Blueprints are a type of card that costs metal and creates a construct.`,
`Get some metal and build a turret.
Constructs attack during the enemies' turn. They do not move.
Kill the enemy using it.`,
`After building a construct, you get Unbuild.
Unbuild can be used to destroy a construct if it gets in your way.`,
`Constructs do not all attack enemies. Many are defensive in nature.
Some constructs also provide a buff to the player.
No constructs are intended to be relied upon.`,
`For the ones that do attack, they have very little control over their targetting.
they will attack anything other than other constructs and yourself.
(e.g. They can target medics, and allies on 2-player)`,
`Building a lot of constructs offers great utility.
They will, however, cost metal, and there is only so much space to build.
Constructs must also be built on empty tiles, so you cannot build while surrounded.`,
`The builder also has minor card motif with card modification.
This covers upgrading cards temporarily or transforming them temporarily.`,
`It's worth getting familiar with the upgraded forms of your cards to
know when to select them to be upgraded by another card.`,
`END OF TUTORIAL`,
                ]
            break
            case 14:
                transition.scene='battle'
                game.player=[7]
                game.deck=[0]
                this.battle.player=[7]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                this.popups=[[],[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Setsuna, the Duelist, is a character that can be focused on many things.
Her gimmicks are Stances, Faith, and creating cards.`,
`Namely, the stances are: Wrath, Calm, Haste, Sturdy, Divinity.
You can also be in no Stance, which is the default.`,
`Entering a stance causes you to be in that stance. Entering a stance from itself counts.
Exiting stance means not being in that stance. Exit Stance as a keyword removes stance.
As in, Exit Stance puts you in no stance, but stances can be exited to other stances`,
`Wrath is a stance that focuses on aggression. It doubles damage dealt during your turn,
but also doubles damage taken. It is very powerful on high-damage turns.
However, the added vulnerability makes it important to have a way to get out of Wrath.`,
`Calm is the setup stance. It has no passive benefits or downsides.
However, when you leave calm, you gain 2 energy. Rapid entry and exit can farm energy,
or you can stay in calm to get a big turn later.`,
`Haste is the movement stance. While in Haste, you get a Speed every turn.
However, you cannot attack at all in Haste. Being able to leave it is very important.`,
`Sturdy is the defense stance. You take 50% less damage in Haste.
However, you deal 50% less damage in Sturdy. While it is not required,
being able to leave Sturdy is always beneficial.`,
`Divinity is the final stance. There are few ways to instantly enter Divinity.
Entering divinity requires building up 10 Faith, which is gained through cards.
When 10 Faith is gained, you lose 10 Faith and enter Divinity.`,
`You deal 3x damage in Divinity, and when you enter Divinity,
you also gain 3 energy and draw 3 cards. Divinity is very powerful.`,
`The final ability of Setsuna is to create cards. These cards are added by other cards.
Appearing during combat, these cards usually have effective abilities.`,
`END OF TUTORIAL`,
                ]
            break
            case 15:
                transition.scene='battle'
                game.player=[8]
                game.deck=[0]
                this.battle.player=[8]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(15)
                this.popups=[[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Airi, the Enchanter, is built around a few distinct archetypes.
Each of these is intended to easily mix with the others, so a deck can use multiple.
They are: Amplify, Charge, and Wisps.`,
`Of the characters, Airi has the least health. There's no real counter for this;
she's just harder to play. But building synergies with her is very easy,
as most of her cards are able to fit together in some way.`,
`Amplify is the first gimmick. It is a bonus effect that improves a card,
However, they cost 1 extra energy to activate. If you can't afford it,
nothing unique will happen, it will just be the regular card.`,
`Some amplifies are marked as "2" which means they spend 2 energy instead.
Be aware that the energy will always be spent if possible,
so there are times where amplify is detrimental.`,
`Charge is just a number, similar to Combo, Metal, or Ammo. It increases by 1 each turn.
While charge does grow passively, it may also be obtained through cards.
The Overdrive X keyword refers to spending X charge to active a special effect.`,
`Wisp is a status, that causes you to lose 1 charge at the end of your turn,
if it remains in your hand.`,
`But as Airi, you can use Wisp to your advantage. Some cards benefit from Wisps,
and other cards create more Wisps to use. But be careful, as Wisps is still a status
and still wastes draw, so plan accordingly.`,
`END OF TUTORIAL`,
                ]
            break
            case 16:
                transition.scene='battle'
                game.player=[9]
                game.deck=[0]
                this.battle.player=[9]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialEdgar',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                for(let a=0,la=6;a<la;a++){
                    this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1-a].setMaxHP(5)
                }
                this.popups=[[],[],[],[],[],[],[]]
                this.pages=[
`Edgar, the Disgraced CEO, is a character with a focus on aggression.
In terms of strategy, he is fairly simple, but he has a few gimmicks.
They are: Guns and Ammo, Positioned Cards, and Burn.`,
`Guns are a class of attack. They typically have longer range.
Guns are powerful in terms of damage and range compared to normal cards.
The weakness of guns is that each gun use spends 1 ammo.`,
`Ammo is a numerical value, and is only really used for guns.
Ammo is gained through cards. A gun-heavy deck is able to deal a lot of damage,
but becomes reliant on an ammo source to remain functional.`,
`Positioned cards are cards that have an extra effect based on their position.
Using them often requires playing cards to get them in the right place.`,
`As Edgar, each turn is almost played out separately, even more than in normal runs.
Finding the right way to play the cards you get as Edgar is simple, but key.`,
`Burn is a status that never decays. It deals 2x damage when the afflicted hits.
Burn the enemy and block his attack, then end your turn.
He will damage himself every time he hits you.`,
`END OF TUTORIAL`,
                ]
            break
            case 17:
                transition.scene='battle'
                game.player=[10]
                game.deck=[0]
                this.battle.player=[10]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                this.popups=[[],[],[],[],[],[],[]]
                this.pages=[
`Chip, the Gentleman, has cards that fit into distinct and specific groups.
His gimmicks are: Randomness, Strikes and Defends, and Currency.`,
`Many of his cards rely on having random effects.
Using them can be difficult due to randomness, so don't take to many chances.`,
`The best way to deal with these cards is to change their chances.
Another is to have a backup plan with their downsides.
And remember that most have a base power, and not to rely on the chance effects.`,
`Some luck-based cards use dice rolls to determine their effects.
They are marked as D6 or D20. These rolls are random but may be modified.`,
`These are generally more unreliable because of their inconsistency,
but just like other luck cards, they can be manipulated.`,
`Currency is a general game mechanic, but Chip has many cards that involve it.
But keep in mind that if your build relies on currency, the trade-off is
that making purchases at shops weakens you - plan ahead!`,
`END OF TUTORIAL`,
                ]
            break
            case 18:
                transition.scene='battle'
                game.player=[11]
                game.deck=[0]
                this.battle.player=[11]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(30)
                this.popups=[[],[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Shiru, the Huntress, is designed with playing cards in order with mind.
Her gimmicks are: Discarding Cards, Jinx, and Silver Cards.`,
`Selective discard refers to being able to choose a certain number of cards to discard.
This appears as a red outline over your cards as long as discarding remains active.`,
`Sometimes, this can be useful just to get rid of cards,
but some cards benefit from being discarded, or another card being discarded.`,
`Be careful, though, as you'll have to discard the cards before playing others,
hence the number of cards in your hand is important to keep in mind.`,
`While many strategies can make use of selective discards, finding the right order
to play cards in can be difficult.`,
`Jinx is a statuses that deals damage at some point.
It has a 1/3 chance to trigger each turn. Jinx is removed after dealing damage.
Jinx can be applied in large numbers but won't do anything until it triggers.`,
`End you turn until it triggers.
Jinx is unreliable due to its randomness, but there are ways to mitigate this.
Those include cards that take advantage of an enemy's Jinx, or just waiting.`,
`Shiru can also make use of Silver Cards. These have a special effect that
triggerswhen your energy is an odd number. GIven their simplicity,
they can fit into many other builds.`,
`A subset of Silver cards are Mineral Cards, which have their own synergies
but still adhere to the odd-energy effects of other Silver cards.`,
`While having odd energy may not seem difficult, it's still important to
keep track of where your energy is and sometimes sacrifice the bonus effects
when the energy doesn't work out in your favor.`,
`END OF TUTORIAL`,
                ]
            break
            case 19:
                transition.scene='battle'
                game.player=[12]
                game.deck=[0]
                this.battle.player=[12]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                this.popups=[[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`DD-610, the Paradigm, has many valid strategies.
Its gimmicks are: Claws, Shock, and Cables.`,
`Claws are a set of cards that interact with each other.
Clawup refers to increasing the effect of other Claws.`,
`While the diverse Claw cards can offer different effects, they're not
versatile enough to be more than the core of a build. Claws are best used
along with other cards as aggressively scaling claws is risky.`,
`Shock is a status similar to Poison or Bleed, that does damage every turn.
Unlike Poison or Bleed, however, it does not decrease every turn`,
`Instead, Shock's weakness is that it applies when an enemy moves.
Fast enemies are affected more, but nonmoving enemies are immune to Shock.`,
`There are a variety of ways to apply Shock to enemies,
or to take advantage on an already shocked enemy to gain benefits.
DD-610 may also benefit from shocking itself and accepting the downside.`,
`Cables are a set of attacks that have additional effects when used in
one specific direction. While consistent even if the additional effects are not
used, Cables are much better when their abilities can be taken advantage of.`,
`Positioning and planning ahead are important to using Cables well,
but keep in mind that sometimes the locations just won't align.`,
`A few of DD-610's cards also work with their stats and costs changing
when they are played or when another card is played.`,
`END OF TUTORIAL`,
                ]
            break
            case 20:
                transition.scene='battle'
                game.player=[13]
                game.deck=[0]
                this.battle.player=[13]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                this.popups=[[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Prehextorica, the Recollection, can make use of several game mechanics.
His gimmicks include: the turn number, and Weak.`,
`Prehextorica can benefit from the current turn number, in the bottom left corner.
It counts up by 1 normally and starts at 1, but Prehextorica's cards can change that.`,
`The desired turn can range from a late turn or even to turn 0. Keep in mind Initiative
and Start of Combat effects trigger on turn 1 and may repeat if the turn number rewinds.
The turn number can go as high as possible but cannot precede turn 0.`,
`Many cards work with the turn number. Some prefer high or low turn numbers.
Others work with specific turns or turns of a specific parity.
With enough manipulation or planning ahead any turn number can be reached.`,
`Generally, it's a good idea to plan ahead what turns you want to be on.
You can always fall back on the turn increasing by 1 each turn though,
so moving backward in time is difficult but rewarding.`,
`Other cards may work with simply having the turn number change more,
rather than having it be at a specific place.`,
`Finally, many cards have different effects based on the parity of the turn,
so they can be useful most of the time, but planning ahead still helps.`,
`Prehextorica can also apply Weak to enemies.
Aside from the base 25% damage reduction,
enemies with Weak are susceptible to a variety of effects.`,
`It's also possible, as Prehextorica, to take a large amount
of extra turns. This enables you to have a lot more time to act,
but getting the turns can be expensive in terms of energy.`,
`END OF TUTORIAL`,
                ]
            break
            case 21:
                transition.scene='battle'
                game.player=[14]
                game.deck=[0]
                this.battle.player=[14]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(99)
                this.popups=[[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Vincent, the Manufacturer, works best with things that can be held.
His gimmicks include: Items, Concoctions, Prismatic Bombs.`,
`All characters can use items, but Vincent has access to a group of items
known as temporary items that are removed at the end of combat. There are many
ways to attain them, but they are used just like any other item.`,
`Temporary items interact with most standard item interactions, however,
but are much more expendable than normal items and can be gained easily
and repeatedly at little cost, so they can be used more often.`,
`Oftentimes, Item Slots will become valuable to hold onto.
It's important be aware of how many Item Slots you want to keep open
and how important the items you already hold are.`,
`The split between how many temporary items and permanent ones you want to hold
is also important to consider, as only permanent items can be sold or
saved for key moments, but temporary items can be cycled repeatedly when needed.`,
`For that reason and becoems they're often temporary, rapidly using items is necessary.
It's worth noting that Items can be wasted by using them and pressing Backspace.`,
`Vincent can also use Concoctions, cards that can be upgraded multiple times.
They can be upgraded repeatedly at standard rest sites or in battle.`,
`Deciding how to work with Concoctions is a challenge as you have to consider
how much weight they have compared to other cards in your deck.`,
`Prismatic Bombs are cards that you can create in your draw and discard piles.
When drawn, they have several beneficial effects, but are ethereal.
You can pay to keep them from exhausting themselves by discarding them.`,
`END OF TUTORIAL`,
                ]
            break
            case 22:
                transition.scene='battle'
                game.player=[15]
                game.deck=[0]
                this.battle.player=[15]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                this.popups=[[],[],[],[],[],[],[]]
                this.pages=[
`Daiyousei, the Embodiment, permits playstyles that involve aggression or passivity.
Her gimmicks include: Vision/Elemental Form, History, Knowledge/Wisdom`,
`Whenever you play a card, you gain 1 Vision. There are also cards that can grant Vision.
When you have 12 Vision, lose 12 Vision, gain 1 Awakening, and enter Elemental Form.`,
`While in Elemental Form, you have 1 additional Strength. You lose 1 Awakening per turn.
Once you run out of Awakening, you'll leave Elemental form on that turn.
While the 1 Strength isn't much, many cards work around being in Elemental Form.`,
`Rewinding a card refers to sending the card back to your draw pile.
Most of the time, Rewinding a card will shuffle it in.`,
`History is a status effect that you can apply to yourself.
Whenever you draw or Rewind a card, History deals damage to a random enemy.
History decays quickly - you lose half of it, rounded up, every turn.`,
`Knowledge and Wisdom are two status applied to the self that interact together.
You draw 1 more card per turn for every 3 Knowledge you have, capped at 2 more per turn.
Wisdom increases the cap on Knowledge, but more Knowledge is needed first.`,
`END OF TUTORIAL`,
                ]
            break
            case 23:
                transition.scene='battle'
                game.player=[16]
                game.deck=[0]
                this.battle.player=[16]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialStatus',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(40)
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=15
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].activate(0)
                this.popups=[[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Sanae, the Purifier, is designed around creating a sort of balance
between the usage of offensive and defensive cards and playstyles.
Her gimmicks include: Barrier, Discuses, Scry and Scry-Based Cards, and Freeze.`,
`Barrier is similar to block in that it prevents damage coming in.
The difference is that block is removed at the end of your turn, while
barrier is kept between turns until it is used.`,
`Block is reduced before barrier when damage is taken so the two can be used
in conjuncation to reduce damage. However, because of this advantage of
barrier being retained, it is harder to gain in large amounts.`,
`Discuses are similar to the Shivs that other characters can generate.
The difference is that they cannot be spammed, as they cost 2 Energy to play.
They do retain, though, so a Discus can be held until the right time to use it.`,
`Discuses also give barrier, so decisions regarding when to use them have
to be made off when damage and barrier are needed and when energy is available.`,
`Scrying allows you to look at the top X cards of your draw pile.
If you dislike the cards, you can click on them to discard them.
Otherwise, skip so you can draw them next turn (or this turn).`,
`Some Sanae strategies also allow you to gain advantages
based on the cards in your draw pile that you can Scry.`,
`END OF TUTORIAL`,
                ]
            break
            case 24:
                transition.scene='battle'
                game.player=[17]
                game.deck=[0]
                this.battle.player=[17]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].activate(0)
                this.popups=[[],[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Shinmyoumaru, the Inchling, is designed around calculated aggression.
Her gimmicks include: Basic Cards, Lock On, Dodge, and Wish Cards.`,
`While all characters receive the cards Strike, Defend, and Step as
starter cards, they are usually not the greatest later into the game.
However, you can still make use of these as Shinmyoumaru.`,
`Sometimes, it is even worth it to create additional basic cards,
and they can often turn out better than many added cards to your deck.`,
`Lock On is similar to Vulnerable, but additional stacks of Lock On
increase damage taken. For each stack of Lock On you apply to an enemy,
they take 10% more damage, and the stacks degarde by 1 each turn.`,
`While it can take some time, stacking lots of Lock On on a
targetted enemy can be extremely effective in terms of damage multiplier,
but you must be careful to not let the stacks reduce back down to 0.`,
`Dodge is a defense measure that can be a supplement to your block.
One stack of Dodge completely negates one enemy attack of any size.
However, enemies that hit multiple times in one attack will get around this.`,
`Dodge is very useful against enemies that hit very hard, but has
a lot of weaknesses against multihits. It also lacks some reliability, as you
lose 1 Dodge at the start of your turn, making it hard to buid lots of Dodge.`,
`Wish Cards are effective, and activate every turn, but are expensive.
Wish Cards cost Wish Power, a resource to manage (you start with 3 each combat).`,
`The Wish Card will spend Wish Power every turn it is active after
you play it, and you can play it again to disable it.`,
`If you do not have enough Wish Power to activate its effect
at the start of your turn, the wish will remove itself. Remember, they only
take effect at the start of each of your turns, not when you play them.`,
`END OF TUTORIAL`,
                ]
            break
            case 25:
                transition.scene='battle'
                game.player=[18]
                game.deck=[0]
                this.battle.player=[18]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(0,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(50)
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].activate(0)
                this.popups=[[],[],[],[],[],[],[],[]]
                this.pages=[
`Merlin, the Fanfare, is designed around patience and variance.
Her gimmicks include: Countdowns, Freeze, and Skills.`,
`Countdowns are a set of cards with a special marker on the energy symbol.
Many characters have some countdowns, but Merlin has the most.`,
`Countdowns can be paid for over time by putting energy in.
Here, one energy can be put into the countdown.`,
`Countdowns are very diverse and a wide variety of strategies involve them.
As a group of cards, there are a lot of interactions.`,
`Freeze is a status effect that is built up on each turn individually.
At the end of each turn, Freeze triggers and all Freeze is removed,
unlike other statuses that persist between turns.`,
`The damage dealt by Freeze scales quickly, as it is equal
to the square of the amount of Freeze applied. Because of this,
you should aim to apply as much Freeze as you can quickly.`,
`Finally, Merlin can make specific use of skill cards,
and can form some combos around them.`,
`END OF TUTORIAL`,
                ]
            break
            case 26:
                transition.scene='battle'
                game.player=[19]
                game.deck=[0]
                this.battle.player=[19]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].activate(0)
                this.popups=[[],[],[],[],[],[],[],[]]
                this.pages=[
`Ducopo, the Adventurer, can follow several distinct plans.
His gimmicks include: Foil cards, Quests, and expensive cards.`,
`Foil is an edition that adds 5 block when the card is used.
As Donakho, you can generate a lot of foil cards, which can
come in handy as a block source or can act as its own synergy.`,
`Furthermore, Ducopo has access to Chocolate Chip,
a status that deals 1 splash damage when you gain block.
If you gain many foil cards, it can deal plenty of damage.`,
`Ducopo's token card is Tile, which draws 1 card and exhausts
1 card. While useful generally for exhausting and being draw-neutral,
almost all sources of Tiles make them foil on creation.`,
`Quests are cards that require a series of tasks to be completed,
but reward the player with a free effect afterward.`,
`The "-1:" indicator indicates what must be done to reduce
the remaining progress on the quest by 1. When the progress is down
to 0, the quest is complete and can be played for the active effect.`,
`X cost and 2 cost cards can be used by Ducopo more than
for other characters. Despite the high energy expenditure, there
are many ways to build around these high-cost cards.`,
`END OF TUTORIAL`,
                ]
            break
            case 27:
                transition.scene='battle'
                game.player=[20]
                game.deck=[0]
                this.battle.player=[20]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.setEnergy(99,0)
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].activate(0)
                this.popups=[[],[],[],[],[],[],[],[]]
                this.pages=[
`Randy, the Inspector, is about controlling chaos.
His gimmicks include: Mass, Pulling, and Fuel.`,
`Many of Randy's cards include an effect that targets a random card.
Whenever one of these is triggered, cards with Mass will be
prioritized over all other cards and chosen first.`,
`When such a random effect targets a card with mass,
that card will be considered Pulled. There are also other ways
to Pull a card, and Pulling on many cards gives special effects.`,
`Fuel cards have additional effects whenever enough fuel
has been added. Whenever a card is played, it fuels your hand for 1.`,
`Fuel is used up on play regardless of if you have enough of it,
but if you do not play a card, it retains its Fuel counter.`,
`Randy's token card is Dark Matter, which stays in your hand
for a bit of time, but more importantly can be used as fodder
for random effects since it has mass.`,
`Dark Matter, by virtue of being free and exhausting,
can also be used as cheap fuel for any fuel cards.`,
`END OF TUTORIAL`,
                ]
            break
        }
        this.anim.pages=[]
        for(let a=0,la=this.pages.length;a<la;a++){
            this.anim.pages.push(0)
        }
    }
    nextPage(){
        switch(this.tutorial){
            case 0:
                switch(this.page){
                    case 2: case 8:
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                    break
                    case 4:
                        this.battle.combatantManager.summonCombatantDefinite({x:2,y:1},findName('AttackDummy',types.combatant),-30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=5
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].activated=true
                        this.battle.updateTargetting()
                    break
                    case 5:
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,0)
                    break
                    case 9:
                        this.battle.combatantManager.summonCombatantDefinite({x:0,y:0},findName('NumberDummy',types.combatant),-30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                    break
                    case 10:
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                    break
                    case 11:
                        this.battle.overlayManager.closeAll()
                        this.battle.overlayManager.overlays[0][0].active=true
                        this.battle.overlayManager.overlays[0][0].activate([0,[
                            {type:1,value:[0,0,8]},
                            {type:0,value:[50]}]])
                    break
                }
            break
            case 2:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Fatigue',types.card),0,constants.playerNumber+1)
                    break
                    case 2:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Strike But\nExhaust',types.card),0,0)
                    break
                    case 4:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Strike But\nRetain',types.card),0,0)
                    break
                    case 5:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Strike But\nInnate',types.card),0,0)
                    break
                    case 6:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Strike But\nEthereal',types.card),0,0)
                    break
                    case 7:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Placeholder\nUnplayable',types.card),0,0)
                    break
                }
            break
            case 3:
                switch(this.page){
                    case 2:
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                    break
                    case 5:
                        this.battle.overlayManager.closeAll()
                        this.battle.overlayManager.overlays[0][0].active=true
                        this.battle.overlayManager.overlays[0][0].activate([0,[
                            {type:1,value:[0,0,8]},
                            {type:0,value:[50]}]])
                    break
                    case 6:
                        transition.trigger=true
                        transition.scene='map'
                    break
                }
            break
            case 4:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Apply\nWeak',types.card),0,0)
                    break
                    case 2:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Apply\nVulnerable',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                    break
                    case 3:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Apply\nStun',types.card),0,0)
                    break
                    case 4:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Get\nStrength',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                    break
                    case 5:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Get\nDexterity',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,0)
                    break
                    case 6:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Get\nBuffer',types.card),0,0)
                    break
                }
            break
            case 5:
                switch(this.page){
                    case 3:
                        this.battle.setupBattle(types.encounter[findName('Kugelblitz',types.encounter)])
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                    break
                    case 6:
                        this.battle.setupBattle(types.encounter[findName('TutorialTrick',types.encounter)])
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        
                    break
                }
            break
            case 6:
                switch(this.page){
                    case 2:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Initiative',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Push',types.card),0,types.card[findName('Push',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Push',types.card),0,types.card[findName('Push',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Diagonal\nStep',types.card),0,types.card[findName('Diagonal\nStep',types.card)].list)
                    break
                    case 3:
                        this.battle.setupBattle(types.encounter[findName('TutorialBlank',types.encounter)])
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:0},findName('AttackDummy',types.combatant),-30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=5
                        this.battle.combatantManager.summonCombatantDefinite({x:0,y:1},findName('NumberDummy',types.combatant),90)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.combatantManager.summonCombatantDefinite({x:2,y:3},findName('NumberDummy',types.combatant),150)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Shiv',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Positioning\nMove',types.card),0,types.card[findName('Positioning\nMove',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Pistol',types.card),0,types.card[findName('Pistol',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Quick\nKick',types.card),0,types.card[findName('Quick\nKick',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Taunt',types.card),0,types.card[findName('Taunt',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Pull',types.card),0,types.card[findName('Pull',types.card)].list)
                    break
                    case 4:
                        this.battle.setupBattle(types.encounter[findName('TutorialBlank',types.encounter)])
                        this.battle.combatantManager.summonCombatantDefinite({x:0,y:0},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(50)
                        this.battle.combatantManager.summonCombatantDefinite({x:3,y:2},findName('NumberDummy',types.combatant),-90)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.combatantManager.summonCombatantDefinite({x:4,y:2},findName('NumberDummy',types.combatant),-90)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                        this.battle.combatantManager.summonCombatantDefinite({x:2,y:3},findName('NumberDummy',types.combatant),150)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Nondirectional\nBeam',types.card),0,types.card[findName('Nondirectional\nBeam',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Shotgun',types.card),0,types.card[findName('Shotgun',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Skewed\nStrike',types.card),0,types.card[findName('Skewed\nStrike',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Signature\nMove',types.card),0,types.card[findName('Signature\nMove',types.card)].list)
                    break
                    case 5:
                        this.battle.setupBattle(types.encounter[findName('TutorialBlank',types.encounter)])
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:0},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.combatantManager.summonCombatantDefinite({x:0,y:2},findName('NumberDummy',types.combatant),90)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:2},findName('NumberDummy',types.combatant),90)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(20)
                        this.battle.combatantManager.summonCombatantDefinite({x:3,y:2},findName('NumberDummy',types.combatant),-90)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(20)
                        this.battle.combatantManager.summonCombatantDefinite({x:4,y:2},findName('NumberDummy',types.combatant),-90)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.combatantManager.summonCombatantDefinite({x:4,y:3},findName('NumberDummy',types.combatant),90)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Close\nIn',types.card),0,types.card[findName('Close\nIn',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Pull',types.card),0,types.card[findName('Pull',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Repeater',types.card),0,types.card[findName('Repeater',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Split\nKick',types.card),0,types.card[findName('Split\nKick',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Conclude',types.card),0,types.card[findName('Conclude',types.card)].list)
                    break
                    case 6:
                        this.battle.setupBattle(types.encounter[findName('TutorialBlank',types.encounter)])
                        this.battle.combatantManager.summonCombatantDefinite({x:2,y:3},findName('AttackDummy',types.combatant),150)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=5
                        this.battle.combatantManager.summonCombatantDefinite({x:3,y:3},findName('NumberDummy',types.combatant),-150)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.combatantManager.summonCombatantDefinite({x:0,y:0},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Lightspeed',types.card),0,types.card[findName('Lightspeed',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Blaze\nAhead',types.card),0,types.card[findName('Blaze\nAhead',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Spot\nWeakness',types.card),0,types.card[findName('Spot\nWeakness',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Follow\nUp',types.card),0,types.card[findName('Follow\nUp',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Clear\nUp',types.card),0,types.card[findName('Clear\nUp',types.card)].list)
                        this.battle.dropDraw(0,findName('Caffeine\nHigh',types.card),0,types.card[findName('Caffeine\nHigh',types.card)].list)
                    break
                }
            break
            case 7:
                switch(this.page){
                    case 1:
                        for(let a=0,la=constants.playerNumber;a<la;a++){
                            this.battle.cardManagers[0].hand.add(findName('Placeholder\n$colorcharacter Card',types.card),0,a+1)
                        }
                        this.battle.cardManagers[0].allEffect(2,43)
                        this.battle.cardManagers[0].hand.compact=0.7
                    break
                }
            break
            case 8:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,1)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,1)
                        this.battle.cardManagers[0].hand.add(findName('Jolt',types.card),0,1)
                        this.battle.cardManagers[0].hand.add(findName('Combo\nFinish',types.card),0,1)
                    break
                    case 3:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Triple\nPunch',types.card),0,1)
                        this.battle.cardManagers[0].hand.add(findName('Jerk',types.card),0,1)
                        this.battle.cardManagers[0].hand.add(findName('Virtuous\nCircle',types.card),0,1)
                        this.battle.cardManagers[0].hand.add(findName('Combo\nJuice',types.card),0,1)
                    break
                    case 4:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,1)
                        this.battle.cardManagers[0].hand.add(findName('Ready\nUp',types.card),0,1)
                    break
                    case 5:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(50)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Security\nPack',types.card),0,1)
                        this.battle.cardManagers[0].hand.add(findName('Sapper\nPack',types.card),0,1)
                        this.battle.cardManagers[0].hand.add(findName('Infantry\nPack',types.card),0,1)
                    break
                }
            break
            case 9:
                switch(this.page){
                    case 2:
                        this.battle.cardManagers[0].hand.add(findName('Increment',types.card),0,2)
                    break
                    case 3:
                        this.battle.cardManagers[0].hand.add(findName('Convect',types.card),0,2)
                        this.battle.cardManagers[0].hand.add(findName('Recoup',types.card),0,2)
                    break
                    case 4:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Overgrow',types.card),0,2)
                    break
                    case 5:
                        this.battle.cardManagers[0].hand.add(findName('Thorns',types.card),0,2)
                        this.battle.cardManagers[0].hand.add(findName('Spring',types.card),0,2)
                    break
                    case 6:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Recover',types.card),0,2)
                        this.battle.cardManagers[0].hand.add(findName('Trapezius',types.card),0,2)
                    break
                    case 7:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Liquorice',types.card),0,2)
                        this.battle.cardManagers[0].hand.add(findName('Poison\nSplash',types.card),0,2)
                    break
                }
            break
            case 10:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Quick\nStab',types.card),0,3)
                        this.battle.cardManagers[0].hand.add(findName('Scratch',types.card),0,3)
                        this.battle.cardManagers[0].hand.add(findName('Gush of\nBlood',types.card),0,3)
                    break
                    case 4:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Cut',types.card),0,3)
                    break
                    case 5:
                        this.battle.cardManagers[0].hand.add(findName('Throw\nScythe',types.card),0,3)
                        this.battle.cardManagers[0].hand.add(findName('Gather',types.card),0,3)
                    break
                    case 6:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Danger',types.card),0,3)
                        this.battle.cardManagers[0].hand.add(findName('Peace',types.card),0,3)
                        this.battle.cardManagers[0].hand.add(findName('Windslash',types.card),0,3)
                    break
                }
            break
            case 11:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Shiv',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Blade\nDance',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Knifing',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Borrowed\nBlade',types.card),0,4)
                    break
                    case 4:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(40)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Choke',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Pulsate',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Endless\nStream',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Endless\nStream',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Backstab',types.card),0,4)
                    break
                }
            break
            case 12:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Charge',types.card),0,5)
                    break
                    case 3:
                        this.battle.cardManagers[0].hand.add(findName('Dualcast',types.card),0,5)
                    break
                    case 5:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Charge',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Shielding',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Dualcast',types.card),0,5)
                    break
                    case 7:
                        this.battle.cardManagers[0].hand.add(findName('Charge',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Shielding',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Darkness',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Zap',types.card),0,5)
                    break
                    case 8:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Converge',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Node',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Charge',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Dualcast',types.card),0,5)
                    break
                }
            break
            case 13:
                switch(this.page){
                    case 2:
                        this.battle.cardManagers[0].hand.add(findName('Scavenge',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Build\nMiniturret',types.card),0,6)
                    break
                    case 3:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:0,y:0},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.combatantManager.summonConstruct({x:1,y:1},findName('Wall',types.combatant),1,30,0)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Breaking\nShot',types.card),0,6)
                    break
                    case 4:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Supply\nCrate',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Build\nWall',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Build\nTurret',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Build\nStrengthener',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Build\nUpgrader',types.card),0,6)
                    break
                    case 6:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Supply\nCrate',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Build\nSpike Pillar',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Build\nTeleporter Start',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Build\nReadout',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Build\nGun Rack',types.card),0,6)
                    break
                    case 7:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Phase\nShift',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Extend',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Materials',types.card),0,6)
                    break
                    case 8:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),1,6)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),2,6)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),1,6)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),2,6)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,6)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),1,6)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),2,6)
                    break
                }
            break
            case 14:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Crescendo',types.card),0,7)
                        this.battle.cardManagers[0].hand.add(findName('Empty\nFist',types.card),0,7)
                    break
                    case 2:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,7)
                        this.battle.cardManagers[0].hand.add(findName('Crescendo',types.card),0,7)
                    break
                    case 3:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.cardManagers[0].hand.add(findName('Tranquility',types.card),0,7)
                        this.battle.cardManagers[0].hand.add(findName('Empty\nFist',types.card),0,7)
                    break
                    case 4:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Forward',types.card),0,7)
                    break
                    case 5:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('AttackDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=10
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,7)
                        this.battle.cardManagers[0].hand.add(findName('Standstill',types.card),0,7)
                    break
                    case 7:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,7)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,7)
                        this.battle.cardManagers[0].hand.add(findName('Conviction',types.card),0,7)
                        this.battle.cardManagers[0].hand.add(findName('Conviction',types.card),0,7)
                    break
                    case 9:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(15)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Secure\nBlade',types.card),0,7)
                        this.battle.cardManagers[0].hand.add(findName('Avoidance',types.card),0,7)
                    break
                }
            break
            case 15:
                switch(this.page){
                    case 2:
                        this.battle.cardManagers[0].hand.add(findName('Highball',types.card),0,8)
                        this.battle.cardManagers[0].hand.add(findName('Asteroid',types.card),0,8)
                        this.battle.cardManagers[0].hand.add(findName('Ampstep',types.card),0,8)
                    break
                    case 4:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Wisp',types.card),0,constants.playerNumber+1)
                    break
                    case 5:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Charge\nUp',types.card),0,8)
                        this.battle.cardManagers[0].hand.add(findName('Charge\nUp',types.card),0,8)
                        this.battle.cardManagers[0].hand.add(findName('Charge\nFlare',types.card),0,8)
                    break
                    case 6:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(30)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Leyline',types.card),0,8)
                        this.battle.cardManagers[0].hand.add(findName('Mini-\nNeptune',types.card),0,8)
                        this.battle.cardManagers[0].hand.add(findName('Vanilla\nRay',types.card),0,8)
                    break
                }
            break
            case 16:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Pistol',types.card),0,9)
                        this.battle.cardManagers[0].hand.add(findName('Shotgun',types.card),0,9)
                    break
                    case 2:
                        this.battle.cardManagers[0].hand.add(findName('Bullet\nSupply',types.card),0,9)
                        this.battle.cardManagers[0].hand.add(findName('Lucky\nBullet',types.card),0,9)
                    break
                    case 3:
                        this.battle.combatantManager.resetCombatants()
                        for(let a=0,la=6;a<la;a++){
                            this.battle.combatantManager.summonCombatantDefinite({x:2-transformDirection(0,30+a*60)[0],y:2-transformDirection(0,30+a*60)[1]},findName('NumberDummy',types.combatant),30+a*60)
                            this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        }
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Stacked\nStrike',types.card),0,9)
                        this.battle.cardManagers[0].hand.add(findName('Snapshot',types.card),0,9)
                        this.battle.cardManagers[0].hand.add(findName('Hit the\nSpot',types.card),0,9)
                    break
                    case 5:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('AttackDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(20)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=5
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].activate(0)
                        this.battle.updateTargetting()
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,9)
                        this.battle.cardManagers[0].hand.add(findName('Lighter',types.card),0,9)
                        this.battle.cardManagers[0].hand.add(findName('Lighter',types.card),0,9)
                    break
                }
            break
            case 17:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Lucky\nStrike',types.card),0,10)
                        this.battle.cardManagers[0].hand.add(findName('Cracked\nWave',types.card),0,10)
                        this.battle.cardManagers[0].hand.add(findName('Jack in\nthe Box',types.card),0,10)
                    break
                    case 2:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Victory\nSpin',types.card),0,10)
                        this.battle.cardManagers[0].hand.add(findName('Premium\nHeart',types.card),0,10)
                        this.battle.cardManagers[0].hand.add(findName('Safe\nBet',types.card),0,10)
                    break
                    case 3:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(50)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Dice\nThrow',types.card),0,10)
                        this.battle.cardManagers[0].hand.add(findName('Stun\nRoll',types.card),0,10)
                    break
                    case 4:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Fixed\nDice',types.card),0,10)
                        this.battle.cardManagers[0].hand.add(findName('Six\nSector',types.card),0,10)
                    break
                    case 5:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Pan For\nGold',types.card),0,10)
                        this.battle.cardManagers[0].hand.add(findName('Shock\nTherapy',types.card),0,10)
                        this.battle.cardManagers[0].hand.add(findName('Capitalism',types.card),0,10)
                    break
                }
            break
            case 18:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Habit',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Survivor',types.card),0,11)
                        this.battle.cardManagers[0].hand.add(findName('Prepared',types.card),0,11)
                    break
                    case 2:
                        this.battle.cardManagers[0].hand.add(findName('Dump',types.card),0,11)
                        this.battle.cardManagers[0].hand.add(findName('Eviscerate',types.card),0,11)
                        this.battle.cardManagers[0].hand.add(findName('Tactician',types.card),0,11)
                    break
                    case 5:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Jinx',types.card),0,11)
                        this.battle.setEnergy(99,0)
                    break
                    case 7:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Silver\nDagger',types.card),0,11)
                        this.battle.cardManagers[0].hand.add(findName('Silver\nShield',types.card),0,11)
                        this.battle.setEnergy(99,0)
                    break
                    case 8:
                        this.battle.cardManagers[0].hand.add(findName('Acanthite',types.card),0,11)
                        this.battle.cardManagers[0].hand.add(findName('Pyrargyrite',types.card),0,11)
                    break
                }
            break
            case 19:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Clawup',types.card),0,12)
                        this.battle.cardManagers[0].hand.add(findName('Advance\nClaw',types.card),0,12)
                        this.battle.cardManagers[0].hand.add(findName('Claw',types.card),0,12)
                    break
                    case 3:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:0,y:0},findName('MoveDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(20)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Buzzer',types.card),0,12)
                        this.battle.cardManagers[0].hand.add(findName('Tesla',types.card),0,12)
                    break
                    case 5:
                        this.battle.cardManagers[0].hand.add(findName('Transistor',types.card),0,12)
                        this.battle.cardManagers[0].hand.add(findName('System\nScan',types.card),0,12)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,12)
                    break
                    case 6:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:0,y:0},findName('MoveDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('USB\nCable',types.card),0,12)
                        this.battle.cardManagers[0].hand.add(findName('PCIE\nCable',types.card),0,12)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,12)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,12)
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,12)
                        this.battle.setEnergy(99,0)
                    break
                }
            break
            case 20:
                switch(this.page){
                    case 2:
                        this.battle.cardManagers[0].hand.add(findName('Supremum',types.card),0,13)
                        this.battle.cardManagers[0].hand.add(findName('Infimum',types.card),0,13)
                    break
                    case 3:
                        this.battle.cardManagers[0].hand.add(findName('Restraint',types.card),0,13)
                        this.battle.cardManagers[0].hand.add(findName('Supremum',types.card),0,13)
                        this.battle.cardManagers[0].hand.add(findName('Time\nFlies',types.card),0,13)
                        this.battle.setEnergy(99,0)
                    break
                    case 4:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('MoveDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(60)
                        this.battle.cardManagers[0].hand.add(findName('Polar\nStar',types.card),0,13)
                        this.battle.cardManagers[0].hand.add(findName('Quaternion\nStar',types.card),0,13)
                    break
                    case 5:
                        this.battle.cardManagers[0].hand.add(findName('Clock\nHand',types.card),0,13)
                    break
                    case 7:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('MoveDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(20)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].addBlock(5)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Trowel',types.card),0,13)
                        this.battle.cardManagers[0].hand.add(findName('Unearth',types.card),0,13)
                    break
                    case 8:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Vault',types.card),0,13)
                        this.battle.cardManagers[0].hand.add(findName('Time\nDetective',types.card),0,13)
                    break
                }
            break
            case 21:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Synthesis',types.card),0,14)
                        this.battle.cardManagers[0].hand.add(findName('Supply',types.card),0,14)
                    break
                    case 6:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Unstable\nConcoction',types.card),0,14)
                        this.battle.cardManagers[0].hand.add(findName('Pipette',types.card),0,14)
                    break
                    case 8:
                        this.battle.cardManagers[0].discard.cards=[]
                        this.battle.cardManagers[0].allEffect(2,22)
                        this.battle.cardManagers[0].hand.add(findName('Craft\nBomb',types.card),0,14)
                        this.battle.cardManagers[0].hand.add(findName('Examination',types.card),0,14)
                        this.battle.cardManagers[0].hand.add(findName('Examination',types.card),0,14)
                    break
                }
            break
            case 22:
                switch(this.page){
                    case 1:
                        for(let a=0,la=12;a<la;a++){
                            this.battle.cardManagers[0].hand.add(findName('',types.card),0,15)
                        }
                    break
                    case 2:
                        this.battle.cardManagers[0].hand.add(findName('Elemental\nPower',types.card),0,15)
                    break
                    case 3:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),50)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,15)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,15)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,15)
                        this.battle.cardManagers[0].hand.add(findName('Passage\nof Time',types.card),0,15)
                    break
                    case 4:
                        this.battle.cardManagers[0].hand.add(findName('Flow of\nHistory',types.card),0,15)
                        this.battle.cardManagers[0].hand.add(findName('Passage\nof Time',types.card),0,15)
                    break
                    case 5:
                        this.battle.cardManagers[0].hand.add(findName('Pyramid',types.card),0,15)
                        this.battle.cardManagers[0].hand.add(findName('Pyramid',types.card),0,15)
                    break
                }
            break
            case 23:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Quietude',types.card),0,16)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,16)
                    break
                    case 3:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),50)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(40)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Discus\nTalisman',types.card),0,16)
                        this.battle.cardManagers[0].hand.add(findName('Balanced\nDiscuses',types.card),0,16)
                    break
                    case 5:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),50)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Dreamscape',types.card),0,16)
                        this.battle.dropDraw(0,findName('Defend',types.card),0,16)
                        this.battle.dropDraw(0,findName('Strike',types.card),0,16)
                    break
                    case 6:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),50)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Dreamscape',types.card),0,16)
                        this.battle.cardManagers[0].hand.add(findName('Salamander\nSpear',types.card),0,16)
                        this.battle.dropDraw(0,findName('Defend',types.card),0,16)
                        this.battle.dropDraw(0,findName('Strike',types.card),0,16)
                        this.battle.dropDraw(0,findName('Strike',types.card),0,16)
                    break
                }
            break
            case 24:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,17)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,17)
                    break
                    case 2:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,17)
                        this.battle.cardManagers[0].hand.add(findName('Starter\nSlash',types.card),0,17)
                        this.battle.cardManagers[0].hand.add(findName('Maintenance',types.card),0,17)
                        this.battle.cardManagers[0].hand.add(findName('Long\nReach',types.card),0,17)
                    break
                    case 3:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Pushpin',types.card),0,17)
                        this.battle.cardManagers[0].hand.add(findName('Pushpin',types.card),0,17)
                        this.battle.cardManagers[0].reserve.add(findName('Heart\nSlash',types.card),0,17)
                        this.battle.cardManagers[0].reserve.add(findName('Extending\nSword',types.card),0,17)
                    break
                    case 5:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:2,y:1},findName('AttackDummy',types.combatant),-30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(20)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=10
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].activate(0)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Dodge',types.card),0,17)
                    break
                    case 7:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(20)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Giant\nRotation',types.card),0,17)
                        this.battle.cardManagers[0].hand.add(findName('Collect\nPower',types.card),0,17)
                    break
                }
            break
            case 25:
                switch(this.page){
                    case 1:
                        this.battle.setEnergy(0,0)
                        this.battle.cardManagers[0].hand.add(findName('Tetraphobia',types.card),0,18)
                    break
                    case 2:
                        this.battle.setEnergy(1,0)
                    break
                    case 3:
                        this.battle.setEnergy(7,0)
                        this.battle.cardManagers[0].hand.add(findName('Tetraphobia',types.card),0,18)
                        this.battle.cardManagers[0].hand.add(findName('Cloak',types.card),0,18)
                        this.battle.cardManagers[0].hand.add(findName('Cascade',types.card),0,18)
                        this.battle.cardManagers[0].hand.add(findName('Magic\nSwitch',types.card),0,18)
                    break
                    case 5:
                        this.battle.setEnergy(99,0)
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Beaming\nFrost',types.card),0,18)
                        this.battle.cardManagers[0].hand.add(findName('Snowdrop',types.card),0,18)
                    break
                    case 6:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(15)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Guarantee',types.card),0,18)
                        this.battle.cardManagers[0].hand.add(findName('Downbeat',types.card),0,18)
                    break
                }
            break
            case 26:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,19,2)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,19,2)
                    break
                    case 2:
                        this.battle.cardManagers[0].hand.add(findName('Cookie\nJar',types.card),0,19)
                        this.battle.cardManagers[0].hand.add(findName('Mint\nCondition',types.card),0,19)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,19,2)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,19,2)
                        this.battle.cardManagers[0].hand.add(findName('Nod\nOff',types.card),0,19,2)
                    break
                    case 3:
                        this.battle.cardManagers[0].hand.add(findName('Tile',types.card),0,0,2)
                    break
                    case 4:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                        this.battle.endTurn()
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Passivity',types.card),0,19)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,19)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,19)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,19)
                    break
                    case 6:
                        this.battle.setEnergy(3,0)
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(30)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Charge\nStrike',types.card),0,19)
                        this.battle.cardManagers[0].hand.add(findName('Big\nStrike',types.card),0,19)
                        this.battle.cardManagers[0].hand.add(findName('High\nGround',types.card),0,19)
                    break
                }
            break
            case 27:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Exhausting\nStrike',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('Golden\nGun',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,20)
                    break
                    case 2:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:2,y:1},findName('AttackDummy',types.combatant),-30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(50)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=10
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].activated=true
                        this.battle.updateTargetting()
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Exhausting\nStrike',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('Shooting\nStar',types.card),0,20)
                    break
                    case 3:
                        this.battle.cardManagers[0].hand.add(findName('Sinter',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('',types.card),0,20)
                    break
                    case 5:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(25)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Exhausting\nStrike',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('Grit',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('Dark\nMatter',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Dark\nMatter',types.card),0,0)
                    break
                    case 6:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Sinter',types.card),0,20)
                        this.battle.cardManagers[0].hand.add(findName('Dark\nMatter',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Dark\nMatter',types.card),0,0)
                    break
                }
            break
        }
    }
    display(){
        if(this.active){
            this.layer.fill(180)
            this.layer.stroke(150)
            this.layer.strokeWeight(5)
            this.layer.rect(625,50,480,80,5)
            this.layer.rect(625,115,30,30,5)
            this.layer.fill(60)
            this.layer.noStroke()
            regTriangle(this.layer,622.5,115,10,10,-30)
            this.layer.textSize(12)
            for(let a=0,la=this.pages.length;a<la;a++){
                if(this.anim.pages[a]>0){
                    this.layer.noStroke()
                    this.layer.fill(0,this.anim.pages[a])
                    this.layer.text(this.pages[a],625,50)
                    this.layer.stroke(200,0,0,this.anim.pages[a])
                    this.layer.strokeWeight(5)
                    this.layer.noFill()
                    for(let b=0,lb=this.popups[a].length;b<lb;b++){
                        this.layer.ellipse(this.popups[a][b].x,this.popups[a][b].y,this.popups[a][b].size*2)
                    }
                }
            }
        }
    }
    update(){
        for(let a=0,la=this.anim.pages.length;a<la;a++){
            this.anim.pages[a]=smoothAnim(this.anim.pages[a],this.page==a,0,1,5)
        }
    }
    onClick(){
        if(this.active&&pointInsideBox({position:inputs.rel},{position:{x:625,y:115},width:30,height:30})){
            if(this.page==this.pages.length-1){
                transition.trigger=true
                transition.scene='title'
                transition.convert=true
            }else{
                this.page++
                this.nextPage()
            }
        }
    }
    onKey(key,code){
        if(this.active&&(key=='n'||key=='N')){
            if(this.page==this.pages.length-1){
                transition.trigger=true
                transition.scene='title'
                transition.convert=true
            }else{
                this.page++
                this.nextPage()
            }
        }
    }
}