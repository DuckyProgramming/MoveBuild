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
enemy to play them on.`,
`Puzzle 1`,
`Puzzle 2`,
`Puzzle 3`,
`Puzzle 4`,
`Puzzle 5`,
`END OF TUTORIAL`,
                ]
            break
            case 6:
            break
            case 7:
            break
            case 8:
            break
            case 9:
            break
            case 10:
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
                        this.battle.cardManagers[0].hand.add(findName('Apply\nVulnerable',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                    break
                    case 3:
                        this.battle.cardManagers[0].hand.add(findName('Apply\nStun',types.card),0,0)
                    break
                    case 4:
                        this.battle.cardManagers[0].hand.add(findName('Get\nStrength',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Strike',types.card),0,0)
                    break
                    case 5:
                        this.battle.cardManagers[0].hand.add(findName('Get\nDexterity',types.card),0,0)
                        this.battle.cardManagers[0].hand.add(findName('Defend',types.card),0,0)
                    break
                    case 6:
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
                }
            break
            case 7:
                switch(this.page){
                }
            break
            case 8:
                switch(this.page){
                }
            break
            case 9:
                switch(this.page){
                }
            break
            case 10:
                switch(this.page){
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
            this.layer.rect(675,50,430,80,5)
            this.layer.rect(675,115,30,30,5)
            this.layer.fill(60)
            this.layer.noStroke()
            regTriangle(this.layer,672.5,115,10,10,-30)
            this.layer.textSize(12)
            for(let a=0,la=this.pages.length;a<la;a++){
                if(this.anim.pages[a]>0){
                    this.layer.noStroke()
                    this.layer.fill(0,this.anim.pages[a])
                    this.layer.text(this.pages[a],675,50)
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
        if(this.active&&pointInsideBox({position:inputs.rel},{position:{x:675,y:115},width:30,height:30})){
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