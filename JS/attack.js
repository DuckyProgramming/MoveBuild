class attack{
    constructor(type,battle,player,effect,attackClass,user,level,color,energy,target,targetDistance,targetClass,combo,replayData,amplify,relPos,limit,id){
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
        this.relPos=relPos
        this.limit=limit
        this.id=id

        this.procedure=[]

        this.userCombatant=this.battle.combatantManager.combatants[this.user]
        this.userManager=this.battle.cardManagers[this.player]
        this.lastPlayed=copyArrayStack(this.userManager.hand.lastPlayed)
        
        this.remove=false
        
        this.base()

        this.timer=0
        this.replayed=false
        this.directive='attack'
    }
    base(){
        this.position={x:this.userCombatant.position.x,y:this.userCombatant.position.y}
        this.relativePosition={x:this.userCombatant.relativePosition.x,y:this.userCombatant.relativePosition.y}
        this.tilePosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}

        switch(this.attackClass){
            case 1:
                this.clearAttack=[false,false,false,false,false]
                if(this.userCombatant.getStatus('Double Damage')>0){
                    this.clearAttack[0]=true
                }
                if(this.userCombatant.getStatus('Single Damage')>0){
                    this.clearAttack[1]=true
                }
                if(this.userCombatant.getStatus('Triple Damage')>0){
                    this.clearAttack[2]=true
                }
                if(this.userCombatant.getStatus('1.5x Damage')>0){
                    this.clearAttack[3]=true
                }
                if(this.userCombatant.getStatus('Double Damage-1')>0){
                    this.clearAttack[4]=true
                }
            break
        }
        if(this.battle.modded(131)){
            if(this.relPos[0]==0&&this.userManager.hand.cards.length>=2){
                this.userManager.hand.cards[this.userManager.hand.cards.length-1].deSize=true
            }else if(this.relPos[0]==this.relPos[1]&&this.userManager.hand.cards.length>=2){
                this.userManager.hand.cards[0].deSize=true
            }
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
            case 537: case 538: case 539: case 540: case 543: case 545: case 548: case 550: case 556: case 557:
            case 558: case 559: case 564: case 565: case 566: case 567: case 568: case 569: case 579: case 580:
            case 581: case 582: case 587: case 588: case 589: case 590: case 591: case 592: case 593: case 594:
            case 596: case 597: case 598: case 599: case 600: case 601: case 604: case 606: case 609: case 610:
            case 616: case 617: case 618: case 632: case 633: case 634: case 638: case 639: case 661: case 662:
            case 667: case 669: case 672: case 673: case 676: case 677: case 678: case 679: case 683: case 689:
            case 691: case 692: case 697: case 702: case 703: case 710: case 714: case 715: case 718: case 719:
            case 720: case 721: case 723: case 725: case 729: case 730: case 731: case 732: case 733: case 734:
            case 736: case 746: case 757: case 758: case 762: case 764: case 766: case 771: case 775: case 779:
            case 780: case 784: case 785: case 786: case 787: case 793: case 795: case 796: case 798: case 801:
            case 806: case 824: case 825: case 826: case 827: case 828: case 829: case 830: case 833: case 834:
            case 837: case 840: case 843: case 846: case 848: case 849: case 850: case 862: case 863: case 865:
            case 866: case 872: case 874: case 877: case 878: case 881: case 883: case 884: case 888: case 895:
            case 897: case 899: case 900: case 902: case 903: case 905: case 906: case 907: case 908: case 915:
            case 916: case 917: case 918: case 919: case 920: case 924: case 926: case 930: case 934: case 935:
            case 938: case 939: case 940: case 942: case 943: case 944: case 945: case 946: case 947: case 950:
            case 956: case 957: case 958: case 959: case 964: case 965: case 966: case 972: case 974: case 980:
            case 987: case 991: case 992: case 993: case 994: case 1001: case 1002: case 1003: case 1004: case 1006:
            case 1007: case 1009: case 1010: case 1014: case 1015: case 1017: case 1018: case 1022: case 1023: case 1027:
            case 1028: case 1029: case 1031: case 1034: case 1036: case 1038: case 1040: case 1046: case 1047: case 1049:
            case 1050: case 1052: case 1054: case 1055: case 1058: case 1059: case 1064: case 1066: case 1067: case 1068:
            case 1070: case 1072: case 1073: case 1075: case 1083: case 1087: case 1089: case 1090: case 1091: case 1092:
            case 1097: case 1100: case 1111: case 1123: case 1126: case 1128: case 1133: case 1135: case 1139: case 1144:
            case 1145: case 1147: case 1148: case 1149: case 1150: case 1153: case 1154: case 1155: case 1156: case 1160:
            case 1162: case 1163: case 1164: case 1166: case 1167: case 1168: case 1171: case 1172: case 1173: case 1174:
            case 1175: case 1178: case 1179: case 1180: case 1181: case 1182: case 1183: case 1187: case 1188: case 1189:
            case 1191: case 1194: case 1195: case 1196: case 1202: case 1209: case 1210: case 1211: case 1212: case 1213:
            case 1217: case 1219: case 1222: case 1228: case 1231: case 1233: case 1234: case 1244: case 1246: case 1247:
            case 1248: case 1251: case 1252: case 1255: case 1256: case 1257: case 1258: case 1259: case 1261: case 1262:
            case 1263: case 1266: case 1267: case 1268: case 1270: case 1271: case 1273: case 1274: case 1279: case 1280:
            case 1281: case 1284: case 1285: case 1286: case 1288: case 1291: case 1295: case 1296: case 1297: case 1298:
            case 1305: case 1307: case 1308: case 1309: case 1310: case 1311: case 1312: case 1313: case 1314: case 1315:
            case 1316: case 1319: case 1320: case 1321: case 1324: case 1330: case 1332: case 1334: case 1335: case 1336:
            case 1337: case 1338: case 1339: case 1342: case 1343: case 1344: case 1345: case 1348: case 1349: case 1350:
            case 1353: case 1354: case 1355: case 1356: case 1358: case 1359: case 1360: case 1362: case 1367: case 1372:
            case 1373: case 1374: case 1376: case 1377: case 1386: case 1390: case 1391: case 1395: case 1397: case 1399:
            case 1400: case 1401: case 1403: case 1405: case 1406: case 1410: case 1411: case 1412: case 1413: case 1416:
            case 1418: case 1421: case 1424: case 1425: case 1426: case 1427: case 1428: case 1429: case 1430: case 1431:
            case 1432: case 1434: case 1435: case 1437: case 1438: case 1439: case 1440: case 1441: case 1442: case 1443:
            case 1444: case 1445: case 1446: case 1449: case 1451: case 1452: case 1454: case 1455: case 1457: case 1461:
            case 1462: case 1463: case 1465: case 1470: case 1471: case 1472: case 1474: case 1478: case 1479: case 1480:
            case 1481: case 1482: case 1483: case 1484: case 1485: case 1490: case 1492: case 1493:
                //mark 1
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]

                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
            break
            case 3: case 14: case 20: case 51: case 52: case 54: case 56: case 58: case 59: case 60:
            case 82: case 87: case 91: case 153: case 177: case 182: case 192: case 205: case 248: case 256:
            case 330: case 331: case 332: case 335: case 341: case 374: case 375: case 383: case 397: case 421:
            case 448: case 458: case 464: case 472: case 474: case 479: case 482: case 484: case 485: case 486:
            case 503: case 570: case 571: case 573: case 574: case 575: case 585: case 619: case 620: case 621:
            case 622: case 623: case 624: case 626: case 627: case 628: case 629: case 630: case 631: case 660:
            case 663: case 664: case 666: case 685: case 686: case 687: case 688: case 690: case 693: case 694:
            case 695: case 696: case 700: case 701: case 702: case 703: case 704: case 705: case 706: case 717:
            case 750: case 802: case 803: case 804: case 805: case 808: case 812: case 816: case 817: case 823:
            case 923: case 955: case 963: case 973: case 975: case 976: case 977: case 978: case 979: case 997:
            case 998: case 999: case 1024: case 1048: case 1071: case 1080: case 1081: case 1084: case 1085: case 1086:
            case 1104: case 1119: case 1136: case 1137: case 1143: case 1185: case 1232: case 1346: case 1352: case 1383:
            case 1387: case 1389: case 1469:
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
            case 471: case 576: case 856: case 971:
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
            case 138: case 139: case 175: case 400: case 453: case 516: case 1436:
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
            case 328: case 572: case 707: case 708: case 709: case 813: case 814: case 815:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.targetVariant=distTargetCombatant(0,this,this.targetTile)>0

                this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
            break
            case 358: case 986:
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
                this.targetDistance.push(distTargetCombatant(0,this,targetCombatant))
                let offset2=transformDirection(0,this.relativeDirection[0])
                let index2=this.battle.combatantManager.getCombatantIndex(targetCombatant.tilePosition.x+offset2[0],targetCombatant.tilePosition.y+offset2[1])
                if(index2>=0){
                    targetCombatant=this.battle.combatantManager.combatants[index2]
                    this.targetCombatant.push(targetCombatant)
                    this.direction.push(atan2(targetCombatant.position.x-this.position.x,targetCombatant.position.y-this.position.y))
                    this.distance.push(sqrt((targetCombatant.position.x-this.position.x)**2+(targetCombatant.position.y-this.position.y)**2))
                    this.relativeDirection.push(atan2(targetCombatant.relativePosition.x-this.relativePosition.x,targetCombatant.relativePosition.y-this.relativePosition.y))
                    this.relativeDistance.push(sqrt((targetCombatant.relativePosition.x-this.relativePosition.x)**2+(targetCombatant.relativePosition.y-this.relativePosition.y)**2))
                    this.targetDistance.push(distTargetCombatant(0,this,targetCombatant))
                }
            break
            case 611: case 1069:
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

                this.procedure[0]=this.userManager.discard.cards.length==0
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
                    if(index>=0&&this.battle.tileManager.tiles[index].occupied<=0){
                        this.targetTile=this.battle.tileManager.tiles[index]
                        this.targetDistance++
                        this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                        this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)
                        this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                        this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                    }
                }
            break
            case 988:
                let list=[]
                for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                    if(this.battle.tileManager.tiles[a].occupied==0){
                        list.push(a)
                    }
                }
                if(list.length>0){
                    this.targetTile=this.battle.tileManager.tiles[list[floor(random(0,list.length))]]

                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                }else{
                    this.remove=true
                }
            break
            case 1011:
                let tiles=this.battle.tileManager.getArea(this.userCombatant.tilePosition,1)
                if(tiles.length>0){
                    this.targetTile=tiles[floor(random(0,tiles.length))]

                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                    this.targetDistance=distTargetCombatant(0,this,this.targetTile)
                }
            break
            case 1082:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.directionT=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distanceT=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirectionT=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistanceT=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                this.targetDistanceT=this.targetDistance
                
                this.targetCombatant=this.battle.combatantManager.getAreaCapped(this.userCombatant.team,this.userCombatant.tilePosition,6)
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
                this.procedure[0]=0
            break
            case 1106:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.direction2=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance2=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirection2=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance2=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)

                this.targetCombatant=this.battle.combatantManager.getArea(this.userCombatant.team,this.targetTile.tilePosition,2)
                this.direction=[]
                this.distance=[]
                this.relativeDirection=[]
                this.relativeDistance=[]
                this.targetDistance=[]

                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    this.direction.push(atan2(this.targetCombatant[a].position.x-this.targetTile.position.x,this.targetCombatant[a].position.y-this.targetTile.position.y))
                    this.distance.push(sqrt((this.targetCombatant[a].position.x-this.targetTile.position.x)**2+(this.targetCombatant[a].position.y-this.targetTile.position.y)**2))

                    this.relativeDirection.push(atan2(this.targetCombatant[a].relativePosition.x-this.targetTile.relativePosition.x,this.targetCombatant[a].relativePosition.y-this.targetTile.relativePosition.y))
                    this.relativeDistance.push(sqrt((this.targetCombatant[a].relativePosition.x-this.targetTile.relativePosition.x)**2+(this.targetCombatant[a].relativePosition.y-this.targetTile.relativePosition.y)**2))

                    this.targetDistance.push(distTargetCombatant(0,this.targetCombatant[a],this.targetTile))
                }
            break
            case 1464:
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                if(this.userManager.hand.cards.length!=6){
                    this.remove=true
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
                switch(this.type){
                    case 12: case 719: case 1213:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                    break
                    case 35:
                        if(this.targetCombatant.life==this.targetCombatant.base.life){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
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
                        if(this.userManager.hand.allClass(1)){
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
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.discard.cards.length,this.user)
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
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].class==2){
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
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].class==1){
                                this.number++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.number,this.user)
                    break
                    case 296:
                        if(this.userManager.reserve.cards.length==0){
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
                        this.targetCombatant.takeDamage(floor(this.userCombatant.life/this.effect[1])*this.effect[0],this.user)
                    break
                    case 378:
                        this.targetCombatant.takeDamage(this.effect[0]*round(this.userCombatant.life)/10,this.user)
                        this.userCombatant.life-=round(this.userCombatant.life)/10
                    break
                    case 379:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.exhaust.fatigueNumber(),this.user)
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
                        this.targetCombatant.takeDamage(this.effect[0]*total2,this.user,1)
                    break
                    case 734:
                        this.number=0
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].life>0){
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
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(!this.userManager.hand.cards[a].spec.includes(12)&&(this.userManager.hand.cards[a].class==5||this.userManager.hand.cards[a].class==6)){
                                works=true
                            }
                        }
                        if(works){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 796:
                        let works2=true
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(!this.userManager.hand.cards[a].spec.includes(12)&&(this.userManager.hand.cards[a].class==5||this.userManager.hand.cards[a].class==6)){
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
                        let roll=this.userCombatant.luckCheck()?2:floor(random(1,3))
                        this.targetCombatant.takeDamage(this.effect[0]*roll,this.user)
                        if(roll==1){
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 897: case 1007: case 1153:
                        let total=0
                        let luckCheck=this.userCombatant.luckCheck()
                        for(let a=0,la=this.effect[0];a<la;a++){
                            let roll=luckCheck?6:floor(random(1,7))
                            this.battle.particleManager.createAuxNumber(this.userCombatant.position.x,this.userCombatant.position.y,roll)
                            total+=roll
                        }
                        if(total<this.effect[0]*3.5){
                            this.userCombatant.lowRoll()
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
                        this.userManager.draw(this.effect[1])
                    break
                    case 930:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.userCombatant.addBlock(this.effect[1])
                        }else{
                            if(floor(random(0,2))==0){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                            }else{
                                this.userCombatant.addBlock(this.effect[1])
                            }
                        }
                    break
                    case 942:
                        let prelife3=this.targetCombatant.life
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<prelife3){
                            this.userCombatant.statusEffect('Armor',floor((prelife3-this.targetCombatant.life)/2))
                        }
                    break
                    case 972:
                        let prelife4=this.targetCombatant.life
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<prelife4&&this.amplify){
                            this.userCombatant.heal(floor((prelife4-this.targetCombatant.life)/2))
                        }
                    break
                    case 1004:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.relPos[0]==0?2:1),this.user)
                    break
                    case 1010:
                        if(this.userCombatant.luckCheck()){
                            this.battle.energy.main[this.player]+=this.effect[1]
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else{
                            if(floor(random(0,2))==0){
                                this.userCombatant.lowRoll()
                                this.battle.energy.main[this.player]+=this.effect[1]
                            }else{
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                            }
                        }
                    break
                    case 1027:
                        let total3=0
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            total3+=this.userManager.hand.cards[a].cost
                        }
                        this.targetCombatant.takeDamage(total3,this.user)
                    break
                    case 1049:
                        this.targetCombatant.statusEffect('Bruise',this.effect[0])
                    break
                    case 1058:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userManager.deck.classNumber([6]),this.user)
                    break
                    case 1083:
                        let roll2=this.userCombatant.luckCheck()?this.effect[0]+1:floor(random(1,this.effect[0]+1))
                        this.battle.particleManager.createAuxNumber(this.userCombatant.position.x,this.userCombatant.position.y,roll2)
                        if(roll2<this.effect[0]/2+1/2){
                            this.userCombatant.lowRoll()
                        }
                        this.targetCombatant.takeDamage(roll2,this.user)
                        this.battle.addCurrency(roll2,this.player)
                    break
                    case 1089: case 1090: case 1091: case 1092: case 1296:
                        this.targetCombatant.takeDamage(this.targetCombatant.life<=this.effect[0]?this.effect[1]:this.effect[0],this.user)
                    break
                    case 1135:
                        this.targetCombatant.takeDamage(this.limit%4==3?this.effect[0]:0,this.user)
                    break
                    case 1160:
                        if(this.targetCombatant.id<this.battle.players){
                            this.battle.addCurrency(this.effect[0],this.player)
                            this.battle.loseCurrency(this.effect[1],this.targetCombatant.id)
                        }else if(this.targetCombatant.block>0){
                            this.battle.addCurrency(this.effect[0],this.player)
                            this.targetCombatant.block=0
                        }
                    break
                    case 1295:
                        if(this.energy%2==0&&this.energy>0){
                            this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                            this.battle.dropDrawShuffleEffect(this.player,findName('Snip',types.card),0,0,0,round(this.energy/2))
                        }
                    break
                    case 1307:
                        this.targetCombatant.takeDamage(this.effect[1],this.user)
                    break
                    case 1311:
                        let total4=this.effect[0]
                        let left=4
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].attack!=1311&&this.userManager.hand.cards[a].effect[0]>0&&this.userManager.hand.cards[a].class==1&&this.userManager.hand.cards[a].effect.length>0){
                                total4+=this.userManager.hand.cards[a].effect[0]
                                left--
                                if(left<=0){
                                    a=la
                                }
                            }
                        }
                        this.targetCombatant.takeDamage(total4+this.effect[0],this.user)
                    break
                    case 1330:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.userCombatant.addBlock(this.effect[1])
                        }else if(floor(random(0,4))==0){
                            this.userCombatant.takeDamage(this.effect[3],-1)
                            this.userCombatant.lowRoll()
                        }else if(floor(random(0,3))==0){
                            this.battle.loseCurrency(this.effect[2],this.player)
                            this.userCombatant.lowRoll()
                        }else if(floor(random(0,2))==0){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else{
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 1377:
                        this.targetCombatant.takeDamage(this.targetCombatant.life>this.effect[0]&&floor(random(0,2))==0?this.effect[1]:this.effect[0],this.user)
                    break
                    case 1397:
                        if(this.energy%2==0&&this.energy>0){
                            this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                            this.userCombatant.heal(this.effect[1]*this.energy)
                            this.battle.dropDrawShuffleEffect(this.player,findName('Snip',types.card),0,0,0,floor(random(1,this.energy)))
                        }
                    break
                    case 1424:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(6,this.user)
                            this.userCombatant.addBlock(6)
                        }else{
                            let rolls=[]
                            for(let a=0,la=min(this.effect[0],100);a<la;a++){
                                rolls.push(floor(random(1,7)))
                            }
                            rolls.sort()
                            if(rolls.length>=2){
                                this.targetCombatant.takeDamage(rolls[rolls.length-1],this.user)
                                this.userCombatant.addBlock(rolls[rolls.length-2])
                            }
                        }
                    break
                    case 1457:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.hand.colorNumber(),this.user)
                    break
                    case 1462:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.hand.retainNumber(),this.user)
                    break
                    case 1470:
                        let total5=this.effect[0]
                        let left2=2
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].attack!=1470&&this.userManager.hand.cards[a].effect[0]>0&&this.userManager.hand.cards[a].class==1&&this.userManager.hand.cards[a].effect.length>0){
                                total5+=this.userManager.hand.cards[a].effect[0]
                                left2--
                                if(left2<=0){
                                    a=la
                                }
                            }
                        }
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.targetCombatant.takeDamage((total5+this.effect[0])*3,this.user)
                        }else{
                            this.targetCombatant.takeDamage(total5+this.effect[0],this.user)
                        }
                    break
                    case 1478:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy+this.effect[1],this.user)
                    break
                    case 1493:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.life==this.targetCombatant.base.life?2:1),this.user)
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
                    case 42: case 1354:
                        this.userManager.draw(this.effect[1])
                    break
                    case 53:
                        this.userCombatant.statusEffect('Dodge',this.effect[1])
                    break
                    case 90:
                        this.userCombatant.statusEffect('Single Damage',this.effect[1])
                    break
                    case 94:
                        this.userManager.hand.exhaust(this.effect[1])
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
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 115:
                        this.battle.dropDraw(this.player,findName('Anger',types.card),this.level,this.color)
                    break
                    case 123:
                        this.battle.drop(this.player,findName('Slow\nBleed',types.card),this.level,game.playerNumber+1)
                    break
                    case 124:
                        this.userManager.randomEffect(2,13,[])
                    break
                    case 125:
                        this.userManager.hand.discard(this.effect[1])
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
                        this.userManager.drawPrice(this.effect[1],0)
                    break
                    case 189:
                        this.battle.turnManager.loadEnemyAttack(this.targetCombatant.id)
                    break
                    case 196:
                        this.userCombatant.statusEffect('Conditioning',this.effect[1])
                    break
                    case 228:
                        this.userManager.draw(this.effect[1])
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
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 269:
                        if(this.targetCombatant.getStatus('Vulnerable')>0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                            this.userManager.draw(this.effect[2])
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
                        this.userManager.allEffect(2,18)
                    break
                    case 304:
                        this.userManager.allEffect(2,19)
                    break
                    case 310:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.gainMaxHP(this.effect[1])
                        }
                    break
                    case 319:
                        let list2=[]
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].id!=this.targetCombatant.id){
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
                                this.userManager.hand.add(findName('Shiv',types.card),0,0)
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
                        this.userManager.hand.add(findName('Fury',types.card),this.level,this.color)
                        if(this.userManager.hand.cards.length>=1){
                            this.userManager.hand.cards[this.userManager.hand.cards.length-1].effect[0]=max(1,this.effect[0]-1)
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
                        this.userManager.hand.add(findName('Pain\nStrike',types.card),this.level,this.color)
                    break
                    case 462:
                        this.userManager.deFatigue(this.effect[1])
                    break
                    case 496:
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 497:
                        this.userManager.allGroupClaw(this.effect[1])
                    break
                    case 507:
                        if(this.targetCombatant.life<=0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                        this.userManager.allGroupClaw(this.effect[2])
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
                        this.userManager.draw(this.effect[1]*this.userCombatant.getOrbNumber(-1))
                    break
                    case 514:
                        this.userManager.hand.rebound(1)
                    break
                    case 540:
                        this.userManager.discard.allEffect(25)
                        this.userManager.reserve.allEffect(25)
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
                        this.userManager.hand.upgrade(this.effect[1])
                    break
                    case 606:
                        if(this.targetCombatant.blocked<=1){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
                    break
                    case 638:
                        this.userManager.hand.transform(this.effect[1])
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
                        this.userManager.hand.duplicate(this.effect[1])
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
                        this.userManager.hand.add(findName('Smite',types.card),0,0)
                    break
                    case 779:
                        this.battle.dropDrawShuffle(this.player,findName('End\nUp',types.card),0,0)
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
                        this.userManager.hand.allEffect(29)
                    break
                    case 828:
                        this.userCombatant.gainMaxHP(this.effect[1])
                    break
                    case 829:
                        this.userManager.drawRetain(this.effect[1],0)
                    break
                    case 830:
                        this.battle.dropDrawShuffle(this.player,findName('Restrike',types.card),0,0)
                    break
                    case 840:
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.battle.energy.main[this.player]+=this.effect[2]
                            this.userManager.draw(this.effect[3])
                        }
                    break
                    case 848:
                        this.userManager.hand.add(findName('Spark',types.card),0,0)
                    break
                    case 849:
                        this.userManager.hand.add(findName('Spark',types.card),1,0)
                    break
                    case 863:
                        this.battle.energy.main[this.player]+=floor(this.userManager.deck.cards.length/this.effect[1])
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
                        this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                    break
                    case 946:
                        this.battle.energy.main[this.player]=this.effect[1]
                    break
                    case 950:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 966:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.charge+=this.effect[1]
                        }
                    break
                    case 991:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==2){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 992:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==1){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                    break
                    case 993:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==1){
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 994:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==2){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
                    break
                    case 1007:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            let list3=[]
                            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                                if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].life>0&&this.battle.combatantManager.combatants[a].id!=this.targetCombatant.id){
                                    list3.push(a)
                                }
                            }
                            if(list3.length>0){
                                let tempTargetCombatant=this.battle.combatantManager.combatants[list3[floor(random(0,list3.length))]]
                                let total=0
                                let roll=this.userCombatant.luckCheck()?6:floor(random(1,7))
                                if(total<3.5){
                                    this.userCombatant.lowRoll()
                                }
                                this.battle.particleManager.createAuxNumber(tempTargetCombatant.position.x,tempTargetCombatant.position.y,roll)
                                total+=roll
                                tempTargetCombatant.takeDamage(total,this.user)
                                tempTargetCombatant.takeDamage(this.effect[1],this.user)
                            }
                        }
                    break
                    case 1014:
                        if(this.relPos[0])
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 1015:
                        if(this.relPos[0])
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                    break
                    case 1018:
                        this.targetCombatant.randomIntent()
                    break
                    case 1022:
                        this.userCombatant.statusEffect('1.5x Damage',this.effect[1])
                    break
                    case 1029:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                        this.userCombatant.statusEffect('Energy Next Turn Next Turn',this.effect[1])
                        this.userCombatant.statusEffect('Energy Next Turn Next Turn Next Turn',this.effect[1])
                    break
                    case 1038:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.dropDraw(this.player,findName('Strike',types.card),0,this.color)
                        }
                    break
                    case 1050:
                        this.targetCombatant.statusEffect('Bruise',this.effect[1])
                    break
                    case 1064:
                        this.battle.combatantManager.allEffect(19,[this.effect[1]])
                    break
                    case 1068:
                        this.userCombatant.ammo+=this.effect[1]
                    break
                    case 1073:
                        this.userCombatant.statusEffect('Double Damage Turn',1)
                        this.userCombatant.statusEffect('Take Double Damage Turn',1)
                    break
                    case 1087:
                        this.battle.dropDraw(this.player,findName('Credit',types.card),this.level,this.color)
                    break
                    case 1089:
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[2])
                        }
                    break
                    case 1090:
                        this.userCombatant.addBlock(this.effect[2])
                    break
                    case 1091:
                        this.userCombatant.heal(this.effect[2])
                    break
                    case 1092: case 1377:
                        this.battle.addCurrency(this.effect[2],this.player)
                    break
                    case 1100:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.heal(this.effect[1])
                        }
                    break
                    case 1123:
                        this.userCombatant.addBlock(this.effect[0])
                        this.battle.addCurrency(this.effect[0],this.player)
                        this.userManager.draw(1)
                    break
                    case 1144:
                        if(this.relPos[0]==1){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                    break
                    case 1145:
                        if(this.relPos[0]==1){
                            this.targetCombatant.statusEffect('Confusion',this.effect[1])
                        }
                    break
                    case 1147:
                        this.targetCombatant.statusEffect('Ichor',this.effect[1])
                    break
                    case 1153:
                        this.userCombatant.statusEffect('Cannot Move',this.effect[1])
                    break
                    case 1154:
                        this.battle.dropDrawShuffle(this.player,findName('Diamond',types.card),0,0)
                    break
                    case 1155:
                        this.userManager.addRandomCurse(2,0)
                    break
                    case 1166:
                        this.targetCombatant.statusEffect('Take Damage',this.effect[0])
                        this.targetCombatant.statusEffect('Take Damage Next Turn',this.effect[0])
                        this.targetCombatant.statusEffect('Take Damage Next Turn Next Turn',this.effect[0])
                        this.userCombatant.addBlock(this.effect[1])
                        this.userCombatant.statusEffect('Block Next Turn',this.effect[1])
                        this.userCombatant.statusEffect('Block Next Turn Next Turn',this.effect[1])
                        this.userCombatant.statusEffect('Block Next Turn Next Turn Next Turn',this.effect[1])
                    break
                    case 1174:
                        this.userManager.addRandomAll(2,this.level,0)
                    break
                    case 1175:
                        this.userManager.allGroupEffectArgs(5,[this.effect[1]])
                    break
                    case 1178:
                        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
                    break
                    case 1180:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                            this.userCombatant.addBlock(this.effect[1])
                            this.userCombatant.heal(this.effect[1])
                            this.battle.addCurrency(this.effect[1],this.player)
                        }else if(floor(random(0,4))==0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }else if(floor(random(0,3))==0){
                            this.userCombatant.addBlock(this.effect[1])
                        }else if(floor(random(0,2))==0){
                            this.userCombatant.heal(this.effect[1])
                        }else{
                            this.battle.addCurrency(this.effect[1],this.player)
                        }
                    break
                    case 1181:
                        this.targetCombatant.name='💀'
                        this.targetCombatant.description='💀'
                        this.targetCombatant.setupGraphics(this.targetCombatant.goal.anim.direction)
                    break
                    case 1183:
                        this.battle.overlayManager.overlays[36][this.player].active=true
                        this.battle.overlayManager.overlays[36][this.player].activate()
                    break
                    case 1187:
                        if(this.targetCombatant.size<1){
                            this.targetCombatant.life=0
                        }
                    break
                    case 1202:
                        if(this.targetCombatant.life<=0){
                            this.targetCombatant.status.main[findList('Cannot Die',this.targetCombatant.status.name)]=0
                        }
                    break
                    case 1217:
                        if(this.targetCombatant.life<=0){
                            if(variants.blackjack){
                                this.userManager.drops=0
                            }else{
                                this.userManager.draw(1)
                            }
                        }
                    break
                    case 1222:
                        if(variants.altDraw){
                            this.userManager.drops=0
                        }
                    break
                    case 1228:
                        this.userManager.hand.allEffectArgs(7,[this.effect[1]])
                    break
                    case 1231:
                        if(floor(random(0,2))==0||this.userCombatant.luckCheck()){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1234:
                        if(floor(random(0,4))==0||this.userCombatant.luckCheck()){
                            this.battle.energy.main[this.player]+=this.effect[1]
                            this.userManager.draw(this.effect[2])
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1251:
                        this.userManager.hand.allEffectArgs(8,[this.effect[1]])
                    break
                    case 1267:
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 1268:
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 1284:
                        this.userManager.hand.sevens++
                        if(this.userManager.hand.sevens%3==0){
                            this.battle.addCurrency(this.effect[1],this.player)
                        }
                    break
                    case 1286:
                        if(this.targetCombatant.life<=0){
                            for(let a=0,la=this.userManager.deck.cards.length;a<la;a++){
                                if(this.userManager.deck.cards[a].id==this.id){
                                    this.userManager.deck.cards[a].effect[0]+=this.userManager.deck.cards[a].effect[1]
                                }
                            }
                        }
                    break
                    case 1291:
                        if(this.battle.energy.main[this.player]>0){
                            if(!this.userCombatant.luckCheck()){
                                this.battle.energy.main[this.player]=floor(random(this.battle.energy.main[this.player]+1))
                            }
                        }
                    break
                    case 1296:
                        this.targetCombatant.statusEffect('Double Damage Turn',1)
                    break
                    case 1312:
                        this.userManager.reserve.falsedSwap()
                    break
                    case 1314:
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 1315:
                        this.targetCombatant.statusEffect('Rotate Lock',1)
                    break
                    case 1321:
                        if(this.targetCombatant.getStatus('Shock')>0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 1324:
                        this.userManager.randomEffect(2,20)
                    break
                    case 1355:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Freeze')>0?2:1),this.user)
                    break
                    case 1356:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Burn')>0?2:1),this.user)
                    break
                    case 1374:
                        if(this.energy%2==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1390:
                        let amount=this.userManager.hand.cards.length
                        this.userManager.allEffect(2,1)
                        this.userManager.draw(amount)
                    break
                    case 1395:
                        this.targetCombatant.statusEffect('Take Damage Next Turn',this.effect[1])
                    break
                    case 1399:
                        this.userCombatant.statusEffect(['Burn','Freeze','Shock','Weak'][this.battle.turn.main%4],this.effect[1])
                    break
                    case 1401:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
                        }
                    break
                    case 1421:
                        if(this.energy==3){
                            this.userCombatant.statusEffect('Counter All Combat',this.effect[1])
                        }
                    break
                    case 1429:
                        this.userManager.hand.randomEffect(7,[this.effect[1]])
                    break
                    case 1438:
                        this.targetCombatant.statusEffect('Freeze',this.effect[1])
                    break
                    case 1439:
                        this.targetCombatant.statusEffect('Freeze',this.effect[1])
                        this.userCombatant.statusEffect('Freeze',this.effect[2])
                    break
                    case 1440:
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                        this.userCombatant.statusEffect('Burn',this.effect[2])
                    break
                    case 1465:
                        if(this.energy==1){
                            this.userManager.hand.allEffectArgs(8,[this.effect[1]])
                        }
                    break
                    case 1485:
                        this.targetCombatant.statusEffect('Damage Down',this.effect[1])
                    break
                    case 1490:
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Lock',this.effect[1])
                        }
                    break

                }
                //mark 1
            break
            case 1:
                switch(this.type){
                    case 13: case 235: case 968:
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
                        this.userCombatant.addBlock(this.effect[0]*this.userManager.hand.cards.length)
                        this.userManager.allEffect(2,1)
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
                        this.userCombatant.addBlock(this.effect[0]*this.userManager.fatigueNumber())
                    break
                    case 389:
                        this.userCombatant.addBlock(this.effect[0]*this.userCombatant.balance)
                        this.userCombatant.balance=0
                    break
                    case 515:
                        this.userCombatant.addBlock(this.effect[0]+this.userManager.discard.cards.length)
                    break
                    case 518:
                        this.battle.energy.main[this.player]+=floor(this.userManager.reserve.cards.length/this.effect[1])*this.effect[0]
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
                        this.userManager.hand.discardBlock(this.effect[0])
                    break
                    case 1013:
                        this.userCombatant.addBlock(this.effect[0]*(this.relPos[0]==0?2:1))
                    break
                    case 1057:
                        this.targetCombatant.takeDamage(this.battle.counter.turnPlayed[this.player]<=1?this.effect[0]+this.effect[1]:this.effect[0],this.user)
                        this.userCombatant.addBlock(this.effect[0])
                    break
                    case 1061:
                        this.userCombatant.statusEffect('Armor',this.effect[0])
                        if(this.relPos[0]==this.relPos[1]/2){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                    break
                    case 1077:
                        this.userCombatant.statusEffect('Block Up',this.effect[0])
                    break
                    case 1118:
                        this.userCombatant.statusEffect('Reflect',1)
                    break
                    case 1127:
                        let roll=this.userCombatant.luckCheck()?2:floor(random(1,3))
                        this.userCombatant.addBlock(this.effect[0]*roll)
                        if(roll==1){
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1130:
                        this.userCombatant.statusEffect('Currency Tank',this.effect[0])
                    break
                    case 1131:
                        this.userCombatant.statusEffect('Counter Damage Down All',this.effect[0])
                    break
                    case 1161:
                        let anyAttack=false
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].class==1){
                                anyAttack=true
                            }
                        }
                        this.userCombatant.addBlock(this.effect[0]*anyAttack?1:2)
                    break
                    case 1357:
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.userCombatant.addBlock(this.effect[0]+this.effect[2],this.user)
                            this.userManager.draw(this.effect[3])
                        }else{
                            this.userCombatant.addBlock(this.effect[0])
                        }
                    break
                    case 1369:
                        this.userCombatant.addBlock(this.effect[1])
                    break
                    case 1460:
                        this.userCombatant.statusEffect('Armor',this.effect[0])
                        this.userCombatant.statusEffect('Counter All Combat',this.effect[1])
                        this.userCombatant.heal(this.effect[2])
                        this.userCombatant.statusEffect('Temporary Dexterity',this.effect[3])
                        this.userCombatant.statusEffect('Temporary Dexterity Next Turn',this.effect[3])
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
                        this.userManager.draw(this.effect[1])
                    break
                    case 50:
                        this.userCombatant.statusEffect('Retain Block',this.effect[1])
                    break
                    case 65:
                        this.userCombatant.statusEffect('Cannot Gain Block',this.effect[1])
                    break
                    case 95:
                        this.userManager.hand.exhaust(this.effect[1])
                    break
                    case 96:
                        this.userCombatant.statusEffect('Counter Push',1)
                    break
                    case 97:
                        this.userCombatant.statusEffect('Counter Bleed',this.effect[1])
                    break
                    case 120:
                        this.userManager.hand.discard(this.effect[1])
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
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
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
                        this.userManager.drawPrice(this.effect[1],1)
                    break
                    case 262:
                        this.userCombatant.statusEffect('Block Next Turn',this.effect[1])
                    break
                    case 281:
                        this.userManager.randomEffect(2,13,[])
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
                        this.userManager.hand.add(findName('Pain\nDefend',types.card),this.level,this.color)
                    break
                    case 463:
                        this.userManager.deFatigue(this.effect[1])
                    break
                    case 502:
                        this.userManager.allGroupClaw(this.effect[0])
                    break
                    case 513:
                        this.battle.overlayManager.overlays[7][this.player].active=true
                        this.battle.overlayManager.overlays[7][this.player].activate()
                    break
                    case 522:
                        this.userManager.hand.allEffect(24)
                    break
                    case 547:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(1)
                        }
                    break
                    case 602:
                        this.userManager.hand.upgrade(this.effect[1])
                    break
                    case 682:
                        this.userManager.hand.transform(this.effect[1])
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
                        this.battle.dropDrawShuffle(this.player,findName('Insight',types.card),0,0)
                    break
                    case 745:
                        this.userManager.hand.add(findName('Safety',types.card),0,0)
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
                        this.userManager.draw(this.effect[1])
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
                        this.userManager.draw(this.effect[1])
                        if(this.userManager.hand.cards.length>0&&this.userManager.hand.cards[this.userManager.hand.cards.length-1].class==1){
                            this.userCombatant.statusEffect('Strength',this.effect[2])
                        }
                    break
                    case 967:
                        this.userManager.deCard(this.effect[1],'Burn')
                    break
                    case 968:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 989:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 990:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==2){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                    break
                    case 995:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==1){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 996:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==2){
                            this.userCombatant.statusEffect('Dexterity',this.effect[1])
                        }
                    break
                    case 1025:
                        this.battle.overlayManager.overlays[30][this.player].active=true
                        this.battle.overlayManager.overlays[30][this.player].activate()
                    break
                    case 1030:
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                    break
                    case 1035:
                        if(this.relPos[0]==this.relPos[1]/2){
                            this.userCombatant.statusEffect('Armor',this.effect[1])
                        }
                    break
                    case 1039:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.dropDraw(this.player,findName('Defend',types.card),0,this.color)
                        }
                    break
                    case 1141:
                        this.userCombatant.statusEffect('Temporary Ammo on Hit',this.effect[1])
                    break
                    case 1176:
                        this.userManager.allGroupEffectArgs(6,[this.effect[1]])
                    break
                    case 1301:
                        this.userCombatant.addBlock(this.effect[0])
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1417:
                        this.userCombatant.statusEffect('Counter Weak All',this.effect[1])
                        this.userCombatant.statusEffect('Counter All Combat',this.effect[2])
                    break
                    case 1453:
                        this.userCombatant.statusEffect('Counter Freeze',this.effect[1])
                    break
                    case 1456:
                        this.userCombatant.statusEffect('Retain Block',this.effect[1])
                        let index3=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                        if(index3>=0){
                            this.battle.tileManager.tiles[index3].addType(22)
                        }
                    break

                }
            break
            case 2:
                switch(this.type){
                    case 20:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.randomEffect(2,0)
                        }
                    break
                    case 51:
                        this.userCombatant.statusEffect('Dodge',this.effect[1])
                    break
                    case 58:
                        this.userManager.hand.add(findName('Stride',types.card),0,0)
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
                        this.userManager.hand.discard(this.effect[1])
                    break
                    case 331:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 335:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                    break
                    case 397:
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 503:
                        this.userManager.allGroupClaw(this.effect[0])
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
                        this.userManager.discard.sendSpec(this.userManager.hand.cards,25,this.effect[1])
                    break
                    case 705:
                        this.targetTile.clearTypes()
                    break
                    case 706:
                        this.userManager.hand.upgrade(this.effect[1])
                    break
                    case 717:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClass(2,0,7)
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
                    case 963:
                        if(this.amplify){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 973:
                        let offset=transformDirection(0,this.relativeDirection)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x+offset[0],this.targetTile.tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(this.effect[1])
                        }
                    break
                    case 975:
                        this.userCombatant.statusEffect('Control',this.effect[1])
                    break
                    case 977:
                        this.userCombatant.statusEffect('Charge Next Turn',this.effect[1])
                    break
                    case 978:
                        this.userCombatant.statusEffect('Single Free Amplify',1)
                    break
                    case 997:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==1){
                            this.userCombatant.statusEffect('1.5x Damage',this.effect[1])
                        }
                    break
                    case 998:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==2){
                            this.userCombatant.statusEffect('1.5x Block',this.effect[1])
                        }
                    break
                    case 999:
                        if(types.card[this.lastPlayed[0][0]].levels[this.lastPlayed[0][1]].class==3){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                    break
                    case 1024:
                        this.userCombatant.ammo+=this.effect[1]
                    break
                    case 1048:
                        this.userManager.discard.add(findName('Ourostep',types.card),0,0)
                    break
                    case 1080:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.dropDrawShuffle(this.player,findName('Strike',types.card),0,this.color)
                        }
                    break
                    case 1081:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.dropDrawShuffle(this.player,findName('Defend',types.card),0,this.color)
                        }
                    break
                    case 1084:
                        this.userManager.hand.allEffect(37)
                    break
                    case 1085:
                        this.userManager.hand.transform(this.effect[1])
                    break
                    case 1086:
                        this.battle.combatantManager.damageAreaID(this.effect[1],this.user,this.userCombatant.id,this.targetTile.tilePosition)
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetTile.position.x,this.targetTile.position.y,10,[10]))
                    break
                    case 1136:
                        let index2=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                        if(index2>=0){
                            this.battle.tileManager.tiles[index2].addType(1)
                        }
                    break
                    case 1137:
                        if(floor(random(0,2))==0||this.userCombatant.luckCheck()){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1143:
                        let index3=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                        if(index3>=0){
                            this.battle.tileManager.tiles[index3].addType(22)
                        }
                    break
                    case 1389:
                        this.userManager.hand.duplicate(this.effect[1])
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
                        this.userManager.deFatigue(this.effect[0])
                    break
                    case 98:
                        this.userCombatant.statusEffect('Temporary Damage Up',this.effect[0])
                    break
                    case 113:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.userManager.draw(this.effect[1])
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
                        this.userCombatant.life-=this.effect[0]*this.userManager.deFatigueAll()
                    break
                    case 366:
                        this.userManager.allGroupEffect(21)
                    break
                    case 367:
                        this.userManager.reserve.sendName(this.userManager.hand.cards,'Fatigue')
                        this.userManager.discard.sendName(this.userManager.hand.cards,'Fatigue')
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
                        this.userManager.draw(this.effect[1])
                    break
                    case 406:
                        if(this.userCombatant.block<=0){
                            this.userCombatant.statusEffect('Bleed',this.effect[0])
                        }
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 424:
                        this.userManager.allGroupEffect(23)
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
                        this.userManager.draw(this.effect[1])
                    break
                    case 488:
                        this.userCombatant.combo+=this.effect[0]
                        this.userManager.addRandomSpec(2,0,11)
                    break
                    case 500:
                        this.userManager.allGroupClaw(this.effect[0])
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
                            this.userManager.addRandomAllPriority(2,0)
                        }
                    break
                    case 614:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassAllPriority(2,0,2)
                        }
                    break
                    case 615:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassAllPriority(2,0,7)
                        }
                    break
                    case 625:
                        this.userCombatant.metal+=this.effect[0]
                        this.userManager.draw(this.effect[1])
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
                        this.userManager.deFatigue(this.effect[0])
                        this.userManager.allGroupEffect(21)
                    break
                    case 656:
                        this.userManager.deFatigue(this.effect[0])
                        this.userManager.reserve.sendName(this.userManager.hand.cards,'Fatigue')
                        this.userManager.discard.sendName(this.userManager.hand.cards,'Fatigue')
                    break
                    case 668:
                        this.userCombatant.statusEffect('Shiv on Hit',this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
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
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].spec.includes(21)){
                                maximum=max(maximum,this.userManager.hand.cards[a].cost+this.effect[0])
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
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 836:
                        let encode=this.lastPlayed[1]
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(encode[0],encode[1],encode[2])
                        }
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
                    case 852:
                        this.userCombatant.statusEffect('Charge Per Turn',this.effect[0])
                    break
                    case 864:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomAllPriority(2,0)
                        }
                        this.userManager.hand.badreserve(this.effect[1])
                    break
                    case 873:
                        this.battle.energy.main[this.player]+=this.userCombatant.charge
                        if(this.userCombatant.charge>0){
                            this.userCombatant.chargeConsumed()
                        }
                        this.userCombatant.charge=0
                    break
                    case 876:
                        this.userCombatant.statusEffect('Free Amplify',999)
                    break
                    case 886:
                        this.userManager.draw(this.effect[0])
                        this.userManager.discard.sendSpec(this.userManager.hand.cards,25,this.effect[1])
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
                        let amount=this.userManager.hand.cards.length
                        this.userManager.allEffect(2,1)
                        this.userManager.draw(amount)
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                    break
                    case 937:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.userCombatant.charge+=this.effect[1]
                    break
                    case 948:
                        if(floor(random(0,2))==0||this.userCombatant.luckCheck()){
                            this.userCombatant.statusEffect('Triple Damage',this.effect[0])
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1008:
                        this.userCombatant.statusEffect('Lowroll Strength',this.effect[0])
                    break
                    case 1019:
                        this.userCombatant.statusEffect('Decrementing Strength',this.effect[0])
                    break
                    case 1033:
                        this.userCombatant.statusEffect('Temporary Dexterity',this.effect[0])
                    break
                    case 1053:
                        this.userCombatant.statusEffect('Gun Boost',this.effect[0])
                    break
                    case 1063:
                        this.userCombatant.statusEffect('Strength',this.userManager.hand.cards.length*this.effect[0])
                        this.userManager.hand.allEffect(22)
                    break
                    case 1074:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.userManager.draw(this.effect[1])
                        this.battle.drop(this.player,findName('Out of\nTime',types.card),0,game.playerNumber+1)
                    break
                    case 1079:
                        this.number=0
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].team==0&&this.battle.combatantManager.combatants[a].life>0){
                                this.number++
                            }
                        }
                        this.battle.energy.main[this.player]+=this.effect[0]*this.number
                    break
                    case 1093:
                        let possible=['Ace of\nSpades','Ace of\nClubs','Ace of\nHearts','Ace of\nDiamonds']
                        this.userManager.hand.addRetain(findName(possible[floor(random(0,possible.length))],types.card),this.level,this.color)
                    break
                    case 1094:
                        this.userCombatant.reverseStatus()
                    break
                    case 1108:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.dropDraw(this.player,findName('Basicity',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 1124:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([this.level,3,7,6])
                    break
                    case 1125:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([this.level,3,6])
                    break
                    case 1138:
                        for(let a=0,la=this.userCombatant.ammo;a<la;a++){
                            this.userManager.hand.add(findName('Throw\nBullet',types.card),this.level,0)
                        }
                    break
                    case 1159:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                    case 1165:
                        this.battle.overlayManager.overlays[35][this.player].active=true
                        this.battle.overlayManager.overlays[35][this.player].activate([this.level,3,0])
                    break
                    case 1206:
                        this.userCombatant.statusEffect('Conviction Next Turn',this.effect[0])
                    break
                    case 1208:
                        if(variants.blackjack){
                            this.userManager.drops=max(0,this.userManager.drops-this.effect[0])
                        }else{
                            this.userManager.draw(1)
                        }
                    break
                    case 1215:
                        this.userManager.drawBoost+=this.effect[0]
                    break
                    case 1220:
                        if(variants.blackjack){
                            this.userManager.drops=max(0,this.userManager.drops-this.effect[0]*this.userManager.hand.cards.length)
                        }else{
                            this.userManager.draw(1)
                        }
                    break
                    case 1229:
                        this.userManager.hand.exhaust(this.effect[0])
                        if(this.battle.energy.main[this.player]==0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                    break
                    case 1260:
                        this.userManager.draw(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        if(this.amplify){
                            this.userCombatant.statusEffect('Draw Up',this.effect[0])
                        }
                    break
                    case 1264:
                        this.battle.energy.main[this.player]=this.effect[0]
                    break
                    case 1265:
                        this.battle.energy.main[this.player]=this.effect[0]
                        this.userManager.hand.randomEffect(7,[this.effect[1]])
                    break
                    case 1269:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.userManager.reserve.falsedSwap()
                    break
                    case 1294:
                        this.battle.overlayManager.overlays[39][this.player].active=true
                        this.battle.overlayManager.overlays[39][this.player].activate()
                    break
                    case 1302:
                        this.userManager.hand.allEffect(45)
                    break
                    case 1304:
                        if(this.energy==3){
                            this.userManager.hand.add(findName('Keyblade',types.card),this.level,0)
                        }
                    break
                    case 1306:
                        this.battle.energy.main[this.player]*=this.amplify?3:2
                    break
                    case 1323:
                        if(floor(random(0,4))==0||this.userCombatant.luckCheck()){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.relicManager.addRandomRelic(this.player)
                            }
                        }else{
                            this.battle.addCurrency(this.effect[0],this.player)
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1327:
                        this.userManager.drawRetain(this.effect[0],1)
                    break
                    case 1365:
                        this.userCombatant.statusEffect('Double Damage',this.effect[0])
                        this.userCombatant.statusEffect('Conditioning',this.effect[1])
                    break
                    case 1366:
                        this.userManager.cardInUse().effect[0][0]=min(this.userManager.cardInUse().effect[0][0]*2,256)
                    break
                    case 1375:
                        this.userCombatant.statusEffect('Luck Guarantee',1)
                    break
                    case 1381:
                        this.userCombatant.statusEffect('Double Damage-1',this.effect[0])
                    break
                    case 1396:
                        this.userCombatant.statusEffect('20 Damage Miss',this.effect[0])
                    break
                    case 1402:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.userManager.drawCost(this.effect[1])
                    break
                    case 1407:
                        this.battle.energy.main[this.player]=this.battle.energy.gen[this.player]
                    break
                    case 1419:
                        this.userCombatant.statusEffect('Extra Turn',1)
                        this.battle.attackManager.endAfter=true
                    break
                    case 1466:
                        this.userCombatant.statusEffect('Extra Turn',1)
                    break
                    case 1467:
                        this.battle.energy.main[this.player]=this.battle.energy.gen[this.player]
                        this.userCombatant.statusEffect('Shock',this.effect[0])
                    break
                    case 1468:
                        this.battle.energy.main[this.player]=this.effect[0]
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.randomEffect(2,0)
                        }
                    break
                    case 1475:
                        this.userCombatant.statusEffect('Extra Turn',1)
                        this.battle.quickReinforce('Latency')
                    break
                    case 1476:
                        if(this.userCombatant.luckCheck()){
                            this.userCombatant.statusEffect('Double Damage',this.effect[0])
                            this.userManager.hand.duplicate(this.effect[0])
                        }else if(floor(random(0,2))==0){
                            this.userCombatant.statusEffect('Double Damage',this.effect[0])
                        }else{
                            this.userManager.hand.duplicate(this.effect[0])
                        }
                    break
                    case 1494:
                        this.userCombatant.randomStatusInstant(this.effect[0],[0,2])
                        this.userCombatant.randomStatusInstant(this.effect[1],[0,2])
                        this.userCombatant.randomStatusInstant(this.effect[2],[0,2])
                    break

                }
            break
            case 4:
                switch(this.type){
                    case 8: case 892:
                        this.userManager.draw(this.effect[0])
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
                        let amount=this.userManager.hand.cards.length
                        this.userManager.allEffect(2,1)
                        this.userManager.draw(amount)
                    break
                    case 44:
                        this.userManager.send(3,1)
                        this.userManager.shuffle(1)
                        this.userManager.draw(this.effect[0])
                    break
                    case 45:
                        this.userManager.allEffect(1,4)
                        this.userManager.allEffect(2,3)
                        this.userManager.allEffect(3,4)
                    break
                    case 55:
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.discard(this.effect[1])
                    break
                    case 62:
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            this.userManager.hand.cards[a].cost=min(this.userManager.hand.cards[a].cost,this.effect[0])
                            if(this.effect[1]>0){
                                this.userManager.hand.cards[a].base.cost=min(this.userManager.hand.cards[a].base.cost,this.effect[0])
                            }
                        }
                    break
                    case 63:
                        this.userManager.hand.exhaustAny()
                    break
                    case 69:
                        for(let a=0;a<this.effect[0];a++){
                            this.userManager.addRandomColor(2,0,0,3)
                        }
                    break
                    case 70:
                        this.userManager.hand.reserve(this.effect[0])
                    break
                    case 76:
                        this.userCombatant.statusEffect('Intangible',this.effect[0])
                    break
                    case 78:
                        this.userManager.randomEffect(2,5,[])
                    break
                    case 93:
                        this.battle.overlayManager.overlays[19][this.player].active=true
                        this.battle.overlayManager.overlays[19][this.player].activate()
                    break
                    case 99:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                    break
                    case 109:
                        this.userManager.draw(this.effect[0])
                        this.battle.drop(this.player,findName('Burn',types.card),0,game.playerNumber+1)
                    break
                    case 116:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0]+this.energy)
                        this.battle.attackManager.endAfter=true
                    break
                    case 183:
                        this.userManager.draw(this.effect[0]*this.energy+this.effect[1])
                    break
                    case 186:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.allEffect(2,14)
                        }
                    break
                    case 199:
                        this.userManager.allEffect(0,15)
                        this.userManager.allEffect(1,15)
                        this.userManager.allEffect(2,15)
                    break
                    case 207:
                        this.userManager.hand.discard(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.addRandom(2,0,3)
                        }
                    break
                    case 209:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassFree(2,0,2,0)
                        }
                    break
                    case 210:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassFree(2,0,2,1)
                        }
                    break
                    case 213:
                        this.userManager.draw(this.effect[0])
                        this.userCombatant.statusEffect('Conditioning',this.effect[1])
                    break
                    case 214:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.randomEffect(2,2,[0])
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 227: case 1459:
                        this.userManager.hand.duplicate(this.effect[0])
                    break
                    case 229:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassFree(2,0,1,0)
                        }
                    break
                    case 230:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassFree(2,0,1,1)
                        }
                    break
                    case 232:
                        this.userCombatant.statusEffect('Attack Draw',this.effect[0])
                    break
                    case 233:
                        this.userCombatant.statusEffect('Combo on Block',this.effect[0])
                    break
                    case 253:
                        let amount2=this.userManager.hand.cards.length
                        this.userManager.allEffect(2,1)
                        for(let a=0,la=amount2+this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 254:
                        this.userCombatant.statusEffect('Card Play Block',this.effect[0])
                    break
                    case 259:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.userManager.hand.discard(this.effect[1])
                    break
                    case 276:
                        this.userManager.hand.duplicate(this.effect[0])
                        this.userManager.randomEffect(2,0)
                    break
                    case 279:
                        this.userManager.drawPrice(this.effect[0],0)
                    break
                    case 284:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                        this.userCombatant.statusEffect('Dexterity Next Turn',this.effect[1])
                    break
                    case 285:
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.discard(this.effect[1])
                    break
                    case 289:
                        this.userManager.draw(this.effect[0])
                        if(this.userManager.hand.cards.length>0&&this.userManager.hand.cards[this.userManager.hand.cards.length-1].class==2){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 291:
                        if(this.userManager.hand.cards.length<this.effect[0]){
                            this.userManager.draw(this.effect[0]-this.userManager.hand.cards.length)
                        }
                    break
                    case 294:
                        this.userManager.allEffect(2,17)
                        this.userCombatant.statusEffect('No Draw',1)
                    break
                    case 298:
                        this.userManager.hand.nightmare(this.effect[0])
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
                        this.userManager.allGroupEffect(20)
                    break
                    case 313:
                        this.userManager.draw(this.effect[0])
                        if(this.userManager.hand.cards.length>0&&this.userManager.hand.cards[this.userManager.hand.cards.length-1].class==1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userManager.hand.add(findName('Shiv',types.card),0,0)
                            }
                        }
                    break
                    case 315:
                        this.userManager.discard.send(this.userManager.hand.cards,0,-1,2,this.userManager.hand)
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
                            this.userManager.addRandomClassAllFreeShuffle(1,0,1,1)
                        }
                    break
                    case 344:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassAllFreeShuffle(1,0,2,1)
                        }
                    break
                    case 346:
                        for(let a=0;a<min(this.effect[0]*this.energy,100);a++){
                            this.userManager.addRandomColor(2,0,0,3)
                        }
                    break
                    case 363:
                        this.userCombatant.heal(this.effect[0])
                        this.userManager.hand.exhaust(this.effect[1])
                    break
                    case 387:
                        this.userCombatant.balance=0
                    break
                    case 390:
                        this.userManager.draw(this.effect[0])
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 392:
                        this.userCombatant.statusEffect('Intangible',this.effect[0])
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 398:
                        this.userManager.draw(this.effect[0])
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
                        this.userManager.draw(this.effect[0])
                        this.userManager.allGroupClaw(this.effect[1])
                    break
                    case 512:
                        this.userManager.draw(this.effect[0])
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
                            this.userManager.addRandomClassFree(2,0,4,0)
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
                        this.userManager.discard.send(this.userManager.reserve.cards,0,-1)
                        this.userManager.allEffect(2,1)
                        this.userManager.draw(this.effect[0])
                    break
                    case 595:
                        this.userManager.allEffect(2,26)
                    break
                    case 603:
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.upgrade(this.effect[1])
                    break
                    case 605:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,7,10,this.effect[0]])
                    break
                    case 607:
                        this.userManager.drawUpgrade(this.effect[0])
                    break
                    case 612:
                        this.userManager.allEffect(2,27)
                        this.userManager.draw(this.effect[0])
                    break
                    case 640:
                        this.userManager.draw(this.userManager.hand.cards.length+this.effect[0])
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
                        for(let a=0;a<min(this.effect[0]*this.energy+this.effect[1],100);a++){
                            this.userManager.addRandomColor(2,0,0,3)
                        }
                    break
                    case 680:
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.exhaust(this.effect[1])
                    break
                    case 681:
                        this.userManager.hand.transform(this.effect[0])
                    break
                    case 728:
                        this.userManager.draw(this.effect[0])
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
                        this.battle.dropDrawShuffle(this.player,findName('Insight',types.card),0,0)
                    break
                    case 759:
                        this.userCombatant.faith+=this.effect[0]
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 768:
                        this.userCombatant.statusEffect('Faith Per Turn',this.effect[0])
                    break
                    case 769:
                        this.userCombatant.addBlock(this.userManager.deck.cards.length)
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
                        this.battle.dropDrawShuffle(this.player,findName('Beta',types.card),0,0)
                    break
                    case 791:
                        this.battle.dropDrawShuffle(this.player,findName('Omega',types.card),0,0)
                    break
                    case 797:
                        this.userManager.drawPrice(this.effect[0],0)
                        if(this.battle.counter.turnPlayed[0]==1){
                            this.userManager.draw(this.effect[1],0)
                        }
                    break
                    case 818:
                        this.userManager.hand.add(findName('Crescendo',types.card),0,types.card[findName('Crescendo',types.card)].list)
                        this.userManager.hand.add(findName('Forward',types.card),0,types.card[findName('Forward',types.card)].list)
                        this.userManager.hand.add(findName('Standstill',types.card),0,types.card[findName('Standstill',types.card)].list)
                    break
                    case 819:
                        this.userManager.hand.add(findName('Crescendo',types.card),1,types.card[findName('Crescendo',types.card)].list)
                        this.userManager.hand.add(findName('Forward',types.card),1,types.card[findName('Forward',types.card)].list)
                        this.userManager.hand.add(findName('Standstill',types.card),1,types.card[findName('Standstill',types.card)].list)
                    break
                    case 832:
                        this.userManager.draw(this.amplify?this.effect[0]+this.effect[1]:this.effect[0])
                    break
                    case 835:
                        this.battle.energy.main[this.player]+=floor(ceil(this.userManager.discard.cards.length/2)/this.effect[0])
                        this.userManager.discard.halfEffect(0)
                    break
                    case 855:
                        this.userCombatant.statusEffect('Amplify Return',this.effect[0])
                    break
                    case 859:
                        this.userManager.hand.add(findName('Instant\nWrath',types.card),0,0)
                        this.userManager.hand.add(findName('Instant\nCalm',types.card),0,0)
                    break
                    case 860:
                        this.userManager.hand.add(findName('Instant\nHaste',types.card),0,0)
                        this.userManager.hand.add(findName('Instant\nSturdy',types.card),0,0)
                    break
                    case 868:
                        this.battle.overlayManager.overlays[29][this.player].active=true
                        this.battle.overlayManager.overlays[29][this.player].activate()
                    break
                    case 869:
                        this.battle.energy.main[this.player]+=this.effect[0]
                        this.userManager.hand.exhaust(this.effect[1])
                    break
                    case 870:
                        for(let a=0,la=this.energy;a<la;a++){
                            this.userManager.addRandomClassFreeSpec(2,0,1,1,[1])
                        }
                    break
                    case 871:
                        for(let a=0,la=this.energy;a<la;a++){
                            this.userManager.addRandomClassFreeSpec(2,1,1,1,[1])
                        }
                    break
                    case 891:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomAllPriority(1,floor(random(0,100))<this.effect[1]?1:0)
                        }
                        this.userManager.draw(this.effect[2])
                    break
                    case 904:
                        this.userManager.hand.allEffect(31)
                        this.userCombatant.statusEffect('Temporary Strength',-this.effect[0])
                    break
                    case 909:
                        let amount3=this.userManager.hand.cards.length
                        this.userManager.allEffect(2,32)
                        for(let a=0,la=amount3;a<la;a++){
                            this.userManager.addRandom(2,0,3)
                        }
                    break
                    case 910:
                        let amount4=this.userManager.hand.cards.length
                        this.userManager.allEffect(2,32)
                        for(let a=0,la=amount4;a<la;a++){
                            this.userManager.addRandom(2,1,3)
                        }
                    break
                    case 911:
                        this.userManager.allEffect(2,33)
                    break
                    case 912:
                        this.userManager.allEffect(2,34)
                    break
                    case 913:
                        this.userManager.hand.upgrade(this.effect[0])
                        this.userCombatant.statusEffect('Buffer',this.effect[1])
                    break
                    case 921:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomAllClass(2,0,4)
                        }
                    break
                    case 922:
                        this.userManager.allEffect(2,35)
                    break
                    case 926:
                        this.targetCombatant.statusEffect('Distracted',this.effect[0])
                    break
                    case 928:
                        this.userCombatant.statusEffect('Take Credit',this.effect[0])
                    break
                    case 929:
                        this.userManager.hand.retain2(this.effect[0])
                    break
                    case 932:
                        this.userManager.allGroupEffectArgs(1,[this.effect[0]])
                    break
                    case 949:
                        this.battle.overlayManager.overlays[6][this.player].active=true
                        this.battle.overlayManager.overlays[6][this.player].activate([0,3,1])
                    break
                    case 970:
                        this.userManager.hand.exhaust(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Spark',types.card),0,0)
                        }
                    break
                    case 982:
                        this.userManager.hand.randomEffect(13)
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,3,0])
                    break
                    case 983:
                        this.userManager.hand.randomEffect(13)
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([1,3,0])
                    break
                    case 1005:
                        this.userCombatant.statusEffect('Upgrade Created',1)
                    break
                    case 1016:
                        this.userManager.hand.discard(this.effect[0])
                        this.userManager.hand.add(findName('Slidebuffer',types.card),this.level,this.color)
                    break
                    case 1026:
                        this.battle.energy.main[this.user]+=this.effect[0]
                        this.userManager.swap(1,3)
                        this.userManager.draw(this.effect[1])
                    break
                    case 1032:
                        this.userManager.draw(this.effect[0])
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                    break
                    case 1042:
                        this.userManager.hand.free2(this.effect[0])
                    break
                    case 1044:
                        this.userManager.drawBottom(this.effect[0])
                    break
                    case 1045:
                        this.userManager.discard.allEffectArgs(3,[this.effect[0]])
                    break
                    case 1062:
                        this.userManager.draw(this.effect[0])
                        this.userCombatant.statusEffect('Free Card',this.effect[1])
                    break
                    case 1064:
                        this.userCombatant.statusEffect('Strength',this.userManager.hand.cards.lenght*this.effect[0])
                        this.userManager.hand.allEffect(22)
                    break
                    case 1065:
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.allEffect(17)
                    break
                    case 1066:
                        if(this.targetCombatant.team==0){
                            this.userCombatant.statusEffect('Strength',this.effect[0])
                            this.targetCombatant.statusEffect('Strength',this.effect[0])
                        }
                    break
                    case 1067:
                        this.battle.turnManager.loadEnemySudoku(this.targetCombatant.id)
                    break
                    case 1078:
                        this.userCombatant.ammo+=this.userManager.hand.cards.length*this.effect[0]
                        this.userManager.hand.allEffect(22)
                    break
                    case 1088:
                        this.userCombatant.statusEffect('Take Credit Turn',this.effect[0])
                    break
                    case 1095:
                        let amount5=this.userManager.hand.cards.length
                        this.userManager.allEffect(2,1)
                        this.userManager.draw(amount5)
                        this.userManager.hand.add(findName('Redraw',types.card),this.level,0)
                    break
                    case 1096:
                        this.battle.drop(this.player,findName('Magic\nTrick Card',types.card),this.level,0)
                        this.battle.dropDraw(this.player,findName('Magic\nTrick Card',types.card),this.level,0)
                    break
                    case 1098:
                        this.battle.overlayManager.overlays[31][this.player].active=true
                        this.battle.overlayManager.overlays[31][this.player].activate()
                    break
                    case 1109:
                        this.userCombatant.statusEffect('Take Credit Block Turn',this.effect[0])
                    break
                    case 1110:
                        this.battle.overlayManager.overlays[32][this.player].active=true
                        this.battle.overlayManager.overlays[32][this.player].activate([0,3,1])
                    break
                    case 1120:
                        this.userManager.hand.allEffectArgs(4,[this.effect[0]])
                    break
                    case 1121:
                        this.userManager.hand.allEffect(38)
                    break
                    case 1134:
                        this.battle.overlayManager.overlays[14][this.player].active=true
                        this.battle.overlayManager.overlays[14][this.player].activate([])
                    break
                    case 1151:
                        this.battle.overlayManager.overlays[33][this.player].active=true
                        this.battle.overlayManager.overlays[33][this.player].activate([this.effect[0]])
                    break
                    case 1152:
                        this.battle.overlayManager.overlays[34][this.player].active=true
                        this.battle.overlayManager.overlays[34][this.player].activate([this.effect[0]])
                    break
                    case 1158:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomCompleteAllContain(2,this.level,['Strike','strike'])
                        }
                    break
                    case 1177:
                        this.userManager.exhaust.send(this.userManager.hand.cards,0,-1,1)
                    break
                    case 1184:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomCompleteAllContain(2,this.level,['Ball','ball'])
                        }
                    break
                    case 1201:
                        if(this.userCombatant.luckCheck){
                            this.userCombatant.enterStance(5)
                        }else{
                            this.userCombatant.enterStance(floor(random(1,6)))
                        }
                    break
                    case 1214:
                        this.userManager.baseDrops+=this.effect[0]
                    break
                    case 1221:
                        if(variants.blackjack){
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.cardManagers[this.turn.main].draw(1)
                                this.cardManagers[this.turn.main].drops+=this.userCombatant.luckCheck()?6:floor(random(1,7))
                                this.cardManagers[this.turn.main].allEffect(2,40)
                            }
                            if(this.cardManagers[this.turn.main].drops>this.cardManagers[this.turn.main].baseDrops){
                                this.cardManagers[this.turn.main].drops=this.cardManagers[this.turn.main].baseDrops
                            }
                            if(this.cardManagers[this.turn.main].drops==this.cardManagers[this.turn.main].baseDrops){
                                this.cardManagers[this.turn.main].drawPrice(1,0)
                            }
                        }else{
                            this.userManager.draw(1)
                        }
                    break
                    case 1224:
                        this.battle.overlayManager.overlays[37][this.player].active=true
                        this.battle.overlayManager.overlays[37][this.player].activate()
                    break
                    case 1225:
                        this.userManager.hand.exhaustSlot(this.effect[0])
                        this.userManager.hand.add(findName('Slot\nShift',types.card),0,0)
                    break
                    case 1226:
                        if(floor(random(0,2))==0||this.userCombatant.luckCheck()){
                            this.battle.overlayManager.overlays[8][this.player].active=true
                            this.battle.overlayManager.overlays[8][this.player].activate()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1227:
                        if(this.userManager.reserve.cards.length>0){
                            let index=floor(random(0,this.userManager.reserve.cards.length))
                            this.userManager.reserve.send(this.userManager.hand.cards,index,index+1,1)
                        }
                    break
                    case 1237:
                        this.userManager.allEffect(2,43)
                    break
                    case 1249:
                        this.userManager.hand.allEffectArgs(8,[this.effect[0]])
                    break
                    case 1250:
                        this.userManager.hand.allEffectArgs(8,[this.energy+this.effect[0]])
                    break
                    case 1253:
                        if(floor(random(0,4))!=0||this.userCombatant.luckCheck()){
                            this.battle.overlayManager.overlays[8][this.player].active=true
                            this.battle.overlayManager.overlays[8][this.player].activate()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1254:
                        if(floor(random(0,10))!=0||this.userCombatant.luckCheck()){
                            this.battle.overlayManager.overlays[8][this.player].active=true
                            this.battle.overlayManager.overlays[8][this.player].activate()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1282:
                        this.userManager.deck.randomEffect(18,[this.effect[0]])
                    break
                    case 1289:
                        this.battle.overlayManager.overlays[28][this.player].active=true
                        this.battle.overlayManager.overlays[28][this.player].activate()
                    break
                    case 1303:
                        this.userManager.drawRarity(this.effect[0])
                        this.userManager.hand.discard(this.effect[1])
                    break
                    case 1326:
                        this.battle.overlayManager.overlays[40][this.player].active=true
                        this.battle.overlayManager.overlays[40][this.player].activate()
                    break
                    case 1333:
                        if(this.userCombatant.compression>=5){
                            this.userManager.draw(this.effect[0])
                            this.userCombatant.compression-=5
                        }
                    break
                    case 1361:
                        let index=floor(random(0,this.userManager.listing.allPlayerCard[3].length))
                        this.userManager.deck.add(this.userManager.listing.allPlayerCard[3][index],0,types.card[this.userManager.listing.allPlayerCard[3][index]].list)
                        this.battle.overlayManager.overlays[6][this.player].active=true
                        this.battle.overlayManager.overlays[6][this.player].activate([0,3,1])
                    break
                    case 1363:
                        this.userCombatant.statusEffect('Energy Next Turn',this.amplify?this.effect[1]:this.effect[0])
                    break
                    case 1378:
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.discard(this.effect[1])
                        this.userCombatant.statusEffect('Burn',this.effect[2])
                    break
                    case 1379:
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.discard(this.effect[1])
                        this.userCombatant.statusEffect('Freeze',this.effect[2])
                    break
                    case 1380:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomCompleteAllClassFree(2,0,4,0)
                        }
                    break
                    case 1384:
                        if(this.battle.currency.money[this.player]>=this.effect[0]){
                            this.battle.loseCurrency(this.effect[0],this.player)
                            this.battle.overlayManager.overlays[7][this.player].active=true
                            this.battle.overlayManager.overlays[7][this.player].activate()
                        }
                    break
                    case 1392:
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.reserve(this.effect[1])
                    break
                    case 1420:
                        this.userManager.hand.allEffect(49)
                    break
                    case 1422:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.allEffect(2,14)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1473:
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.userManager.hand.duplicate(this.effect[0]*2)
                        }else{
                            this.userManager.hand.duplicate(this.effect[0])
                        }
                    break
                    case 1491:
                        this.userCombatant.statusEffect('Free Card',this.effect[0])
                        this.userManager.hand.duplicate(this.effect[1])
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
                        this.userManager.draw(this.effect[1])
                    break
                    case -33:
                        this.userCombatant.takeDamage(this.effect[0])
                        this.userCombatant.statusEffect('Cannot Move',this.effect[1])
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
                        this.battle.addCurrency(this.effect[0],this.player)
                        this.battle.loseCurrency(this.effect[0],this.targetCombatant.id)
                    break
                    case 166:
                        this.userManager.hand.add(findName('Riot\nShield',types.card),0,this.color)
                        this.userManager.hand.add(findName('Pepper\nSpray',types.card),0,this.color)
                        this.userManager.hand.add(findName('Shock\nBaton',types.card),0,this.color)
                    break
                    case 167:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Riot\nShield',types.card),1,this.color)
                            this.userManager.hand.add(findName('Pepper\nSpray',types.card),1,this.color)
                            this.userManager.hand.add(findName('Shock\nBaton',types.card),1,this.color)
                        }else{
                            this.number=floor(random(0,3))
                            this.userManager.hand.add(findName('Riot\nShield',types.card),this.number==0?1:0,this.color)
                            this.userManager.hand.add(findName('Pepper\nSpray',types.card),this.number==1?1:0,this.color)
                            this.userManager.hand.add(findName('Shock\nBaton',types.card),this.number==2?1:0,this.color)
                        }
                    break
                    case 168:
                        this.userManager.hand.add(findName('Flamethrower',types.card),0,this.color)
                        this.userManager.hand.add(findName('Impact\nGrenade',types.card),0,this.color)
                        this.userManager.hand.add(findName('Safemine',types.card),0,this.color)
                    break
                    case 169:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Flamethrower',types.card),1,this.color)
                            this.userManager.hand.add(findName('Impact\nGrenade',types.card),1,this.color)
                            this.userManager.hand.add(findName('Safemine',types.card),1,this.color)
                        }else{
                            this.number=floor(random(0,3))
                            this.userManager.hand.add(findName('Flamethrower',types.card),this.number==0?1:0,this.color)
                            this.userManager.hand.add(findName('Impact\nGrenade',types.card),this.number==1?1:0,this.color)
                            this.userManager.hand.add(findName('Safemine',types.card),this.number==2?1:0,this.color)
                        }
                    break
                    case 170:
                        this.userManager.hand.add(findName('Submachine',types.card),0,this.color)
                        this.userManager.hand.add(findName('Antitank\nRocket',types.card),0,this.color)
                        this.userManager.hand.add(findName('Ammo\nBox',types.card),0,this.color)
                    break
                    case 171:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Submachine',types.card),1,this.color)
                            this.userManager.hand.add(findName('Antitank\nRocket',types.card),1,this.color)
                            this.userManager.hand.add(findName('Ammo\nBox',types.card),1,this.color)
                        }else{
                            this.number=floor(random(0,3))
                            this.userManager.hand.add(findName('Submachine',types.card),this.number==0?1:0,this.color)
                            this.userManager.hand.add(findName('Antitank\nRocket',types.card),this.number==1?1:0,this.color)
                            this.userManager.hand.add(findName('Ammo\nBox',types.card),this.number==2?1:0,this.color)
                        }
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
                        this.userManager.allEffect(2,5)
                    break
                    case 641:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Riot\nShield',types.card),1,this.color)
                            this.userManager.hand.add(findName('Pepper\nSpray',types.card),1,this.color)
                            this.userManager.hand.add(findName('Shock\nBaton',types.card),1,this.color)
                        }else{
                            this.number=floor(random(0,3))
                            this.userManager.hand.add(findName('Riot\nShield',types.card),this.number==0?0:1,this.color)
                            this.userManager.hand.add(findName('Pepper\nSpray',types.card),this.number==1?0:1,this.color)
                            this.userManager.hand.add(findName('Shock\nBaton',types.card),this.number==2?0:1,this.color)
                        }
                    break
                    case 642:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Flamethrower',types.card),1,this.color)
                            this.userManager.hand.add(findName('Impact\nGrenade',types.card),1,this.color)
                            this.userManager.hand.add(findName('Safemine',types.card),1,this.color)
                        }else{
                            this.number=floor(random(0,3))
                            this.userManager.hand.add(findName('Flamethrower',types.card),this.number==0?0:1,this.color)
                            this.userManager.hand.add(findName('Impact\nGrenade',types.card),this.number==1?0:1,this.color)
                            this.userManager.hand.add(findName('Safemine',types.card),this.number==2?0:1,this.color)
                        }
                    break
                    case 643:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Submachine',types.card),1,this.color)
                            this.userManager.hand.add(findName('Antitank\nRocket',types.card),1,this.color)
                            this.userManager.hand.add(findName('Ammo\nBox',types.card),1,this.color)
                        }else{
                            this.number=floor(random(0,3))
                            this.userManager.hand.add(findName('Submachine',types.card),this.number==0?0:1,this.color)
                            this.userManager.hand.add(findName('Antitank\nRocket',types.card),this.number==1?0:1,this.color)
                            this.userManager.hand.add(findName('Ammo\nBox',types.card),this.number==2?0:1,this.color)
                        }
                    break
                    case 659:
                        this.userCombatant.gainMaxHP(this.effect[0]*this.energy+this.effect[1])
                    break
                    case 924:
                        this.targetCombatant.block=0
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                    break
                    case 952:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,0,9,2])
                    break
                    case 953:
                        this.userManager.hand.add(findName('White\nDwarf',types.card),1,0)
                        this.userManager.hand.add(findName('Black\nDwarf',types.card),1,0)
                    break
                    case 954:
                        this.userManager.hand.add(findName('White\nDwarf',types.card),2,0)
                        this.userManager.hand.add(findName('Black\nDwarf',types.card),2,0)
                    break
                    case 960:
                        this.userManager.hand.add(findName('Fire\nBall',types.card),0,this.color)
                        this.userManager.hand.add(findName('Water\nBall',types.card),0,this.color)
                        this.userManager.hand.add(findName('Grass\nBall',types.card),0,this.color)
                    break
                    case 961:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Fire\nBall',types.card),1,this.color)
                            this.userManager.hand.add(findName('Water\nBall',types.card),1,this.color)
                            this.userManager.hand.add(findName('Grass\nBall',types.card),1,this.color)
                        }else{
                            this.number=floor(random(0,3))
                            this.userManager.hand.add(findName('Fire\nBall',types.card),this.number==0?1:0,this.color)
                            this.userManager.hand.add(findName('Water\nBall',types.card),this.number==1?1:0,this.color)
                            this.userManager.hand.add(findName('Grass\nBall',types.card),this.number==2?1:0,this.color)
                        }
                    break
                    case 962:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Fire\nBall',types.card),1,this.color)
                            this.userManager.hand.add(findName('Water\nBall',types.card),1,this.color)
                            this.userManager.hand.add(findName('Grass\nBall',types.card),1,this.color)
                        }else{
                            this.number=floor(random(0,3))
                            this.userManager.hand.add(findName('Fire\nBall',types.card),this.number==0?0:1,this.color)
                            this.userManager.hand.add(findName('Water\nBall',types.card),this.number==1?0:1,this.color)
                            this.userManager.hand.add(findName('Grass\nBall',types.card),this.number==2?0:1,this.color)
                        }
                    break
                    case 984:
                        this.userCombatant.statusEffect('Random Defense Per Turn',1)
                    break
                    case 985:
                        this.userCombatant.statusEffect('Random Upgraded Defense Per Turn',1)
                    break
                    case 1021:
                        this.userManager.allEffect(2,1)
                        this.userCombatant.statusEffect('Vulnerable',this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Anger\nPunch',types.card),0,0)
                        }
                    break
                    case 1041:
                        this.userManager.allGroupEffectArgs(2,[this.effect[0]])
                    break
                    case 1043:
                        this.userManager.allGroupEffect(36)
                    break
                    case 1101:
                        this.userCombatant.statusEffect('Damage Dealt Currency',1)
                    break
                    case 1102:
                        this.userCombatant.heal(this.effect[0])
                        this.userCombatant.statusEffect('Attack Regeneration',this.effect[1])
                    break
                    case 1112:
                        this.userCombatant.statusEffect('Double Damage Turn',1)
                        this.userCombatant.life-=this.effect[0]
                    break
                    case 1186:
                        this.userCombatant.setMaxHP(999999)
                    break
                    case 1203:
                        this.userManager.hand.add(findName('Build\nWall',types.card),0,this.color)
                        this.userManager.hand.add(findName('MobJustice',types.card),0,this.color)
                        this.userManager.hand.add(findName('Indictment',types.card),0,this.color)
                    break
                    case 1204:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Build\nWall',types.card),1,this.color)
                            this.userManager.hand.add(findName('MobJustice',types.card),1,this.color)
                            this.userManager.hand.add(findName('Indictment',types.card),1,this.color)
                        }else{
                            this.number=floor(random(0,3))
                            this.userManager.hand.add(findName('Build\nWall',types.card),this.number==0?1:0,this.color)
                            this.userManager.hand.add(findName('MobJustice',types.card),this.number==1?1:0,this.color)
                            this.userManager.hand.add(findName('Indictment',types.card),this.number==2?1:0,this.color)
                        }
                    break
                    case 1205:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Build\nWall',types.card),1,this.color)
                            this.userManager.hand.add(findName('MobJustice',types.card),1,this.color)
                            this.userManager.hand.add(findName('Indictment',types.card),1,this.color)
                        }else{
                            this.number=floor(random(0,3))
                            this.userManager.hand.add(findName('Build\nWall',types.card),this.number==0?0:1,this.color)
                            this.userManager.hand.add(findName('MobJustice',types.card),this.number==1?0:1,this.color)
                            this.userManager.hand.add(findName('Indictment',types.card),this.number==2?0:1,this.color)
                        }
                    break
                    case 1230:
                        this.userCombatant.heal(this.effect[0])
                        if(this.userCombatant.base.life<=this.userCombatant.life){
                            this.battle.combatantManager.damageAreaID(this.effect[1],-1,this.userCombatant.id,this.userCombatant.tilePosition)
                        }
                    break
                    case 1235:
                        this.userCombatant.statusEffect('Rizz',this.effect[0])
                    break
                    case 1236:
                        this.userManager.hand.add(findName('White\nDwarf',types.card),this.level,0)
                        this.userManager.hand.add(findName('Black\nDwarf',types.card),this.level,0)
                    break
                    case 1287:
                        this.userCombatant.statusEffect('Double Exhaust',this.effect[0])
                    break
                    case 1322:
                        this.userCombatant.heal(this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                    case 1325:
                        if(this.battle.energy.main[this.player]>=1&&this.battle.energy.main[this.player]<=6){
                            if(this.userCombatant.luckCheck()){
                                this.battle.energy.main[this.player]=6
                            }else{
                                let list=[0,1,2,3,4,5,6]
                                let index=list.indexOf(this.battle.energy.main[this.player])
                                list.splice(index,1)
                                list.splice(list.indexOf(7-this.battle.energy.main[this.player]),1)
                                this.battle.energy.main[this.player]=list[floor(random(0,list.length))]
                            }
                        }
                    break
                    case 1331:
                        for(let a=0,la=5;a<la;a++){
                            this.battle.dropDrawShuffle(this.battle.players-1-this.player,findName(`${a+1} of Blood\nHearts`,types.card),0,0)
                        }
                    break
                    case 1370:
                        this.userCombatant.heal(this.effect[0])
                        this.userCombatant.charge+=this.effect[1]
                    break
                    case 1388:
                        if(this.energy>=2){
                            this.userCombatant.heal(this.effect[0])
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userManager.randomEffect(2,0)
                            }
                        }
                    break
                    case 1415:
                        if(this.userManager.hand.totalCost()==this.effect[0]){
                            this.userManager.draw(this.effect[1])
                            this.userManager.duplicate(this.effect[2])
                        }
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
                        this.userManager.hand.discard(this.effect[2])
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
                    case 1157:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.getStatus('Bleed')>0){
                            this.targetCombatant.life-=this.targetCombatant.getStatus('Bleed')
                        }
                    break
                    case 1188:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userCombatant.balance,this.user)
                    break
                    case 1194:
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                    break
                    case 1195:
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                    break
                    case 1196:
                        this.targetCombatant.statusEffect('Stun',this.effect[0])
                    break
                    case 1197:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                    break
                    case 1198:
                        this.userCombatant.statusEffect('Dexterity',this.effect[0])
                    break
                    case 1199:
                        this.userCombatant.statusEffect('Buffer',this.effect[0])
                    break
                    case 1212:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userManager.drops==this.userManager.baseDrops?3:1),this.user)
                    break
                    case 1297:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.addBlock(this.effect[1])
                            this.userCombatant.statusEffect('Counter All',this.effect[2])
                        }
                    break
                    case 1332:
                        this.targetCombatant.takeDamage(this.effect[1],this.user)
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[2])
                        }
                    break
                    case 1358:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 1427:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.statusEffect('',this.effect[0])
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                            this.userManager.draw(this.effect[2])
                        }else if(floor(random(0,2))==0){
                            this.targetCombatant.statusEffect('',this.effect[0])
                        }else{
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 1428:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.statusEffect('Freeze',this.effect[0])
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                            this.userManager.draw(this.effect[2])
                        }else if(floor(random(0,2))==0){
                            this.targetCombatant.statusEffect('Freeze',this.effect[0])
                        }else{
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 1463:
                        this.targetCombatant.heal(this.effect[0])
                        this.targetCombatant.statusEffect('Poison',this.effect[1])
                    break
                    case 1474:
                        this.targetCombatant.statusEffect('Half Damage Turn',this.effect[0])
                    break
                }
            break
            case 7:
                switch(this.type){
                    case 38: case 1255: case 1348:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[1])
                        }
                    break
                    case 79:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.discard.add(findName('Ouroboros',types.card),0,0)
                        this.userManager.discard.cards[this.userManager.discard.cards.length-1].effect[0]=this.effect[0]+2
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
                        this.userManager.allEffect(2,13)
                    break
                    case 162:
                        this.targetCombatant.statusEffect('Buffer',this.effect[0])
                    break
                    case 163:
                        this.userManager.deStatus(this.effect[0])
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
                                this.userManager.hand.add(findName('Shiv',types.card),0,0)
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
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.hand.cards.length,this.user)
                        this.userManager.allEffect(2,22)
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
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 592:
                        this.targetCombatant.status.main[findList('Strength',this.targetCombatant.status.name)]=0
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                    break
                    case 620:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Spike Pillar',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 621:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Projector',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 622:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 623:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Readout',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 624:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Strengthener',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 626:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Explosive Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 627:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Multiturret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 628:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Barbed Pillar',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 629:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Gun Rack',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 630:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Repulse Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 631:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Machine Gun',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
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
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 686:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Metal Box',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 687:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Upgrader',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 688:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Transformer',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 695:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Doubler',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 696:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Exhauster',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 697:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.turnManager.loadEnemyRandomMove(this.targetCombatant.id)
                    break
                    case 700:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Teleporter Start',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Use Teleporter\nStart',types.card),0,0)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 701:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Teleporter End',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Use Teleporter\nEnd',types.card),0,0)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 702:
                        this.userManager.hand.add(findName('Proxy\nTeleport',types.card),0,0)
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
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].name=='Burn'){
                                burns++
                            }
                        }
                        this.targetCombatant.takeDamage((this.effect[0]+burns*this.effect[1])*(this.amplify?2:1),this.user)
                    break
                    case 843:
                        this.targetCombatant.takeDamage(this.effect[0]*floor(this.battle.relicManager.total[this.player]/this.effect[1]),this.user)
                    break
                    case 846:
                        let attacks=[]
                        for(let a=0,la=this.effect[0];a<la;a++){
                            if(this.userManager.reserve.cards.length>0){
                                this.userManager.reserve.cards.splice(0,1)
                                a--
                                la--
                                if(this.userManager.reserve.cards[0].class==1){
                                    attacks++
                                }
                            }
                        }
                        if(attacks>0){
                            this.targetCombatant.takeDamage(this.effect[1]*attacks,this.user)
                        }
                    break
                    case 850:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userManager.exhaust.cards.length,this.user)
                    break
                    case 857: case 1248:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 865:
                        this.targetCombatant.takeDamage(this.amplify?this.battle.energy.main[this.player]*this.effect[0]:this.userManager.hand.cards.length+this.effect[0],this.user)
                    break
                    case 877:
                        let card=this.userManager.addRandomClassReturn(2,0,1)
                        if(card.effect.length>0){
                            this.targetCombatant.takeDamage(card.effect[0],this.user)
                        }
                    break
                    case 878:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.combatantManager.damageAreaID(this.effect[1],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
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
                            this.userManager.hand.allEffectArgs(0,[prelife2-this.targetCombatant.life])
                        }
                    break
                    case 902:
                        this.targetCombatant.takeDamage(this.amplify?this.effect[1]:this.effect[0],this.user)
                        this.targetCombatant.removeRandomStatus([0,2])
                    break
                    case 903:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.exhaust(this.effect[1])
                        this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                    break
                    case 905:
                        if(this.amplify){
                            this.battle.combatantManager.allEffect(16,[this.effect[0]])
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
                        this.userManager.hand.add(findName('Spark',types.card),0,0)
                        this.userManager.hand.add(findName('Rising\nSweep',types.card),0,this.color)
                        this.userManager.hand.add(findName('Leyline',types.card),0,this.color)
                    break
                    case 944:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.add(findName('Spark',types.card),1,0)
                        this.userManager.hand.add(findName('Rising\nSweep',types.card),1,this.color)
                        this.userManager.hand.add(findName('Leyline',types.card),1,this.color)
                    break
                    case 964:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.charge>0){
                            this.userCombatant.chargeConsumed()
                        }
                        this.userCombatant.charge=0
                    break
                    case 965:
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.targetCombatant.takeDamage(this.effect[0]*3,this.user)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 980:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.cardNumber('Burn'),this.user)
                    break
                    case 1028:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.draw(this.effect[1])
                        this.userManager.hand.badreserve(this.effect[2])
                    break
                    case 1046:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.loseCurrency(this.effect[1],this.player)
                    break
                    case 1059:
                        this.battle.combatantManager.allEffect(18,[this.targetCombatant.id])
                    break
                    case 1070:
                        let index2=findName(`Build\n${this.targetCombatant.name}`,types.card)
                        if(index2>=0){
                            this.userManager.hand.add(index2,0,types.card[index2].list)
                        }
                    break
                    case 1071:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('AllyMonkey',types.combatant),this.battle.players+1,this.direction,this.user)
                    break
                    case 1075:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.dropDraw(this.player,findName('Impending\nDoom',types.card),this.level,game.playerNumber+1)
                    break
                    case 1097:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(max(this.effect[0],this.effect[2]),this.user)
                            this.userCombatant.heal(this.effect[1])
                            this.userCombatant.addBlock(this.effect[3])
                        }else if(floor(random(0,2))==0){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.userCombatant.heal(this.effect[1])
                        }else{
                            this.targetCombatant.takeDamage(this.effect[2],this.user)
                            this.userCombatant.addBlock(this.effect[3])
                        }
                    break
                    case 1111:
                        this.userCombatant.statusEffect('Control',999)
                        this.targetCombatant.statusEffect('Anti-Control',999)
                    break
                    case 1119:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Antizone',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(this.effect[0]!=1){
                            this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].base.life*=this.effect[0]
                            this.battle.combatantManager.combatants[this.battle.combatantManager.combatants.length-1].life*=this.effect[0]
                        }
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 1139:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 1150:
                        this.targetCombatant.statusEffect('Ichor',this.effect[0])
                    break
                    case 1156:
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                        this.targetCombatant.statusEffect('Frail',this.effect[1])
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[2])
                        this.targetCombatant.statusEffect('Poison',this.effect[3])
                    break
                    case 1162:
                        if(this.energy>=this.effect[1]){
                            this.targetCombatant.statusEffect('Poison',this.effect[0])
                        }
                    break
                    case 1163:
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                        if(this.targetCombatant.getStatus('Poison')>0){
                            this.targetCombatant.life-=this.targetCombatant.getStatus('Poison')
                        }
                    break
                    case 1168:
                        this.battle.turnManager.loadEnemyMove(this.targetCombatant.id)
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                    break
                    case 1182:
                        this.targetCombatant.heal(this.effect[0])
                        this.battle.energy.main[this.player]+=this.effect[1]
                        if(this.targetCombatant.life>=this.targetCombatant.base.life){
                            this.battle.loseCurrency(this.effect[0],this.player)
                        }
                    break
                    case 1185:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Rewriter',types.combatant),this.battle.players+1,this.direction,this.user)
                    break
                    case 1189:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 1211:
                        let roll=this.userCombatant.luckCheck()?1:floor(random(0,2))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.energy.main[this.player]+=this.effect[1]*(-1+roll*2)
                        if(roll==0){
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1232:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Mirror Shield',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 1244:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[0])
                        }
                    break
                    case 1247:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.energy==4){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                    break
                    case 1252:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(floor(random(0,10))==0||this.userCombatant.luckCheck()){
                            this.userCombatant.statusEffect('Double Damage',this.effect[1])
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1256:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1){
                            this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[0])
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1258:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.energy%2==0){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }
                        for(let a=0,la=this.effect[3];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[2])
                    break
                    case 1259:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.energy.main[this.player]+=this.effect[1]
                        for(let a=0,la=this.effect[3];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[2])
                    break
                    case 1261:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.heal(this.effect[1])
                        for(let a=0,la=this.effect[3];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[2])
                    break
                    case 1262:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.draw(this.effect[1])
                        this.battle.energy.main[this.player]+=this.effect[2]
                    break
                    case 1263:
                        this.targetCombatant.statusEffect('Bleed',this.effect[0])
                        this.targetCombatant.statusEffect('Poison',this.effect[1])
                        this.targetCombatant.statusEffect('Burn',this.effect[2])
                        this.targetCombatant.statusEffect('Shock',this.effect[3])
                        this.targetCombatant.statusEffect('Weak',this.effect[4])
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[5])
                        this.targetCombatant.statusEffect('Frail',this.effect[6])
                        this.targetCombatant.statusEffect('Freeze',this.effect[7])
                    break
                    case 1266:
                        let total=0
                        let luckCheck=this.userCombatant.luckCheck()
                        for(let a=0,la=this.effect[0]+this.userManager.hand.cards.length;a<la;a++){
                            let roll=luckCheck?3:floor(random(1,4))
                            this.battle.particleManager.createAuxNumber(this.userCombatant.position.x,this.userCombatant.position.y,roll)
                            total+=roll
                        }
                        if(total<(this.effect[0]+this.userManager.hand.cards.length)*2){
                            this.userCombatant.lowRoll()
                        }
                        this.targetCombatant.takeDamage(total,this.user)
                        this.userManager.hand.allEffect(2)
                    break
                    case 1273:
                        let total2=0
                        for(let a=0,la=this.targetCombatant.status.main.length;a<la;a++){
                            total2+=abs(this.targetCombatant.status.main[a])
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*total2,this.user)
                    break
                    case 1279:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.randomStatusInstant(this.effect[1],[1])
                    break
                    case 1280:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.randomStatusInstant(this.effect[1],[1])
                        this.userCombatant.randomStatusInstant(this.effect[2],[1])                            
                    break
                    case 1285:
                        this.targetCombatant.takeDamage(this.effect[1],this.user)
                        this.targetCombatant.randomStatusInstant(this.effect[2],[1])
                    break
                    case 1298:
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.userCombatant.heal(this.effect[2])
                        }
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 1308:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.randomStatusInstant(this.effect[1],[0])
                    break
                    case 1310:
                        if(this.userCombatant.charge>=this.effect[3]){
                            this.userCombatant.charge-=this.effect[3]
                            this.battle.energy.main[this.player]+=this.effect[4]
                        }
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1313:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.allEffect(46)
                    break
                    case 1316:
                        if(this.energy>=4){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                        }
                    break
                    case 1334:
                        this.targetCombatant.statusEffect('Jinx',this.effect[0]*this.energy)
                    break
                    case 1335:
                        this.targetCombatant.statusEffect('Jinx',this.effect[0])
                    break
                    case 1336:
                        this.targetCombatant.takeDamage(this.targetCombatant.getStatus('Jinx')*this.effect[0]/10,this.user)
                    break
                    case 1337:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.blocked<=1){
                            this.targetCombatant.statusEffect('Miss',this.effect[1])
                        }
                    break
                    case 1342:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Half Damage Turn',this.effect[1])
                    break
                    case 1344:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.deCardValueless('Burn'),this.user)
                    break
                    case 1346:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Armored Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                    break
                    case 1352:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,this.limit,this.battle.players+1,this.direction,this.user)
                    break
                    case 1353:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetDistance==1?2:1),this.user)
                    break
                    case 1359:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.energy==4){
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                        }
                    break
                    case 1360:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.energy==4){
                            this.targetCombatant.statusEffect('Freeze',this.effect[1])
                        }
                    break
                    case 1362:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetDistance==3){
                            this.userCombatant.charge+=this.effect[1]
                        }
                    break
                    case 1376:
                        if(this.userManager.hand.allEffectArgs(9,[2,this.effect[0]])==this.effect[0]){
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                        }
                    break
                    case 1383:
                        this.targetTile.addType(27)
                    break
                    case 1400:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.heal(this.effect[1])
                        this.targetCombatant.statusEffect('Cannot Move',this.effect[2])
                    break
                    case 1405:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                        this.targetCombatant.randomStatusInstant(this.effect[2],[1])                            
                        this.targetCombatant.randomStatusInstant(this.effect[3],[1])                            
                    break
                    case 1410:
                        this.targetCombatant.statusEffect('Wet',this.effect[0])
                    break
                    case 1411:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.drawSetCost(this.effect[1],0)
                    break
                    case 1412:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.drawSetCost(this.effect[1],1)
                    break
                    case 1413:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.drawClass(this.effect[1],4)
                    break
                    case 1418:
                        if(this.energy>=4){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.statusEffect('Temporary Draw',this.effect[1])
                        }
                    break
                    case 1425:
                        this.targetCombatant.takeDamage(this.effect[0]*this.battle.turn.total,this.user)
                    break
                    case 1426:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                        this.targetCombatant.statusEffect(['Freeze','Burn'][this.energy%2],this.effect[1])
                    break
                    case 1430:
                        this.targetCombatant.randomStatusInstant(this.effect[0],[1])
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[2])
                    break
                    case 1431:
                        this.targetCombatant.randomStatusInstant(this.effect[0],[1])
                        this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[2])
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[3])
                    break
                    case 1434:
                        this.targetCombatant.statusEffect('Burn',this.effect[0])
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1435:
                        this.targetCombatant.statusEffect('Freeze',this.effect[0])
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1437:
                        if(this.energy>=4){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.statusEffect('Freeze',this.effect[1])
                        }
                    break
                    case 1441:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.energy%2==1){
                            this.targetCombatant.statusEffect('Freeze',this.effect[1])
                        }
                    break
                    case 1442:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.energy%2==0){
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                        }
                    break
                    case 1443:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Freeze',this.effect[1])
                    break
                    case 1444:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 1451:
                        this.targetCombatant.statusEffect('Freeze',this.effect[0])
                    break
                    case 1452:
                        this.targetCombatant.multiplyStatus('Freeze',this.effect[0])
                    break
                    case 1454:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.blocked<=1){
                            this.userCombatant.statusEffect('Miss',this.effect[1])
                        }
                    break
                    case 1455:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 1469:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Fat Duck',types.combatant),this.battle.players+1,this.direction,this.user)
                    break
                    case 1471:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.energy==2){
                            this.userCombatant.charge+=this.effect[1]
                        }
                    break
                    case 1472:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.addRandomCompleteAllEnd(2,this.level,['Pot'])
                    break
                    case 1479:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Freeze',this.effect[2])
                    break
                    case 1480:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Burn',this.effect[2])
                    break
                    case 1481:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Freeze',this.effect[1])
                        this.userCombatant.heal(this.targetCombatant.getStatus('Freeze'))
                    break
                    case 1482:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                        this.userCombatant.heal(this.targetCombatant.getStatus('Burn'))
                    break
                    case 1483:
                        if(this.targetCombatant.getStatus('Freeze')>0){
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                        }
                        this.targetCombatant.statusEffect('Freeze',this.effect[0])
                    break
                    case 1484:
                        if(this.targetCombatant.getStatus('Burn')>0){
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                        }
                        this.targetCombatant.statusEffect('Burn',this.effect[0])
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
                        this.targetCombatant.takeDamage(this.effect[0])
                        this.targetCombatant.goal.anim.direction-=60
                        this.battle.updateTargetting()
                    break
                    case 466:
                        this.targetCombatant.takeDamage(this.effect[0])
                        this.targetCombatant.goal.anim.direction+=60
                        this.battle.updateTargetting()
                    break
                    case 467:
                        this.targetCombatant.takeDamage(this.effect[0])
                        this.targetCombatant.goal.anim.direction-=120
                        this.battle.updateTargetting()
                    break
                    case 468:
                        this.targetCombatant.takeDamage(this.effect[0])
                        this.targetCombatant.goal.anim.direction+=120
                        this.battle.updateTargetting()
                    break
                    case 1281:
                        this.targetCombatant.takeDamage(this.effect[0])
                        this.targetCombatant.goal.anim.direction+=-60+floor(random(0,2))*120
                        this.battle.updateTargetting()
                        if(floor(random(0,4))!=0||this.userCombatant.luckCheck()){
                            this.battle.energy.main[this.player]+=this.effect[1]
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1288:
                        let works=true
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].usable){
                                works=false
                            }
                        }
                        if(works){
                            this.targetCombatant.statusEffect('Miss',this.effect[0])
                        }
                    break
                    case 1320:
                        if(this.energy%2==0){
                            this.targetCombatant.statusEffect('Shock',this.effect[0])
                        }
                    break
                    case 1339:
                        if(this.energy==0){
                            this.targetCombatant.statusEffect('Burn',this.effect[0])
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1432:
                        if(this.energy==0){
                            this.targetCombatant.statusEffect('Freeze',this.effect[0])
                            this.userManager.draw(this.effect[1])
                        }
                    break
                }
            break
            case 9:
                switch(this.type){
                    case 634:
                        this.targetCombatant.takeDamage((abs(this.direction-this.targetCombatant.goal.anim.direction)<30||abs(this.direction-this.targetCombatant.goal.anim.direction-360)<30||abs(this.direction-this.targetCombatant.goal.anim.direction+360)<30)?this.effect[0]+this.effect[1]:this.effect[0],this.user,1)
                    break
                    case 1002:
                        this.targetCombatant.takeDamage(abs(this.relPos[0]-this.relPos[1]/2)<=0.5?this.effect[0]*2:this.effect[0],this.user,1)
                    break
                    case 1009:
                        if(floor(random(0,2))==0||this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1036:
                        this.targetCombatant.takeDamage(this.effect[0]+this.userCombatant.hand.cards.length,this.user,1)
                        if(abs(this.relPos[0]-this.relPos[1]/2)<=0.5){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1054:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*(this.targetDistance-1),this.user,1)
                    break
                    case 1171:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user,1)
                    break
                    default:
                        this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                    break
                }
                switch(this.type){
                    case 80: case 1406:
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
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1047:
                        this.userManager.draw(this.effect[1])
                        this.userManager.hand.duplicate(this.effect[2])
                    break
                    case 1052:
                        this.userManager.discard.sendSpec(this.userManager.hand.cards,25,this.effect[1])
                    break
                    case 1126:
                        if(this.targetCombatant.life>0){
                            this.userCombatant.ammo++
                        }
                    break
                    case 1149:
                        if(this.userCombatant.ammo>0){
                            this.userManager.hand.add(findName('Hold the\nTrigger',types.card),this.level,this.color)
                        }
                    break
                    case 1319:
                        this.userCombatant.statusEffect('Single Attack Strength',this.effect[1])
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
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
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
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 324:
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].name=='Shiv'){
                                this.userManager.hand.add(findName('Shiv',types.card),0,0)
                            }
                        }
                    break
                    case 325:
                        for(let a=0,la=min(ceil(this.effect[0]*this.energy),100);a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
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
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
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
                        this.userManager.deCard(1,'Unbuild')
                    break
                    case 710:
                        this.targetCombatant.life=0
                        let index2=findName(`Build\n${this.targetCombatant.name}`,types.card)
                        if(index2>=0){
                            this.userManager.hand.add(index2,0,types.card[index2].list)
                        }
                    break
                    case 792:
                        this.battle.dropDrawShuffleEffect(this.player,findName('Expunger',types.card),0,0,1,this.energy+this.effect[0])
                    break
                    case 845:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.dropDraw(this.player,findName('Dark\nMatter',types.card),0,this.color)
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
                            this.userManager.hand.add(findName('Scrap\nMetal',types.card),0,0)
                        }
                    break
                    case 936:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.tileManager.randomType(21)
                        }
                    break
                    case 941:
                        this.battle.addCurrency(this.effect[0],this.player)
                        this.userCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 969:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Spark',types.card),0,0)
                        }
                    break
                    case 1020:
                        this.userCombatant.ammo+=this.effect[0]
                    break
                    case 1099:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Queen of\nHearts',types.card),0,0)
                        }
                    break
                    case 1107:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            let roll=floor(random(0,8))
                            if(this.userCombatant.luckCheck()){
                                this.battle.addCurrency(10,this.player)
                                this.battle.itemManager.addRandomItem(this.player)
                                this.userCombatant.statusEffect('Strength',2)
                                this.userCombatant.statusEffect('Dexterity',2)
                                this.userCombatant.addBlock(5)
                                this.userCombatant.statusEffect('Buffer',1)
                                this.battle.energy.main[this.player]+=1
                                this.userManager.draw(2)
                            }else{
                                switch(roll){
                                    case 0: this.battle.addCurrency(10,this.player); break
                                    case 1: this.battle.itemManager.addRandomItem(this.player); break
                                    case 2: this.userCombatant.statusEffect('Strength',2); break
                                    case 3: this.userCombatant.statusEffect('Dexterity',2); break
                                    case 4: this.userCombatant.addBlock(5); break
                                    case 5: this.userCombatant.statusEffect('Buffer',1); break
                                    case 6: this.battle.energy.main[this.player]+=1; break
                                    case 7: this.userManager.draw(2); break
                                }
                            }
                        }
                    break
                    case 1132:
                        this.userManager.hand.exhaustBlock(this.effect[0])
                    break
                    case 1140:
                        this.userCombatant.ammo+=this.effect[0]
                        this.userCombatant.statusEffect('Regeneration',this.effect[1])
                        this.battle.attackManager.endAfter=true
                    break
                    case 1142:
                        this.userCombatant.ammo+=this.effect[0]
                        this.userManager.hand.upgrade(this.effect[1])
                    break
                    case 1190:
                        this.battle.addCurrency(this.effect[0],this.player)
                        this.battle.combatantManager.allEffect(3,[this.effect[1]])
                    break
                    case 1207:
                        this.battle.addCurrency(this.effect[0],this.player)
                        this.userManager.deck.add(findName('The\nDonald',types.card),0,0)
                    break
                    case 1218:
                        if(variants.altDraw){
                            this.userManager.drops+=this.effect[0]
                        }else{
                            this.userManager.draw(1)
                        }
                    break
                    case 1223:
                        this.userManager.hand.exhaust(this.effect[0])
                        if(variants.altDraw){
                            this.userManager.drops+=this.effect[1]
                        }
                    break
                    case 1245:
                        this.userCombatant.heal(this.effect[0])                        
                        this.userCombatant.statusEffect('Cannot Move',this.effect[1])
                    break
                    case 1276:
                        this.userCombatant.statusEffect('Shiv Range Up',this.effect[0])
                    break
                    case 1290:
                        transition.trigger=true
                        transition.scene='rest'
                        this.battle.optionManagers.forEach(optionManager=>optionManager.reset())
                        this.battle.altPhase=true
                    break
                    case 1299:
                        this.userCombatant.statusEffect('Draw Up',this.effect[0])
                        this.userCombatant.statusEffect('Miss',this.effect[1])
                    break
                    case 1300:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1317:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('6-Miracle',types.card),0,0)
                        }
                    break
                    case 1318:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Six\nShot',types.card),0,0)
                        }
                        this.userCombatant.ammo+=this.effect[1]
                    break
                    case 1329:
                        this.battle.addCurrency(this.effect[0],this.player)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.dropDrawShuffle(this.battle.players-1-this.player,findName('McDucknolds\nAdvertisement',types.card),0,0)
                        }
                    break
                    case 1338:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Miss')>0?3:1),this.user)
                    break
                    case 1340:
                        this.battle.currency.money[this.player]+=this.battle.currency.ss[this.player]*2
                        this.battle.currency.ss[this.player]=0
                    break
                    case 1341:
                        this.battle.addCurrency(this.limit[1],this.player)
                    break
                    case 1349:
                        if(this.battle.encounter.class!=2&&this.targetCombatant.team==0){
                            if(this.userManager.deck.add(findName('Container\nBall',types.card),0,0)){
                                this.userManager.deck.cards[this.userManager.deck.cards.length-1].limit=this.targetCombatant.type
                                this.targetCombatant.life=0
                            }
                        }
                    break
                    case 1364:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('6-Miracle',types.card),0,0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1368:
                        if(this.energy==0){
                            this.userCombatant.addBlock(this.effect[0])
                            this.userCombatant.heal(this.effect[1])
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 1371:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
                        }
                        this.userCombatant.statusEffect('Miss',this.effect[1])
                    break
                    case 1382:
                        this.userManager.hand.retain(this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                    case 1385:
                        this.userManager.hand.exhaustDamage(this.effect[0])
                    break
                    case 1414:
                        for(let a=0,la=this.userManager.pack.length;a<la;a++){
                            this.userManager.hand.cards.push(copyCard(this.userManager.pack[a]))
                        }
                    break
                    case 1423:
                        this.userManager.hand.exhaustEnergy(1)
                    break
                    case 1449:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Freeze',this.effect[1])
                    break
                    case 1450:
                        this.battle.combatantManager.allEffect(23,[this.effect[0],this.effect[1]])
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
                        case 1436:
                            this.targetCombatant[a].statusEffect('Freeze',this.effect[0])
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
                        this.userManager.draw(this.effect[1])
                    break
                }
            break
            case 12:
                switch(this.type){
                    case 342: case 1403:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 350:
                        this.battle.energy.gen[this.player]+=this.effect[0]
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                        this.userCombatant.statusEffect('Dexterity',this.effect[2])
                    break
                    case 353:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.targetCombatant.id,this.targetCombatant.tilePosition)
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
                    case 481:
                        this.battle.tileManager.customActivate(5,[this.effect[0]])
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
                        this.userManager.allGroupClaw(this.effect[1])
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
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
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
                        this.userManager.draw(this.effect[1])
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
                        for(let a=0,la=min(this.energy+this.effect[0],100);a<la;a++){
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
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
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
                                this.userManager.discard.randomEffect(16,[this.userManager.hand.cards])
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
                        this.userCombatant.addBlock(this.effect[0]+this.userManager.reserve.cards.length)
                        this.userManager.reserve.send(this.userManager.discard.cards,0,-1)
                    break
                    case 894:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.allEffect(30)
                        }
                    break
                    case 971:
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                            this.userManager.hand.add(findName('Spark',types.card),0,0)
                        }
                    break
                    case 1000:
                        this.battle.combatantManager.allEffect(17)
                    break
                    case 1056:
                        if(this.battle.combatantManager.randomEnemyEffect(2,[this.effect[0]])){
                            if(this.battle.combatantManager.randomEnemyEffect(2,[this.effect[0]])){
                                this.battle.combatantManager.randomEnemyEffect(0,[this.effect[0]])
                            }
                        }
                    break
                    case 1060:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.combatantManager.summonConstructRandom(this.userCombatant.tilePosition,findName('MobMan',types.combatant),this.battle.players+1,-30+floor(random(0,6))*60,this.user)
                        }
                    break
                    case 1103:
                        this.battle.combatantManager.fullAllEffect(1,[this.effect[0]])
                    break
                    case 1105:
                        this.userCombatant.statusEffect('Double Damage Turn',1)
                        this.battle.combatantManager.allEffect(20,[1])
                    break
                    case 1116:
                        this.userCombatant.statusEffect('Double Damage Turn Next Turn',1)
                        this.battle.combatantManager.allEffect(21,[999])
                        this.battle.updateTargetting()
                        this.battle.tileManager.activate()
                    break
                    case 1117:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.battle.combatantManager.fullAllEffect(2,[this.effect[1]])
                    break
                    case 1122:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,0,5])
                    break
                    case 1272:
                        this.battle.combatantManager.killDupes()
                    break
                    case 1278:
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.battle.layer.width/2,this.battle.layer.height/2,45,[200]))
                        this.battle.combatantManager.fullAllEffect(5,[0])
                    break
                    case 1347:
                        this.battle.tileManager.customActivate(6,[this.effect[0]])
                    break
                    case 1350:
                        if(this.targetCombatant.team==0){
                            this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,46,[50]))
                            this.targetCombatant.life=0
                            this.battle.longReinforce(this.targetCombatant.name,3)
                        }
                    break
                    case 1351:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            let tilePosition=this.battle.tileManager.getRandomTilePosition()
                            if(tilePosition!=-1){
                                this.battle.combatantManager.summonConstruct(tilePosition,findName('L',types.combatant),this.battle.players+1,-30+floor(random(0,6))*60,this.user)
                            }
                        }
                    break
                    case 1391:
                        this.targetCombatant.takeDamage(this.damage,this.user)
                        if(this.targetCombatant.life<=0){
                            this.battle.energy.gen[this.player]+=this.effect[0]
                        }
                    break
                    case 1404:
                        if(this.energy==0){
                            this.userCombatant.statusEffect('Armor',this.effect[0])
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1408:
                        this.userManager.miracleSwitch=true
                    break
                    case 1409:
                        this.combatantManager.allEffect(22,[this.effect[0]])
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
                            this.userManager.randomEffect(2,0,[])
                        }
                    break
                    case 739:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        this.battle.attackManager.endAfter=true
                    break
                    case 882:
                        this.battle.combatantManager.statusAreaID('Burn',this.effect[0],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 981:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 1051:
                        this.battle.combatantManager.statusAreaID('Bruise',this.effect[0],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 1447:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        this.battle.combatantManager.statusAreaID('Freeze',this.effect[1],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 1448:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        this.battle.combatantManager.statusAreaID('Burn',this.effect[1],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    default:
                        this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                    break
                }
            break

        }
    }
}