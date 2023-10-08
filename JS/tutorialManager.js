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
                    [{x:26,y:550,size:30},{x:26,y:578,size:30}],
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
You may get more option from relics.`,
`At a shop, you can buy cards, remove a card, or buy relics.
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
                this.battle.energy.main[0]=99
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(99)
                this.popups=[[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Cards will often have attributes attached to them.
You may have seen some of them already (such is Fatigue).`,
`Fatigue cards add a Fatigue card to your discard pile.
Fatigue costs 1 and has no effect; it only wastes draw.
Most attack and movement cards have Fatigue.`,
`Exhaust cards go to the exhaust pile when played.
Cards can be exhausted in other ways and also go to the exhaust pile.`,
`Cards in the exhaust pile remain there except for niche situations.
In affect, Exhaust cards can only be used once per combat.
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
                this.battle.energy.main[0]=99
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialHotkey',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.nodeManager.setupTutorialMap()
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
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
                this.battle.energy.main[0]=99
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
`Dexterity is similar to strength, but gives +20% more block for each stack.
They also never decay. Use dexterity to get more block from the defend,
and tank the enemy's attack.`,
`Buffer is a special status effect that completely eliminates the next hit taken.
Unlike its counterpart dodge, buffer works on all hits, even ones without a user.
It only blocks one hit, and is weak against multi-hits. Use buffer to tank a hit.`,
`Keep in mind that you can read the text of unfamiliar status effects by
mouseover on a character. The names of most status effects are self-explanatory.`,
`Some more status effects may be explained in the character tutorials.
Those characters often have status effects that they use often.`,
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
                this.battle.energy.main[0]=99
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
            case 6:
                transition.scene='battle'
                game.player=[1]
                game.deck=[0]
                this.battle.player=[1]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.energy.main[0]=99
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(20)
                this.popups=[[],[],[],[],[],[],[],[]]
                this.pages=[
`George, the Agent, is fairly simple, but can unleash deadly combos.
His gimmicks include: Combo, Conditioning, Packs`,
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
            case 7:
                transition.scene='battle'
                game.player=[2]
                game.deck=[0]
                this.battle.player=[2]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.energy.main[0]=99
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(5)
                this.popups=[[],[],[],[],[],[],[],[]]
                this.pages=[
`Lira, the Apprentice, is designed to be fairly simple to play,
possessing many basic cards. However, she still has few gimmicks.
They include: Health, Plant Tiles, Fatigue Manipulation`,
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
`Finally, we have Fatigue manipulation. Most other characters are stuck with Fatigue,
but as Lira, there are ways to remove fatigue or capitalize off of it.
But still, Fatigue remains an issue during longer battles.`,
`END OF TUTORIAL`,
                ]
            break
            case 8:
                transition.scene='battle'
                game.player=[3]
                game.deck=[0]
                this.battle.player=[3]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.energy.main[0]=99
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(100)
                this.popups=[[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Sakura, the Creation, has gimmicks that are harmful and helpful.
Namely, they are Bleed, Armament, Balance, and Confusion,`,
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
`Confusion is a status effect that causes enemies to face random directions.
Because they rarely face the player, confused enemies are not really a threat.`,
`END OF TUTORIAL`,
                ]
            break
            case 9:
                transition.scene='battle'
                game.player=[4]
                game.deck=[0]
                this.battle.player=[4]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.energy.main[0]=99
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialStatus',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(35)
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].attack[0].effect[0]=5
                this.popups=[[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Certes, the Phantasm, is one of the more confined characters,
but while she may have limited abilities, they can be build in many ways.
her gimmicks include: Shivs, Choice Discard, Manipulatable Cards.`,
`Shivs are the central mechanic of her strategy. They are a free, low-damage card.
The mechanics around shivs relate to getting more of them, and increasing their damage.
Getting Shivs as Certes is not hard, but getting them economically is a challenge.`,
`It is important to not get to many Shivs, as they are not Ethereal.
If a target for a Shiv is not found, it will remain in your deck, wasting draw.`,
`Choice discard refers to being able to choose a certain number of cards to discard.
This appears as a red outline over your cards as long as discarding remains active.`,
`Sometimes, this can be useful just to get rid of cards,
but some cards benefit from being discarded, or another card being discarded.`,
`While not exactly a gimmick, many cards relate to the motif of changing values.
These can either gain or lose cost due to stimuli, or rely on the card context.`,
`Some of these function best after something else has happened,
or when the card states are a certain way.`,
`There's also a minor gimmick with X cost cards and gaining energy.`,
`END OF TUTORIAL`,
                ]
            break
            case 10:
                transition.scene='battle'
                game.player=[5]
                game.deck=[0]
                this.battle.player=[5]
                this.battle.deck=[0]
                this.battle.create()
                this.battle.energy.main[0]=99
                this.battle.energy.gen[0]=99
                this.battle.energy.base[0]=99
                this.battle.setupBattle(types.encounter[findName('TutorialBasic',types.encounter)])
                this.battle.cardManagers[0].reserve.cards=[]
                this.battle.cardManagers[0].deck.cards=[]
                this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(100)
                this.popups=[[],[],[],[],[],[],[],[],[],[],[]]
                this.pages=[
`Azis, the Executor, is one of the harder characters to play.
Nearly all of his strategies revolve around Orbs, his primary gimmick.`,
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
The shield orb adds 16 block.
The explosive orb deals 20 splash damage.`,
`The energy orb gives 3 energy.
The dark orb's damage increases every turn, starting at 6 and increasing by 6.
The lightning orb deals 8 damage, and also deals 4 passive damage per turn.`,
`The light orb draws 4 cards.
The fire orb deals 30 damage, but every turn adds a burn to your deck.
The ice orb applies 1 freeze (effectively a stun).`,
`The buff orb applies 3 strength.
The nerf orb applies 3 weak.
The poison orb applies 4 poison.`,
`Orbs can be improved through focus,
and enemies can be made weak to orbs using lock-on.`,
`END OF TUTORIAL`,
                ]
            break
            case 11:
            break
            case 12:
            break
            case 13:
            break
            case 14:
            break
            case 15:
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
                        this.battle.cardManagers[0].hand.add(findName('Fatigue',types.card),0,game.playerNumber+1)
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
                    case 2:
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
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Nondirectional\nBeam',types.card),0,types.card[findName('Nondirectional\nBeam',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Shotgun',types.card),0,types.card[findName('Shotgun',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Skewed\nStrike',types.card),0,types.card[findName('Skewed\nStrike',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Signature\nMove',types.card),0,types.card[findName('Signature\nMove',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Hourglass C',types.card),0,types.card[findName('Hourglass C',types.card)].list)
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
                        this.battle.cardManagers[0].hand.add(findName('Step',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Lightspeed',types.card),0,types.card[findName('Lightspeed',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Blaze',types.card),0,types.card[findName('Blaze',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Spot\nWeakness',types.card),0,types.card[findName('Spot\nWeakness',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Follow\nUp',types.card),0,types.card[findName('Follow\nUp',types.card)].list)
                        this.battle.cardManagers[0].hand.add(findName('Clear\nUp',types.card),0,types.card[findName('Clear\nUp',types.card)].list)
                        this.battle.cardManagers[0].reserve.add(findName('Caffeine\nHigh',types.card),0,types.card[findName('Caffeine\nHigh',types.card)].list)
                    break
                }
            break
            case 6:
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
            case 7:
                switch(this.page){
                    case 2:
                        this.battle.cardManagers[0].hand.add(findName('Increment',types.card),0,2)
                    break
                    case 3:
                        this.battle.cardManagers[0].hand.add(findName('Convect',types.card),0,2)
                        this.battle.cardManagers[0].hand.add(findName('Overlook',types.card),0,1)
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
                        this.battle.cardManagers[0].hand.add(findName('Continuous\nRecovery',types.card),0,2)
                    break
                }
            break
            case 8:
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
                    case 8:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Petal\nCloud',types.card),0,3)
                    break
                }
            break
            case 9:
                switch(this.page){
                    case 1:
                        this.battle.cardManagers[0].hand.add(findName('Shiv',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Blade\nDance',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Knifing',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Borrowed\nBlade',types.card),0,4)
                    break
                    case 3:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(20)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Survivor',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Prepared',types.card),0,4)
                    break
                    case 4:
                        this.battle.cardManagers[0].hand.add(findName('Eviscerate',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Tactician',types.card),0,4)
                    break
                    case 5:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(10)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Masterful\nStab',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Trade',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Finale',types.card),0,4)
                    break
                    case 7:
                        this.battle.combatantManager.resetCombatants()
                        this.battle.combatantManager.summonCombatantDefinite({x:1,y:1},findName('NumberDummy',types.combatant),30)
                        this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].setMaxHP(1000)
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Malaise',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Square\nStrike',types.card),0,4)
                        this.battle.cardManagers[0].hand.add(findName('Incision',types.card),0,4)
                    break
                }
            break
            case 10:
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
                        this.battle.cardManagers[0].hand.add(findName('Shield',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Detonate',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Dualcast',types.card),0,5)
                    break
                    case 6:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Energize',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Darkness',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Zap',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Dualcast',types.card),0,5)
                    break
                    case 7:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Illuminate',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Enflame',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Nucleation',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Dualcast',types.card),0,5)
                    break
                    case 8:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Buffball',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Nerfball',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Inject',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Dualcast',types.card),0,5)
                    break
                    case 9:
                        this.battle.cardManagers[0].allEffect(2,2)
                        this.battle.cardManagers[0].hand.add(findName('Converge',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Node',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Charge',types.card),0,5)
                        this.battle.cardManagers[0].hand.add(findName('Dualcast',types.card),0,5)
                    break
                }
            break
            case 11:
                switch(this.page){
                }
            break
            case 12:
                switch(this.page){
                }
            break
            case 13:
                switch(this.page){
                }
            break
            case 14:
                switch(this.page){
                }
            break
            case 15:
                switch(this.page){
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