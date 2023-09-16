class attack{
    constructor(type,battle,player,effect,attackClass,user,level,color,energy,target,targetDistance,targetClass,combo,replayData,amplify){
        this.type=type
        this.battle=battle
        this.player=player
        this.effect=effect
        this.attackClass=attackClass
        this.user=user
        this.level=level
        this.color=color
        this.energy=energy
        this.target=target
        this.targetDistance=targetDistance
        this.targetClass=targetClass
        this.combo=combo
        this.replayData=replayData
        this.amplify=amplify

        this.procedure=[]

        this.userCombatant=this.battle.combatantManager.combatants[this.user]
        
        this.base()

        this.timer=0
        this.remove=false
        this.replayed=false
        this.directive='attack'
    }
    base(){
        this.position={x:this.userCombatant.position.x,y:this.userCombatant.position.y}
        this.relativePosition={x:this.userCombatant.relativePosition.x,y:this.userCombatant.relativePosition.y}
        this.tilePosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}

        switch(this.attackClass){
            case 1:
                this.clearAttack=[false,false]
                if(this.userCombatant.getStatus('Double Damage')>0){
                    this.clearAttack[0]=true
                }
                if(this.userCombatant.getStatus('Single Damage')>0){
                    this.clearAttack[1]=true
                }
                if(this.userCombatant.getStatus('Triple Damage')>0){
                    this.clearAttack[2]=true
                }
            break
        }
        let targetCombatant=-1
        switch(this.type){
            case 1: case 4: case 5: case 7: case 11: case 12: case 15: case 16: case 17: case 19:
            case 21: case 24: case 25: case 27: case 32: case 33: case 34: case 35: case 36: case 37:
            case 38: case 39: case 42: case 46: case 47: case 48: case 49: case 53: case 57: case 61:
            case 66: case 67: case 68: case 75: case 77: case 79: case 80: case 81: case 83: case 84:
            case 85: case 86: case 88: case 89: case 90: case 94: case 100: case 101: case 103: case 104:
            case 105: case 106: case 108: case 110: case 111: case 115: case 117: case 118: case 119: case 121:
            case 123: case 124: case 125: case 126: case 127: case 129: case 130: case 132: case 133: case 134:
            case 135: case 136: case 137: case 140: case 143: case 144: case 151: case 154: case 155: case 156:
            case 157: case 173: case 174: case 176: case 178: case 179: case 185: case 187: case 188: case 189:
            case 191: case 193: case 196: case 208: case 211: case 217: case 218: case 220: case 228: case 234:
            case 236: case 237: case 241: case 243: case 244: case 245: case 246: case 247: case 250: case 251:
            case 252: case 255: case 260: case 263: case 265: case 266: case 267: case 268: case 269: case 271:
            case 272: case 273: case 274: case 275: case 277: case 280: case 282: case 287: case 288: case 290:
            case 292: case 293: case 295: case 296: case 297: case 301: case 304: case 305: case 310: case 314:
            case 316: case 319: case 323: case 326: case 327: case 329: case 333: case 342: case 345: case 348:
            case 361: case 364: case 368: case 373: case 376: case 378: case 379: case 382: case 384: case 385:
            case 401: case 402: case 408: case 409: case 412: case 413: case 414: case 415: case 417: case 419:
            case 427: case 429: case 432: case 433: case 435: case 436: case 437: case 438: case 441: case 444:
            case 447: case 449: case 452: case 460: case 462: case 465: case 466: case 467: case 468: case 469:
            case 475: case 487: case 491: case 494: case 496: case 497: case 498: case 501: case 504: case 507:
            case 508: case 509: case 510: case 511: case 514: case 531: case 532: case 533: case 534: case 535:
            case 537: case 538: case 539: case 540: case 543: case 545: case 548: case 550: case 557: case 558:
            case 559: case 564: case 565: case 566: case 567: case 568: case 569: case 579: case 580: case 581:
            case 582: case 587: case 588: case 589: case 590: case 591: case 592: case 593: case 594: case 596:
            case 597: case 598: case 599: case 600: case 601: case 604: case 606: case 609: case 610: case 616:
            case 617: case 618: case 632: case 633: case 634: case 638: case 639: case 661: case 662: case 667:
            case 669: case 672: case 673: case 676: case 677: case 678: case 679: case 682: case 683: case 689:
            case 691: case 692: case 697: case 702: case 703: case 710: case 714: case 715: case 718: case 719:
            case 720: case 721: case 723: case 725: case 729: case 730: case 731: case 732: case 733: case 734:
            case 736: case 746: case 757: case 758: case 762: case 764: case 766: case 771: case 775: case 779:
            case 780: case 784: case 785: case 786: case 787: case 793: case 795: case 796: case 798: case 801:
            case 806: case 824: case 825: case 826: case 827: case 828: case 829: case 830: case 833: case 834:
            case 837: case 840: case 843: case 846: case 848: case 849: case 850: case 862: case 863: case 865:
            case 866: case 872: case 874: case 877: case 881: case 883: case 885: case 888: case 895: case 897:
            case 899: case 900: case 903: case 905: case 906: case 907: case 908: case 915: case 916: case 917:
            case 918: case 919: case 920: case 924: case 926: case 930: case 934: case 935: case 938: case 939:
            case 940: case 942: case 943: case 944: case 945: case 946: case 947: case 950: case 956: case 957:
            case 958: case 959:
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]

                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
            break
            case 3: case 14: case 20: case 51: case 52: case 54: case 56: case 58: case 59: case 60:
            case 82: case 83: case 87: case 91: case 153: case 177: case 182: case 192: case 205: case 248:
            case 256: case 330: case 331: case 332: case 335: case 341: case 374: case 375: case 383: case 397:
            case 421: case 448: case 458: case 464: case 472: case 474: case 479: case 482: case 484: case 485:
            case 486: case 503: case 570: case 571: case 573: case 574: case 575: case 585: case 619: case 620:
            case 621: case 622: case 623: case 624: case 626: case 627: case 628: case 629: case 630: case 631:
            case 660: case 663: case 664: case 666: case 685: case 686: case 687: case 688: case 690: case 693:
            case 694: case 695: case 696: case 700: case 701: case 702: case 703: case 704: case 705: case 706:
            case 717: case 750: case 802: case 803: case 804: case 805: case 808: case 812: case 813: case 814:
            case 815: case 816: case 817: case 823: case 923:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
            break
            case 9: case 650: case 651: case 727:
                if(this.targetClass==1){
                    this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                }else if(this.targetClass==2){
                    this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                    this.targetTile=this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)]

                    this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                    this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                    this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                }
            break
            case 471: case 576:case 856:
                this.targetCombatant=this.battle.combatantManager.getArea(this.userCombatant.team,this.userCombatant.tilePosition,1)
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]

                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    this.direction.push(atan2(this.targetCombatant[a].position.x-this.position.x,this.targetCombatant[a].position.y-this.position.y))
                    this.distance.push(sqrt((this.targetCombatant[a].position.x-this.position.x)**2+(this.targetCombatant[a].position.y-this.position.y)**2))

                    this.relativeDirection.push(atan2(this.targetCombatant[a].relativePosition.x-this.relativePosition.x,this.targetCombatant[a].relativePosition.y-this.relativePosition.y))
                    this.relativeDistance.push(sqrt((this.targetCombatant[a].relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant[a].relativePosition.y-this.relativePosition.y)**2))
                }
            break
            case 31: case 489: case 356: case 357: case 459: case 652: case 653: case 654: case 658:
                this.targetCombatant=this.battle.combatantManager.getArea(this.userCombatant.team,this.userCombatant.tilePosition,2)
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]
                this.targetDistance=[]

                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    this.direction.push(atan2(this.targetCombatant[a].position.x-this.position.x,this.targetCombatant[a].position.y-this.position.y))
                    this.distance.push(sqrt((this.targetCombatant[a].position.x-this.position.x)**2+(this.targetCombatant[a].position.y-this.position.y)**2))

                    this.relativeDirection.push(atan2(this.targetCombatant[a].relativePosition.x-this.relativePosition.x,this.targetCombatant[a].relativePosition.y-this.relativePosition.y))
                    this.relativeDistance.push(sqrt((this.targetCombatant[a].relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant[a].relativePosition.y-this.relativePosition.y)**2))

                    this.targetDistance.push(distTargetCombatant(0,this.targetCombatant[a],this.userCombatant))
                }
            break
            case 138: case 139: case 175: case 400: case 453: case 516:
                this.targetCombatant=[]
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]
                this.targetDistance=[]
                targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                this.targetCombatant.push(targetCombatant)
                this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                for(let a=0,la=2;a<la;a++){
                    let offset=transformDirection(0,this.relativeDirection[0]-60+a*120)
                    let index=this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                    if(index>=0){
                        targetCombatant=this.battle.combatantManager.combatants[index]
                        this.targetCombatant.push(targetCombatant)
                        this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                        this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                        this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                        this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                    }
                }
            break
            case 145: case 146: case 147: case 148: case 158: case 159: case 160: case 161: case 162:
            case 163: case 164: case 351: case 352: case 353:
                this.targetCombatant=this.battle.combatantManager.combatants[this.battle.players-1-this.userCombatant.id]

                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
            break
            case 165:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                this.targetCombatant=this.battle.combatantManager.combatants[this.battle.players-1-this.userCombatant.id]

                this.direction=atan2(this.targetTile.position.x-this.targetCombatant.position.x,this.targetTile.position.y-this.targetCombatant.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.targetCombatant.position.x)**2+(this.targetTile.position.y-this.targetCombatant.position.y)**2)

                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.targetCombatant.relativePosition.x,this.targetTile.relativePosition.y-this.targetCombatant.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.targetCombatant.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.targetCombatant.relativePosition.y)**2)
            break
            case 201: case 222:
                this.targetCombatant=[]
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]
                this.targetDistance=[]
                targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                this.targetCombatant.push(targetCombatant)
                this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                let offset=transformDirection(0,this.relativeDirection[0]-180)
                let index=this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                if(index>=0){
                    targetCombatant=this.battle.combatantManager.combatants[index]
                    this.targetCombatant.push(targetCombatant)
                    this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                    this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                    this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                    this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                }
            break
            case 328: case 572: case 707: case 708: case 709:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.targetVariant=distTargetCombatant(0,this,this.targetTile)>0

                this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
            break
            case 358:
                this.targetCombatant=[]
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]
                this.targetDistance=[]
                targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                this.targetCombatant.push(targetCombatant)
                this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                let offset2=transformDirection(0,this.relativeDirection[0])
                let index2=this.battle.combatantManager.getCombatantIndex(targetCombatant.tilePosition.x+offset2[0],targetCombatant.tilePosition.y+offset2[1])
                if(index2>=0){
                    targetCombatant=this.battle.combatantManager.combatants[index2]
                    this.targetCombatant.push(targetCombatant)
                    this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                    this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                    this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                    this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                }
            break
            case 611:
                this.targetCombatant=this.battle.combatantManager.getArea(this.userCombatant.team,this.userCombatant.tilePosition,6)
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]
                this.targetDistance=[]

                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    this.direction.push(atan2(this.targetCombatant[a].position.x-this.position.x,this.targetCombatant[a].position.y-this.position.y))
                    this.distance.push(sqrt((this.targetCombatant[a].position.x-this.position.x)**2+(this.targetCombatant[a].position.y-this.position.y)**2))

                    this.relativeDirection.push(atan2(this.targetCombatant[a].relativePosition.x-this.relativePosition.x,this.targetCombatant[a].relativePosition.y-this.relativePosition.y))
                    this.relativeDistance.push(sqrt((this.targetCombatant[a].relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant[a].relativePosition.y-this.relativePosition.y)**2))

                    this.targetDistance.push(distTargetCombatant(0,this.userCombatant,this.targetCombatant[a]))
                }
                if(this.targetCombatant.length==0){
                    this.remove=true
                }
            break
            case 674:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                let index3=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                if(index3>=0){
                    this.procedure[0]=1
                    this.targetCombatant=this.battle.combatantManager.combatants[index3]

                    this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                    this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                    this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                }else{
                    this.procedure[0]=0
                }
            break
            case 844:
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]

                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)

                this.procedure[0]=this.battle.cardManagers[this.player].discard.cards.length==0
            break
            case 931:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                if(floor(random(0,2))==0){
                    let offset=transformDirection(0,this.relativeDirection)
                    let position=[this.targetTile.tilePosition.x+offset[0],this.targetTile.tilePosition.y+offset[1]]
                    let index=this.battle.tileManager.getTileIndex(position[0],position[1])
                    if(index>=0){
                        this.targetTile=this.battle.tileManager.tiles[index]
                        this.targetDistance++
                        this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                        this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
                        this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                        this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                    }
                }
            break

        }
    }
    set(){
        if(this.replayData.replay==1){
            this.userCombatant=this.battle.combatantManager.combatants[this.user]
            this.userCombatant.goal.anim.direction=this.replayData.direction
            this.base()
        }
    }
    selfCall(type){
        switch(type){
            case 0:
                if(this.type==35&&this.targetCombatant.life==this.targetCombatant.base.life){
                    this.battle.energy.main[this.player]++
                }
                switch(this.type){
                    case 12: case 719:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                    break
                    case 46: case 661:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Bleed')?2:1),this.user)
                    break
                    case 88:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy*this.energy,this.user)
                    break
                    case 89:
                        this.targetCombatant.block=0
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 101:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.battle.counter.turnPlayed[this.player]<=1?2:1),this.user)
                    break
                    case 117:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.getStatus('Weak')>0?2:1),this.user)
                    break
                    case 119:
                        if(this.battle.cardManagers[this.player].hand.allClass(1)){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 129: case 228:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
                    break
                    case 140:
                        this.targetCombatant.takeDamage(this.effect[0],this.user,2)
                    break
                    case 144: case 950:
                        this.targetCombatant.takeDamage(this.effect[0]*this.battle.cardManagers[this.player].discard.cards.length,this.user)
                    break
                    case 154:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userCombatant.block,this.user)
                    break
                    case 191:
                        this.targetCombatant.takeDamage(this.effect[0]*this.combo,this.user)
                    break
                    case 193:
                        this.targetCombatant.takeDamage(this.effect[0]*((this.targetCombatant.spec.includes(2)||this.targetCombatant.spec.includes(12))?2:1),this.user)
                    break
                    case 265:
                        this.targetCombatant.takeDamage(this.effect[0]*this.battle.counter.turnPlayed[1],this.user)
                    break
                    case 267:
                        this.number=0
                        for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                            if(this.battle.cardManagers[this.player].hand.cards[a].class==2){
                                this.number++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*this.number,this.user)
                    break
                    case 275:
                        if(this.energy%2==1){
                            this.targetCombatant.takeDamage(this.effect[1]*this.energy,this.user)
                            this.userCombatant.addBlock(this.effect[0]*this.energy)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                            this.userCombatant.addBlock(this.effect[1]*this.energy)
                        }
                    break
                    case 280:
                        this.number=0
                        for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                            if(this.battle.cardManagers[this.player].hand.cards[a].class==1){
                                this.number++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.number,this.user)
                    break
                    case 296:
                        if(this.battle.cardManagers[this.player].reserve.cards.length==0){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 364:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                        this.userCombatant.life-=this.effect[1]*this.energy
                    break
                    case 371:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.life<this.userCombatant.base.life*0.5?2:1),this.user)
                    break
                    case 376:
                        this.targetCombatant.takeDamage(floor(this.userCombatant.life/this.effect[0])*this.effect[1],this.user)
                    break
                    case 378:
                        this.targetCombatant.takeDamage(this.effect[0]*round(this.userCombatant.life)/10,this.user)
                        this.userCombatant.life-=round(this.userCombatant.life)/10
                    break
                    case 379:
                        this.targetCombatant.takeDamage(this.effect[0]*this.battle.cardManagers[this.player].exhaust.fatigueNumber(),this.user)
                    break
                    case 388:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userCombatant.balance,this.user)
                        this.userCombatant.balance=0
                    break
                    case 475:
                        let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                        this.targetCombatant.takeDamage(this.effect[0]*(index>=0&&this.battle.tileManager.tiles[index].type.includes(19)?2:1),this.user)
                    break
                    case 510:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userCombatant.getOrbNumber(-1),this.user)
                    break
                    case 588:
                        this.targetCombatant.heal(this.effect[0])
                    break
                    case 596:
                        this.targetCombatant.gainMaxHP(this.effect[0])
                    break
                    case 604:
                        this.targetCombatant.statusEffect('Regeneration',this.effect[0])
                    break
                    case 610:
                        this.targetCombatant.statusEffect('Armor',this.effect[0])
                    break
                    case 639:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.block>0?this.effect[1]:1),this.user)
                    break
                    case 677:
                        this.targetCombatant.life=this.targetCombatant.base.life
                    break
                    case 678:
                        this.battle.turnManager.loadEnemyAttackRepeatBack(this.targetCombatant.id)
                    break
                    case 679:
                        this.targetCombatant.statusEffect('Ethereal',this.effect[0])
                    break
                    case 718:
                        let total2=1
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].construct&&this.battle.combatantManager.combatants[a].life<=0){
                                total2++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*total,this.user,1)
                    break
                    case 734:
                        this.number=0
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants.team==0){
                                this.number++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*this.number,this.user)
                    break
                    case 758:
                        let prelife=this.targetCombatant.life
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<prelife){
                            this.userCombatant.addBlock(prelife-this.targetCombatant.life)
                        }
                    break
                    case 766:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userCombatant.faith,this.user)
                    break
                    case 795:
                        let works=false
                        for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                            if(!this.battle.cardManagers[this.player].hand.cards[a].spec.includes(12)&&(this.battle.cardManagers[this.player].hand.cards[a].class==5||this.battle.cardManagers[this.player].hand.cards[a].class==6)){
                                works=true
                            }
                        }
                        if(works){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 796:
                        let works2=true
                        for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                            if(!this.battle.cardManagers[this.player].hand.cards[a].spec.includes(12)&&(this.battle.cardManagers[this.player].hand.cards[a].class==5||this.battle.cardManagers[this.player].hand.cards[a].class==6)){
                                works2=false
                            }
                        }
                        if(works2){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 844:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.procedure[0]==0?2:1),this.user)
                    break
                    case 872:
                        this.targetCombatant.takeDamage(this.amplify?this.effect[0]+this.effect[1]:this.effect[0],this.user)
                    break
                    case 895:
                        this.targetCombatant.takeDamage(this.effect[0]*floor(random(1,3)),this.user)
                    break
                    case 897:
                        let total=0
                        for(let a=0,la=this.effect[0];a<la;a++){
                            let roll=floor(random(1,7))
                            this.battle.particleManager.createAuxNumber(this.userCombatant.position.x,this.userCombatant.position.y,roll)
                            total+=roll
                        }
                        this.targetCombatant.takeDamage(total,this.user)
                    break
                    case 900:
                        let prelife2=this.targetCombatant.life
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<prelife2){
                            let money=prelife2-this.targetCombatant.life
                            this.battle.overlayManager.overlays[25][this.player].active=true
                            this.battle.overlayManager.overlays[25][this.player].activate([0,[{type:0,value:[prelife2-this.targetCombatant.life]}]])
                        }
                    break
                    case 916:
                        for(let a=0,la=this.effect[0]+this.energy;a<la;a++){
                            this.battle.turnManager.loadEnemyAttackRepeatBack(this.targetCombatant.id)
                        }
                    break
                    case 917:
                        this.targetCombatant.gainMaxHP(this.effect[0])
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 930:
                        if(floor(random(0,2))==0){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else{
                            this.userCombatant.addBlock(this.effect[1],this.user)
                        }
                    break
                    case 942:
                        let prelife3=this.targetCombatant.life
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<prelife3){
                            this.userCombatant.statusEffect('Armor',floor((prelife3-this.targetCombatant.life)/2))
                        }
                    break
                    default:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                }
                switch(this.type){
                    case 7:
                        if(this.targetCombatant.life<=0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                    break
                    case 34:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                    break
                    case 42:
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 53:
                        this.userCombatant.statusEffect('Dodge',this.effect[1])
                    break
                    case 90:
                        this.userCombatant.statusEffect('Single Damage',this.effect[1])
                    break
                    case 94:
                        this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                    break
                    case 103:
                        this.userCombatant.statusEffect('Temporary Draw',-this.effect[1])
                    break
                    case 105:
                        if(this.targetCombatant.life<=0){
                            this.battle.energy.main[this.player]--
                        }
                    break
                    case 106:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 110:
                        this.userCombatant.statusEffect('Control',this.effect[1])
                    break
                    case 111:
                        if(this.battle.counter.turnPlayed[this.player]<=this.effect[1]+1){
                            this.battle.cardManagers[this.player].draw(this.effect[2])
                        }
                    break
                    case 115:
                        this.battle.dropDraw(this.player,findName('Anger',types.card),this.level,this.color)
                    break
                    case 123:
                        this.battle.drop(this.player,findName('Slow\nBleed',types.card),this.level,game.playerNumber+1)
                    break
                    case 124:
                        this.battle.cardManagers[this.player].randomEffect(2,13,[])
                    break
                    case 125:
                        this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                    break
                    case 126:
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 137:
                        this.userCombatant.statusEffect('Strength Next Turn',this.effect[1])
                    break
                    case 155:
                        this.battle.energy.main[this.player]+=this.effect[1]
                    break
                    case 156:
                        this.targetCombatant.statusEffect('Temporary Speed Up',-this.effect[1])
                    break
                    case 157:
                        let list=this.battle.combatantManager.getArea(this.userCombatant.team,this.targetCombatant.tilePosition,1)
                        if(list.length>0){
                            list[floor(random(0,list.length))].takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 174:
                        this.targetCombatant.statusEffect('Stun',this.effect[1])
                        this.battle.updateTargetting()
                    break
                    case 185:
                        this.battle.cardManagers[this.player].drawPrice(this.effect[1],0)
                    break
                    case 189:
                        this.battle.turnManager.loadEnemyAttack(this.targetCombatant.id)
                    break
                    case 196:
                        this.userCombatant.statusEffect('Conditioning',this.effect[1])
                    break
                    case 228:
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 234:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.combo+=this.effect[1]
                        }
                    break
                    case 260:
                        this.targetCombatant.statusEffect('Temporary Damage Down',this.effect[1])
                    break
                    case 268:
                        if(this.targetCombatant.getStatus('Weak')>0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                            this.battle.cardManagers[this.player].draw(this.effect[2])
                        }
                    break
                    case 269:
                        if(this.targetCombatant.getStatus('Vulnerable')>0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                            this.battle.cardManagers[this.player].draw(this.effect[2])
                        }
                    break
                    case 271:
                        this.userCombatant.statusEffect('Counter',this.effect[1])
                    break
                    case 273:
                        this.userCombatant.addBlock(this.effect[1])
                    break
                    case 274:
                        this.battle.drop(this.player,findName('Chip',types.card),this.level,0)
                    break
                    case 277:
                        this.battle.drop(this.player,findName('Overflow',types.card),this.level,this.color)
                    break
                    case 287:
                        this.targetCombatant.statusEffect('Take Per Card Played',this.effect[1])
                    break
                    case 293:
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                    break
                    case 301:
                        this.battle.cardManagers[this.player].allEffect(2,18)
                    break
                    case 304:
                        this.battle.cardManagers[this.player].allEffect(2,19)
                    break
                    case 310:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.gainMaxHP(this.effect[1])
                        }
                    break
                    case 319:
                        let list2=[]
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].id!=this.targetCombatant.id){
                                list2.push(a)
                            }
                        }
                        if(list2.length>0){
                            this.battle.combatantManager.combatants[list2[floor(random(0,list2.length))]].takeDamage(this.effect[1],this.user)
                        }
                    break
                    case 323:
                        if(this.targetCombatant.blocked<=1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                        }
                    break
                    case 361:
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 373:
                        this.userCombatant.loseMaxHP(this.effect[1])
                    break
                    case 385: case 414:
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 402:
                        if(this.targetCombatant.getStatus('Bleed')>0){
                            this.userCombatant.heal(this.targetCombatant.getStatus('Bleed'))
                        }
                    break
                    case 409:
                        this.userCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 427:
                        this.targetCombatant.statusEffect('Confusion',this.effect[1])
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[2])
                    break
                    case 429:
                        this.battle.drop(this.player,findName('Winded',types.card),this.level,game.playerNumber+1)
                    break
                    case 435:
                        if(this.userCombatant.armed){
                            this.userCombatant.armed=false
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)].addType(3)
                        }
                    break
                    case 444:
                        this.battle.cardManagers[this.player].hand.add(findName('Fury',types.card),this.level,this.color)
                        if(this.battle.cardManagers[this.player].hand.cards.length>=1){
                            this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].effect[0]=max(1,this.effect[0]-1)
                        }
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 449:
                        if(!this.userCombatant.armed){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                            if(index>=0&&this.battle.tileManager.tiles[index].type.includes(3)){
                                this.battle.tileManager.tiles[index].anim.upPart[this.battle.tileManager.tiles[index].type.indexOf(3)]=false
                                this.userCombatant.armed=true
                                la=0
                            }
                        }
                    break
                    case 460:
                        this.userCombatant.life-=this.effect[1]
                        this.battle.cardManagers[this.player].hand.add(findName('Pain\nStrike',types.card),this.level,this.color)
                    break
                    case 462:
                        this.battle.cardManagers[this.player].deFatigue(this.effect[1])
                    break
                    case 496:
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 497:
                        this.battle.cardManagers[this.player].allGroupClaw(this.effect[1])
                    break
                    case 507:
                        if(this.targetCombatant.life<=0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                        this.battle.cardManagers[this.player].allGroupClaw(this.effect[2])
                    break
                    case 508:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(0)
                        }
                    break
                    case 509:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(1)
                        }
                    break
                    case 511:
                        this.battle.cardManagers[this.player].draw(this.effect[1]*this.userCombatant.getOrbNumber(-1))
                    break
                    case 514:
                        this.battle.cardManagers[this.player].hand.rebound(1)
                    break
                    case 540:
                        this.battle.cardManagers[this.player].discard.allEffect(25)
                        this.battle.cardManagers[this.player].reserve.allEffect(25)
                    break
                    case 558:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(6)
                        }
                    break
                    case 559:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(7)
                        }
                    break
                    case 580:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(9)
                        }
                    break
                    case 581:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(10)
                        }
                    break
                    case 582:
                        if(this.targetCombatant.life<=0){
                            for(let a=0,la=this.effect[2];a<la;a++){
                                this.userCombatant.holdOrb(11)
                            }
                        }
                    break
                    case 597:
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Jagged Bleed',this.effect[1])
                        }
                    break
                    case 601:
                        this.battle.cardManagers[this.player].hand.upgrade(this.effect[1])
                    break
                    case 606:
                        if(this.targetCombatant.blocked<=1){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
                    break
                    case 638:
                        this.battle.cardManagers[this.player].hand.transform(this.effect[1])
                    break
                    case 661:
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                    break
                    case 689:
                        this.userCombatant.metal+=this.effect[1]
                    break
                    case 691:
                        this.battle.turnManager.callInConstructs(this.targetCombatant)
                    break
                    case 692:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.metal+=this.effect[1]
                        }
                    break
                    case 714:
                        this.battle.cardManagers[this.player].hand.duplicate(this.effect[1])
                    break
                    case 715:
                        this.battle.combatantManager.resetIntents(1)
                    break
                    case 719:
                        this.targetCombatant.statusEffect('Weak',this.effect[1]*this.energy)
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[2]*this.energy)
                    break
                    case 721:
                        this.userCombatant.enterStance(1)
                    break
                    case 723:
                        this.userCombatant.enterStance(3)
                    break
                    case 725:
                        this.userCombatant.enterStance(0)
                    break
                    case 730:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.userCombatant.enterStance(1)
                        }
                    break
                    case 731:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.userCombatant.enterStance(2)
                        }
                    break
                    case 732:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.userCombatant.enterStance(3)
                        }
                    break
                    case 733:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.userCombatant.enterStance(4)
                        }
                    break
                    case 771:
                        this.battle.cardManagers[this.player].hand.add(findName('Smite',types.card),0,0)
                    break
                    case 779:
                        this.battle.cardManagers[this.player].reserve.addShuffle(findName('End\nUp',types.card),0,0)
                    break
                    case 784:
                        this.targetCombatant.statusEffect('Block Return',this.effect[1])
                    break
                    case 786:
                        if(this.targetCombatant.life<=0){
                            this.battle.overlayManager.overlays[5][this.player].active=true
                            this.battle.overlayManager.overlays[5][this.player].activate()
                        }
                    break
                    case 798:
                        if(this.battle.counter.turnPlayed[0]==1){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
                    break
                    case 826:
                        this.userCombatant.faith+=this.effect[1]
                    break
                    case 827:
                        this.battle.cardManagers[this.player].hand.allEffect(29)
                    break
                    case 828:
                        this.userCombatant.gainMaxHP(this.effect[1])
                    break
                    case 829:
                        this.battle.cardManagers[this.player].drawRetain(this.effect[1])
                    break
                    case 830:
                        this.battle.cardManagers[this.player].hand.add(findName('Restrike',types.card),0,0)
                    break
                    case 840:
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.battle.energy.main[this.player]+=this.effect[2]
                            this.battle.cardManagers[this.player].draw(this.effect[3])
                        }
                    break
                    case 848:
                        this.battle.cardManagers[this.player].reserve.add(findName('Spark',types.card),0,0)
                    break
                    case 849:
                        this.battle.cardManagers[this.player].reserve.add(findName('Spark',types.card),1,0)
                    break
                    case 863:
                        this.battle.energy.main[this.player]+=floor(this.battle.cardManagers[this.player].deck.cards.length/this.effect[1])
                    break
                    case 884:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                        this.userCombatant.statusEffect('Energy Next Turn Next Turn',this.effect[1])
                    break
                    case 934:
                        if(this.targetCombatant.life<=0&&!this.targetCombatant.minion&&this.battle.encounter.class>=1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.relicManager.addRandomRelic(this.player)
                            }
                        }
                    break
                    case 940:
                        this.battle.cardManagers[this.player].hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                    break
                    case 946:
                        this.battle.energy.main[this.player]=this.effect[1]
                    break
                    case 950:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                        }
                    break

                }
            break
            case 1:
                switch(this.type){
                    case 13: case 235:
                        this.userCombatant.addBlock(this.effect[0]*this.energy)
                    break
                    case 141:
                        this.userCombatant.addBlock(this.effect[0]*this.combo)
                        this.userCombatant.combo=0
                    break
                    case 146: case 589:
                        this.targetCombatant.addBlock(this.effect[0])
                    break
                    case 172:
                        this.userCombatant.statusEffect('Untargettable From Front',this.effect[0])
                    break
                    case 206:
                        this.userCombatant.addBlock(this.effect[0]*this.battle.cardManagers[this.player].hand.cards.length)
                        this.battle.cardManagers[this.player].allEffect(2,1)
                    break
                    case 322:
                        if(this.userCombatant.block==0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                        this.userCombatant.addBlock(this.effect[0])
                    break
                    case 365:
                        this.userCombatant.addBlock(this.effect[0]*this.energy)
                        this.userCombatant.life-=this.effect[1]*this.energy
                    break
                    case 377:
                        this.userCombatant.addBlock(this.effect[0]*this.battle.cardManagers[this.player].fatigueNumber())
                    break
                    case 389:
                        this.userCombatant.addBlock(this.effect[0]*this.userCombatant.balance)
                        this.userCombatant.balance=0
                    break
                    case 515:
                        this.userCombatant.addBlock(this.effect[0]+this.battle.cardManagers[this.player].discard.cards.length)
                    break
                    case 518:
                        this.battle.energy.main[this.player]+=floor(this.battle.cardManagers[this.player].reserve.cards.length/this.effect[1])*this.effect[0]
                    break
                    case 546:
                        this.userCombatant.addBlock(this.effect[0]*this.userCombatant.totalOrbClass[1])
                    break
                    case 738:
                        this.userCombatant.addBlock(this.effect[0]*(this.userCombatant.stance==1?this.effect[1]:1))
                    break
                    case 800:
                        this.userCombatant.addBlock(this.effect[0]*(this.userCombatant.stance==2?this.effect[1]:1))
                    break
                    case 853:
                        this.userCombatant.addBlock(this.userCombatant.charge+this.effect[0])
                    break
                    case 880:
                        this.userCombatant.statusEffect('Armor',this.amplify?this.effect[0]+this.effect[1]:this.effect[0])
                    break
                    case 918:
                        this.targetCombatant.addBlock(this.effect[0])
                        this.targetCombatant.statusEffect('Retain Block',this.effect[1])
                    break
                    case 919:
                        this.targetCombatant.addBlock(this.effect[0])
                        this.targetCombatant.gainMaxHP(this.effect[1])
                    break
                    case 920:
                        this.targetCombatant.statusEffect('Buffer',this.effect[0])
                    break
                    case 951:
                        this.battle.cardManagers[this.player].hand.discardBlock(this.effect[0])
                    break
                    default:
                        this.userCombatant.addBlock(this.effect[0])
                    break
                }
                switch(this.type){
                    case 23:
                        this.userCombatant.statusEffect('Counter',this.effect[1])
                    break
                    case 26:
                        this.userCombatant.statusEffect('Cannot Be Pushed',1)
                    break
                    case 43:
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 50:
                        this.userCombatant.statusEffect('Retain Block',this.effect[1])
                    break
                    case 65:
                        this.userCombatant.statusEffect('Cannot Gain Block',this.effect[1])
                    break
                    case 95:
                        this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                    break
                    case 96:
                        this.userCombatant.statusEffect('Counter Push',1)
                    break
                    case 97:
                        this.userCombatant.statusEffect('Counter Bleed',this.effect[1])
                    break
                    case 120:
                        this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                    break
                    case 122:
                        this.userCombatant.statusEffect('Counter All',this.effect[1])
                    break
                    case 131:
                        this.userCombatant.statusEffect('Counter',this.effect[1]+this.effect[2]*this.combo)
                    break
                    case 142:
                        this.userCombatant.statusEffect('Temporary Strength on Hit',this.effect[1])
                    break
                    case 190:
                        this.userCombatant.statusEffect('Energy on Hit',this.effect[1])
                    break
                    case 194:
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 197:
                        this.userCombatant.statusEffect('Conditioning',this.effect[1])
                    break
                    case 216:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 221:
                        this.userCombatant.combo+=this.effect[1]
                    break
                    case 235:
                        this.userCombatant.statusEffect('Counter',this.effect[1]*this.energy)
                    break
                    case 242:
                        this.userCombatant.statusEffect('2 Range Counter',this.effect[1])
                    break
                    case 261:
                        this.battle.cardManagers[this.player].drawPrice(this.effect[1],1)
                    break
                    case 262:
                        this.userCombatant.statusEffect('Block Next Turn',this.effect[1])
                    break
                    case 281:
                        this.battle.cardManagers[this.player].randomEffect(2,13,[])
                    break
                    case 320:
                        this.userCombatant.statusEffect('Block Next Turn',this.effect[0])
                        this.userCombatant.statusEffect('Block Next Turn Next Turn',this.effect[0])
                    break
                    case 321:
                        this.userCombatant.statusEffect('Single Damage',this.effect[1])
                    break
                    case 354:
                        this.userCombatant.statusEffect('Counter Push Left',1)
                    break
                    case 355:
                        this.userCombatant.statusEffect('Counter Push Right',1)
                    break
                    case 359:
                        this.userCombatant.statusEffect('Counter Temporary Speed Down',this.effect[1])
                    break
                    case 386:
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 396:
                        if(!this.userCombatant.armed){
                            for(let a=0,la=6;a<la;a++){
                                let offset=transformDirection(0,-30+a*60)
                                let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                                if(index>=0&&this.battle.tileManager.tiles[index].type.includes(3)){
                                    this.battle.tileManager.tiles[index].anim.upPart[this.battle.tileManager.tiles[index].type.indexOf(3)]=false
                                    this.userCombatant.armed=true
                                    la=0
                                }
                            }
                        }
                    break
                    case 399:
                        if(this.userCombatant.armed){
                            this.userCombatant.armed=false
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)].addType(3)
                        }
                    break
                    case 410:
                        this.userCombatant.statusEffect('Counter Confusion',this.effect[1])
                    break
                    case 428:
                        this.userCombatant.statusEffect('Counter 3 Times',this.effect[1])
                    break
                    case 430:
                        this.userCombatant.statusEffect('Retain Block',this.effect[1])
                        this.userCombatant.balance+=this.effect[2]
                    break
                    case 443:
                        this.userCombatant.balanceCap=max(1,this.userCombatant.balanceCap-this.effect[1])
                    break
                    case 461:
                        this.userCombatant.life-=this.effect[1]
                        this.battle.cardManagers[this.player].hand.add(findName('Pain\nDefend',types.card),this.level,this.color)
                    break
                    case 463:
                        this.battle.cardManagers[this.player].deFatigue(this.effect[1])
                    break
                    case 502:
                        this.battle.cardManagers[this.player].allGroupClaw(this.effect[0])
                    break
                    case 513:
                        this.battle.overlayManager.overlays[7][this.player].active=true
                        this.battle.overlayManager.overlays[7][this.player].activate()
                    break
                    case 522:
                        this.battle.cardManagers[this.player].hand.allEffect(24)
                    break
                    case 547:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(1)
                        }
                    break
                    case 602:
                        this.battle.cardManagers[this.player].hand.upgrade(this.effect[1])
                    break
                    case 682:
                        this.battle.cardManagers[this.player].hand.transform(this.effect[1])
                    break
                    case 699:
                        this.userCombatant.metal+=this.effect[1]
                    break
                    case 716:
                        this.battle.combatantManager.resetIntents(2)
                    break
                    case 722:
                        this.userCombatant.enterStance(2)
                    break
                    case 724:
                        this.userCombatant.enterStance(4)
                    break
                    case 726:
                        this.userCombatant.enterStance(0)
                    break
                    case 735:
                        this.battle.cardManagers[this.player].reserve.addShuffle(findName('Insight',types.card),0,0)
                    break
                    case 745:
                        this.battle.cardManagers[this.player].hand.add(findName('Safety',types.card),0,0)
                    break
                    case 765:
                        this.userCombatant.statusEffect('Armor',this.effect[0])
                        this.userCombatant.enterStance(4)
                    break
                    case 770:
                        this.userCombatant.faith+=this.effect[0]
                        this.userCombatant.addBlock(this.effect[1])
                    break
                    case 783:
                        this.userCombatant.statusEffect('Free Attack',this.effect[1])
                    break
                    case 794:
                        this.userCombatant.statusEffect('Cannot Die',1)
                    break
                    case 810:
                        this.userCombatant.statusEffect('Single Damage Block Convert',this.effect[1])
                    break
                    case 811:
                        this.userCombatant.statusEffect('Triple Block',this.effect[1])
                    break
                    case 831:
                        if(this.amplify){
                            this.userCombatant.statusEffect('Block Next Turn',this.effect[1])
                        }
                    break
                    case 858:
                        this.userCombatant.charge+=this.effect[1]
                    break
                    case 861:
                        this.battle.drop(this.player,findName('Burn',types.card),0,game.playerNumber+1)
                    break
                    case 867:
                        this.userCombatant.removeRandomStatus([1,3])
                    break
                    case 875:
                        this.battle.cardManagers[this.player].hand.draw(this.effect[1])
                        this.userCombatant.statusEffect('Temporary Strength',this.effect[2])
                    break
                    case 885:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                        this.userCombatant.statusEffect('Energy Next Turn Next Turn',this.effect[1])
                    break
                    case 887:
                        this.userCombatant.statusEffect('Counter Burn',this.effect[1])
                    break
                    case 890:
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                        this.userCombatant.statusEffect('No Amplify Next Turn',1)
                    break
                    case 925:
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                        if(this.battle.cardManagers[this.player].hand.cards.length>0&&this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].class==1){
                            this.userCombatant.statusEffect('Strength',this.effect[2])
                        }
                    break
                    
                }
            break
            case 2:
                switch(this.type){
                    case 20:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.cardManagers[this.player].randomEffect(2,0,[])
                        }
                    break
                    case 51:
                        this.userCombatant.statusEffect('Dodge',this.effect[1])
                    break
                    case 58:
                        this.battle.cardManagers[this.player].hand.add(findName('Stride',types.card),0,0)
                    break
                    case 59:
                        this.userCombatant.block=0
                    break
                    case 91:
                        this.userCombatant.addBlock(this.effect[1])
                    break
                    case 182:
                        this.userCombatant.combo+=this.effect[1]
                        this.userCombatant.statusEffect('Must Attack or Take Damage',this.effect[2])
                    break
                    case 192:
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 248:
                        this.userCombatant.statusEffect('Conditioning',this.effect[1])
                    break
                    case 256:
                        this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                    break
                    case 331:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 335:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                    break
                    case 397:
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 503:
                        this.battle.cardManagers[this.player].allGroupClaw(this.effect[0])
                    break
                    case 570:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(0)
                        }
                    break
                    case 571:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(2)
                        }
                    break
                    case 573:
                        this.userCombatant.statusEffect('Step Next Turn',1)
                    break
                    case 574:
                        this.userCombatant.evoke(0,this.user,[this.effect[0]])
                    break
                    case 575:
                        this.userCombatant.clearOrbs()
                    break
                    case 663:
                        this.userCombatant.statusEffect('Dodge',this.effect[1])
                        this.userCombatant.addBlock(this.effect[2])
                    break
                    case 664:
                        this.userCombatant.block=min(this.effect[1],this.userCombatant.block)
                    break
                    case 690:
                        this.userCombatant.metal+=this.effect[1]
                    break
                    case 704:
                        this.battle.cardManagers[this.player].discard.sendSpec(this.battle.cardManagers[this.player].hand.cards,25,this.effect[1])
                    break
                    case 705:
                        this.targetTile.clearTypes()
                    break
                    case 706:
                        this.battle.cardManagers[this.player].hand.upgrade(this.effect[1])
                    break
                    case 717:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClass(2,0,7)
                        }
                    break
                    case 802:
                        this.userCombatant.enterStance(1)
                    break
                    case 803:
                        this.userCombatant.enterStance(2)
                    break
                    case 804: case 823:
                        this.userCombatant.enterStance(3)
                    break
                    case 805:
                        this.userCombatant.enterStance(4)
                    break
                    case 812:
                        this.userCombatant.enterStance(0)
                    break
                    case 816:
                        this.userCombatant.faith+=this.effect[1]
                    break
                    case 923:
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].construct&&distTargetCombatant(0,this.battle.combatantManager.combatants[a],this.targetTile)==1){
                                this.battle.combatantManager.combatants[a].gainMaxHP(this.effect[1])
                            }
                        }
                    break
                    case 955:
                        this.userCombatant.charge+=this.effect[1]
                    break

                }
            break
            case 3:
                switch(this.type){
                    case -15:
                        this.userCombatant.deStatus('Cannot Move',this.effect[0])
                    break
                    case 6:
                        this.userCombatant.statusEffect('Double Damage',this.effect[0])
                    break
                    case 30:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                    break
                    case 41: case 807: case 820: case 821: case 822:
                        this.battle.energy.main[this.player]+=this.effect[0]
                    break
                    case 71:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,3,2])
                    break
                    case 92:
                        this.battle.cardManagers[this.player].deFatigue(this.effect[0])
                    break
                    case 98:
                        this.userCombatant.statusEffect('Temporary Damage Up',this.effect[0])
                    break
                    case 113:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 128:
                        this.userCombatant.combo+=this.effect[0]
                    break
                    case 149:
                        this.userCombatant.statusEffect('Take 3/4 Damage',this.effect[0])
                    break
                    case 150:
                        this.userCombatant.statusEffect('Temporary Strength',this.effect[0])
                        this.userCombatant.statusEffect('Temporary Strength Next Turn',this.effect[0])
                    break
                    case 181:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        this.userCombatant.statusEffect('Counter',this.effect[1])
                    break
                    case 184:
                        game.collisionDamage+=this.effect[0]
                    break
                    case 198:
                        this.userCombatant.combo*=this.effect[0]
                    break
                    case 200:
                        this.userCombatant.statusEffect('Conditioning',this.effect[0])
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 203:
                        this.userCombatant.statusEffect('Retain Block',this.effect[0])
                    break
                    case 204:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        this.userCombatant.statusEffect('Conditioning',this.effect[1])
                    break
                    case 212:
                        this.battle.energy.gen[this.player]+=this.effect[0]
                    break
                    case 215:
                        this.userCombatant.combo+=this.effect[0]
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 223:
                        this.userCombatant.statusEffect('Conditioning',this.effect[0])
                    break
                    case 225:
                        this.userCombatant.combo+=this.effect[0]
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                    break
                    case 226:
                        this.userCombatant.combo+=this.effect[0]
                        this.userCombatant.statusEffect('Remove Combo',1)
                    break
                    case 231:
                        this.userCombatant.statusEffect('Combo Per Hit Boost',this.effect[0])
                    break
                    case 239:
                        this.userCombatant.statusEffect('Combo Per Turn',this.effect[0])
                    break
                    case 240:
                        this.userCombatant.statusEffect('Combo Next Turn',this.effect[0])
                    break
                    case 249:
                        this.userCombatant.statusEffect('Strength',floor(this.userCombatant.combo/this.effect[0]))
                        this.userCombatant.combo=0
                    break
                    case 264:
                        this.userCombatant.statusEffect('Shiv Boost',this.effect[0])
                    break
                    case 278:
                        this.userCombatant.statusEffect('Temporary Strength',this.effect[0])
                    break
                    case 286:
                        this.userCombatant.statusEffect('Counter All Combat',this.effect[0])
                    break
                    case 299:
                        this.userCombatant.statusEffect('Double Damage Turn Next Turn',1)
                    break
                    case 306:
                        this.userCombatant.statusEffect('Retain Block',999)
                    break
                    case 307:
                        this.userCombatant.statusEffect('Vulnerable',this.effect[0])
                        this.battle.energy.gen[this.player]+=this.effect[1]
                    break
                    case 311:
                        this.userCombatant.multiplyStatusClass(this.effect[0],[0,2])
                    break
                    case 312:
                        this.userCombatant.statusEffect('Shiv on Hit',this.effect[0])
                    break
                    case 347:
                        this.userCombatant.statusEffect('Debuff Damage',this.effect[0])
                    break
                    case 362:
                        this.userCombatant.life-=this.effect[0]*this.battle.cardManagers[this.player].deFatigueAll()
                    break
                    case 366:
                        this.battle.cardManagers[this.player].allGroupEffect(21)
                    break
                    case 367:
                        this.battle.cardManagers[this.player].reserve.sendName(this.battle.cardManagers[this.player].hand.cards,'Fatigue')
                        this.battle.cardManagers[this.player].discard.sendName(this.battle.cardManagers[this.player].hand.cards,'Fatigue')
                    break
                    case 370:
                        this.userCombatant.statusEffect('Heal on Hit',this.effect[0])
                    break
                    case 372:
                        this.battle.energy.gen[this.player]+=this.effect[0]
                        this.userCombatant.statusEffect('Take Per Card Played Combat',this.effect[1])
                    break
                    case 381:
                        this.userCombatant.statusEffect('Take 3/5 Damage',999)
                    break
                    case 393:
                        this.userCombatant.statusEffect('Dexterity',this.effect[0])
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 406:
                        if(this.targetCombatant.block<=0){
                            this.userCombatant.statusEffect('Bleed',this.effect[0])
                        }
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 424:
                        this.battle.cardManagers[this.player].allGroupEffect(23)
                    break
                    case 439:
                        this.userCombatant.statusEffect('Armed Block Per Turn',this.effect[0])
                    break
                    case 440:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        if(this.userCombatant.block<=0){
                            this.userCombatant.statusEffect('Bleed',this.effect[1])
                        }
                    break
                    case 445:
                        this.userCombatant.statusEffect('Strength',this.userCombatant.balance*this.effect[0])
                        this.userCombatant.balance=0
                    break
                    case 446:
                        this.userCombatant.statusEffect('Dexterity',this.userCombatant.balance*this.effect[0])
                        this.userCombatant.balance=0
                    break
                    case 450:
                        this.userCombatant.balance*=2
                    break
                    case 454:
                        this.userCombatant.statusEffect('Counter Block',this.effect[0])
                    break
                    case 455:
                        this.userCombatant.statusEffect('Heal Gain Max HP',this.effect[0])
                    break
                    case 457:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 488:
                        this.userCombatant.combo+=this.effect[0]
                        this.battle.cardManagers[this.player].addRandomSpec(2,0,11)
                    break
                    case 500:
                        this.battle.cardManagers[this.player].allGroupClaw(this.effect[0])
                    break
                    case 517:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.battle.drop(this.player,findName('Void',types.card),0,game.playerNumber+1)
                    break
                    case 521:
                        this.battle.energy.main[this.player]*=2
                    break
                    case 586: case 619:
                        this.userCombatant.metal+=this.effect[0]
                    break
                    case 613:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomAllPriority(2,0)
                        }
                    break
                    case 614:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassAllPriority(2,0,2)
                        }
                    break
                    case 615:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassAllPriority(2,0,7)
                        }
                    break
                    case 625:
                        this.userCombatant.metal+=this.effect[0]
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 635:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        this.userCombatant.statusEffect('Block Next Turn',this.effect[1])
                    break
                    case 636:
                        this.userCombatant.addBlock(this.effect[0])
                        this.userCombatant.statusEffect('Dodge Next Turn',this.effect[1])
                    break
                    case 644:
                        this.userCombatant.combo+=this.effect[0]
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                        this.userCombatant.statusEffect('Combo Next Turn',this.effect[2])
                    break
                    case 646:
                        this.userCombatant.statusEffect('Combo Per Hit Boost',this.effect[0])
                        this.userCombatant.combo+=this.effect[1]
                    break
                    case 648:
                        this.userCombatant.statusEffect('Combo Per Turn',this.effect[0])
                        this.userCombatant.combo+=this.effect[1]
                    break
                    case 649:
                        this.userCombatant.statusEffect('Strength',floor(this.userCombatant.combo/this.effect[0]))
                        this.userCombatant.combo=this.effect[1]
                    break
                    case 655:
                        this.battle.cardManagers[this.player].deFatigue(this.effect[0])
                        this.battle.cardManagers[this.player].allGroupEffect(21)
                    break
                    case 656:
                        this.battle.cardManagers[this.player].deFatigue(this.effect[0])
                        this.battle.cardManagers[this.player].reserve.sendName(this.battle.cardManagers[this.player].hand.cards,'Fatigue')
                        this.battle.cardManagers[this.player].discard.sendName(this.battle.cardManagers[this.player].hand.cards,'Fatigue')
                    break
                    case 668:
                        this.userCombatant.statusEffect('Shiv on Hit',this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 684:
                        let finalvalue=this.effect[0]
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].construct&&this.battle.combatantManager.combatants[a].life>0){
                                finalvalue-=this.effect[1]
                            }
                        }
                        this.userCombatant.metal+=max(0,finalvalue)
                    break
                    case 711:
                        this.userCombatant.metal+=this.effect[0]
                        this.userCombatant.statusEffect('Buffer',this.effect[1])
                    break
                    case 712:
                        let maximum=1
                        for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                            if(this.battle.cardManagers[this.player].hand.cards[a].spec.includes(21)){
                                maximum=max(maximum,this.battle.cardManagers[this.player].hand.cards[a].cost+this.effect[0])
                            }
                        }
                        this.userCombatant.metal+=maximum
                    break
                    case 713:
                        this.userCombatant.heal(this.effect[0])
                        this.userCombatant.metal+=this.effect[1]
                    break
                    case 737:
                        this.userCombatant.statusEffect('Smite Per Turn',this.effect[0])
                    break
                    case 754:
                        this.userCombatant.statusEffect('Stance Block',this.effect[0])
                    break
                    case 755:
                        this.userCombatant.statusEffect('Stance Draw',this.effect[0])
                    break
                    case 760:
                        this.userCombatant.statusEffect('Single Damage',this.effect[0])
                    break
                    case 761:
                        this.userCombatant.faith+=this.effect[0]
                        this.userCombatant.statusEffect('Lose Next Turn',this.effect[1])
                    break
                    case 763:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        this.userCombatant.enterStance(2)
                    break
                    case 777:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,1,3])
                    break
                    case 778:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,1,4])
                    break
                    case 788:
                        this.userCombatant.statusEffect('Energy Per Turn Per Turn',this.effect[0])
                    break
                    case 799:
                        if(this.battle.turn.total>=3){
                            this.battle.energy.main[this.player]+=this.effect[0]
                            this.battle.cardManagers[this.player].draw(this.effect[1])
                        }
                    break
                    case 836:
                        let encode=this.battle.cardManagers[this.player].hand.lastPlayed[1]
                        this.battle.cardManagers[this.player].hand.add(encode[0],encode[1],encode[2])
                    break
                    case 838:
                        this.userCombatant.statusEffect('Block Spark',this.effect[0])
                    break
                    case 839:
                        this.userCombatant.statusEffect('Block Spark+',this.effect[0])
                    break
                    case 841:
                        this.userCombatant.charge+=this.effect[0]
                    break
                    case 842:
                        this.userCombatant.charge+=this.amplify?this.effect[0]+this.effect[1]:this.effect[0]
                    break
                    case 864:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomAllPriority(2,0)
                        }
                        this.battle.cardManagers[this.player].hand.badreserve(this.effect[1])
                    break
                    case 873:
                        this.battle.energy.main[this.player]+=this.userCombatant.charge
                        this.userCombatant.charge=0
                        this.userCombatant.chargeConsumed()
                    break
                    case 876:
                        this.userCombatant.statusEffect('Free Amplify',999)
                    break
                    case 886:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.battle.cardManagers[this.player].discard.sendSpec(this.battle.cardManagers[this.player].hand.cards,25,this.effect[1])
                    break
                    case 893:
                        this.userCombatant.statusEffect('Charge Consume Block',this.effect[0])
                    break
                    case 896:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.relicManager.addRandomRelic(this.player)
                        }
                    break
                    case 898:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                        if(this.amplify){
                            this.userCombatant.statusEffect('Free Amplify',1)
                        }
                    break
                    case 901:
                        this.userCombatant.statusEffect('Shuffle Energy',this.effect[0])
                        this.userCombatant.statusEffect('Shuffle Draw',this.effect[1])
                    break
                    case 914:
                        let amount=this.battle.cardManagers[this.player].hand.cards.length
                        this.battle.cardManagers[this.player].allEffect(2,1)
                        this.battle.cardManagers[this.player].draw(amount)
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                    break
                    case 937:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.userCombatant.charge+=this.effect[1]
                    break
                    case 948:
                        if(floor(random(0,2))==0){
                            this.userCombatant.statusEffect('Triple Damage',this.effect[0])
                        }
                    break

                }
            break
            case 4:
                switch(this.type){
                    case 8: case 892:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                    break
                    case 28:
                        this.battle.overlayManager.overlays[7][this.player].active=true
                        this.battle.overlayManager.overlays[7][this.player].activate()
                    break
                    case 29:
                        this.battle.overlayManager.overlays[8][this.player].active=true
                        this.battle.overlayManager.overlays[8][this.player].activate()
                    break
                    case 40:
                        let amount=this.battle.cardManagers[this.player].hand.cards.length
                        this.battle.cardManagers[this.player].allEffect(2,1)
                        this.battle.cardManagers[this.player].draw(amount)
                    break
                    case 44:
                        this.battle.cardManagers[this.player].send(3,1)
                        this.battle.cardManagers[this.player].shuffle(1)
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                    break
                    case 45:
                        this.battle.cardManagers[this.player].allEffect(1,4)
                        this.battle.cardManagers[this.player].allEffect(2,3)
                        this.battle.cardManagers[this.player].allEffect(3,4)
                    break
                    case 55:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                    break
                    case 62:
                        for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                            this.battle.cardManagers[this.player].hand.cards[a].cost=min(this.battle.cardManagers[this.player].hand.cards[a].cost,this.effect[0])
                            if(this.effect[1]>0){
                                this.battle.cardManagers[this.player].hand.cards[a].base.cost=min(this.battle.cardManagers[this.player].hand.cards[a].base.cost,this.effect[0])
                            }
                        }
                    break
                    case 63:
                        this.battle.cardManagers[this.player].hand.exhaustAny()
                    break
                    case 69:
                        for(let a=0;a<this.effect[0];a++){
                            this.battle.cardManagers[this.player].addRandomColor(2,0,0,3)
                        }
                    break
                    case 70:
                        this.battle.cardManagers[this.player].hand.reserve(this.effect[0])
                    break
                    case 76:
                        this.userCombatant.statusEffect('Intangible',this.effect[0])
                    break
                    case 78:
                        this.battle.cardManagers[this.player].randomEffect(2,5,[])
                    break
                    case 93:
                        this.battle.overlayManager.overlays[19][this.player].active=true
                        this.battle.overlayManager.overlays[19][this.player].activate()
                    break
                    case 99:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                    break
                    case 109:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.battle.drop(this.player,findName('Burn',types.card),0,game.playerNumber+1)
                    break
                    case 116:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0]+this.energy)
                        this.battle.attackManager.endAfter=true
                    break
                    case 183:
                        this.battle.cardManagers[this.player].draw(this.effect[0]*this.energy+this.effect[1])
                    break
                    case 186:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].allEffect(2,14)
                        }
                    break
                    case 199:
                        this.battle.cardManagers[this.player].allEffect(0,15)
                        this.battle.cardManagers[this.player].allEffect(1,15)
                        this.battle.cardManagers[this.player].allEffect(2,15)
                    break
                    case 207:
                        this.battle.cardManagers[this.player].hand.discard(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.cardManagers[this.player].addRandom(2,0,3)
                        }
                    break
                    case 209:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassFree(2,0,2,0)
                        }
                    break
                    case 210:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassFree(2,0,2,1)
                        }
                    break
                    case 213:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.userCombatant.statusEffect('Conditioning',this.effect[1])
                    break
                    case 214:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].randomEffect(2,2,[0])
                        }
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 227:
                        this.battle.cardManagers[this.player].hand.duplicate(this.effect[0])
                    break
                    case 229:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassFree(2,0,1,0)
                        }
                    break
                    case 230:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassFree(2,0,1,1)
                        }
                    break
                    case 232:
                        this.userCombatant.statusEffect('Attack Draw',this.effect[0])
                    break
                    case 233:
                        this.userCombatant.statusEffect('Combo on Block',this.effect[0])
                    break
                    case 253:
                        let amount2=this.battle.cardManagers[this.player].hand.cards.length
                        this.battle.cardManagers[this.player].allEffect(2,1)
                        for(let a=0,la=amount2+this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 254:
                        this.userCombatant.statusEffect('Card Play Block',this.effect[0])
                    break
                    case 259:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                    break
                    case 276:
                        this.battle.cardManagers[this.player].hand.duplicate(this.effect[0])
                        this.battle.cardManagers[this.player].randomEffect(2,0)
                    break
                    case 279:
                        this.battle.cardManagers[this.player].drawPrice(this.effect[0],0)
                    break
                    case 284:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                        this.userCombatant.statusEffect('Dexterity Next Turn',this.effect[1])
                    break
                    case 285:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.battle.cardManagers[this.player].hand.discard(this.effect[1])
                    break
                    case 289:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        if(this.battle.cardManagers[this.player].hand.cards.length>0&&this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].class==2){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 291:
                        if(this.battle.cardManagers[this.player].hand.cards.length<this.effect[0]){
                            this.battle.cardManagers[this.player].draw(this.effect[0]-this.battle.cardManagers[this.player].hand.cards.length)
                        }
                    break
                    case 294:
                        this.battle.cardManagers[this.player].allEffect(2,17)
                        this.userCombatant.statusEffect('No Draw',1)
                    break
                    case 298:
                        this.battle.cardManagers[this.player].hand.nightmare(this.effect[0])
                    break
                    case 300:
                        this.userCombatant.statusEffect('Draw Up',this.effect[0])
                        this.userCombatant.statusEffect('Turn Discard',this.effect[0])
                    break
                    case 302:
                        this.userCombatant.statusEffect('Intangible',this.effect[0])
                        this.userCombatant.statusEffect('Dexterity Per Turn',-this.effect[1])
                    break
                    case 305:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.userCombatant.statusEffect('Strength',this.effect[0])
                        }
                    break
                    case 308:
                        this.userCombatant.statusEffect('Draw Up',this.effect[0])
                        this.userCombatant.statusEffect('Lose Per Turn',this.effect[1])
                    break
                    case 309:
                        this.battle.cardManagers[this.player].allGroupEffect(20)
                    break
                    case 313:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        if(this.battle.cardManagers[this.player].hand.cards.length>0&&this.battle.cardManagers[this.player].hand.cards[this.battle.cardManagers[this.player].hand.cards.length-1].class==1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                        }
                    break
                    case 315:
                        this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].hand.cards,0,-1,2,this.battle.cardManagers[this.player].hand)
                    break
                    case 317:
                        this.userCombatant.statusEffect('Intangible Next Turn',this.effect[0])
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                    break
                    case 318:
                        this.userCombatant.statusEffect('Exhaust Draw',this.effect[0])
                    break
                    case 334:
                        this.battle.energy.gen[this.player]+=this.effect[0]
                        this.userCombatant.statusEffect('Draw Up',-this.effect[1])
                    break
                    case 337:
                        this.battle.overlayManager.overlays[20][this.player].active=true
                        this.battle.overlayManager.overlays[20][this.player].activate()
                    break
                    case 338:
                        this.battle.overlayManager.overlays[21][this.player].active=true
                        this.battle.overlayManager.overlays[21][this.player].activate()
                    break
                    case 339:
                        this.battle.overlayManager.overlays[22][this.player].active=true
                        this.battle.overlayManager.overlays[22][this.player].activate()
                    break
                    case 340:
                        this.battle.overlayManager.overlays[23][this.player].active=true
                        this.battle.overlayManager.overlays[23][this.player].activate()
                    break
                    case 343:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassAllFreeShuffle(1,0,1,1)
                        }
                    break
                    case 344:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassAllFreeShuffle(1,0,2,1)
                        }
                    break
                    case 346:
                        for(let a=0;a<this.effect[0]*this.energy;a++){
                            this.battle.cardManagers[this.player].addRandomColor(2,0,0,3)
                        }
                    break
                    case 363:
                        this.userCombatant.heal(this.effect[0])
                        this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                    break
                    case 387:
                        this.userCombatant.balance=0
                    break
                    case 390:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 392:
                        this.userCombatant.statusEffect('Intangible',this.effect[0])
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 398:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.battle.combatantManager.tick()
                    break
                    case 418:
                        this.userCombatant.statusEffect('Heal on Death',this.effect[0])
                    break
                    case 422:
                        this.userCombatant.statusEffect('Ignore Balance',1)
                    break
                    case 423:
                        this.userCombatant.statusEffect('Balance Energy',1)
                    break
                    case 431:
                        if(!this.userCombatant.armed){
                            for(let a=0,la=6;a<la;a++){
                                let offset=transformDirection(0,-30+a*60)
                                let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                                if(index>=0&&this.battle.tileManager.tiles[index].type.includes(3)){
                                    this.battle.tileManager.tiles[index].anim.upPart[this.battle.tileManager.tiles[index].type.indexOf(3)]=false
                                    this.userCombatant.armed=true
                                    la=0
                                }
                            }
                        }
                    break
                    case 451:
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[0])
                    break
                    case 499:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.battle.cardManagers[this.player].allGroupClaw(this.effect[1])
                    break
                    case 512:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(1)
                        }
                    break
                    case 519:
                        this.userCombatant.statusEffect('Focus',this.effect[0])
                    break
                    case 523:
                        this.userCombatant.statusEffect('Power Draw',this.effect[0])
                    break
                    case 524:
                        this.userCombatant.statusEffect('Random Power Per Turn',this.effect[0])
                    break
                    case 525:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        this.userCombatant.statusEffect('Dexterity',this.effect[0])
                        this.userCombatant.statusEffect('Focus',-this.effect[0])
                    break
                    case 527:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassFree(2,0,4,0)
                        }
                    break
                    case 528:
                        this.userCombatant.statusEffect('Power Basic',this.effect[0])
                    break
                    case 529:
                        this.userCombatant.statusEffect('Damage Taken Basic',this.effect[0])
                    break
                    case 530:
                        this.userCombatant.statusEffect('Random Common Per Turn',this.effect[0])
                    break
                    case 541:
                        this.userCombatant.statusEffect('Focus',this.effect[0])
                        this.userCombatant.statusEffect('Focus Per Turn',-this.effect[1])
                    break
                    case 542:
                        this.battle.cardManagers[this.player].discard.send(this.battle.cardManagers[this.player].reserve.cards,0,-1)
                        this.battle.cardManagers[this.player].allEffect(2,1)
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                    break
                    case 595:
                        this.battle.cardManagers[this.player].allEffect(2,26)
                    break
                    case 603:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.battle.cardManagers[this.player].hand.upgrade(this.effect[1])
                    break
                    case 605:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassListless(2,0,7)
                        }
                    break
                    case 607:
                        this.battle.cardManagers[this.player].drawUpgrade(this.effect[0])
                    break
                    case 612:
                        this.battle.cardManagers[this.player].allEffect(2,27)
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                    break
                    case 640:
                        this.battle.cardManagers[this.player].draw(this.battle.cardManagers[this.player].hand.cards.length+this.effect[0])
                    break
                    case 645:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                    break
                    case 647:
                        this.userCombatant.statusEffect('Combo on Block',this.effect[0])
                        this.userCombatant.addBlock(this.effect[1])
                    break
                    case 665:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0]+this.energy)
                        this.userCombatant.statusEffect('Temporary Strength Next Turn',this.effect[1])
                        this.battle.attackManager.endAfter=true
                    break
                    case 675:
                        for(let a=0;a<this.effect[0]*this.energy+this.effect[1];a++){
                            this.battle.cardManagers[this.player].addRandomColor(2,0,0,3)
                        }
                    break
                    case 680:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                    break
                    case 681:
                        this.battle.cardManagers[this.player].hand.transform(this.effect[0])
                    break
                    case 728:
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                        this.userCombatant.enterStance(0)
                    break
                    case 740:
                        this.userCombatant.enterStance(1)
                    break
                    case 741:
                        this.userCombatant.enterStance(2)
                    break
                    case 742:
                        this.userCombatant.enterStance(3)
                    break
                    case 743:
                        this.userCombatant.enterStance(4)
                    break
                    case 744:
                        this.userCombatant.faith+=this.effect[0]
                    break
                    case 748:
                        this.battle.overlayManager.overlays[7][this.player].active=true
                        this.battle.overlayManager.overlays[7][this.player].endAfter=true
                        this.battle.overlayManager.overlays[7][this.player].activate()
                        this.userCombatant.enterStance(2)
                    break
                    case 749:
                        this.battle.overlayManager.overlays[7][this.player].active=true
                        this.battle.overlayManager.overlays[7][this.player].endAfter=true
                        this.battle.overlayManager.overlays[7][this.player].activate()
                        this.userCombatant.enterStance(2)
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                    break
                    case 752:
                        this.userCombatant.enterStance(4)
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[0])
                        this.battle.attackManager.endAfter=true
                    break
                    case 753:
                        this.userCombatant.enterStance(4)
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[0])
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                        this.battle.attackManager.endAfter=true
                    break
                    case 756:
                        this.userCombatant.faith+=this.effect[0]
                        this.battle.cardManagers[this.player].reserve.addShuffle(findName('Insight',types.card),0,0)
                    break
                    case 759:
                        this.userCombatant.faith+=this.effect[0]
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 768:
                        this.userCombatant.statusEffect('Faith Per Turn',this.effect[0])
                    break
                    case 769:
                        this.userCombatant.addBlock(this.battle.cardManagers[this.player].deck.cards.length)
                    break
                    case 772:
                        this.userCombatant.statusEffect('Miracle Time',this.energy)
                        this.battle.energy.main[this.player]+=this.effect[0]
                    break
                    case 773:
                        this.userCombatant.statusEffect('Miracle+ Time',this.energy)
                        this.battle.energy.main[this.player]+=this.effect[0]
                    break
                    case 774:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        this.userCombatant.statusEffect('Dexterity',this.effect[1])
                        this.battle.energy.gen[this.player]-=this.effect[2]
                    break
                    case 781:
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[0])
                        this.userCombatant.statusEffect('Wrath Time',this.effect[1])
                    break
                    case 782:
                        this.userCombatant.statusEffect('Insight Per Turn',this.effect[0])
                    break
                    case 789:
                        this.userCombatant.statusEffect('Retain Cost Reduce',this.effect[0])
                    break
                    case 790:
                        this.battle.cardManagers[this.player].reserve.addShuffle(findName('Beta',types.card),0,0)
                    break
                    case 791:
                        this.battle.cardManagers[this.player].reserve.addShuffle(findName('Omega',types.card),0,0)
                    break
                    case 797:
                        this.battle.cardManagers[this.player].drawPrice(this.effect[0],0)
                        if(this.battle.counter.turnPlayed[0]==1){
                            this.battle.cardManagers[this.player].draw(this.effect[1],0)
                        }
                    break
                    case 818:
                        this.battle.cardManagers[this.player].hand.add(findName('Crescendo',types.card),0,types.card[findName('Crescendo',types.card)].list)
                        this.battle.cardManagers[this.player].hand.add(findName('Forward',types.card),0,types.card[findName('Forward',types.card)].list)
                        this.battle.cardManagers[this.player].hand.add(findName('Standstill',types.card),0,types.card[findName('Standstill',types.card)].list)
                    break
                    case 819:
                        this.battle.cardManagers[this.player].hand.add(findName('Crescendo',types.card),1,types.card[findName('Crescendo',types.card)].list)
                        this.battle.cardManagers[this.player].hand.add(findName('Forward',types.card),1,types.card[findName('Forward',types.card)].list)
                        this.battle.cardManagers[this.player].hand.add(findName('Standstill',types.card),1,types.card[findName('Standstill',types.card)].list)
                    break
                    case 832:
                        this.battle.cardManagers[this.player].draw(this.amplify?this.effect[0]+this.effect[1]:this.effect[0])
                    break
                    case 835:
                        this.battle.energy.main[this.player]+=floor(ceil(this.battle.cardManagers[this.player].discard.cards.length/2)/this.effect[0])
                        this.battle.cardManagers[this.player].discard.halfEffect(0)
                    break
                    case 855:
                        this.userCombatant.statusEffect('Amplify Return',this.effect[0])
                    break
                    case 859:
                        this.battle.cardManagers[this.player].hand.add(findName('Instant\nWrath',types.card),0,0)
                        this.battle.cardManagers[this.player].hand.add(findName('Instant\nCalm',types.card),0,0)
                    break
                    case 860:
                        this.battle.cardManagers[this.player].hand.add(findName('Instant\nHaste',types.card),0,0)
                        this.battle.cardManagers[this.player].hand.add(findName('Instant\nSturdy',types.card),0,0)
                    break
                    case 868:
                        this.battle.overlayManager.overlays[29][this.player].active=true
                        this.battle.overlayManager.overlays[29][this.player].activate()
                    break
                    case 869:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                    break
                    case 870:
                        for(let a=0,la=this.energy;a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassFreeSpec(2,0,1,1,[1])
                        }
                    break
                    case 871:
                        for(let a=0,la=this.energy;a<la;a++){
                            this.battle.cardManagers[this.player].addRandomClassFreeSpec(2,1,1,1,[1])
                        }
                    break
                    case 891:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomAllPriority(1,floor(random(0,100))<this.effect[1]?1:0)
                        }
                        this.battle.cardManagers[this.player].draw(this.effect[2])
                    break
                    case 904:
                        this.battle.cardManagers[this.player].hand.allEffect(31)
                        this.userCombatant.statusEffect('Temporary Strength',-this.effect[0])
                    break
                    case 909:
                        let amount3=this.battle.cardManagers[this.player].hand.cards.length
                        this.battle.cardManagers[this.player].allEffect(2,32)
                        for(let a=0,la=amount3;a<la;a++){
                            this.battle.cardManagers[this.player].addRandom(2,0,3)
                        }
                    break
                    case 910:
                        let amount4=this.battle.cardManagers[this.player].hand.cards.length
                        this.battle.cardManagers[this.player].allEffect(2,32)
                        for(let a=0,la=amount4;a<la;a++){
                            this.battle.cardManagers[this.player].addRandom(2,1,3)
                        }
                    break
                    case 911:
                        this.battle.cardManagers[this.player].allEffect(2,33)
                    break
                    case 912:
                        this.battle.cardManagers[this.player].allEffect(2,34)
                    break
                    case 913:
                        this.battle.cardManagers[this.player].hand.upgrade(this.effect[0])
                        this.userCombatant.statusEffect('Buffer',this.effect[1])
                    break
                    case 921:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].addRandomAllClass(2,0,4)
                        }
                    break
                    case 922:
                        this.battle.cardManagers[this.player].allEffect(2,35)
                    break
                    case 926:
                        this.targetCombatant.statusEffect('Distracted',this.effect[0])
                    break
                    case 928:
                        this.userCombatant.statusEffect('Take Credit',this.effect[0])
                    break
                    case 929:
                        this.battle.cardManagers[this.player].hand.retain2(this.effect[0])
                    break
                    case 932:
                        this.battle.cardManagers[this.player].allGroupEffectArgs(1,[this.effect[0]])
                    break
                    case 949:
                        this.battle.overlayManager.overlays[6][this.player].active=true
                        this.battle.overlayManager.overlays[6][this.player].activate([0,3,1])
                    break
                    
                }
            break
            case 5:
                switch(this.type){
                    case -13:
                        this.userCombatant.takeDamage(this.effect[0])
                    break
                    case -21:
                        this.userCombatant.takeDamage(this.effect[0])
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 10:
                        this.userCombatant.heal(this.effect[0])
                    break
                    case 64:
                        this.userCombatant.statusEffect('Control',this.effect[0])
                    break
                    case 72:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 73:
                        this.userCombatant.statusEffect('Dexterity',this.effect[0])
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 74:
                        this.userCombatant.statusEffect('Buffer',this.effect[0])
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 164:
                        this.battle.currency.money[this.player]+=this.effect[0]
                        this.battle.currency.money[this.targetCombatant.id]-=this.effect[0]
                    break
                    case 166:
                        this.battle.cardManagers[this.player].hand.add(findName('Riot\nShield',types.card),0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Pepper\nSpray',types.card),0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Shock\nBaton',types.card),0,this.color)
                    break
                    case 167:
                        this.number=floor(random(0,3))
                        this.battle.cardManagers[this.player].hand.add(findName('Riot\nShield',types.card),this.number==0?1:0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Pepper\nSpray',types.card),this.number==1?1:0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Shock\nBaton',types.card),this.number==2?1:0,this.color)
                    break
                    case 168:
                        this.battle.cardManagers[this.player].hand.add(findName('Flamethrower',types.card),0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Impact\nGrenade',types.card),0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Landmine',types.card),0,this.color)
                    break
                    case 169:
                        this.number=floor(random(0,3))
                        this.battle.cardManagers[this.player].hand.add(findName('Flamethrower',types.card),this.number==0?1:0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Impact\nGrenade',types.card),this.number==1?1:0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Landmine',types.card),this.number==2?1:0,this.color)
                    break
                    case 170:
                        this.battle.cardManagers[this.player].hand.add(findName('Submachine',types.card),0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Antitank\nRocket',types.card),0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Ammo\nBox',types.card),0,this.color)
                    break
                    case 171:
                        this.number=floor(random(0,3))
                        this.battle.cardManagers[this.player].hand.add(findName('Submachine',types.card),this.number==0?1:0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Antitank\nRocket',types.card),this.number==1?1:0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Ammo\nBox',types.card),this.number==2?1:0,this.color)
                    break
                    case 180:
                        this.userCombatant.statusEffect('Cancel Exhaust',this.effect[0])
                    break
                    case 195:
                        this.userCombatant.heal(this.combo*this.effect[0])
                        this.userCombatant.combo=0
                    break
                    case 202:
                        this.userCombatant.combo+=this.effect[0]
                    break
                    case 224:
                        this.userCombatant.heal(this.effect[0]*this.energy)
                    break
                    case 283:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 349:
                        this.userCombatant.heal(this.userCombatant.base.life-this.userCombatant.life)
                    break
                    case 360:
                        this.userCombatant.gainMaxHP(this.effect[0])
                    break
                    case 369:
                        this.userCombatant.statusEffect('Regeneration',this.effect[0])
                    break
                    case 380:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        this.userCombatant.loseMaxHP(this.effect[1])
                    break
                    case 391:
                        this.userCombatant.heal(this.effect[0]*this.userCombatant.balance)
                        this.userCombatant.balance=0
                    break
                    case 442:
                        if(this.userCombatant.getStatus('Bleed')>0){
                            this.userCombatant.heal(this.effect[0]*this.userCombatant.getStatus('Bleed'))
                            this.userCombatant.status.main[findList('Bleed',this.userCombatant.status.name)]=0
                        }
                    break
                    case 456:
                        for(let a=0,la=this.battle.itemManager.items[this.player].length;a<la;a++){
                            if(this.battle.itemManager.items[this.player][a].type>1){
                                this.userCombatant.gainMaxHP(this.effect[0])
                                this.battle.itemManager.total[this.player]--
                                this.battle.itemManager.items[this.player][a].type=1
                                this.battle.itemManager.items[this.player][a].refresh()
                            }
                        }
                    break
                    case 470:
                        this.userCombatant.gainMaxHP(this.effect[0]*this.energy)
                    break
                    case 608:
                        this.userCombatant.heal(this.effect[0])
                        this.battle.cardManagers[this.player].allEffect(2,5)
                    break
                    case 641:
                        this.number=floor(random(0,3))
                        this.battle.cardManagers[this.player].hand.add(findName('Riot\nShield',types.card),this.number==0?0:1,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Pepper\nSpray',types.card),this.number==1?0:1,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Shock\nBaton',types.card),this.number==2?0:1,this.color)
                    break
                    case 642:
                        this.number=floor(random(0,3))
                        this.battle.cardManagers[this.player].hand.add(findName('Flamethrower',types.card),this.number==0?0:1,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Impact\nGrenade',types.card),this.number==1?0:1,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Landmine',types.card),this.number==2?0:1,this.color)
                    break
                    case 643:
                        this.number=floor(random(0,3))
                        this.battle.cardManagers[this.player].hand.add(findName('Submachine',types.card),this.number==0?0:1,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Antitank\nRocket',types.card),this.number==1?0:1,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Ammo\nBox',types.card),this.number==2?0:1,this.color)
                    break
                    case 659:
                        this.userCombatant.gainMaxHP(this.effect[0]*this.energy+this.effect[1])
                    break
                    case 924:
                        this.targetCombatant.block=0
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                    break
                    case 952:
                        this.battle.cardManagers[this.player].hand.add(findName('White\nDwarf',types.card),0,0)
                        this.battle.cardManagers[this.player].hand.add(findName('Black\nDwarf',types.card),0,0)
                    break
                    case 953:
                        this.battle.cardManagers[this.player].hand.add(findName('White\nDwarf',types.card),1,0)
                        this.battle.cardManagers[this.player].hand.add(findName('Black\nDwarf',types.card),1,0)
                    break
                    case 954:
                        this.battle.cardManagers[this.player].hand.add(findName('White\nDwarf',types.card),2,0)
                        this.battle.cardManagers[this.player].hand.add(findName('Black\nDwarf',types.card),2,0)
                    break
                    case 960:
                        this.battle.cardManagers[this.player].hand.add(findName('Fire\nBall',types.card),0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Water\nBall',types.card),0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Grass\nBall',types.card),0,this.color)
                    break
                    case 961:
                        this.number=floor(random(0,3))
                        this.battle.cardManagers[this.player].hand.add(findName('Fire\nBall',types.card),this.number==0?1:0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Water\nBall',types.card),this.number==1?1:0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Grass\nBall',types.card),this.number==2?1:0,this.color)
                    break
                    case 962:
                        this.number=floor(random(0,3))
                        this.battle.cardManagers[this.player].hand.add(findName('Fire\nBall',types.card),this.number==0?0:1,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Water\nBall',types.card),this.number==1?0:1,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Grass\nBall',types.card),this.number==2?0:1,this.color)
                    break
                }
            break
            case 6:
                switch(this.type){
                    case 36:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 39:
                        if(this.targetCombatant.block<=0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[0])
                        }
                    break
                    case 47:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                    break
                    case 384:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                        this.battle.cardManagers[this.player].hand.discard(this.effect[2])
                    break
                    case 412:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                        if(this.userCombatant.armed){
                            this.userCombatant.armed=false
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)].addType(3)
                        }
                    break
                    case 413:
                        if(this.targetCombatant.block<=0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[0])
                        }
                        if(this.userCombatant.armed){
                            this.userCombatant.armed=false
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)].addType(3)
                        }
                    break
                    case 441:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                        if(this.userCombatant.block<=0){
                            this.userCombatant.statusEffect('Bleed',this.effect[2])
                        }
                    break
                    case 599:
                        if(this.targetCombatant.block<=0){
                            this.targetCombatant.statusEffect('Jagged Bleed',this.effect[0])
                        }
                    break
                }
            break
            case 7:
                switch(this.type){
                    case 38:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[1])
                        }
                    break
                    case 79:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.cardManagers[this.player].discard.add(findName('Ouroboros',types.card),0,0)
                        this.battle.cardManagers[this.player].discard.cards[this.battle.cardManagers[this.player].discard.cards.length-1].effect[0]=this.effect[0]+2
                    break
                    case 81:
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                    break
                    case 84:
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                    break
                    case 85:
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                    break
                    case 86:
                        this.targetCombatant.statusEffect('Frail',this.effect[0])
                    break
                    case 104:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==4&&isInt(this.targetCombatant.attack[this.targetCombatant.intent].effect[0])){
                            this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[1])
                        }
                    break
                    case 145:
                        this.targetCombatant.heal(this.effect[0])
                    break
                    case 148:
                        this.userCombatant.heal(this.effect[0])
                        this.targetCombatant.safeDamage(this.effect[1])
                    break
                    case 158:
                        this.battle.cardManagers[this.targetCombatant.id].tempDraw+=this.effect[0]
                    break
                    case 159:
                        this.targetCombatant.statusEffect('Strength',this.effect[0])
                    break
                    case 160:
                        this.targetCombatant.statusEffect('Energy Next Turn',this.effect[0])
                    break
                    case 161:
                        this.battle.cardManagers[this.player].allEffect(2,13)
                    break
                    case 162:
                        this.targetCombatant.statusEffect('Buffer',this.effect[0])
                    break
                    case 163:
                        this.battle.cardManagers[this.player].deStatus(this.effect[0])
                    break
                    case 173:
                        this.battle.turnManager.loadEnemyRandomMove(this.targetCombatant.id)
                    break
                    case 177:
                        this.targetTile.addType(2)
                    break
                    case 272:
                        this.targetCombatant.randomStatusInstant(this.effect[0],[1])
                    break
                    case 292:
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                        this.userCombatant.addBlock(this.effect[1])
                    break
                    case 295:
                        this.targetCombatant.statusEffect('Explode on Death',1)
                    break
                    case 297:
                        this.targetCombatant.statusEffect('Strength',-this.effect[0])
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 314:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<=0){
                            this.battle.combatantManager.damageArea(this.effect[1],this.user,-1,this.targetCombatant.tilePosition)
                        }
                    break
                    case 316:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                    break
                    case 326:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                        }
                    break
                    case 351:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.targetCombatant.id].addRandomAll(2,0,3)
                        }
                    break
                    case 352:
                        this.battle.cardManagers[this.targetCombatant.id].hand.add(findName('Strike\nAid',types.card),0,this.color)
                        this.battle.cardManagers[this.targetCombatant.id].hand.add(findName('Defend\nAid',types.card),0,this.color)
                        this.battle.cardManagers[this.targetCombatant.id].hand.add(findName('Step\nAid',types.card),0,this.color)
                    break
                    case 382:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Confusion',this.effect[1])
                        this.battle.updateTargetting()
                    break
                    case 408:
                        this.targetCombatant.multiplyStatus('Bleed',this.effect[0])
                    break
                    case 419:
                        this.targetCombatant.takeDamage(this.effect[0]*this.battle.cardManagers[this.player].hand.cards.length,this.user)
                        this.battle.cardManagers[this.player].allEffect(2,22)
                    break
                    case 433:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==2){
                            this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[1])
                        }
                    break
                    case 452:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.dropDraw(this.player,findName('Dazed',types.card),this.level,game.playerNumber+1)
                    break
                    case 472:
                        this.targetTile.addType(19)
                    break
                    case 474:
                        this.targetTile.addType(19)
                        this.battle.tileManager.typeArea(19,this.targetTile.tilePosition)
                    break
                    case 482:
                        this.targetTile.addType(19)
                        for(let a=0,la=5;a<la;a++){
                            let index=this.battle.tileManager.getTileIndex(this.targetTile.tilePosition.x*(a+2)-this.userCombatant.tilePosition.x*(a+1),this.targetTile.tilePosition.y*(a+2)-this.userCombatant.tilePosition.y*(a+1))
                            if(index>=0){
                                this.battle.tileManager.tiles[index].addType(19)
                            }
                        }
                    break
                    case 533:
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,33,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.statusEffect('Focus',-this.effect[1])
                    break
                    case 537:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userCombatant.totalOrb,this.user)
                    break
                    case 538:
                        this.targetCombatant.statusEffect('Lock-On',this.effect[0])
                    break
                    case 539:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Lock-On',this.effect[1])
                    break
                    case 548:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.multiplyStatus('Vulnerable',this.effect[1])
                    break
                    case 585:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Wall',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 592:
                        this.targetCombatant.status.main[findList('Strength',this.targetCombatant.status.name)]=0
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                    break
                    case 620:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Spike Pillar',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 621:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Projector',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 622:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 623:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Readout',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 624:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Strengthener',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 626:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Explosive Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 627:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Multiturret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 628:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Barbed Pillar',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 629:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Gun Rack',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 630:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Repulse Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 631:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Machine Gun',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 667:
                        this.targetCombatant.randomStatusInstant(this.effect[0],[1])
                        this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                    break
                    case 669:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                        this.targetCombatant.randomStatusInstant(this.effect[2],[1])                            
                    break
                    case 685:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Miniturret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 686:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Metal Box',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 687:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Upgrader',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 688:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Transformer',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 695:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Doubler',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 696:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Exhauster',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 697:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.turnManager.loadEnemyRandomMove(this.targetCombatant.id)
                    break
                    case 700:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Teleporter Start',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Use Teleporter\nStart',types.card),0,0)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 701:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Teleporter End',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Use Teleporter\nEnd',types.card),0,0)
                        this.battle.cardManagers[this.player].hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 702:
                        this.battle.cardManagers[this.user].hand.add(findName('Proxy\nTeleport',types.card),0,0)
                        this.targetCombatant.life=0
                    break
                    case 720:
                        this.targetCombatant.statusEffect('Weak Next Turn',this.effect[0])
                    break
                    case 787:
                        if(this.targetCombatant.life<this.effect[0]){
                            this.targetCombatant.life=0
                        }
                    break
                    case 801:
                        this.targetCombatant.life-=this.userCombatant.base.life-this.userCombatant.life
                    break
                    case 833:
                        this.targetCombatant.takeDamage(this.amplify?this.effect[0]*3:this.effect[0],this.user)
                    break
                    case 834:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userCombatant.charge,this.user)
                    break
                    case 837:
                        let burns=0
                        for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                            if(this.battle.cardManagers[this.player].hand.cards[a].name=='Burn'){
                                burns++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]+burns*this.effect[1]*(this.amplify?2:1),this.user)
                    break
                    case 843:
                        this.targetCombatant.takeDamage(this.effect[0]*floor(this.battle.relicManager.total[this.player]/this.effect[1]),this.user)
                    break
                    case 846:
                        let attacks=[]
                        for(let a=0,la=this.effect[0];a<la;a++){
                            if(this.battle.cardManagers[this.player].reserve.cards.length>0){
                                this.battle.cardManagers[this.player].reserve.cards.splice(0,1)
                                a--
                                la--
                                if(this.battle.cardManagers[this.player].reserve.cards[0].class==1){
                                    attacks++
                                }
                            }
                        }
                        if(attacks>0){
                            this.targetCombatant.takeDamage(this.effect[1]*attacks,this.user)
                        }
                    break
                    case 850:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.battle.cardManagers[this.player].exhaust.cards.length,this.user)
                    break
                    case 857:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 865:
                        this.targetClass.takeDamage(this.amplify?this.battle.energy.main[this.player]*this.effect[0]:this.battle.cardManagers[this.player].hand.cards.length+this.effect[0],this.user)
                    break
                    case 877:
                        let card=this.battle.cardManagers[this.player].addRandomClassReturn(2,0,1)
                        if(card.effect.length>0){
                            this.targetCombatant.takeDamage(card.effect[0],this.user)
                        }
                    break
                    case 878:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.combatantManager.damageArea(this.effect[1],this.user,-1,this.userCombatant.tilePosition)
                    break
                    case 881:
                        this.targetCombatant.statusEffect('Burn',this.effect[0])
                    break
                    case 883:
                        this.targetCombatant.multiplyStatus('Burn',this.effect[0])
                    break
                    case 899:
                        let prelife2=this.targetCombatant.life
                        this.targetCombatant.takeDamage(this.amplify?this.effect[1]:this.effect[0],this.user)
                        if(this.targetCombatant.life<prelife2){
                            this.battle.cardManagers[this.player].hand.allEffectArgs(0,[prelife2-this.targetCombatant.life])
                        }
                    break
                    case 902:
                        this.targetCombatant.takeDamage(this.amplify?this.effect[1]:this.effect[0],this.user)
                        this.targetCombatant.removeRandomStatus([0,2])
                    break
                    case 903:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.cardManagers[this.player].hand.exhaust(this.effect[1])
                        this.battle.drop(this.player,findName('Burn',types.card),0,game.playerNumber+1)
                    break
                    case 905:
                        if(this.amplify){
                            this.battle.combatantManager.allEffect(16,this.effect[0])
                        }else{
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                        }
                    break
                    case 906:
                        this.targetCombatant.statusEffect('Weak',999)
                    break
                    case 907:
                        this.targetCombatant.statusEffect('Vulnerable',999)
                    break
                    case 935:
                        this.battle.turnManager.aimInConstructs(this.targetCombatant)
                    break
                    case 939:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.charge+=this.effect[1]
                    break
                    case 943:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Spark',types.card),0,0)
                        this.battle.cardManagers[this.player].hand.add(findName('Rising\nSweep',types.card),0,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Leyline',types.card),0,this.color)
                    break
                    case 944:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.cardManagers[this.player].hand.add(findName('Spark',types.card),1,0)
                        this.battle.cardManagers[this.player].hand.add(findName('Rising\nSweep',types.card),1,this.color)
                        this.battle.cardManagers[this.player].hand.add(findName('Leyline',types.card),1,this.color)
                    break
                    
                }
            break
            case 8:
                switch(this.type){
                    case 66:
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                    break
                    case 68:
                        this.targetCombatant.statusEffect('Strength',-this.effect[0])
                    break
                    case 421:
                        if(this.targetTile.type.includes(3)&&!this.userCombatant.armed){
                            this.targetTile.anim.upPart[this.targetTile.type.indexOf(3)]=false
                            this.userCombatant.armed=true
                        }
                    break
                    case 465:
                        this.targetCombatant.goal.anim.direction-=60
                        this.battle.updateTargetting()
                    break
                    case 466:
                        this.targetCombatant.goal.anim.direction+=60
                        this.battle.updateTargetting()
                    break
                    case 467:
                        this.targetCombatant.goal.anim.direction-=120
                        this.battle.updateTargetting()
                    break
                    case 468:
                        this.targetCombatant.goal.anim.direction+=120
                        this.battle.updateTargetting()
                    break
                }
            break
            case 9:
                switch(this.type){
                    case 634:
                        this.targetCombatant.takeDamage((abs(this.direction-this.targetCombatant.goal.anim.direction)<30||abs(this.direction-this.targetCombatant.goal.anim.direction-360)<30||abs(this.direction-this.targetCombatant.goal.anim.direction+360)<30)?this.effect[0]+this.effect[1]:this.effect[0],this.user,1)
                    break
                    default:
                        this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                    break
                }
                switch(this.type){
                    case 80:
                        this.targetCombatant.statusEffect('Frail',this.effect[1])
                    break
                    case 609:
                        this.targetCombatant.statusEffect('Temporary Strength',-this.effect[1])
                    break
                    case 632:
                        this.targetCombatant.statusEffect('Single Take Double Damage',this.effect[1])
                    break
                    case 633:
                        this.targetCombatant.statusEffect('Single Take Double Damage',this.effect[1])
                        this.battle.dropDraw(this.player,findName('1-Shooter',types.card),0,0)
                    break
                    case 915:
                        if(this.targetCombatant.life<=0){
                            this.battle.cardManagers[this.player].draw(this.effect[1])
                        }
                    break
                }
            break
            case 10:
                switch(this.type){
                    case -14:
                        this.battle.loseCurrency(this.effect[0],this.player)
                    break
                    case 102:
                        if(this.userCombatant.armed){
                            let tile=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                            if(tile>=0){
                                this.battle.tileManager.tiles[tile].addType(3)
                            }
                        }else{
                            this.userCombatant.armed=true
                        }
                    break
                    case 112:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 114:
                        this.battle.itemManager.addRandomItem(this.player)
                    break
                    case 219:
                        this.userCombatant.statusEffect('Shiv Per Turn',this.effect[0])
                    break
                    case 270:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                        }
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 324:
                        for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                            if(this.battle.cardManagers[this.player].hand.cards[a].name=='Shiv'){
                                this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                            }
                        }
                    break
                    case 325:
                        for(let a=0,la=min(this.effect[0]*this.energy,100);a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 341:
                        this.battle.turnManager.loadEnemyPoint(this.targetTile)
                    break
                    case 403:
                        this.userCombatant.statusEffect('Attack Bleed Turn',this.effect[0])
                    break
                    case 404:
                        this.userCombatant.statusEffect('Single Attack Bleed',this.effect[0])
                    break
                    case 405:
                        this.userCombatant.statusEffect('Attack Bleed Combat',this.effect[0])
                    break
                    case 426:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        this.userCombatant.statusEffect('Dexterity',this.effect[1])
                        if(this.userCombatant.armed){
                            this.userCombatant.armed=false
                        }
                    break
                    case 587:
                        this.targetCombatant.life=0
                        this.targetCombatant.programmedDeath=true
                    break
                    case 637:
                        this.battle.addCurrency(this.effect[0],this.player)
                    break
                    case 670:
                        for(let a=0,la=min(this.effect[0]*this.energy+this.effect[1],100);a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 676:
                        this.targetCombatant.life=0
                        this.userCombatant.metal+=this.effect[0]
                    break
                    case 683:
                        this.targetCombatant.life=0
                        let index=findName(`Build\n${this.targetCombatant.name}`,types.card)
                        if(index>=0){
                            this.userCombatant.metal+=types.card[index].levels[0].cost
                        }
                        this.battle.cardManagers[this.team-1].deCard(1,'Unbuild')
                    break
                    case 710:
                        this.targetCombatant.life=0
                        let index2=findName(`Build\n${this.targetCombatant.name}`,types.card)
                        if(index2>=0){
                            this.battle.cardManagers[this.player].hand.add(index2,0,types.card[index2].list)
                        }
                    break
                    case 792:
                        this.battle.cardManagers[this.player].reserve.addShuffleEffect_1(findName('Expunger',types.card),0,0,this.energy+this.effect[0])
                    break
                    case 845:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].reserve.add(findName('Dark Matter',types.card),0,this.color)
                        }
                    break
                    case 888:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 889:
                        this.battle.combatantManager.allEffect(15,[this.effect[0],this.effect[1]])
                    break
                    case 927:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Scrap\nMetal',types.card),0,0)
                        }
                    break
                    case 936:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.tileManager.randomType(21)
                        }
                    break
                    case 941:
                        this.battle.addCurrency(this.effect[0],this.player)
                        this.userCombatant.statusEffect('Strength',-this.effect[1])
                    break

                }
            break
            case 11:
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    switch(this.type){
                        case 139:
                            this.targetCombatant[a].takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
                        break
                        case 175:
                            this.targetCombatant[a].statusEffect('Burn',this.effect[0])
                        break
                        case 453:
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                            if(this.targetCombatant.blocked>0){
                                this.targetCombatant[a].statusEffect('Bleed',this.effect[1])
                            }
                        break
                        default:
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        break
                    }
                }
                switch(this.type){
                    case 139:
                        this.userCombatant.combo=0
                    break
                    case 400:
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 516:
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                }
            break
            case 12:
                switch(this.type){
                    case 342:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 350:
                        this.battle.energy.gen[this.player]+=this.effect[0]
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                        this.userCombatant.statusEffect('Dexterity',this.effect[2])
                    break
                    case 353:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,-1,this.targetCombatant.tilePosition)
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,36,[20]))
                    break
                    case 407:
                        this.battle.combatantManager.multiplyStatus('Bleed',this.effect[0])
                    break
                    case 425:
                        this.battle.combatantManager.allEffect(14,[this.effect[0]])
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,37,[20]))
                    break
                    case 473:
                        this.battle.tileManager.customActivate(0,[this.effect[0]])
                    break
                    case 476:
                        this.battle.tileManager.customActivate(1,[this.effect[0]])
                    break
                    case 477:
                        let total=0
                        for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                            if(this.battle.tileManager.tiles[a].type.includes(19)){
                                total++
                            }
                        }
                        this.userCombatant.addBlock(this.effect[0]*total)
                    break
                    case 478:
                        this.battle.tileManager.customActivate(2,[])
                        this.battle.updateTargetting()
                    break
                    case 479:
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(this.effect[0],1)
                        }
                    break
                    case 480:
                        this.battle.tileManager.customActivate(3,[this.effect[0]])
                        this.battle.tileManager.customActivate(4,[this.effect[1]])
                    break
                    case 490:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(0)
                        }
                    break
                    case 491: case 956:
                        this.userCombatant.evoke(0,this.targetCombatant.id,[this.effect[0]])
                    break
                    case 492:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(1)
                        }
                    break
                    case 493:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(2)
                        }
                    break
                    case 494:
                        this.userCombatant.evoke(1,this.targetCombatant.id,[1])
                    break
                    case 495:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(3)
                        }
                    break
                    case 498:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(0)
                        }
                        this.battle.cardManagers[this.player].allGroupClaw(this.effect[1])
                    break
                    case 505:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(4)
                        }
                    break
                    case 506:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(5)
                        }
                    break
                    case 520:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,-1,this.userCombatant.tilePosition)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(4)
                        }
                    break
                    case 526:
                        for(let a=0,la=min(this.effect[0]*this.energy,100);a<la;a++){
                            this.userCombatant.holdOrb(0)
                        }
                    break
                    case 531:
                        this.userCombatant.evoke(2,this.targetCombatant.id,[this.effect[0]])
                    break
                    case 532:
                        this.userCombatant.evoke(3,this.targetCombatant.id,[this.effect[0]])
                    break
                    case 534:
                        this.targetCombatant.takeDamage(this.effect[0],this.player)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(3)
                        }
                    break
                    case 535:
                        this.userCombatant.evoke(0,this.targetCombatant.id,[this.effect[0]*this.energy])
                    break
                    case 536:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(1)
                        }
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(4)
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userCombatant.holdOrb(5)
                        }
                    break
                    case 543:
                        this.userCombatant.evoke(0,this.targetCombatant.id,[this.effect[0]])
                        this.battle.cardManagers[this.player].draw(this.effect[1])
                    break
                    case 544:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            for(let b=0,lb=this.battle.combatantManager.combatants.length;b<lb;b++){
                                if(this.battle.combatantManager.combatants[b].team==0){
                                    this.userCombatant.holdOrb(1)
                                }
                            }
                        }
                    break
                    case 545:
                        let count=0
                        for(let b=0,lb=this.battle.combatantManager.combatants.length;b<lb;b++){
                            if(this.battle.combatantManager.combatants[b].team==0){
                                count++
                            }
                        }
                        this.userCombatant.evoke(0,this.targetCombatant.id,[count])
                    break
                    case 549:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(floor(random(0,game.orbNumber)))
                        }
                    break
                    case 550:
                        this.userCombatant.evoke(4,this.targetCombatant.id,[this.effect[0],1])
                    break
                    case 551:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(6)
                        }
                    break
                    case 552:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(7)
                        }
                    break
                    case 553:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(8)
                        }
                    break
                    case 554:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(9)
                        }
                    break
                    case 555:
                        let type=this.userCombatant.lastOrb
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(type)
                        }
                    break
                    case 556:
                        this.userCombatant.evoke(4,this.targetCombatant.id,[this.effect[0],this.effect[1]])
                    break
                    case 560:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(7)
                        }
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(3)
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userCombatant.holdOrb(8)
                        }
                    break
                    case 561:
                        this.userCombatant.replaceOrb(0,2)
                    break
                    case 562:
                        this.userCombatant.replaceOrb(0,4)
                    break
                    case 563:
                        this.userCombatant.replaceOrb(0,6)
                    break
                    case 564:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(0)
                        }
                        this.userCombatant.subEvoke(0,0,this.targetCombatant.id)
                    break
                    case 565:
                        this.userCombatant.evoke(5,this.targetCombatant.id)
                    break
                    case 566:
                        this.userCombatant.evoke(6,this.targetCombatant.id,[1])
                    break
                    case 567:
                        this.userCombatant.evoke(6,this.targetCombatant.id,[2])
                    break
                    case 568:
                        this.userCombatant.evoke(6,this.targetCombatant.id,[9])
                    break
                    case 577:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(10)
                        }
                    break
                    case 578:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(11)
                        }
                    break
                    case 579:
                        this.userCombatant.evoke(6,this.targetCombatant.id,[10])
                    break
                    case 583:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(9)
                        }
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(11)
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userCombatant.holdOrb(6)
                        }
                    break
                    case 584:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(5)
                        }
                        this.userCombatant.addBlock(this.effect[1]*this.userCombatant.getOrbNumber(5))
                    break
                    case 600:
                        this.battle.combatantManager.damageArea(this.targetCombatant.life,this.user,-1,this.targetCombatant.tilePosition)
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,36,[20]))
                    break
                    case 671:
                        for(let a=0,la=min(this.effect[0]*this.energy+this.effect[1],100);a<la;a++){
                            this.userCombatant.holdOrb(0)
                        }
                    break
                    case 672:
                        this.userCombatant.evoke(0,this.targetCombatant.id,[this.effect[0]*this.energy+this.effect[1]])
                    break
                    case 673:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(0)
                        }
                        this.userCombatant.subEvoke(0,0,this.targetCombatant.id)
                        this.userCombatant.subEvoke(0,0,this.targetCombatant.id)
                    break
                    case 767:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].hand.add(findName('Miracle',types.card),0,0)
                        }
                    break
                    case 785:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.combatantManager.damageAreaRuleless(this.effect[0],this.targetCombatant.tilePosition)
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x+random(-50,50),this.targetCombatant.position.y+random(-50,50),40,[10]))
                        }
                    break
                    case 847:
                        this.battle.combatantManager.randomEnemyEffect(1,[this.effect[0],this.effect[1]])
                        if(this.amplify){
                            this.battle.combatantManager.randomEnemyEffect(1,[this.effect[0],this.effect[1]])
                        }
                    break
                    case 851:
                        this.userCombatant.heal(this.effect[0])
                        if(this.amplify){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.cardManagers[this.player].discard.randomEffect(16,[this.battle.cardManagers[this.player].hand.cards])
                            }
                        }
                    break
                    case 854:
                        this.userCombatant.statusEffect('Draw Up',this.effect[0])
                        this.userCombatant.statusEffect('Burn Per Turn',this.effect[1])
                    break
                    case 856:
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                            if(this.amplify){
                                if(this.targetCombatant[a].life<this.effect[1]){
                                    this.targetCombatant[a].life=0
                                }
                            }
                        }
                    break
                    case 879:
                        this.userCombatant.addBlock(this.effect[0]+this.battle.cardManagers[this.player].reserve.cards.length)
                        this.battle.cardManagers[this.player].reserve.send(this.battle.cardManagers[this.player].discard.cards,0,-1)
                    break
                    case 894:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.cardManagers[this.player].hand.allEffect(30)
                        }
                    break

                }
            break
            case 13:
                switch(this.type){
                    case 394:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 395:
                        this.battle.combatantManager.statusAreaIDBlock('Bleed',this.effect[0],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 420:
                        let total=this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        this.userCombatant.heal(this.effect[0]*total)
                    break
                    case 434:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        this.battle.combatantManager.intentNerfArea(1,this.effect[1],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                    break
                    case 698:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.cardManagers[this.player].randomEffect(2,0,[])
                        }
                    break
                    case 739:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        this.battle.attackManager.endAfter=true
                    break
                    case 882:
                        this.battle.combatantManager.statusAreaID('Burn',this.effect[0],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    default:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                    break
                }
            break

        }
    }
    update(){
        this.timer++
        switch(this.type){
            case 1: case 7: case 12: case 34: case 35: case 42: case 46: case 53: case 88: case 89:
            case 90: case 94: case 101: case 103: case 105: case 106: case 108: case 110: case 111: case 115:
            case 117: case 118: case 119: case 123: case 124: case 125: case 126: case 129: case 137: case 140:
            case 144: case 151: case 154: case 155: case 156: case 157: case 174: case 185: case 187: case 189:
            case 191: case 193: case 196: case 220: case 228: case 234: case 260: case 263: case 265: case 266:
            case 267: case 268: case 269: case 271: case 273: case 274: case 275: case 277: case 280: case 282:
            case 287: case 288: case 293: case 296: case 301: case 304: case 310: case 319: case 323: case 361:
            case 364: case 371: case 373: case 376: case 378: case 379: case 385: case 388: case 402: case 409:
            case 414: case 415: case 427: case 429: case 435: case 444: case 449: case 460: case 462: case 469:
            case 475: case 496: case 497: case 507: case 508: case 509: case 510: case 511: case 514: case 540:
            case 558: case 559: case 580: case 581: case 582: case 588: case 596: case 597: case 601: case 604:
            case 606: case 610: case 638: case 639: case 661: case 677: case 678: case 679: case 689: case 691:
            case 692: case 714: case 718: case 715: case 719: case 721: case 723: case 725: case 730: case 731:
            case 732: case 733: case 734: case 736: case 757: case 758: case 771: case 775: case 779: case 780:
            case 784: case 786: case 795: case 796: case 798: case 806: case 824: case 826: case 827: case 828:
            case 829: case 830: case 840: case 844: case 848: case 849: case 862: case 863: case 872: case 884:
            case 895: case 897: case 900: case 916: case 917: case 930: case 934: case 940: case 942: case 945:
            case 946: case 947: case 950:
                if(this.type==780){
                    let failed=false
                    for(let a=0,la=this.battle.cardManagers[this.player].hand.cards.length;a<la;a++){
                        if(this.battle.cardManagers[this.player].hand.cards[a].class==1){
                            failed=true
                        }
                    }
                    if(failed){
                        break
                    }
                }
                if(this.type==427&&this.userCombatant.armed||this.type==806&&this.userCombatant.stance!=1||this.type==947&&this.battle.energy.main[this.player]>0){
                    this.remove=true
                }else if(variants.nobasicanim){
                    this.selfCall(0)
                    this.remove=true
                }else if(this.targetDistance==1){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(2)
                    }
                    this.userCombatant.runAnimation(1/30,2)
                    if(this.timer==15){
                        this.selfCall(0)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }else if(this.targetDistance==2){
                    if(this.timer==1||this.timer==31){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==11){
                        this.userCombatant.startAnimation(2)
                    }
                    if(this.timer<=10||this.timer>30){
                        this.userCombatant.runAnimation(1/10,0)
                    }else if(this.timer>10&&this.timer<=30){
                        this.userCombatant.runAnimation(1/20,2)
                    }
                    if(this.timer<=10){
                        this.userCombatant.moveTile(this.direction,this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                    }else if(this.timer>30){
                        this.userCombatant.moveTile(this.direction,-this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                    }
                    if(this.timer==20){
                        this.selfCall(0)
                    }else if(this.timer>=40){
                        this.remove=true
                    }
                }
            break
            case 2: case 13: case 23: case 26: case 43: case 50: case 65: case 95: case 96: case 97:
            case 107: case 120: case 122: case 131: case 141: case 142: case 146: case 152: case 172: case 190:
            case 194: case 197: case 206: case 216: case 221: case 235: case 242: case 261: case 262: case 281:
            case 303: case 320: case 321: case 322: case 354: case 355: case 359: case 365: case 377: case 386:
            case 389: case 396: case 399: case 410: case 416: case 428: case 430: case 443: case 461: case 463:
            case 502: case 513: case 515: case 518: case 522: case 546: case 547: case 589: case 602: case 682:
            case 699: case 716: case 722: case 724: case 726: case 735: case 738: case 745: case 765: case 770:
            case 776: case 783: case 794: case 800: case 809: case 810: case 811: case 831: case 853: case 858:
            case 861: case 867: case 875: case 880: case 885: case 887: case 890: case 918: case 919: case 920:
            case 925: case 951:
                if(this.type==809&&this.userCombatant.stance!=4){
                    this.remove=true
                }else if(variants.nobasicanim){
                    this.selfCall(1)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(1)
                    }
                    this.userCombatant.runAnimation(1/30,1)
                    if(this.timer==15){
                        this.selfCall(1)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }
            break
            case 3: case 20: case 51: case 52: case 56: case 58: case 59: case 60: case 91: case 182:
            case 192: case 205: case 248: case 256: case 330: case 331: case 332: case 335: case 374: case 375:
            case 383: case 397: case 484: case 485: case 503: case 570: case 571: case 573: case 574: case 575:
            case 663: case 664: case 666: case 690: case 693: case 694: case 704: case 705: case 706: case 717:
            case 802: case 803: case 804: case 805: case 808: case 812: case 816: case 817: case 823: case 923:
            case 931: case 955:
                if(this.type==808&&this.userCombatant.stance!=3){
                    this.remove=true
                }else if(variants.nobasicanim){
                    this.userCombatant.moveTile(this.direction,this.distance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                    this.selfCall(2)
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    if(this.type==205){
                        this.battle.activateTile(1,this.userCombatant.id)
                    }else{
                        this.battle.activate(1,this.userCombatant.id)
                    }
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                    if(this.timer==10*this.targetDistance){
                        this.selfCall(2)
                    }
                    if(this.timer>=15*this.targetDistance){
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        if(this.type==205){
                            this.battle.activateTile(1,this.userCombatant.id)
                        }else{
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }
                }
            break
            case 4: case 762:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>10&&this.timer<=20||this.timer>25&&this.timer<=35){
                    this.userCombatant.runAnimation(1/20,2)
                }
                if(this.timer==15||this.timer==30){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.timer==30&&this.type==762){
                        this.userCombatant.enterStance(1)
                    }
                }else if(this.timer>=45){
                    this.remove=true
                }
            break
            case 5: case 121: case 764:
                if(this.type==121&&this.userCombatant.armed){
                    this.remove=true
                }else if(this.targetDistance==1){
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(this.userCombatant.name=='Sakura'&&this.type==121?27:3)
                    }else if(this.timer==10){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.type==764){
                            this.userCombatant.enterStance(3)
                        }
                    }
                    if(this.timer<=20){
                        this.userCombatant.runAnimation(1/10,this.userCombatant.name=='Sakura'&&this.type==121?27:3)
                    }
                    if(this.procedure[0]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant.moveTile(this.direction,this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        }
                        if(this.timer>=26){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        }
                        if(this.timer==18){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=26){
                            this.remove=true
                        }
                    }else{
                        if(this.timer>10){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer>=20){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                }else if(this.targetDistance==2){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }else if(this.timer==11){
                        this.userCombatant.startAnimation(3)
                    }else if(this.timer==20){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer==31){
                        this.userCombatant.startAnimation(0)
                    }
                    if(this.timer<=10){
                        this.userCombatant.runAnimation(1/10,0)
                    }else if(this.timer<=30){
                        this.userCombatant.runAnimation(1/10,3)
                    }else{
                        this.userCombatant.runAnimation(1/10,0)
                    }
                    if(this.timer<=10){
                        this.userCombatant.moveTile(this.direction,this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                    }else if(this.timer>30){
                        this.userCombatant.moveTile(this.direction,-this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                    }
                    if(this.procedure[0]==2){
                        if(this.timer>20&&this.timer<=28){
                            this.targetCombatant.moveTile(this.direction,this.distance/80)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/80)
                        }else if(this.timer>28&&this.timer<=36){
                            this.targetCombatant.moveTile(this.direction,-this.distance/80)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/80)
                        }
                    }else if(this.procedure[0]==1){
                        if(this.timer>20&&this.timer<=28){
                            this.targetCombatant.moveTile(this.direction,this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                        }else if(this.timer>28&&this.timer<=36){
                            this.targetCombatant.moveTile(this.direction,-this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/20)
                        }
                        if(this.timer==28){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else{
                        if(this.timer>20&&this.timer<=30){
                            this.targetCombatant.moveTile(this.direction,this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                        }
                        if(this.timer==30){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            this.battle.activate(1,this.targetCombatant.id)
                        }
                    }
                    if(this.timer>=40){
                        this.remove=true
                    }
                }
            break
            case -15: case 6: case 30: case 41: case 71: case 92: case 98: case 113: case 128: case 149:
            case 150: case 181: case 184: case 198: case 200: case 203: case 204: case 212: case 215: case 223:
            case 225: case 226: case 231: case 239: case 240: case 249: case 264: case 278: case 286: case 299:
            case 306: case 307: case 311: case 312: case 347: case 362: case 366: case 367: case 370: case 372:
            case 381: case 393: case 406: case 424: case 439: case 440: case 445: case 446: case 450: case 454:
            case 455: case 457: case 488: case 500: case 517: case 521: case 586: case 613: case 614: case 615:
            case 619: case 625: case 635: case 636: case 644: case 646: case 648: case 649: case 655: case 656:
            case 668: case 684: case 711: case 712: case 713: case 737: case 754: case 755: case 760: case 761:
            case 763: case 777: case 778: case 788: case 799: case 807: case 820: case 821: case 822: case 836:
            case 838: case 839: case 841: case 842: case 864: case 873: case 876: case 886: case 893: case 896:
            case 898: case 901: case 914: case 937: case 948:
                if(this.type==807&&this.userCombatant.stance!=2||this.type==820&&this.userCombatant.stance!=1||this.type==821&&this.userCombatant.stance!=3||this.type==822&&this.userCombatant.stance!=4){
                    this.remove=true
                }else if(variants.nobasicanim){
                    this.selfCall(3)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(4)
                    }
                    this.userCombatant.runAnimation(1/10,4)
                    if(this.timer==10){
                        this.selfCall(3)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 8: case 28: case 29: case 40: case 44: case 45: case 55: case 60: case 62: case 63:
            case 69: case 70: case 76: case 78: case 93: case 99: case 109: case 116: case 183: case 186:
            case 199: case 207: case 209: case 210: case 213: case 214: case 227: case 229: case 230: case 232:
            case 233: case 253: case 254: case 259: case 276: case 279: case 284: case 285: case 289: case 291:
            case 294: case 298: case 300: case 302: case 305: case 308: case 309: case 313: case 315: case 317:
            case 318: case 334: case 337: case 338: case 339: case 340: case 343: case 344: case 346: case 363:
            case 387: case 390: case 392: case 398: case 418: case 422: case 423: case 431: case 451: case 499:
            case 512: case 519: case 523: case 524: case 525: case 527: case 528: case 529: case 530: case 541:
            case 542: case 595: case 603: case 605: case 607: case 612: case 640: case 645: case 647: case 665:
            case 675: case 680: case 681: case 728: case 740: case 741: case 742: case 743: case 744: case 748:
            case 749: case 752: case 753: case 756: case 756: case 759: case 768: case 769: case 772: case 773:
            case 774: case 781: case 782: case 789: case 790: case 791: case 797: case 818: case 819: case 832:
            case 835: case 855: case 859: case 860: case 868: case 869: case 870: case 871: case 891: case 892:
            case 904: case 909: case 910: case 911: case 912: case 913: case 921: case 922: case 926: case 928:
            case 929: case 932: case 949:
                if((this.type==818||this.type==819)&&this.userCombatant.stance!=2){
                    this.remove=true
                }else if(variants.nobasicanim){
                    this.selfCall(4)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    this.userCombatant.runAnimation(1/10,5)
                    if(this.timer==10){
                        this.selfCall(4)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 9: case 333: case 569: case 650:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                    if(this.targetClass==2&&this.type!=650){
                        this.targetCombatant.goal.anim.direction=this.relativeDirection
                    }
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.targetClass==2){
                    this.targetCombatant.moveTile(this.direction,-this.distance/(15*this.targetDistance))
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(15*this.targetDistance))
                }
                if(this.timer>=15*this.targetDistance){
                    if(this.targetClass==2){
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                        this.targetCombatant.moveTilePosition(this.tilePosition.x,this.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        switch(this.type){
                            case 569:
                                this.userCombatant.evoke(1,this.targetCombatant.id,[1])
                            break
                        }
                    }else{
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                    }
                    this.remove=true
                }
            break
            case -13: case -21: case 10: case 64: case 72: case 73: case 74: case 164: case 166: case 167:
            case 168: case 169: case 170: case 171: case 180: case 195: case 202: case 224: case 283: case 349:
            case 360: case 369: case 380: case 391: case 442: case 456: case 470: case 608: case 641: case 642:
            case 643: case 659: case 924: case 952: case 953: case 954: case 960: case 961: case 962:
                if(variants.nobasicanim){
                    this.selfCall(5)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(6)
                    }
                    this.userCombatant.runAnimation(1/10,6)
                    if(this.timer==10){
                        this.selfCall(5)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 11:
                if(this.targetDistance==2){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==11){
                        this.userCombatant.startAnimation(3)
                    }
                    if(this.timer<=10){
                        this.userCombatant.runAnimation(1/10,0)
                    }else if(this.timer<=30){
                        this.userCombatant.runAnimation(1/10,3)
                    }
                    if(this.timer==10){
                        this.targetCombatant.goal.anim.direction=this.relativeDirection+180
                    }
                    if(this.timer<=10){
                        this.userCombatant.moveTile(this.direction,this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                    }else if(this.timer>20&&this.timer<=30){
                        this.userCombatant.moveTile(this.direction,-this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                        this.targetCombatant.moveTile(this.direction,-this.distance/20)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/20)
                    }
                    if(this.timer>=30){
                        this.targetCombatant.moveTilePosition(round(this.targetCombatant.tilePosition.x/2+this.userCombatant.tilePosition.x/2),round(this.targetCombatant.tilePosition.y/2+this.userCombatant.tilePosition.y/2))
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }else if(this.targetDistance==3){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==31){
                        this.userCombatant.startAnimation(3)
                    }
                    if(this.timer<=30){
                        this.userCombatant.runAnimation(1/15,0)
                    }else if(this.timer<=50){
                        this.userCombatant.runAnimation(1/10,3)
                    }
                    if(this.timer==30){
                        this.targetCombatant.goal.anim.direction=this.relativeDirection+180
                    }
                    if(this.timer<=30){
                        this.userCombatant.moveTile(this.direction,this.distance/45)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/45)
                    }else if(this.timer>30&&this.timer<=50){
                        this.userCombatant.moveTile(this.direction,-this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                        this.targetCombatant.moveTile(this.direction,-this.distance/30)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                    }
                    if(this.timer>=50){
                        this.targetCombatant.moveTilePosition(round(this.targetCombatant.tilePosition.x/3+this.userCombatant.tilePosition.x*2/3),round(this.targetCombatant.tilePosition.y/3+this.userCombatant.tilePosition.y*2/3))
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 14: case 448: case 458:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer<=8&&this.targetDistance==2){
                    if(this.timer==1){
                        this.procedure[0]=floor(random(0,2))
                    }
                    let middle=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x/2+this.tilePosition.x/2,this.targetTile.tilePosition.y/2+this.tilePosition.y/2)
                    if(middle>=0){
                        this.battle.combatantManager.combatants[middle].moveTile(this.direction+90*(this.procedure[0]*2-1),this.distance/(15*this.targetDistance))
                        this.battle.combatantManager.combatants[middle].moveRelativeTile(this.relativeDirection+90*(this.procedure[0]*2-1),this.relativeDistance/(15*this.targetDistance))
                    }
                }else if(this.timer>22&&this.targetDistance==2){
                    let middle=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x/2+this.tilePosition.x/2,this.targetTile.tilePosition.y/2+this.tilePosition.y/2)
                    if(middle>=0){
                        this.battle.combatantManager.combatants[middle].moveTile(this.direction-90*(this.procedure[0]*2-1),this.distance/(15*this.targetDistance))
                        this.battle.combatantManager.combatants[middle].moveRelativeTile(this.relativeDirection-90*(this.procedure[0]*2-1),this.relativeDistance/(15*this.targetDistance))
                    }
                }else if(this.type==448&&this.timer==15&&this.targetDistance==2){
                    let middle=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x/2+this.tilePosition.x/2,this.targetTile.tilePosition.y/2+this.tilePosition.y/2)
                    if(middle>=0&&this.battle.combatantManager.combatants[middle].block<=0){
                        this.battle.combatantManager.combatants[middle].statusEffect('Bleed',this.effect[0])
                    }
                }else if(this.type==458&&this.timer==15&&this.targetDistance==2){
                    this.battle.cardManagers[this.player].hand.add(findName('Chain\nShift',types.card),this.level,this.color)
                }
                if(this.timer>=15*this.targetDistance){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 15:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(8)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=10){
                    this.userCombatant.runAnimation(1/10,8)
                }
                if(this.procedure[0]==2){
                    if(this.timer>10&&this.timer<=18){
                        this.userCombatant.moveTile(this.direction,this.distance/40)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>18&&this.timer<=26){
                        this.userCombatant.moveTile(this.direction,-this.distance/40)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer>=26){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>10&&this.timer<=18){
                        this.userCombatant.moveTile(this.direction,this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>18&&this.timer<=26){
                        this.userCombatant.moveTile(this.direction,-this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==18){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=26){
                        this.remove=true
                    }
                }else{
                    if(this.timer>10){
                        this.userCombatant.moveTile(this.direction,this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer>=20){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x/2+this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y/2+this.userCombatant.tilePosition.y/2)
                        this.battle.activate(1,this.userCombatant.id)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 16: case 436:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                }else if(this.timer==10){
                    switch(this.type){
                        case 436:
                            if(this.targetCombatant.block<=0){
                                this.targetCombatant.statusEffect('Bleed',this.effect[0])
                            }
                        break
                        default:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                    }
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,9)
                }
                if(this.procedure[0]==2){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer>=26){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==18){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=26){
                        this.remove=true
                    }
                }else{
                    if(this.timer>10){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer>=20){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 17:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/30,2)
                }
                if(this.timer==15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.procedure[0]==1&&this.timer>=30){
                    this.remove=true
                }else if(this.procedure[0]==0){
                    if(this.timer>30){
                        this.userCombatant.runAnimation(1/10,0)
                        this.userCombatant.moveTile(this.direction,-this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer>=40){
                        this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 18: case 394: case 395: case 420: case 434: case 698: case 739: case 882:
                if(variants.nobasicanim){
                    this.selfCall(13)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(10)
                    }
                    this.userCombatant.runAnimation(1/10,10)
                    if(this.timer==10){
                        this.selfCall(13)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 19:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }
                if(this.timer<=15){
                    this.userCombatant.moveTile(this.direction,this.distance/(15))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15))
                    this.userCombatant.runAnimation(1/15,0)
                    this.targetCombatant.moveTile(this.direction,-this.distance/(15))
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(15))
                }
                if(this.timer==15){
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                    this.targetCombatant.moveTilePosition(this.tilePosition.x,this.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==23){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer>15&&this.timer<=23){
                    this.userCombatant.moveTile(this.direction,-this.distance/10)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                }else if(this.timer>23&&this.timer<=31){
                    this.userCombatant.moveTile(this.direction,this.distance/10)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                }
                if(this.procedure[0]==2){
                    if(this.timer>31){
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>23){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer>=39){
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>31){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>23){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==31){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=39){
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }else{
                    if(this.timer>23){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer>=33){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 21:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer>=15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 22:
                if(this.timer==1){
                    this.userCombatant.startAnimation(11)
                }
                this.userCombatant.runAnimation(1/10,11)
                if(this.timer==10){
                    this.battle.energy.main[this.player]+=this.effect[0]
                    this.userCombatant.takeDamage(this.effect[1],-1,1)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 24: case 348:
                if(this.timer==1){
                    this.userCombatant.startAnimation(12)
                }
                this.userCombatant.runAnimation(1/10,12)
                if(this.timer==10){
                    switch(this.type){
                        case 24:
                            this.battle.turnManager.loadEnemyAttack(this.targetCombatant.id)
                        break
                        case 348:
                            this.targetCombatant.goal.anim.direction+=180
                            this.battle.updateTargetting()
                        break
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 25:
                if(this.timer==1||this.timer==29){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==9){
                    this.userCombatant.startAnimation(13)
                }
                if(this.timer<=8||this.timer>28){
                    this.userCombatant.runAnimation(1/8,0)
                }else if(this.timer>10&&this.timer<=28){
                    this.userCombatant.runAnimation(1/20,13)
                }
                if(this.timer<=8){
                    this.userCombatant.moveTile(this.direction,this.distance/30)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                }else if(this.timer>28){
                    this.userCombatant.moveTile(this.direction,-this.distance/30)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                }
                if(this.timer==18){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=36){
                    this.remove=true
                }
            break
            case 27:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/30,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=15*this.targetDistance+15){
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 31: case 576: case 652:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(14)
                }
                if(this.timer<=15){
                    this.userCombatant.runAnimation(1/15,14)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.type==652&&this.time==10){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
                    if(this.procedure[a]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                        }
                    }else if(this.procedure[a]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                        }
                        if(this.timer==18){
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[a]==0){
                        if(this.timer>10){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }
                        if(this.timer>=20){
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant[a].id)
                            this.procedure[a]=-1
                        }
                    }
                }
                if(this.timer>=26){
                    if(this.type==576){
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userCombatant.holdOrb(8)
                        }
                    }
                    this.remove=true
                }
            break
            case 32:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,1,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }else if(this.timer==10*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 33: case 127: case 130: case 437: case 504:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/30,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance){
                    switch(this.type){
                        case 130:
                            this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
                            this.userCombatant.combo=0
                        break
                        default:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                    }
                    switch(this.type){
                        case 127:
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        break
                        case 437:
                            if(this.userCombatant.armed){
                                this.userCombatant.armed=false
                            }
                        break
                        case 504:
                            this.battle.cardManagers[this.player].allGroupClaw(this.effect[1])
                        break
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                    if(this.targetDistance>1){
                        this.battle.activate(1,this.userCombatant.id)
                    }
                }
            break
            case 36: case 39: case 47: case 384: case 412: case 413: case 441: case 599:
                if(variants.nobasicanim){
                    this.selfCall(6)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(16)
                    }
                    this.userCombatant.runAnimation(1/30,16)
                    if(this.timer==15){
                        this.selfCall(6)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }
            break
            case 37: case 432:
                if(this.timer==1){
                    this.userCombatant.startAnimation(20)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,20)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,3,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                    if(this.userCombatant.armed){
                        this.userCombatant.armed=false
                        this.procedure[0]=1
                    }else{
                        this.procedure[0]=0
                    }
                }else if(this.timer==10*this.targetDistance+15&&this.procedure[0]==1){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 37:
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)].addType(3)
                        break
                        case 432:
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)].addType(3)
                        break
                    }
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 38: case 79: case 81: case 84: case 85: case 86: case 104: case 145: case 148: case 158:
            case 159: case 160: case 161: case 162: case 163: case 173: case 177: case 272: case 292: case 295:
            case 297: case 314: case 316: case 326: case 351: case 352: case 382: case 408: case 419: case 433:
            case 452: case 472: case 474: case 482: case 533: case 537: case 538: case 539: case 548: case 585:
            case 592: case 620: case 621: case 622: case 623: case 624: case 626: case 627: case 628: case 629:
            case 630: case 631: case 667: case 669: case 685: case 686: case 687: case 688: case 695: case 696:
            case 697: case 700: case 701: case 702: case 720: case 787: case 801: case 833: case 834: case 837:
            case 843: case 846: case 850: case 857: case 865: case 877: case 878: case 881: case 883: case 899:
            case 902: case 903: case 905: case 906: case 907: case 935: case 939: case 943: case 944:
                if(variants.nobasicanim){
                    this.selfCall(7)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    this.userCombatant.runAnimation(1/30,17)
                    if(this.timer==15){
                        this.selfCall(7)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }
            break
            case 48: case 100:
                if(this.targetDistance==1){
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(this.type==100?3:9)
                    }else if(this.timer==10){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                    if(this.timer<=20){
                        this.userCombatant.runAnimation(1/10,this.type==100?3:9)
                    }
                    if(this.procedure[0]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant.moveTile(this.direction,this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        }
                        if(this.timer>=26){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        }
                        if(this.timer==18){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=26){
                            this.remove=true
                        }
                    }else{
                        if(this.timer>10&&this.timer<=20){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer==20){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        } 
                        if(this.timer==21){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            this.procedure[1]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        }
                        if(this.procedure[1]==2){
                            if(this.timer>20&&this.timer<=28){
                                this.targetCombatant.moveTile(this.direction,this.distance/40)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                            }else if(this.timer>28&&this.timer<=36){
                                this.targetCombatant.moveTile(this.direction,-this.distance/40)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                            }
                            if(this.timer>=36){
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }else if(this.procedure[1]==1){
                            if(this.timer>20&&this.timer<=28){
                                this.targetCombatant.moveTile(this.direction,this.distance/10)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                            }else if(this.timer>28&&this.timer<=36){
                                this.targetCombatant.moveTile(this.direction,-this.distance/10)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                            }
                            if(this.timer==28){
                                this.targetCombatant.takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                }
                            }else if(this.timer>=36){
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }else{
                            if(this.timer>20){
                                this.targetCombatant.moveTile(this.direction,this.distance/10)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                            }
                            if(this.timer>=30){
                                this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }
                    }
                }else if(this.targetDistance==2){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }else if(this.timer==16){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(9)
                    }else if(this.timer==25){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                    if(this.timer<=15){
                        this.userCombatant.runAnimation(1/15,0)
                    }else if(this.timer<=35){
                        this.userCombatant.runAnimation(1/10,9)
                    }
                    if(this.timer<=15){
                        this.userCombatant.moveTile(this.direction,this.distance/30)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                    }
                    if(this.timer==15){
                        this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x/2+this.targetCombatant.tilePosition.x/2,this.userCombatant.tilePosition.y/2+this.targetCombatant.tilePosition.y/2)
                    }
                    if(this.procedure[0]==2){
                        if(this.timer>25&&this.timer<=33){
                            this.targetCombatant.moveTile(this.direction,this.distance/80)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/80)
                        }else if(this.timer>33&&this.timer<=41){
                            this.targetCombatant.moveTile(this.direction,-this.distance/80)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/80)
                        }
                        if(this.timer>=41){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1){
                        if(this.timer>25&&this.timer<=33){
                            this.targetCombatant.moveTile(this.direction,this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                        }else if(this.timer>33&&this.timer<=41){
                            this.targetCombatant.moveTile(this.direction,-this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/20)
                        }
                        if(this.timer==33){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=41){
                            this.remove=true
                        }
                    }else{
                        if(this.timer>25&&this.timer<=35){
                            this.targetCombatant.moveTile(this.direction,this.distance/20)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                        }
                        if(this.timer==35){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        } 
                        if(this.timer==36){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            this.procedure[1]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        }
                        if(this.procedure[1]==2){
                            if(this.timer>35&&this.timer<=43){
                                this.targetCombatant.moveTile(this.direction,this.distance/80)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/80)
                            }else if(this.timer>43&&this.timer<=51){
                                this.targetCombatant.moveTile(this.direction,-this.distance/80)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/80)
                            }
                            if(this.timer>=51){
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }else if(this.procedure[1]==1){
                            if(this.timer>35&&this.timer<=43){
                                this.targetCombatant.moveTile(this.direction,this.distance/20)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                            }else if(this.timer>43&&this.timer<=51){
                                this.targetCombatant.moveTile(this.direction,-this.distance/20)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/20)
                            }
                            if(this.timer==43){
                                this.targetCombatant.takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                }
                            }else if(this.timer>=51){
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }else{
                            if(this.timer>35){
                                this.targetCombatant.moveTile(this.direction,this.distance/20)
                                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/20)
                            }
                            if(this.timer>=45){
                                this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                this.battle.activate(1,this.targetCombatant.id)
                                this.remove=true
                            }
                        }
                    }
                }
            break
            case 49: case 662:
                if(this.timer==1){
                    this.userCombatant.startAnimation(18)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,18)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1].bottom.y,4,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }else if(this.timer==10*this.targetDistance+15){
                    switch(this.type){
                        case 49:
                            if(this.targetCombatant.block<=0){
                                this.targetCombatant.statusEffect('Bleed',this.effect[0])
                            }
                        break
                        case 662:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.targetCombatant.blocked>0){
                                this.targetCombatant.statusEffect('Bleed',this.effect[1])
                            }
                        break
                    }
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 54: case 87: case 486:
                if(this.timer==1){
                    this.userCombatant.startAnimation(19)
                }
                this.userCombatant.runAnimation(1/20,19)
                if(this.timer==10){
                    if(this.type==87){
                        this.battle.combatantManager.clearTile(this.targetTile)
                    }
                    this.userCombatant.moveTile(this.direction,this.distance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 57:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,5,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),7.5*this.targetDistance-2]))
                }else if(this.timer==30*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                }else if(this.timer>=30*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 61:
                if(this.timer==1){
                    this.userCombatant.startAnimation(21)
                }
                this.userCombatant.runAnimation(1/30,21)
                if(this.timer==15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.targetCombatant.life<=0){
                        this.battle.addCurrency(this.effect[1],this.player)
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 66: case 68: case 421: case 465: case 466: case 467: case 468:
                if(variants.nobasicanim){
                    this.selfCall(8)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(22)
                    }
                    this.userCombatant.runAnimation(1/30,22)
                    if(this.timer==15){
                        this.selfCall(8)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }
            break
            case 67:
                if(this.timer==1){
                    this.userCombatant.startAnimation(23)
                }
                this.userCombatant.runAnimation(1/15,23)
                if(this.timer==15){
                    this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 75:
                if(this.timer==1){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x-offset[0],this.userCombatant.tilePosition.y-offset[1])
                    this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(0)
                }
                if(this.procedure[0]==1){
                    if(this.timer<=12){
                        this.userCombatant.moveTile(this.direction,-this.distance/this.targetDistance/15)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/this.targetDistance/15)
                        this.userCombatant.runAnimation(-1/15,0)
                    }else{
                        this.userCombatant.moveTile(this.direction,this.distance/this.targetDistance/15)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/this.targetDistance/15)
                        this.userCombatant.runAnimation(1/15,0)
                    }
                    if(this.timer>=24){
                        this.remove=true
                    }
                }else{
                    this.userCombatant.moveTile(this.direction,-this.distance/this.targetDistance/15)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/this.targetDistance/15)
                    this.userCombatant.runAnimation(-1/15,0)
                    if(this.timer>=15){
                        let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                        this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x-offset[0],this.userCombatant.tilePosition.y-offset[1])
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 77:
                if(this.timer==1){
                    this.userCombatant.startAnimation(24)
                }
                this.userCombatant.runAnimation(1/12,24)
                if(this.timer==6){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.userCombatant.heal(this.effect[1])
                }else if(this.timer>=12){
                    this.remove=true
                }
            break
            case 80: case 590: case 594: case 609: case 632: case 633: case 634: case 915:
                if(variants.nobasicanim){
                    this.selfCall(9)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(25)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/10,25)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                    }else if(this.timer==5*this.targetDistance+15){
                        this.selfCall(9)
                    }else if(this.timer>=max(30,5*this.targetDistance+25)){
                        this.remove=true
                    }
                }
            break
            case 82:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,7,[atan2(this.targetTile.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetTile.position.y),5*this.targetDistance-2]))
                }else if(this.timer==10*this.targetDistance+15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetTile.position.x,this.targetTile.position.y,10,[10]))
                    this.battle.combatantManager.damageArea(this.effect[0],this.userCombatant.id,this.userCombatant.team,this.targetTile.tilePosition)
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 83:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,8,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),7.5*this.targetDistance-2]))
                }else if(this.timer==30*this.targetDistance+15){
                    this.targetCombatant.statusEffect('Stun',this.effect[0])
                }else if(this.timer>=30*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 489:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.targetDistance[a]==1?this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y):this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.targetDistance[a]==1){
                        if(this.procedure[a]==2){
                            if(this.timer<=8){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                            }else if(this.timer>8&&this.timer<=16){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                            }
                        }else if(this.procedure[a]==1){
                            if(this.timer<=8){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                            }else if(this.timer>8&&this.timer<=16){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                            }
                            if(this.timer==8){
                                this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                }
                            }
                        }else if(this.procedure[a]==0){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                            if(this.timer>=10){
                                this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                                this.battle.activate(1,this.targetCombatant[a].id)
                                this.procedure[a]=-1
                            }
                        }
                    }else if(this.targetDistance[a]==2){
                        if(this.procedure[a]==2){
                            if(this.timer<=8){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/80)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                            }else if(this.timer>8&&this.timer<=16){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/80)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                            }
                        }else if(this.procedure[a]==1){
                            if(this.timer<=8){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/20)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                            }else if(this.timer>8&&this.timer<=16){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/20)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                            }
                            if(this.timer==8){
                                this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                }
                            }
                        }else if(this.procedure[a]==0){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/20)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/20)
                            if(this.timer>=10){
                                this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                this.battle.activate(1,this.targetCombatant[a].id)
                                this.procedure[a]=-1
                            }
                        }
                    }
                }
                if(this.timer>=16){
                    this.remove=true
                }
            break
            case 88:
                if(this.timer==10||this.timer==20||this.timer==30||this.timer==40||this.timer==50||this.timer==60||this.timer==70||this.timer==80||this.timer==90||this.timer==100||this.timer==110||this.timer==120||this.timer==130||this.timer==140||this.timer==150){
                    let list=[]
                    for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                        if(this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].team!=this.userCombatant.team){
                            list.push(a)
                        }
                    }
                    let target=list[floor(random(0,list.length))]
                    this.battle.combatantManager.combatants[target].takeDamage(this.effect[0])
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.battle.combatantManager.combatants[target].position.x+random(-20,20),this.battle.combatantManager.combatants[target].position.y+random(-50,-10),9,[10]))
                }
                if(this.timer>=150){
                    this.remove=true
                }
            break
            case -14: case 102: case 112: case 114: case 219: case 270: case 324: case 325: case 341: case 403:
            case 404: case 405: case 426: case 587: case 637: case 670: case 676: case 683: case 710: case 792:
            case 845: case 888: case 889: case 927: case 936: case 941:
                if(variants.nobasicanim){
                    this.selfCall(10)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(26)
                    }
                    this.userCombatant.runAnimation(1/10,26)
                    if(this.timer==10){
                        this.selfCall(10)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 132: case 136: case 290: case 557:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/10,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance-5||this.timer==15*this.targetDistance||this.timer==15*this.targetDistance+5){
                    switch(this.type){
                        case 132:
                            this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
                        break
                        default:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                    }
                    if(this.timer==15*this.targetDistance+5){
                        switch(this.type){
                            case 132:
                                this.userCombatant.combo=0
                            break
                            case 557:
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.userCombatant.holdOrb(5)
                                }
                            break
                        }
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    if(this.targetDistance>1){
                        this.battle.activate(1,this.userCombatant.id)
                    }
                    this.remove=true
                }
            break
            case 133:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.userCombatant.goal.anim.direction+=180
                    this.procedure[1]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.procedure[2]=false
                    this.procedure[3]=false
                    this.userCombatant.startAnimation(28)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,28)
                }
                if(this.procedure[0]==2){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer==26){
                        this.procedure[2]=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==18){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer==26){
                        this.procedure[2]=true
                    }
                }else{
                    if(this.timer>10&&this.timer<=20){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer==20){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.procedure[2]=true
                    }
                }
                if(this.procedure[1]==1&&this.timer>=20){
                    this.procedure[3]=true
                }else if(this.procedure[1]==0){
                    if(this.timer>20){
                        this.userCombatant.runAnimation(1/10,0)
                        this.userCombatant.moveTile(this.direction,-this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==30){
                        if(this.procedure[0]==0){
                            this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*3/2-this.targetCombatant.tilePosition.x/2,this.userCombatant.tilePosition.y*3/2-this.targetCombatant.tilePosition.y/2)
                        }else{
                            this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                        }
                        this.battle.activate(1,this.userCombatant.id)
                        this.procedure[3]=true
                    }
                }
                if(this.procedure[2]&&this.procedure[3]){
                    this.remove=true
                }
            break
            case 134:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection-60)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection-60)*6/5,cos(this.relativeDirection-60)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                    if(index>=0){
                        this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,9)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-60,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-60,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-60,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-60,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection+60)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-60,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection-60)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 135:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection+60)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection+60)*6/5,cos(this.relativeDirection+60)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                    if(index>=0){
                        this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,9)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+60,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+60,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+60,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+60,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection+60)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+60,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection+60)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 138: case 139: case 175: case 400: case 453: case 516:
                if(variants.nobasicanim){
                    this.selfCall(11)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(29)
                    }
                    this.userCombatant.runAnimation(1/30,29)
                    if(this.timer==15){
                        this.selfCall(11)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }
            break
            case 143:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(2)
                }else if(this.timer==10||this.timer==30){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer==21){
                    this.userCombatant.startAnimation(9)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/20,2)
                }else if(this.timer<=40){
                    this.userCombatant.runAnimation(1/10,9)
                }
                if(this.procedure[0]==2){
                    if(this.timer>30&&this.timer<=38){
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>38&&this.timer<=46){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer>=46){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>30&&this.timer<=38){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>38&&this.timer<=46){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==38){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=46){
                        this.remove=true
                    }
                }else{
                    if(this.timer>30){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer>=40){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 147:
                if(this.timer==1){
                    this.userCombatant.startAnimation(19)
                    this.targetCombatant.startAnimation(19)
                }
                this.userCombatant.runAnimation(1/20,19)
                this.targetCombatant.runAnimation(1/20,19)
                if(this.timer==10){
                    let userPosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}
                    this.userCombatant.moveTile(this.direction,this.distance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                    this.targetCombatant.moveTile(this.direction,-this.distance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance)
                    this.targetCombatant.moveTilePosition(userPosition.x,userPosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 153:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(24*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(24*this.targetDistance))
                this.userCombatant.runAnimation(1/12,0)
                if(this.timer>=24*this.targetDistance){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 165:
                if(this.targetCombatant.life<=0){
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.targetCombatant.startAnimation(19)
                    }
                    this.targetCombatant.runAnimation(1/20,19)
                    if(this.timer==10){
                        if(this.type==87){
                            this.battle.combatantManager.clearTile(this.targetTile)
                        }
                        this.targetCombatant.moveTile(this.direction,this.distance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                        this.targetCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 176:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,7,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }else if(this.timer==10*this.targetDistance+15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,10,[10]))
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.battle.combatantManager.damageAreaID(this.effect[0],this.userCombatant.id,this.targetCombatant.id,this.targetCombatant.tilePosition,2)
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 178:
                if(this.timer==1){
                    this.userCombatant.startAnimation(25)
                }
                if(this.timer<=10||this.timer>20&&this.timer<=30){
                    this.userCombatant.runAnimation(1/10,25)
                }
                if(this.timer==15||this.timer==20||this.timer==25||this.timer==30){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                }
                if(this.timer==5*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                }else if(this.timer==5*this.targetDistance+20){
                    this.targetCombatant.takeDamage(this.effect[0]-1,this.user,1)
                }else if(this.timer==5*this.targetDistance+25){
                    this.targetCombatant.takeDamage(this.effect[0]-2,this.user,1)
                }else if(this.timer==5*this.targetDistance+30){
                    this.targetCombatant.takeDamage(this.effect[0]-3,this.user,1)
                }else if(this.timer>=max(45,5*this.targetDistance+40)){
                    this.remove=true
                }
            break
            case 179:
                if(this.targetDistance==1){
                    if(this.timer==1){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(2)
                    }else if(this.timer==10){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                    if(this.timer<=20){
                        this.userCombatant.runAnimation(1/20,2)
                    }
                    if(this.procedure[0]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant.moveTile(this.direction,this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        }
                        if(this.timer>=26){
                            this.remove=true
                        }
                    }else if(this.procedure[0]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        }
                        if(this.timer==18){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=26){
                            this.remove=true
                        }
                    }else{
                        if(this.timer>10){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer>=20){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(25)
                    }
                    if(this.timer<=30){
                        this.userCombatant.runAnimation(1/15,25)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,32,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                    }else if(this.timer==10*this.targetDistance+15){
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,-1,this.targetCombatant.tilePosition)
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,2,[8]))
                    }else if(this.timer>=10*this.targetDistance+25){
                        this.remove=true
                    }
                }
            break
            case 188:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/30,2)
                if(this.timer==15){
                    this.targetCombatant.statusEffect('Damage Taken Up',this.effect[0])
                    this.targetCombatant.statusEffect('Strength',this.effect[1])
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 201:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(31)
                }
                if(this.timer<=15){
                    this.userCombatant.runAnimation(2/15,31)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.timer==10){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
                    if(this.procedure[a]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                        }
                    }else if(this.procedure[a]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                        }
                        if(this.timer==18){
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[a]==0){
                        if(this.timer>10){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }
                        if(this.timer>=20){
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant[a].id)
                            this.procedure[a]=-1
                        }
                    }
                }
                if(this.timer>=26){
                    this.remove=true
                }
            break
            case 208:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/10,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance-6||this.timer==15*this.targetDistance-2||this.timer==15*this.targetDistance+2||this.timer==15*this.targetDistance+6){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=15*this.targetDistance+15){
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 211: case 501: case 616: case 617: case 618:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/15,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance-3||this.timer==15*this.targetDistance+3){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.timer==15*this.targetDistance-3){
                        switch(this.type){
                            case 211:
                                this.userCombatant.statusEffect('Dodge',this.effect[1])
                            break
                            case 501:
                                this.battle.cardManagers[this.player].allGroupClaw(this.effect[1])
                            break
                            case 616:
                                this.battle.cardManagers[this.player].draw(this.effect[1])
                            break
                            case 617:
                                this.battle.cardManagers[this.player].draw(this.effect[1])
                                this.targetCombatant.goal.anim.direction=this.relativeDirection
                                this.battle.turnManager.loadEnemyAttack(this.targetCombatant.id)
                            break
                            case 618:
                                this.battle.cardManagers[this.player].draw(this.effect[1])
                                this.targetCombatant.statusEffect('Frail',this.effect[2])
                            break
                        }
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    if(this.targetDistance>1){
                        this.battle.activate(1,this.userCombatant.id)
                    }
                    this.remove=true
                }
            break
            case 217:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15||this.timer==20||this.timer==25){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,35,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }
                if(this.timer==10*this.targetDistance+15||this.timer==10*this.targetDistance+20||this.timer==10*this.targetDistance+25){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                }else if(this.timer>=10*this.targetDistance+35){
                    this.remove=true
                }
            break
            case 218:
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,35,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }else if(this.timer==10*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                    this.battle.cardManagers[this.player].draw(this.effect[1])
                    this.battle.cardManagers[this.player].hand.discard(this.effect[2])
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            break
            case 222:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(31)
                }
                if(this.timer<=15){
                    this.userCombatant.runAnimation(2/15,31)
                }else{
                    this.remove=true
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.timer==10){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
                }
            break
            case 236:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection-120)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection-120)*6/5,cos(this.relativeDirection-120)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                    if(index>=0){
                        this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,9)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection-120)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection-120)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 237:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection+120)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection+120)*6/5,cos(this.relativeDirection+120)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                    if(index>=0){
                        this.distance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,9)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection+120)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5){
                        this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection+120)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 241:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/30,2)
                }
                if(this.timer==15){
                    this.targetCombatant.takeDamage(this.procedure[0]==1?this.effect[0]+this.effect[1]:this.effect[0],this.user)
                }
                if(this.procedure[0]==1&&this.timer>=30){
                    this.remove=true
                }else if(this.procedure[0]==0){
                    if(this.timer>30){
                        this.userCombatant.runAnimation(1/10,0)
                        this.userCombatant.moveTile(this.direction,-this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer>=40){
                        this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 243:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==-19+this.targetDistance*15){
                    this.userCombatant.startAnimation(3)
                }
                if(this.timer<=10){
                    this.userCombatant.runAnimation(1/10,0)
                }else if(this.timer<=-20+this.targetDistance*15){
                    this.userCombatant.runAnimation(1/15,0)
                }else if(this.timer<=this.targetDistance*15){
                    this.userCombatant.runAnimation(1/10,3)
                }
                if(this.timer==-20+this.targetDistance*15){
                    this.targetCombatant.goal.anim.direction=this.relativeDirection+180
                }
                if(this.timer<=-20+this.targetDistance*15){
                    this.userCombatant.moveTile(this.direction,this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/15/this.targetDistance)
                }else if(this.timer>-10+this.targetDistance*15&&this.timer<=this.targetDistance*15){
                    this.userCombatant.moveTile(this.direction,-this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/15/this.targetDistance)
                    this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer==this.targetDistance*15-35){
                    this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.x/this.targetDistance,this.userCombatant.tilePosition.y*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.y/this.targetDistance)
                }
                if(this.timer>=this.targetDistance*15){
                    this.targetCombatant.moveTilePosition(round(this.targetCombatant.tilePosition.x/2+this.userCombatant.tilePosition.x/2),round(this.targetCombatant.tilePosition.y/2+this.userCombatant.tilePosition.y/2))
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            break
            case 244:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection-120)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection-120)*6/5,cos(this.relativeDirection-120)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(3)
                    if(index>=0){
                        this.tempDistance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }else{
                        this.tempDistance=this.distance
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,3)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+21){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.tempDistance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection-120)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+5){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection-120,this.relativeDistance/10/this.targetDistance)
                        this.userCombatant.goal.anim.direction-=6
                        this.userCombatant.anim.direction-=6
                    }
                    if(this.timer==15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection-120)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    }
                    if(this.timer==15*this.targetDistance+6){
                        let offset=transformDirection(0,this.relativeDirection-180)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.procedure[2]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(3)
                    }
                    if(this.procedure[2]==2){
                        if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                            this.targetCombatant.moveTile(this.direction,this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        }
                        if(this.timer>=15*this.targetDistance+21){
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }else if(this.procedure[2]==1){
                        if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer==15*this.targetDistance+13){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let offset=transformDirection(0,this.relativeDirection-180)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=15*this.targetDistance+21){
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }else{
                        if(this.timer>15*this.targetDistance+5){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                            this.userCombatant.goal.anim.direction+=6
                            this.userCombatant.anim.direction+=6
                        }
                        if(this.timer>=15*this.targetDistance+15){
                            let offset=transformDirection(0,this.relativeDirection-180)
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                }
            break
            case 245:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let offset=transformDirection(0,this.relativeDirection+120)
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.procedure[1]=atan2(sin(this.relativeDirection+120)*6/5,cos(this.relativeDirection+120)/sqrt(3))
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(3)
                    if(index>=0){
                        this.tempDistance=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant.position.x,this.targetCombatant.position.y)
                    }else{
                        this.tempDistance=this.distance
                    }
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,3)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.type==35){
                        this.userCombatant.combo++
                    }
                }else if(this.timer>=15*this.targetDistance+21){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.tempDistance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.procedure[1],-this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection+120)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+5){
                        this.targetCombatant.moveTile(this.procedure[1],this.tempDistance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection+120,this.relativeDistance/10/this.targetDistance)
                        this.userCombatant.goal.anim.direction+=6
                        this.userCombatant.anim.direction+=6
                    }
                    if(this.timer==15*this.targetDistance+5){
                        let offset=transformDirection(0,this.relativeDirection+120)
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    }
                    if(this.timer==15*this.targetDistance+6){
                        let offset=transformDirection(0,this.relativeDirection-180)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                        this.procedure[2]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.userCombatant.startAnimation(3)
                    }
                    if(this.procedure[2]==2){
                        if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                            this.targetCombatant.moveTile(this.direction,this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        }
                        if(this.timer>=15*this.targetDistance+21){
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }else if(this.procedure[2]==1){
                        if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer==15*this.targetDistance+13){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let offset=transformDirection(0,this.relativeDirection-180)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=15*this.targetDistance+21){
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }else{
                        if(this.timer>15*this.targetDistance+5){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                            this.userCombatant.goal.anim.direction+=6
                            this.userCombatant.anim.direction+=6
                        }
                        if(this.timer>=15*this.targetDistance+15){
                            let offset=transformDirection(0,this.relativeDirection-180)
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                }
            break
            case 246:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.procedure[1]=this.targetDistance
                    this.procedure[2]=0
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/30,2)
                }
                if(this.timer==15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.procedure[0]==1&&this.timer>=30){
                    this.remove=true
                }else if(this.procedure[0]==0){
                    if(this.timer>30+this.procedure[2]*15){
                        this.userCombatant.runAnimation(1/10,0)
                        this.userCombatant.moveTile(this.direction,-this.distance/10)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==40+this.procedure[2]*15){
                        this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*(1+1/this.procedure[1])-this.targetCombatant.tilePosition.x/this.procedure[1],this.userCombatant.tilePosition.y*(1+1/this.procedure[1])-this.targetCombatant.tilePosition.y/this.procedure[1])
                        this.battle.activate(1,this.userCombatant.id)
                        this.procedure[1]++
                        let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*(1+1/this.procedure[1])-this.targetCombatant.tilePosition.x/this.procedure[1],this.userCombatant.tilePosition.y*(1+1/this.procedure[1])-this.targetCombatant.tilePosition.y/this.procedure[1])
                        this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.procedure[2]++
                    }
                }
            break
            case 247:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0]+this.combo*this.effect[1],this.user)
                    this.userCombatant.combo=0
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,0)
                }
                if(this.timer<=10){
                    this.userCombatant.moveTile(this.direction,this.distance/15)
                }else if(this.timer<=20){
                    this.userCombatant.moveTile(this.direction,-this.distance/15)
                }
                if(this.procedure[0]==2){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer>=26){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==18){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=26){
                        this.remove=true
                    }
                }else{
                    if(this.timer>10){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer>=20){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 250:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    this.upTargetDistance=this.targetDistance
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(3)
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,3)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.procedure[this.procedure.length-1]==2){
                    if(this.timer>15*this.upTargetDistance-5&&this.timer<=15*this.upTargetDistance+3){
                        this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.upTargetDistance+3&&this.timer<=15*this.upTargetDistance+11){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.upTargetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[this.procedure.length-1]==1){
                    if(this.timer>15*this.upTargetDistance-5&&this.timer<=15*this.upTargetDistance+3){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.upTargetDistance+3&&this.timer<=15*this.upTargetDistance+11){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.upTargetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.x/(this.upTargetDistance-this.targetDistance+1),this.targetCombatant.tilePosition.y*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.y/(this.upTargetDistance-this.targetDistance+1))
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.upTargetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.upTargetDistance-5){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.upTargetDistance+5){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.x/(this.upTargetDistance-this.targetDistance+1),this.targetCombatant.tilePosition.y*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.y/(this.upTargetDistance-this.targetDistance+1))
                        this.battle.activate(1,this.targetCombatant.id)
                        this.upTargetDistance++
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.x/(this.upTargetDistance-this.targetDistance+1),this.targetCombatant.tilePosition.y*(1/(this.upTargetDistance-this.targetDistance+1)+1)-this.userCombatant.tilePosition.y/(this.upTargetDistance-this.targetDistance+1))
                        this.procedure.push(this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1)
                    }
                }
            break
            case 251:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==11){
                    this.userCombatant.startAnimation(3)
                }
                if(this.timer<=10){
                    this.userCombatant.runAnimation(1/10,0)
                }else if(this.timer<=30){
                    this.userCombatant.runAnimation(1/10,3)
                }
                if(this.timer==10){
                    this.targetCombatant.goal.anim.direction=this.relativeDirection+180
                }
                if(this.timer<=10){
                    this.userCombatant.moveTile(this.direction,this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/15/this.targetDistance)
                }else if(this.timer>20&&this.timer<=30){
                    this.userCombatant.moveTile(this.direction,-this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/15/this.targetDistance)
                }
                if(this.timer>20&&this.timer<=10+this.targetDistance*10){
                    this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer==-5+this.targetDistance*10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer>=10+this.targetDistance*10){
                    this.targetCombatant.moveTilePosition(round(this.userCombatant.tilePosition.x*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.x/this.targetDistance),round(this.userCombatant.tilePosition.y*(1-1/this.targetDistance)+this.targetCombatant.tilePosition.y/this.targetDistance))
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            break
            case 252:
                if(this.energy<=0){
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(2)
                    }
                    this.userCombatant.runAnimation(1/30,2)
                    if(this.timer%30==15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=30*this.energy){
                        this.remove=true
                    }
                }
            break
            case 255:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/15,2)
                if(this.timer==10||this.timer==20){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 327:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/10,2)
                if(this.timer==5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=10){
                    this.remove=true
                }
            break
            case 328: case 572: case 707: case 708: case 709: case 813: case 814: case 815:
                if(this.targetVariant){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                    if(this.timer>=15*this.targetDistance){
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        if(this.type==205){
                            this.battle.activateTile(1,this.userCombatant.id)
                        }else{
                            this.battle.activate(1,this.userCombatant.id)
                        }
                        this.remove=true
                    }
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }
                    this.userCombatant.moveTile(this.direction,this.distance/(24*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(24*this.targetDistance))
                    this.userCombatant.runAnimation(1/12,0)
                    if(this.timer>=24*this.targetDistance){
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 329:
                if(this.timer==1||this.timer==31){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==11){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer<=10||this.timer>30){
                    this.userCombatant.runAnimation(1/10,0)
                }else if(this.timer>10&&this.timer<=30){
                    this.userCombatant.runAnimation(1/20,2)
                }
                if(this.timer<=10){
                    this.userCombatant.moveTile(this.direction,this.distance/30)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                }else if(this.timer>30){
                    this.userCombatant.moveTile(this.direction,-this.distance/30)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                }
                if(this.timer==20){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=40){
                    this.remove=true
                }
            break
            case 336:
                if(this.timer==1){
                    this.userCombatant.startAnimation(32)
                }
                this.userCombatant.runAnimation(1/20,32)
                if(this.timer==10){
                    this.battle.combatantManager.damageArea2(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 342: case 350: case 353: case 407: case 425: case 473: case 476: case 477: case 478: case 479:
            case 480: case 490: case 491: case 492: case 493: case 494: case 495: case 498: case 505: case 506:
            case 520: case 526: case 531: case 532: case 534: case 535: case 536: case 543: case 544: case 545:
            case 549: case 550: case 551: case 552: case 553: case 554: case 555: case 556: case 560: case 561:
            case 562: case 563: case 564: case 565: case 566: case 567: case 568: case 577: case 578: case 579:
            case 583: case 584: case 600: case 671: case 672: case 673: case 767: case 785: case 847: case 851:
            case 854: case 856: case 879: case 894: case 956:
                if(variants.nobasicanim){
                    this.selfCall(12)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(32)
                    }
                    this.userCombatant.runAnimation(1/20,32)
                    if(this.timer==10){
                        this.selfCall(12)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 345:
                if(this.timer==1){
                    this.userCombatant.startAnimation(33)
                }
                this.userCombatant.runAnimation(1/20,33)
                if(this.timer==10){
                    this.targetCombatant.takeDamage(this.battle.cardManagers[this.player].deck.cards.length,this.user)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 356: case 653:
                if(this.timer==1){
                    this.procedure=[[],[]]
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let offset=transformDirection(0,this.relativeDirection[a]+60)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                        this.procedure[1][a]=atan2(sin(this.relativeDirection[a]+60)*6/5,cos(this.relativeDirection[a]+60)/sqrt(3))
                        this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        if(index>=0){
                            this.distance[a]=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant[a].position.x,this.targetCombatant[a].position.y)
                        }
                    }
                    this.userCombatant.startAnimation(10)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,10)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.type==653&&this.time==10){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
                    if(this.procedure[0][a]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,this.relativeDistance[a]/40/this.targetDistance[a])
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,-this.relativeDistance[a]/40/this.targetDistance[a])
                        }
                    }else if(this.procedure[0][a]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,this.relativeDistance[a]/10/this.targetDistance[a])
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,-this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer==18){
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let offset=transformDirection(0,this.relativeDirection+60)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[0][a]==0){
                        if(this.timer>10){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer>=20){
                            let offset=transformDirection(0,this.relativeDirection[a]+60)
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            this.battle.activate(1,this.targetCombatant[a].id)
                            this.procedure[0][a]=-1
                        }
                    }
                }
                if(this.timer>=26){
                    this.remove=true
                }
            break
            case 357: case 654:
                if(this.timer==1){
                    this.procedure=[[],[]]
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let offset=transformDirection(0,this.relativeDirection[a]-60)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                        this.procedure[1][a]=atan2(sin(this.relativeDirection[a]-60)*6/5,cos(this.relativeDirection[a]-60)/sqrt(3))
                        this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        if(index>=0){
                            this.distance[a]=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant[a].position.x,this.targetCombatant[a].position.y)
                        }
                    }
                    this.userCombatant.startAnimation(10)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,10)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.type==654&&this.time==10){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
                    if(this.procedure[0][a]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-60,this.relativeDistance[a]/40/this.targetDistance[a])
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-60,-this.relativeDistance[a]/40/this.targetDistance[a])
                        }
                    }else if(this.procedure[0][a]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-60,this.relativeDistance[a]/10/this.targetDistance[a])
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-60,-this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer==18){
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let offset=transformDirection(0,this.relativeDirection-60)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[0][a]==0){
                        if(this.timer>10){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]-60,this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer>=20){
                            let offset=transformDirection(0,this.relativeDirection[a]-60)
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            this.battle.activate(1,this.targetCombatant[a].id)
                            this.procedure[0][a]=-1
                        }
                    }
                }
                if(this.timer>=26){
                    this.remove=true
                }
            break
            case 358:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/30,2)
                if(this.timer==15){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 368:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer>=15*this.targetDistance-30){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0]*2,this.targetCombatant.tilePosition.y-offset[1]*2)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 401: case 417:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(34)
                }else if(this.timer==15*this.targetDistance-14){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/30,2)
                }else{
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,34)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }else if(this.timer==15*this.targetDistance){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 401:
                            if(this.targetCombatant.blocked>0){
                                this.targetCombatant.statusEffect('Bleed',this.effect[1])
                            }
                        break
                        case 417:
                            this.userCombatant.statusEffect('Confused',this.effect[1])
                            this.userCombatant.balance+=this.effect[2]
                        break
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                    this.battle.activate(1,this.userCombatant.id)
                }
            break
            case 411:
                if(this.timer==1){
                    this.userCombatant.startAnimation(35)
                }
                this.userCombatant.runAnimation(1/30,35)
                if(this.timer==15){
                    this.userCombatant.statusEffect('Draw Up',this.effect[0])
                    this.userCombatant.balance+=this.effect[1]
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 438:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==11){
                    this.userCombatant.startAnimation(3)
                }
                if(this.timer<=10){
                    this.userCombatant.runAnimation(1/10,0)
                }else if(this.timer<=30){
                    this.userCombatant.runAnimation(1/10,3)
                }
                if(this.timer==10){
                    this.targetCombatant.goal.anim.direction=this.relativeDirection
                    this.targetCombatant.statusEffect('Confusion',this.effect[0])
                }
                if(this.timer<=10){
                    this.userCombatant.moveTile(this.direction,this.distance/30)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/30)
                }else if(this.timer>20&&this.timer<=30){
                    this.userCombatant.moveTile(this.direction,-this.distance/30)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/30)
                    this.targetCombatant.moveTile(this.direction,-this.distance/20)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/20)
                }
                if(this.timer>=30){
                    this.targetCombatant.moveTilePosition(round(this.targetCombatant.tilePosition.x/2+this.userCombatant.tilePosition.x/2),round(this.targetCombatant.tilePosition.y/2+this.userCombatant.tilePosition.y/2))
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            break
            case 447:
                if(this.timer==1){
                    this.offset=[this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y]
                    for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.battle.combatantManager.combatants[a].tilePosition.x+this.offset[0],this.battle.combatantManager.combatants[a].tilePosition.y+this.offset[1])
                        this.procedure[a]=this.battle.combatantManager.combatants[a].team==this.userCombatant.team?3:this.battle.combatantManager.combatants[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(3)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,3)
                }
                let allDone=true
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.procedure[a]==2){
                        allDone=false
                        if(this.timer>10&&this.timer<=18){
                            this.battle.combatantManager.combatants[a].moveTile(this.direction,this.distance/40)
                            this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        }else if(this.timer>18&&this.timer<=26){
                            this.battle.combatantManager.combatants[a].moveTile(this.direction,-this.distance/40)
                            this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        }
                        if(this.timer>=26){
                            this.procedure[a]=3
                        }
                    }else if(this.procedure[a]==1){
                        allDone=false
                        if(this.timer>10&&this.timer<=18){
                            this.battle.combatantManager.combatants[a].moveTile(this.direction,this.distance/10)
                            this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }else if(this.timer>18&&this.timer<=26){
                            this.battle.combatantManager.combatants[a].moveTile(this.direction,-this.distance/10)
                            this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        }
                        if(this.timer==18){
                            this.battle.combatantManager.combatants[a].takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.battle.combatantManager.combatants[a].tilePosition.x+this.offset[0],this.battle.combatantManager.combatants[a].tilePosition.y+this.offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=26){
                            this.procedure[a]=3
                        }
                    }else if(this.procedure[a]==0){
                        allDone=false
                        if(this.timer>10){
                            this.battle.combatantManager.combatants[a].moveTile(this.direction,this.distance/10)
                            this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer>=20){
                            this.battle.combatantManager.combatants[a].moveTilePosition(this.battle.combatantManager.combatants[a].tilePosition.x+this.offset[0],this.battle.combatantManager.combatants[a].tilePosition.y+this.offset[1])
                            this.battle.activate(1,this.battle.combatantManager.combatants[a].id)
                            this.procedure[a]=3
                        }
                    }
                }
                if(allDone){
                    this.remove=true
                }
            break
            case 459: case 658:
                if(this.timer==1){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(14)
                }
                if(this.timer<=15){
                    this.userCombatant.runAnimation(1/15,14)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.type==658&&this.time==10){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
                    if(this.procedure[a]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                        }
                    }else if(this.procedure[a]==1){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                        }
                        if(this.timer==18){
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[a]==0){
                        if(this.timer>10&&this.timer<=20){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }
                        if(this.timer==20){
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        } 
                        if(this.timer==21){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            this.procedure[a+la]=this.targetCombatant[a].getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        }
                        if(this.procedure[a+la]==2){
                            if(this.timer>20&&this.timer<=28){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                            }else if(this.timer>28&&this.timer<=36){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                            }
                            if(this.timer==36){
                                this.battle.activate(1,this.targetCombatant[a].id)
                            }
                        }else if(this.procedure[a+la]==1){
                            if(this.timer>20&&this.timer<=28){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                            }else if(this.timer>28&&this.timer<=36){
                                this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                            }
                            if(this.timer==28){
                                this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                                let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                if(index>=0){
                                    this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                                }
                            }else if(this.timer==36){
                                this.battle.activate(1,this.targetCombatant[a].id)
                            }
                        }else{
                            if(this.timer>20&&this.timer<=30){
                                this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                                this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                            }
                            if(this.timer==30){
                                this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant[a].tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                                this.battle.activate(1,this.targetCombatant[a].id)
                            }
                        }
                    }
                }
                if(this.timer>=36){
                    this.remove=true
                }
            break
            case 464:
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/42)
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/42)
                this.userCombatant.runAnimation(1/14,0)
                if(this.timer>=42){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            break
            case 471:
                if(this.timer==1){
                    this.userCombatant.startAnimation(10)
                }
                this.userCombatant.runAnimation(1/10,10)
                if(this.timer==10){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        this.battle.turnManager.loadEnemyAttack(this.targetCombatant[a].id)
                        this.targetCombatant[a].goal.anim.direction=this.relativeDirection[a]
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 483:
                if(this.timer==1){
                    this.userCombatant.startAnimation(36)
                }
                this.userCombatant.runAnimation(1/30,36)
                if(this.timer==15){
                    this.userCombatant.life=0
                    this.battle.combatantManager.damageArea(this.effect[0],this.user,-1,this.userCombatant.tilePosition)
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,2,[20]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 487:
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(9)
                }
                if(this.timer>=15*this.targetDistance-14&&this.timer<15*this.targetDistance+6){
                    this.userCombatant.runAnimation(1/10,9)
                }else if(this.timer<15*this.targetDistance-14){
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                }
                if(this.timer==15*this.targetDistance-15){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer==15*this.targetDistance-5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 35:
                            this.userCombatant.combo++
                        break
                        case 196:
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.drop(this.targetCombatant.id,findName(this.effect[2],types.card),0,game.playerNumber+1)
                            }
                        break
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+3){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+11){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance-5){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+5){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 591: case 593:
                if(this.timer==1){
                    this.userCombatant.startAnimation(25)
                }
                if(this.timer<=10||this.timer>20&&this.timer<=30){
                    this.userCombatant.runAnimation(1/10,25)
                }
                if(this.timer>=14&&this.timer<=16){
                    for(let a=0,la=3;a<la;a++){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30)+random(-12,12),2.5*this.targetDistance-1]))
                    }
                }else if(this.timer==5*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0]-this.effect[1]*(this.targetDistance-1),this.user,1)
                    switch(this.type){
                        case 593:
                            if(this.targetCombatant.life<=0){
                                this.battle.energy.main[this.player]+=this.effect[2]
                            }
                        break
                    }
                }else if(this.timer>=max(30,5*this.targetDistance+25)){
                    this.remove=true
                }
            break
            case 598:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer<=10||this.timer>20)
                this.userCombatant.runAnimation(1/20,2)
                if(this.timer==12||this.timer==15||this.timer==18){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.targetCombatant.blocked>0){
                        this.targetCombatant.statusEffect('Jagged Bleed',this.effect[1])
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            break
            case 611:
                if(this.targetCombatant.length>0){
                    if(this.timer==1){
                        this.userCombatant.goal.anim.direction=round(atan2(this.targetCombatant[0].relativePosition.x-this.userCombatant.relativePosition.x,this.targetCombatant[0].relativePosition.y-this.userCombatant.relativePosition.y)/60-1/2)*60+30
                        this.userCombatant.startAnimation(25)
                    }
                    if(this.timer<=10||this.timer>20&&this.timer<=30){
                        this.userCombatant.runAnimation(1/10,25)
                    }
                    if(this.timer==15){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant[0].position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant[0].position.y+30),2.5*this.targetDistance[0]-1]))
                    }else if(this.timer==5*this.targetDistance[0]+15){
                        this.targetCombatant[0].takeDamage(this.effect[0],this.user,1)
                    }else if(this.timer>=max(30,5*this.targetDistance[0]+25)){
                        this.targetCombatant.splice(0,1)
                        this.targetDistance.splice(0,1)
                        this.timer=0
                    }
                }else{
                    this.remove=true
                }
            break
            case 651: case 727:
                if(this.targetClass==2){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                    if(this.timer>=15*this.targetDistance-15){
                        let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                    if(this.timer>=15*this.targetDistance-15){
                        let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 660:
                if(this.timer==1){
                    this.procedure[0]=this.targetTile.type.includes(19)?1:0
                }
                if(this.procedure[0]==1){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(19)
                    }
                    this.userCombatant.runAnimation(1/20,19)
                    if(this.timer==10){
                        if(this.type==87){
                            this.battle.combatantManager.clearTile(this.targetTile)
                        }
                        this.userCombatant.moveTile(this.direction,this.distance)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    this.userCombatant.runAnimation(1/30,17)
                    if(this.timer==15){
                        this.targetTile.addType(19)
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }
            break
            case 674:
                if(this.procedure[0]==1){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(19)
                    }
                    this.userCombatant.runAnimation(1/20,19)
                    this.targetCombatant.size=this.userCombatant.size/this.userCombatant.base.size*this.targetCombatant.base.size
                    if(this.timer==10){
                        let userPosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}
                        this.userCombatant.moveTile(this.direction,this.distance)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                        this.targetCombatant.moveTile(this.direction,-this.distance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance)
                        this.targetCombatant.moveTilePosition(userPosition.x,userPosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(19)
                    }
                    this.userCombatant.runAnimation(1/20,19)
                    if(this.timer==10){
                        this.userCombatant.moveTile(this.direction,this.distance)
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 703:
                if(this.timer==1){
                    this.userCombatant.startAnimation(19)
                }
                this.userCombatant.runAnimation(1/20,19)
                if(this.timer==10){
                    this.targetCombatant.life=0
                    this.userCombatant.moveTile(this.direction,this.distance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                }else if(this.timer>=20){
                    this.remove=true
                }
            break
            case 729:
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>10&&this.timer<=15||this.timer>30&&this.timer<=35){
                    this.userCombatant.runAnimation(1/10,37)
                }
                if(this.timer==15||this.timer==30){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=45){
                    this.remove=true
                }
            break
            case 746:
                this.procedure[0]=this.userCombatant.stance==1?1:0
                if(variants.nobasicanim){
                    this.remove=true
                    if(this.procedure[0]==1){
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                    }else{
                        this.userCombatant.enterStance(1)
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    this.userCombatant.runAnimation(1/30,17)
                    if(this.timer==15){
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    this.userCombatant.runAnimation(1/10,5)
                    if(this.timer==10){
                        this.userCombatant.enterStance(1)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 747:
                this.procedure[0]=this.userCombatant.stance==1?1:0
                if(variants.nobasicanim){
                    this.remove=true
                    if(this.procedure[0]==1){
                        this.battle.cardManagers[this.player].draw(this.effect[0])
                    }else{
                        this.userCombatant.enterStance(1)
                    }
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    this.userCombatant.runAnimation(1/10,5)
                    if(this.timer==10){
                        if(this.procedure[0]==1){
                            this.battle.cardManagers[this.player].draw(this.effect[0])
                        }else{
                            this.userCombatant.enterStance(1)
                        }
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 750:
                if(variants.nobasicanim){
                    this.userCombatant.moveTile(this.direction,this.distance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }else if(this.procedure[0]==3){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(0)
                    }
                    this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                    this.userCombatant.runAnimation(1/15,0)
                    if(this.timer==10*this.targetDistance){
                        this.selfCall(2)
                    }
                    if(this.timer>=15*this.targetDistance){
                        this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    this.userCombatant.runAnimation(1/10,5)
                    if(this.timer==10){
                        this.userCombatant.enterStance(3)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 751:
                this.procedure[0]=this.userCombatant.stance==1?1:0
                if(variants.nobasicanim){
                    this.remove=true
                    if(this.procedure[0]==4){
                        this.targetCombatant.statusEffect('Frail',this.effect[0])
                        this.targetCombatant.statusEffect('Dexterity',this.effect[1])
                    }else{
                        this.userCombatant.enterStance(1)
                    }
                }else if(this.procedure[0]==4){
                    if(this.timer==1){
                        this.userCombatant.startAnimation(17)
                    }
                    this.userCombatant.runAnimation(1/30,17)
                    if(this.timer==15){
                        this.targetCombatant.statusEffect('Frail',this.effect[0])
                        this.targetCombatant.statusEffect('Dexterity',this.effect[1])
                    }else if(this.timer>=30){
                        this.remove=true
                    }
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(5)
                    }
                    this.userCombatant.runAnimation(1/10,5)
                    if(this.timer==10){
                        this.userCombatant.enterStance(1)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            break
            case 793: case 908:
                if(this.effect[1]<=0){
                    this.remove=true
                }else{
                    if(this.timer%30==1){
                        this.userCombatant.startAnimation(2)
                    }
                    this.userCombatant.runAnimation(1/30,2)
                    if(this.timer%30==15){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }else if(this.timer>=30*this.effect[1]){
                        this.remove=true
                    }
                }
            break
            case 825:
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(3)
                }else if(this.timer==10&&this.userCombatant.stance==4){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,3)
                }
                if(this.procedure[0]==2){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=26){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==18){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=26){
                        this.remove=true
                    }
                }else{
                    if(this.timer>10){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=20){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            break
            case 866: case 874:
                if(this.timer==1){
                    this.userCombatant.startAnimation(17)
                }
                this.userCombatant.runAnimation(1/10,17)
                if(this.timer%10==5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.timer==5&&this.type==874){
                        this.battle.cardManagers[this.player].hand.exhaust(this.effect[2])
                    }
                }else if(this.timer>=min(100,this.effect[1]*10)){
                    this.remove=true
                }
            break
            case 938:
                if(this.timer==1){
                    this.userCombatant.startAnimation(17)
                }
                if(this.timer<=15||this.timer>10+this.effect[2]*5){
                    this.userCombatant.runAnimation(1/30,17)
                }
                if(this.timer%5==0&&this.timer>=15&&this.timer<=10+this.effect[2]*5){
                    this.targetCombatant.takeDamage(floor(random(this.effect[0],this.effect[1]+1)),this.user)
                }else if(this.timer>=25+this.effect[2]*5){
                    this.remove=true
                }
            break
            case 957:
                if(this.timer==1){
                    this.userCombatant.startAnimation(7)
                }
                if(this.timer<=10||this.timer>20&&this.timer<=30){
                    this.userCombatant.runAnimation(1/10,7)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    42,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                }else if(this.timer==5*this.targetDistance+15){
                    this.targetCombatant.takeDamage((this.userCombatant.charge>=3?2:1)*this.effect[0],this.user)
                }else if(this.timer>=max(30,5*this.targetDistance+25)){
                    this.remove=true
                }
            break
            case 958:
                if(this.timer==1){
                    this.userCombatant.startAnimation(7)
                }
                if(this.timer<=10||this.timer>20&&this.timer<=30){
                    this.userCombatant.runAnimation(1/10,7)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    43,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                }else if(this.timer==5*this.targetDistance+15){
                    this.targetCombatant.takeDamage((this.userCombatant.charge<3?2:1)*this.effect[0],this.user)
                }else if(this.timer>=max(30,5*this.targetDistance+25)){
                    this.remove=true
                }
            break
            case 959:
                if(this.timer==1){
                    this.userCombatant.startAnimation(7)
                }
                if(this.timer<=10||this.timer>20&&this.timer<=30){
                    this.userCombatant.runAnimation(1/10,7)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    44,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                }else if(this.timer==5*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.userCombatant.charge>=3){
                        this.userCombatant.charge-=3
                        this.userCombatant.chargeConsumed()
                    }else if(this.userCombatant.charge<3){
                        this.userCombatant.charge+=3
                    }
                }else if(this.timer>=max(30,5*this.targetDistance+25)){
                    this.remove=true
                }
            break

            default:
                this.remove=true
            break
        }
        if(this.remove){
            this.battle.combatantManager.playCard()
            switch(this.attackClass){
                case 1:
                    if(this.userCombatant.getStatus('Double Damage')>0&&this.clearAttack[0]){
                        this.userCombatant.status.main[findName('Double Damage',this.userCombatant.status.name)]--
                    }
                    if(this.userCombatant.getStatus('Single Damage')>0&&this.clearAttack[1]){
                        this.userCombatant.status.main[findName('Single Damage',this.userCombatant.status.name)]=0
                    }
                    if(this.userCombatant.getStatus('Triple Damage')>0&&this.clearAttack[2]){
                        this.userCombatant.status.main[findName('Triple Damage',this.userCombatant.status.name)]--
                    }
                break
            }
        }
    }
}