attack.prototype.update=function(){
    this.timer++
    switch(this.type){
        case -35:
            this.battle.energy.main[this.player]=0
            this.remove=true
        break
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
        case 732: case 733: case 734: case 736: case 757: case 758: case 766: case 771: case 775: case 779:
        case 780: case 784: case 786: case 795: case 796: case 798: case 806: case 824: case 826: case 827:
        case 828: case 829: case 830: case 840: case 844: case 848: case 849: case 862: case 863: case 872:
        case 884: case 895: case 897: case 900: case 916: case 917: case 930: case 934: case 940: case 942:
        case 945: case 946: case 947: case 950: case 966: case 972: case 991: case 992: case 993: case 994:
        case 1003: case 1004: case 1006: case 1007: case 1010: case 1014: case 1015: case 1018: case 1022: case 1027:
        case 1029: case 1031: case 1038: case 1040: case 1049: case 1050: case 1058: case 1064: case 1068: case 1073:
        case 1083: case 1087: case 1089: case 1090: case 1091: case 1092: case 1100: case 1123: case 1133: case 1135:
        case 1144: case 1145: case 1147: case 1153: case 1154: case 1155: case 1160: case 1164: case 1166: case 1167:
        case 1174: case 1175: case 1178: case 1179: case 1180: case 1181: case 1183: case 1187: case 1202: case 1209:
        case 1213: case 1217: case 1219: case 1222: case 1228: case 1231: case 1233: case 1234: case 1251: case 1267:
        case 1268: case 1270: case 1271: case 1284: case 1286: case 1291: case 1295: case 1296: case 1305: case 1307:
        case 1309: case 1311: case 1312: case 1314: case 1315: case 1321: case 1324: case 1330: case 1345: case 1354:
        case 1355: case 1356: case 1377: case 1390: case 1395: case 1397: case 1399: case 1401: case 1416: case 1421:
        case 1424: case 1429: case 1438: case 1439: case 1440: case 1457: case 1462: case 1464: case 1465: case 1478:
        case 1485: case 1490: case 1493: case 1498: case 1501: case 1502: case 1503: case 1506: case 1508: case 1513:
        case 1521: case 1522: case 1525: case 1526: case 1531: case 1535: case 1536: case 1537: case 1550: case 1556:
        case 1557: case 1558: case 1559: case 1561: case 1569:
            //mark 1
            if(this.type==780||this.type==1354){
                let failed=false
                for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                    if(this.userManager.hand.cards[a].class==1&&this.userManager.hand.cards[a].attack!=this.type){
                        failed=true
                    }
                }
                if(failed){
                    break
                }
            }
            if(
                this.type==427&&this.userCombatant.armed||
                this.type==806&&this.userCombatant.stance!=1||
                (this.type==947||this.type==1559)&&this.energy!=0||
                this.timer==1&&this.type==1006&&floor(random(0,100))>=20*this.energy&&!(this.energy>0&&this.userCombatant.luckCheck())||
                this.type==1179&&this.energy%2!=0||
                this.type==1233&&this.battle.turn.total%2==1||
                (this.type==1267||this.type==1268||this.type==1438||this.type==1569)&&this.relPos[0]!=1||
                this.type==1421&&this.energy%2==0||
                this.type==1556&&this.relPos[0]!=2||
                this.type==1561&&this.relPos[1]<2
            ){
                this.remove=true
                if(this.type==1006){
                    this.userCombatant.lowRoll()
                }
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
            }else if(this.targetDistance>=2){
                if(this.timer==1||this.timer==15*this.targetDistance+1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-19){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer<=15*this.targetDistance-20||this.timer>15*this.targetDistance){
                    this.userCombatant.runAnimation((this.targetDistance-1)/(this.targetDistance*15-20),0)
                }else if(this.timer>15*this.targetDistance-20&&this.timer<=15*this.targetDistance){
                    this.userCombatant.runAnimation(1/20,2)
                }
                if(this.timer<=15*this.targetDistance-20){
                    this.userCombatant.moveTile(this.direction,this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/15/this.targetDistance)
                }else if(this.timer>15*this.targetDistance){
                    this.userCombatant.moveTile(this.direction,-this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/15/this.targetDistance)
                }
                if(this.timer==15*this.targetDistance-10){
                    this.selfCall(0)
                }else if(this.timer>=30*this.targetDistance-20){
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
        case 925: case 951: case 967: case 968: case 989: case 990: case 995: case 996: case 1012: case 1013:
        case 1025: case 1030: case 1035: case 1037: case 1039: case 1057: case 1061: case 1077: case 1118: case 1127:
        case 1130: case 1131: case 1141: case 1146: case 1161: case 1176: case 1301: case 1357: case 1369: case 1417:
        case 1453: case 1456: case 1460: case 1514: case 1523: case 1532: case 1534:
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
        case 931: case 955: case 963: case 973: case 975: case 977: case 978: case 997: case 998: case 999:
        case 1011: case 1024: case 1048: case 1080: case 1081: case 1084: case 1085: case 1086: case 1136: case 1137:
        case 1143: case 1389: case 1509: case 1515:
            if(this.type==808&&this.userCombatant.stance!=3||this.type==1515&&floor(random(0,10))==0&&this.timer==1&&!this.userCombatant.luckCheck()){
                this.remove=true
            }else if(this.type==1509&&floor(random(0,4))==0&&!this.userCombatant.luckCheck()){
                this.userCombatant.takeDamage(this.effect[1],-1)
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
        case 4: case 762: case 1505:
            if(this.timer==1){
                this.userCombatant.startAnimation(2)
            }
            if(this.timer>10&&this.timer<=20||this.timer>25&&this.timer<=35){
                this.userCombatant.runAnimation(1/20,2)
            }
            if(this.timer==15||this.timer==30){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.timer==30){
                    switch(this.type){
                        case 762:
                            this.userCombatant.enterStance(1)
                        break
                        case 1505:
                            this.userCombatant.statusEffect('Temporary Draw',-this.effect[1])
                        break
                    }
                }
            }else if(this.timer>=45){
                this.remove=true
            }
        break
        case 5: case 121: case 764: case 987: case 1257: case 1445: case 1446:
            if(this.type==121&&this.userCombatant.armed){
                this.remove=true
            }else if(this.targetDistance==1){
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(this.userCombatant.name=='Sakura'&&this.type==121?27:3)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 764:
                            this.userCombatant.enterStance(3)
                        break
                        case 987:
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        break
                        case 1257:
                            if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                                this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[1])
                            }
                        break
                        case 1445:
                            this.targetCombatant.statusEffect('Freeze',this.effect[1])
                        break
                        case 1446:
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                        break
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
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }else if(this.timer==11){
                    this.userCombatant.startAnimation(3)
                }else if(this.timer==20){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 764:
                            this.userCombatant.enterStance(3)
                        break
                        case 987:
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        break
                        case 1257:
                            if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                                this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[1])
                            }
                        break
                        case 1445:
                            this.targetCombatant.statusEffect('Freeze',this.effect[1])
                        break
                        case 1446:
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                        break
                    }
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
        case 838: case 839: case 841: case 842: case 852: case 864: case 873: case 876: case 886: case 893:
        case 896: case 898: case 901: case 914: case 937: case 948: case 1008: case 1019: case 1033: case 1053:
        case 1063: case 1074: case 1079: case 1093: case 1094: case 1108: case 1124: case 1125: case 1138: case 1159:
        case 1165: case 1206: case 1208: case 1215: case 1220: case 1229: case 1260: case 1264: case 1265: case 1269:
        case 1294: case 1302: case 1304: case 1306: case 1323: case 1327: case 1365: case 1366: case 1375: case 1381:
        case 1396: case 1402: case 1407: case 1419: case 1466: case 1467: case 1468: case 1475: case 1476: case 1494:
        case 1497: case 1540: case 1542: case 1544: case 1549: case 1551: case 1553: case 1554: case 1563:
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
        case 929: case 932: case 949: case 970: case 982: case 983: case 1005: case 1016: case 1026: case 1032:
        case 1042: case 1044: case 1045: case 1062: case 1064: case 1065: case 1066: case 1067: case 1078: case 1088:
        case 1095: case 1096: case 1098: case 1109: case 1110: case 1120: case 1121: case 1134: case 1151: case 1152:
        case 1158: case 1177: case 1184: case 1201: case 1214: case 1221: case 1224: case 1225: case 1226: case 1227:
        case 1237: case 1249: case 1250: case 1253: case 1254: case 1282: case 1289: case 1303: case 1326: case 1333:
        case 1361: case 1363: case 1378: case 1379: case 1380: case 1384: case 1392: case 1420: case 1422: case 1459:
        case 1473: case 1491: case 1496: case 1510: case 1527: case 1543:
            if(
                (this.type==818||this.type==819)&&this.userCombatant.stance!=2||
                this.type==1459&&this.relPos[0]!=1
            ){
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
        case -13: case -21: case -33: case 10: case 64: case 72: case 73: case 74: case 164: case 166:
        case 167: case 168: case 169: case 170: case 171: case 180: case 195: case 202: case 224: case 283:
        case 349: case 360: case 369: case 380: case 391: case 442: case 456: case 470: case 608: case 641:
        case 642: case 643: case 659: case 924: case 952: case 953: case 954: case 960: case 961: case 962:
        case 984: case 985: case 1021: case 1041: case 1043: case 1101: case 1102: case 1112: case 1186: case 1203:
        case 1204: case 1205: case 1230: case 1235: case 1236: case 1287: case 1322: case 1325: case 1331: case 1370:
        case 1388: case 1415: case 1495: case 1518: case 1528: case 1533: case 1539:
            if(this.type==1322&&this.energy%2==0){
                this.remove=true
            }else if(variants.nobasicanim){
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
                this.userManager.hand.add(findName('Chain\nShift',types.card),this.level,this.color)
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
        case 16: case 436: case 1001: case 1017:
            if(this.timer==1){
                let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                this.userCombatant.startAnimation(9)
            }else if(this.timer==10){
                switch(this.type){
                    case 436:
                        if(this.targetCombatant.block<=0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[0])
                        }
                    break
                    case 1001:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.goal.anim.direction=this.relativeDirection
                    break
                    case 1017:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.randomIntent()
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
        case 18: case 394: case 395: case 420: case 434: case 698: case 739: case 882: case 981: case 1051:
        case 1447: case 1448:
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
        case 25: case 1246: case 1274: case 1367: case 1524:
            if(this.type==1524&&this.userCombatant.life<this.userCombatant.base.life/2){
                this.remove=true
            }else{
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
                    switch(this.type){
                        case 1246:
                            this.battle.energy.main[this.player]+=this.effect[1]
                        break
                        case 1274:
                            this.targetCombatant.statusEffect('Freeze',this.effect[1])
                            this.targetCombatant.statusEffect('Shock',this.effect[2])
                        break
                        case 1367:
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                            this.targetCombatant.statusEffect('Shock',this.effect[2])
                        break
                    }
                }else if(this.timer>=36){
                    this.remove=true
                }
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
                if(this.targetDistance>1){
                    this.battle.activate(1,this.userCombatant.id)
                }
                this.remove=true
            }
        break
        case 31: case 576: case 652:
            if(this.timer==1){
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
        case 33: case 127: case 130: case 437: case 504: case 1461:
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
                        this.userManager.allGroupClaw(this.effect[1])
                    break
                }
            }else if(this.timer>=15*this.targetDistance+15){
                this.remove=true
                if(this.targetDistance>1){
                    this.battle.activate(1,this.userCombatant.id)
                }
            }
        break
        case 36: case 39: case 47: case 384: case 412: case 413: case 441: case 599: case 1157: case 1188:
        case 1194: case 1195: case 1196: case 1197: case 1198: case 1199: case 1212: case 1297: case 1332: case 1358:
        case 1427: case 1428: case 1463: case 1474:
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
        case 37: case 432: case 1210: case 1343:
            if(this.timer==1){
                this.userCombatant.startAnimation(20)
            }
            if(this.timer<=30){
                this.userCombatant.runAnimation(1/15,20)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,3,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                if(this.type==1343){
                    this.procedure[0]=0
                }else{
                    if(this.userCombatant.armed){
                        this.userCombatant.armed=false
                        this.procedure[0]=1
                    }else{
                        this.procedure[0]=0
                    }
                }
            }else if(this.timer==10*this.targetDistance+15){
                if(this.type==1210){
                    this.userCombatant.takeDamage(this.effect[0],this.user)
                }else{
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.procedure[0]==1){
                    switch(this.type){
                        case 37:
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)].addType(3)
                        break
                        case 432: case 1210:
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)].addType(3)
                        break
                    }
                }
                switch(this.type){
                    case 1343:
                        this.userManager.deck.randomEffect(21)
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
        case 902: case 903: case 905: case 906: case 907: case 935: case 939: case 943: case 944: case 964:
        case 965: case 980: case 1028: case 1046: case 1059: case 1070: case 1071: case 1075: case 1097: case 1111:
        case 1119: case 1139: case 1150: case 1162: case 1163: case 1168: case 1182: case 1185: case 1189: case 1211:
        case 1232: case 1244: case 1247: case 1248: case 1252: case 1255: case 1256: case 1258: case 1259: case 1261:
        case 1262: case 1263: case 1266: case 1273: case 1279: case 1280: case 1285: case 1298: case 1308: case 1310:
        case 1313: case 1316: case 1334: case 1335: case 1336: case 1337: case 1342: case 1344: case 1346: case 1348:
        case 1352: case 1353: case 1359: case 1360: case 1362: case 1376: case 1383: case 1400: case 1405: case 1410:
        case 1411: case 1412: case 1413: case 1417: case 1418: case 1425: case 1426: case 1430: case 1431: case 1434:
        case 1435: case 1437: case 1441: case 1442: case 1443: case 1444: case 1451: case 1452: case 1454: case 1455:
        case 1469: case 1471: case 1472: case 1479: case 1480: case 1481: case 1482: case 1483: case 1484: case 1504:
        case 1507: case 1512: case 1519: case 1530: case 1545: case 1560: case 1562:
            if(
                this.type==1247&&this.energy%2!=0||
                this.type==1259&&this.energy%2!=0||
                this.type==1285&&this.effect[0]>0||
                this.type==1342&&(this.relPos[0]!=3||this.energy!=3)||
                this.type==1362&&this.energy%2!=0){
                this.remove=true
            }else if(variants.nobasicanim){
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
        case 48: case 100: case 1128:
            if(this.targetDistance==1){
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(this.type==100?3:9)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,this.type==48?9:3)
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
                        if(this.type==1128&&floor(random(0,2))==0){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }else{
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        }
                    } 
                    if(this.timer==21){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                        this.procedure[1]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                        this.procedure[1]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
        case 54: case 87: case 486: case 976: case 979: case 988:
            if(this.timer==1){
                this.userCombatant.startAnimation(19)
            }
            this.userCombatant.runAnimation(1/20,19)
            if(this.timer==10){
                switch(this.type){
                    case 87:
                        this.battle.combatantManager.clearTile(this.targetTile)
                    break
                    case 975:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 979:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.userCombatant.id,this.userCombatant.id,this.targetTile.tilePosition)
                    break
                }
                this.userCombatant.moveTile(this.direction,this.distance)
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                this.battle.activate(1,this.userCombatant.id)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 57: case 1492:
            if(this.timer==1){
                this.userCombatant.startAnimation(15)
            }
            if(this.timer<=30){
                this.userCombatant.runAnimation(1/15,15)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,5,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),7.5*this.targetDistance-2]))
            }else if(this.timer==30*this.targetDistance+10){
                if(this.type==1492){
                    let luckCheck=this.userCombatant.luckCheck()
                    if(floor(random(0,4))!=0||luckCheck){
                        this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                    }
                    if(floor(random(0,4))!=0||luckCheck){
                        this.userCombatant.addBlock(this.effect[0])
                    }
                }else{
                    this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                }
            }else if(this.timer>=30*this.targetDistance+15){
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
        case 66: case 68: case 421: case 465: case 466: case 467: case 468: case 1281: case 1288:
        case 1320: case 1339: case 1432: case 1548: case 1567: case 1568:
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
        case 77: case 1538:
            if(this.timer==1){
                this.userCombatant.startAnimation(24)
            }
            this.userCombatant.runAnimation(1/12,24)
            if(this.timer==6){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.userCombatant.heal(this.effect[1])
                if(this.type==1538&&floor(random(0,4))==0&&!this.userCombatant.luckCheck()){
                    this.userCombatant.statusEffect('Poison',this.effect[2])
                }
            }else if(this.timer>=12){
                this.remove=true
            }
        break
        case 80: case 590: case 594: case 609: case 632: case 633: case 634: case 915: case 1002: case 1009:
        case 1034: case 1036: case 1047: case 1052: case 1126: case 1149: case 1171: case 1319:
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
                    this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
        case 845: case 888: case 889: case 927: case 936: case 941: case 969: case 1020: case 1099: case 1107:
        case 1132: case 1140: case 1142: case 1190: case 1207: case 1218: case 1223: case 1245: case 1276: case 1290:
        case 1299: case 1300: case 1317: case 1318: case 1329: case 1338: case 1340: case 1341: case 1349: case 1364:
        case 1368: case 1371: case 1382: case 1385: case 1414: case 1423: case 1449: case 1450: case 1499: case 1500:
        case 1511: case 1516: case 1541: case 1552:
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
        case 138: case 139: case 175: case 400: case 453: case 516: case 1436:
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                this.targetCombatant.takeDamage(this.effect[0],this.user,2)
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
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
        case 211: case 501: case 616: case 617: case 618: case 1172: case 1173:
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
                            this.userManager.allGroupClaw(this.effect[1])
                        break
                        case 616:
                            this.userManager.draw(this.effect[1])
                        break
                        case 617:
                            this.userManager.draw(this.effect[1])
                            this.targetCombatant.goal.anim.direction=this.relativeDirection
                            this.battle.turnManager.loadEnemyAttack(this.targetCombatant.id)
                        break
                        case 618:
                            this.userManager.draw(this.effect[1])
                            this.targetCombatant.statusEffect('Frail',this.effect[2])
                        break
                        case 1172:
                            this.battle.dropDrawShuffle(this.player,findName('Heavy\nMetal',types.card),this.level,0)
                        break
                        case 1173:
                            this.userCombatant.metal+=this.effect[1]
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
                this.userManager.draw(this.effect[1])
                this.userManager.hand.discard(this.effect[2])
            }else if(this.timer>=10*this.targetDistance+25){
                this.remove=true
            }
        break
        case 222:
            if(this.timer==1){
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    this.procedure[2]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    this.procedure[2]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    this.procedure.push(this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1)
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
            if(variants.nobasicanim){
                if(this.targetDistance>1){
                    this.userCombatant.moveTile(this.direction,this.distance*(this.targetDistance-1)/this.targetDistacne)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance*(this.targetDistance-1)/this.targetDistacne)
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.targetDistance>1){
                    this.battle.activate(1,this.userCombatant.id)
                }
                this.remove=true
            }else{
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
                }else if(this.timer==15*this.targetDistance-10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=15*this.targetDistance-5){
                    if(this.targetDistance>1){
                        this.battle.activate(1,this.userCombatant.id)
                    }
                    this.remove=true
                }
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
        case 480: case 481: case 490: case 491: case 492: case 493: case 494: case 495: case 498: case 505:
        case 506: case 520: case 526: case 531: case 532: case 534: case 535: case 536: case 543: case 544:
        case 545: case 549: case 550: case 551: case 552: case 553: case 554: case 555: case 556: case 560:
        case 561: case 562: case 563: case 564: case 565: case 566: case 567: case 568: case 577: case 578:
        case 579: case 583: case 584: case 600: case 671: case 672: case 673: case 767: case 785: case 847:
        case 851: case 854: case 856: case 879: case 894: case 956: case 971: case 1000: case 1056: case 1060:
        case 1103: case 1105: case 1116: case 1117: case 1122: case 1272: case 1278: case 1347: case 1350: case 1351:
        case 1391: case 1403: case 1404: case 1408: case 1409: case 1517: case 1520: case 1546: case 1547: case 1555:
        case 1566:
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
                this.targetCombatant.takeDamage(this.userManager.deck.cards.length,this.user)
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
                    this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    this.procedure[a]=this.battle.combatantManager.combatants[a].team==this.userCombatant.team?3:this.battle.combatantManager.combatants[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                        this.procedure[a+la]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
        case 483: case 1283:
            if(this.timer==1){
                this.userCombatant.startAnimation(36)
            }
            this.userCombatant.runAnimation(1/30,36)
            if(this.timer==15){
                if(this.type==483){
                    this.userCombatant.life=0
                }
                this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
        case 591: case 593: case 1072:
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
        case 611: case 1069:
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
                    if(this.type==1069){
                        this.userCombatant.ammo+=this.effect[1]
                    }
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
                if(this.timer>=15*this.targetDistance){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
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
                    this.userManager.draw(this.effect[0])
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
                        this.userManager.draw(this.effect[0])
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
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    this.userManager.hand.exhaust(this.effect[2])
                }
            }else if(this.timer>=min(100,this.effect[1]*10)){
                this.remove=true
            }
        break
        case 938:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
                this.procedure[0]=this.userCombatant.luckCheck()?1:0
            }
            if(this.timer<=15||this.timer>10+this.effect[2]*5){
                this.userCombatant.runAnimation(1/30,17)
            }
            if(this.timer%5==0&&this.timer>=15&&this.timer<=10+this.effect[2]*5){
                this.targetCombatant.takeDamage(this.procedure[0]==1?this.effect[1]:floor(random(this.effect[0],this.effect[1]+1)),this.user)
            }else if(this.timer>=25+this.effect[2]*5){
                this.remove=true
            }
        break
        case 957:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/10,17)
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
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/10,17)
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
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/10,17)
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
        case 974:
            if(this.targetDistance==1){
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
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
                    }
                }else{
                    if(this.timer>10&&this.timer<=20){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer==20){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
                if(this.procedure[0]==1||this.procedure[0]==2){
                    if(this.timer==27){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                        this.procedure[1]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    if(this.procedure[1]==2){
                        if(this.timer>26&&this.timer<=34){
                            this.targetCombatant.moveTile(this.direction,this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                        }else if(this.timer>34&&this.timer<=42){
                            this.targetCombatant.moveTile(this.direction,-this.distance/40)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                        }
                        if(this.timer>=42){
                            this.remove=true
                        }
                    }else if(this.procedure[1]==1){
                        if(this.timer>26&&this.timer<=34){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }else if(this.timer>34&&this.timer<=42){
                            this.targetCombatant.moveTile(this.direction,-this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                        }
                        if(this.timer==34){
                            this.targetCombatant.takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }else if(this.timer>=42){
                            this.remove=true
                        }
                    }else{
                        if(this.timer>26){
                            this.targetCombatant.moveTile(this.direction,this.distance/10)
                            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                        }
                        if(this.timer>=36){
                            this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                            this.battle.activate(1,this.targetCombatant.id)
                            this.remove=true
                        }
                    }
                }
            }
        break
        case 986:
            if(this.timer==1){
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.x/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.y/this.targetDistance[a])
                    let index2=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*(1+2/this.targetDistance[a])-this.userCombatant.tilePosition.x*2/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+2/this.targetDistance[a])-this.userCombatant.tilePosition.y*2/this.targetDistance[a])
                    this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&(this.battle.tileManager.tiles[index].occupied==0||a==0&&this.targetCombatant.length>1&&this.battle.tileManager.tiles[index2].occupied==0)?0:1
                }
                this.userCombatant.startAnimation(3)
            }
            if(this.timer<=20){
                this.userCombatant.runAnimation(1/10,3)
            }
            for(let a=0,la=this.targetCombatant.length;a<la;a++){
                if(this.procedure[a]==2){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40/this.targetDistance[a])
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40/this.targetDistance[a])
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40/this.targetDistance[a])
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40/this.targetDistance[a])
                    }
                }else if(this.procedure[a]==1){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10/this.targetDistance[a])
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10/this.targetDistance[a])
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10/this.targetDistance[a])
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10/this.targetDistance[a])
                    }
                    if(this.timer==18){
                        this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.x/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.y/this.targetDistance[a])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }
                }else if(this.procedure[a]==0){
                    if(this.timer>10){
                        this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10/this.targetDistance[a])
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10/this.targetDistance[a])
                    }
                    if(this.timer>=20){
                        this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.x/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.y/this.targetDistance[a])
                        this.battle.activate(1,this.targetCombatant[a].id)
                        this.procedure[a]=-1
                    }
                }
            }
            if(this.timer>=26){
                this.remove=true
            }
        break
        case 1023:
            if(floor(random(0,2))==0&&this.timer==1){
                this.remove=true
                this.targetCombatant.statusEffect('Confusion',this.effect[0])
            }else if(this.targetDistance==1){
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }
                if(this.procedure[0]==2){
                    if(this.timer<=8){
                        this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>8&&this.timer<=16){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=16){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer<=8){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>8&&this.timer<=16){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==8){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=16){
                        this.remove=true
                    }
                }else{
                    this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    if(this.timer>=10){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            }
        break
        case 1054:
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
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),1.25*this.targetDistance-1]))
                    this.battle.particleManager.particles[this.battle.particleManager.particles.length-1].speed*=2
                }else if(this.timer==round(2.5*this.targetDistance+15)){
                    this.selfCall(9)
                }else if(this.timer>=max(30,2.5*this.targetDistance+25)){
                    this.remove=true
                }
            }
        break
        case 1055:
            if(variants.nobasicanim){
                for(let a=0,la=3;a<la;a++){
                    this.selfCall(9)
                }
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(25)
                }
                if(this.timer<=10||this.timer>25&&this.timer<=35){
                    this.userCombatant.runAnimation(1/10,25)
                }
                if(this.timer==15||this.timer==20||this.timer==25){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance-1]))
                }
                if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+20||this.timer==5*this.targetDistance+25){
                    this.selfCall(9)
                }else if(this.timer>=max(35,5*this.targetDistance+30)){
                    this.remove=true
                }
            }
        break
        case 1082:
            if(this.procedure[0]==0){
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.directionT,this.distanceT/(15*this.targetDistanceT))
                this.userCombatant.moveRelativeTile(this.relativeDirectionT,this.relativeDistanceT/(15*this.targetDistanceT))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer==10*this.targetDistanceT){
                    this.selfCall(2)
                }
                if(this.timer>=15*this.targetDistanceT){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.timer=0
                    this.procedure[0]=1
                }
            }else if(this.procedure[0]==1){
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
                        this.targetCombatant[0].takeDamage(this.effect[1],this.user,1)
                        if(this.type==1069){
                            this.userCombatant.ammo+=this.effect[1]
                        }
                    }else if(this.timer>=max(30,5*this.targetDistance[0]+25)){
                        this.targetCombatant.splice(0,1)
                        this.targetDistance.splice(0,1)
                        this.timer=0
                    }
                }else{
                    this.remove=true
                }
            }
        break
        case 1104:
            if(this.timer==1){
                this.procedure[0]=0
                this.userCombatant.startAnimation(0)
            }
            if(this.timer==1+10*this.procedure[0]){
                this.target=[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1]),
                this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x+transformDirection(0,this.direction)[0],this.userCombatant.tilePosition.y+transformDirection(0,this.direction)[1])]
                if(this.target[0]<0){
                    if(this.procedure[0]>0){
                        this.battle.activateTile(1,this.userCombatant.id)
                    }
                    this.battle.turnManager.unMoveTurn(this.user)
                    this.remove=true
                }else{
                    this.targetTile=this.battle.tileManager.tiles[this.target[0]]
                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                    if(this.target[1]<0){
                        this.targetCombatant=-1
                    }else{
                        this.targetCombatant=this.battle.combatantManager.combatants[this.target[1]]
                        this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                        this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                        this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                        this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                    }
                }
            }
            if(!this.remove){
                this.userCombatant.runAnimation(1/10,0)
                this.userCombatant.moveTile(this.direction,this.distance/(10*distTargetCombatant(0,this,this.targetTile)))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(10*distTargetCombatant(0,this,this.targetTile)))
                if(this.targetCombatant!=-1){
                    this.targetCombatant.moveTile(this.direction,-this.distance/(10*distTargetCombatant(0,this,this.targetTile)))
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(10*distTargetCombatant(0,this,this.targetTile)))
                }
            }
            if(this.timer>=10+10*this.procedure[0]){
                if(this.targetCombatant!=-1){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.targetCombatant.moveTilePosition(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                    this.battle.activateTile(1,this.targetCombatant.id)
                }
                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                if(this.procedure[0]>=2&&this.type==175){
                    this.remove=true
                }
                this.procedure[0]++
            }
        break
        case 1106:
            if(this.timer<=20){
                if(this.timer==1){
                    this.userCombatant.startAnimation(19)
                }
                this.userCombatant.runAnimation(1/20,19)
                if(this.timer==10){
                    this.userCombatant.moveTile(this.direction2,this.distance2)
                    this.userCombatant.moveRelativeTile(this.relativeDirection2,this.relativeDistance2)
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                }
            }else{
                if(this.timer==21){
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(14)
                }
                if(this.timer<=35){
                    this.userCombatant.runAnimation(1/15,14)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.procedure[a]==2){
                        if(this.timer>30&&this.timer<=38){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                        }else if(this.timer>38&&this.timer<=46){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                        }
                    }else if(this.procedure[a]==1){
                        if(this.timer>30&&this.timer<=38){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }else if(this.timer>38&&this.timer<=46){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10)
                        }
                        if(this.timer==38){
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[a]==0){
                        if(this.timer>30){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }
                        if(this.timer>=40){
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant[a].id)
                            this.procedure[a]=-1
                        }
                    }
                }
                if(this.timer>=46){
                    this.remove=true
                }
            }
        break
        case 1148:
            if(this.targetDistance==1){
                if(variants.nobasicanim){
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
                }
            }else{
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
            }
        break
        case 1191:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/10,17)
            if(this.timer==5){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }else if(this.timer>=10){
                this.remove=true
            }
        break
        case 1277:
            if(variants.nobasicanim){
                for(let a=0,la=10;a<la;a++){
                    this.selfCall(13)
                }
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(10)
                }
                this.userCombatant.runAnimation(1/10,10)
                if(this.timer%20==10){
                    this.selfCall(13)
                }else if(this.timer>=200){
                    this.remove=true
                }
            }
        break
        case 1293:
            if(this.timer==1){
                for(let a=0,la=this.effect[0];a<la;a++){
                    let index=floor(random(0,types.card.length))
                    this.userManager.hand.add(index,0,types.card[index].list<0?0:types.card[index].list>=types.color.card.list?0:types.card[index].list)
                }
            }
            this.userCombatant.offset.position.x=random(-5,5)
            this.userCombatant.offset.position.y=random(-5,5)
            if(this.timer==10){
                this.remove=true
                this.userCombatant.offset.position.x=0
                this.userCombatant.offset.position.y=0
            }
        break
        case 1372:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
            }else if(this.timer==15*this.targetDistance-14){
                this.userCombatant.startAnimation(2)
            }
            if(this.timer>=15*this.targetDistance-14&&this.timer<=15*this.targetDistance+15){
                this.userCombatant.runAnimation(1/30,2)
            }else if(this.timer<15*this.targetDistance-15){
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
            }
            if(this.timer==15*this.targetDistance-15){
                let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x-offset[0]*2,this.targetCombatant.tilePosition.y-offset[1]*2)
                this.battle.tileManager.activate()
                this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                if(this.procedure[0]==0){
                    this.userCombatant.startAnimation(0)
                }
            }else if(this.timer==15*this.targetDistance){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }
            if(this.procedure[0]==1&&this.timer>=15*this.targetDistance+15){
                if(this.targetDistance>1){
                    this.battle.activate(1,this.userCombatant.id)
                }
                this.remove=true
            }else if(this.procedure[0]==0){
                if(this.timer>15*this.targetDistance+15){
                    this.userCombatant.runAnimation(1/10,0)
                    this.userCombatant.moveTile(this.direction,-this.distance/this.targetDistance/10)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/this.targetDistance/10)
                }
                if(this.timer>=15*this.targetDistance+25){
                    this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.remove=true
                }
            }
        break
        case 1373:
            if(this.timer==1){
                if(this.energy!=1){
                    this.remove=true
                }
                this.userCombatant.startAnimation(14)
            }
            if(this.timer<=15){
                this.userCombatant.runAnimation(1/15,14)
            }
            if(this.time==10){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.targetCombatant.statusEffect('Weak',this.effect[1])
            }
            if(this.timer>=26){
                this.remove=true
            }
        break
        case 1386:
            if(this.timer==1){
                let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                this.procedure[1]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                this.userCombatant.startAnimation(this.userCombatant.name=='Sakura'&&this.type==121?27:3)
            }else if(this.timer==10){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }
            if(this.timer<=20){
                this.userCombatant.runAnimation(1/10,this.userCombatant.name=='Sakura'&&this.type==121?27:3)
            }
            if(this.procedure[2]!=1){
                if(this.procedure[0]==2){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer>=26){
                        this.procedure[2]=1
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
                        this.procedure[2]=1
                    }
                }else{
                    if(this.timer>10){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer>=20){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.procedure[2]=1
                    }
                }
            }
            if(this.procedure[1]==1&&this.timer>=10){
                this.procedure[3]=1
            }else if(this.procedure[1]==0&&this.procedure[3]!=1){
                if(this.timer>10){
                    this.userCombatant.runAnimation(1/10,0)
                    this.userCombatant.moveTile(this.direction,-this.distance/10)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                }
                if(this.timer>=20){
                    this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.procedure[3]=1
                }
            }
            if(this.procedure[2]==1&&this.procedure[3]==1){
                this.remove=true
            }
        break
        case 1387:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
            }
            if(this.timer<=15*this.targetDistance){
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
            }
            if(this.timer==10*this.targetDistance){
                this.selfCall(2)
            }
            if(this.timer==15*this.targetDistance){
                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                if(this.type==205){
                    this.battle.activateTile(1,this.userCombatant.id)
                }else{
                    this.battle.activate(1,this.userCombatant.id)
                }
                let offset=transformDirection(0,this.relativeDirection)
                let index=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x+offset[0],this.targetTile.tilePosition.y+offset[1])
                if(index>=0){
                    this.targetCombatant=this.battle.combatantManager.combatants[index]
                    index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }else{
                    this.remove=true
                }
            }
            if(this.timer>=15*this.targetDistance&&!this.remove){
                if(this.procedure[0]==2){
                    if(this.timer>15*this.targetDistance+10&&this.timer<=15*this.targetDistance+8){
                        this.targetCombatant.moveTile(this.direction,this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.timer>15*this.targetDistance+18&&this.timer<=15*this.targetDistance+16){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.timer>=15*this.targetDistance+16){
                        this.remove=true
                    }
                }else if(this.procedure[0]==1){
                    if(this.timer>15*this.targetDistance&&this.timer<=15*this.targetDistance+8){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.timer>15*this.targetDistance+8&&this.timer<=15*this.targetDistance+16){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.timer==15*this.targetDistance+8){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+16){
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance){
                        this.targetCombatant.moveTile(this.direction,this.distance/10)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.timer>=15*this.targetDistance+10){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            }
        break
        case 1406:
            if(this.timer==1){
                this.procedure[0]=this.userCombatant.luckCheck()?0:floor(random(0,2))
            }
            if(this.procedure[0]==0){
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
            }else if(this.procedure[0]==1){
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=30){
                    this.userCombatant.runAnimation(1/15,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,5,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),7.5*this.targetDistance-2]))
                }else if(this.timer==30*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[2],this.user,1)
                    this.userCombatant.ammo++
                }else if(this.timer>=30*this.targetDistance+25){
                    this.remove=true
                }
            }
        break
        case 1529:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
            }
            this.userCombatant.runAnimation(1/15,0)
            if(this.timer>=15){
                this.userCombatant.takeDamage(this.effect[0]*this.energy,-1)
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
                    this.userCombatant.status.main[findList('Double Damage',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('Single Damage')>0&&this.clearAttack[1]){
                    this.userCombatant.status.main[findList('Single Damage',this.userCombatant.status.name)]=0
                }
                if(this.userCombatant.getStatus('Triple Damage')>0&&this.clearAttack[2]){
                    this.userCombatant.status.main[findList('Triple Damage',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('1.5x')>0&&this.clearAttack[3]){
                    this.userCombatant.status.main[findList('1.5x',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('Double Damage-1')>0&&this.clearAttack[4]){
                    this.userCombatant.status.main[findList('Double Damage-1',this.userCombatant.status.name)]--
                }
            break
        }
    }
}