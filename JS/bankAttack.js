attack.prototype.update=function(){
    if(variants.mtg&&this.timer==0){
        this.battle.relicManager.activate(21,[this])
    }
    this.timer++
    switch(this.type){
        case -1000:
            this.battle.combatantManager.tickEarly()
            this.remove=true
        break
        case -1001:
            this.battle.combatantManager.tickLate()
            this.remove=true
        break
        case -1002:
            this.battle.combatantManager.tickA()
            this.remove=true
        break
        case -1003:
            this.battle.combatantManager.tickB()
            this.remove=true
        break
        case -1004:
            this.battle.combatantManager.setupCombatants()
            this.remove=true
        break
        case -1005:
            this.battle.combatantManager.enableCombatants()
            this.remove=true
        break
        case -35:
            this.battle.setEnergy(0,this.player)
            this.remove=true
        break
        case -47:
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
        case 1355: case 1356: case 1374: case 1377: case 1390: case 1395: case 1397: case 1399: case 1401: case 1416:
        case 1421: case 1424: case 1429: case 1438: case 1439: case 1440: case 1457: case 1462: case 1464: case 1465:
        case 1478: case 1485: case 1490: case 1493: case 1498: case 1501: case 1502: case 1506: case 1508: case 1513:
        case 1521: case 1522: case 1525: case 1526: case 1531: case 1535: case 1536: case 1537: case 1550: case 1556:
        case 1557: case 1558: case 1559: case 1561: case 1569: case 1597: case 1600: case 1605: case 1607: case 1611:
        case 1621: case 1625: case 1630: case 1631: case 1634: case 1635: case 1642: case 1656: case 1660: case 1661:
        case 1662: case 1663: case 1666: case 1667: case 1668: case 1678: case 1686: case 1687: case 1690: case 1703:
        case 1704: case 1705: case 1706: case 1707: case 1708: case 1724: case 1725: case 1730: case 1731: case 1732:
        case 1733: case 1737: case 1739: case 1748: case 1749: case 1752: case 1754: case 1766: case 1769: case 1770:
        case 1772: case 1774: case 1778: case 1779: case 1790: case 1791: case 1793: case 1794: case 1809: case 1810:
        case 1811: case 1825: case 1831: case 1835: case 1838: case 1848: case 1851: case 1854: case 1862: case 1865:
        case 1870: case 1875: case 1882: case 1883: case 1887: case 1895: case 1897: case 1898: case 1904: case 1905:
        case 1909: case 1910: case 1920: case 1921: case 1922: case 1923: case 1926: case 1940: case 1944: case 1948:
        case 1959: case 1960: case 1961: case 1970: case 1971: case 1973: case 1979: case 1980: case 1981: case 1984:
        case 1990: case 1991: case 2001: case 2002: case 2004: case 2007: case 2012: case 2017: case 2021: case 2025:
        case 2026: case 2027: case 2032: case 2034: case 2041: case 2046: case 2049: case 2051: case 2053: case 2054:
        case 2062: case 2063: case 2065: case 2066: case 2089: case 2093: case 2101: case 2104: case 2106: case 2110:
        case 2112: case 2114: case 2123: case 2128: case 2134: case 2135: case 2137: case 2144: case 2149: case 2150:
        case 2155: case 2156: case 2161: case 2170: case 2172: case 2181: case 2184: case 2195: case 2197: case 2198:
        case 2201: case 2204: case 2207: case 2208: case 2212: case 2215: case 2219: case 2220: case 2221: case 2222:
        case 2223: case 2224: case 2225: case 2227: case 2230: case 2233: case 2235: case 2236: case 2237: case 2241:
        case 2251: case 2255: case 2259: case 2260: case 2261: case 2262: case 2265: case 2270: case 2277: case 2288:
        case 2290: case 2291: case 2295: case 2298: case 2299: case 2300: case 2301: case 2315: case 2328: case 2330:
        case 2331: case 2337: case 2339: case 2342: case 2343: case 2344: case 2347: case 2349: case 2350: case 2351:
        case 2355: case 2356: case 2357: case 2358: case 2361: case 2362: case 2363: case 2364: case 2365: case 2366:
        case 2367: case 2374: case 2375: case 2378: case 2379: case 2381: case 2388: case 2389: case 2390: case 2391:
        case 2395: case 2400: case 2401: case 2405: case 2411: case 2420: case 2427: case 2428: case 2430: case 2437:
        case 2442: case 2460: case 2461: case 2464: case 2466: case 2467: case 2468: case 2471: case 2474: case 2477:
        case 2481: case 2485: case 2487: case 2492: case 2493: case 2494: case 2498: case 2497: case 2504: case 2520:
        case 2521: case 2522: case 2525: case 2526: case 2554: case 2576: case 2580: case 2582: case 2583: case 2584:
        case 2585: case 2586: case 2588: case 2593: case 2606: case 2609: case 2610: case 2612: case 2613: case 2621:
        case 2622: case 2623: case 2636: case 2641: case 2646: case 2647: case 2650: case 2656: case 2660: case 2665:
        case 2666: case 2670: case 2671: case 2678: case 2680: case 2685: case 2697: case 2701: case 2702: case 2709:
        case 2712: case 2716: case 2722: case 2723: case 2725: case 2728: case 2730: case 2737: case 2739: case 2746:
        case 2753: case 2754: case 2755: case 2757: case 2766: case 2770: case 2771: case 2773: case 2775: case 2781:
        case 2783: case 2784: case 2787: case 2791: case 2798: case 2810: case 2811: case 2819: case 2834: case 2836:
        case 2839: case 2860: case 2863: case 2864: case 2876: case 2889: case 2890: case 2900: case 2907: case 2909:
        case 2915: case 2919: case 2920: case 2937: case 2949: case 2953: case 2959: case 2971: case 2979: case 2986:
        case 2987: case 2994: case 2997: case 2999: case 3009: case 3019: case 3041: case 3062: case 3063: case 3066:
        case 3067: case 3068: case 3079: case 3095: case 3096: case 3098: case 3100: case 3103: case 3106: case 3108:
        case 3110: case 3111: case 3112: case 3118: case 3120: case 3139: case 3146: case 3149: case 3151: case 3152:
        case 3212: case 3215: case 3216: case 3224: case 3225: case 3226: case 3227: case 3228: case 3233: case 3239:
        case 3241: case 3245: case 3247: case 3249: case 3251: case 3261: case 3262: case 3263: case 3264: case 3266:
        case 3275: case 3300: case 3304: case 3323: case 3326: case 3327: case 3345: case 3350: case 3352: case 3360:
        case 3363: case 3364: case 3372: case 3376: case 3392: case 3401: case 3405: case 3407: case 3453: case 3455:
        case 3456: case 3469: case 3470: case 3475: case 3479: case 3503: case 3513: case 3519: case 3520: case 3530:
        case 3535: case 3545: case 3579: case 3581: case 3614: case 3619: case 3621: case 3637: case 3638: case 3644:
        case 3651: case 3656: case 3658: case 3661: case 3662: case 3669: case 3670: case 3671: case 3674: case 3682:
        case 3693: case 3700: case 3702: case 3704: case 3707: case 3709: case 3711: case 3741: case 3744: case 3753:
        case 3754: case 3778: case 3787: case 3792: case 3815: case 3847: case 3851: case 3853: case 3855: case 3861:
        case 3876: case 3879: case 3885: case 3886: case 3893: case 3902: case 3904: case 3905: case 3907: case 3912:
        case 3917: case 3921: case 3923: case 3924: case 3928: case 3929: case 3935: case 3940: case 3941: case 3948:
        case 3950: case 3951: case 3953: case 3999: case 4019: case 4024: case 4026: case 4029: case 4030: case 4045:
        case 4050: case 4059: case 4061: case 4069: case 4077: case 4091: case 4096: case 4098: case 4102: case 4107:
        case 4108: case 4109: case 4110: case 4122: case 4139: case 4143: case 4145: case 4151: case 4152: case 4153:
        case 4154: case 4155: case 4156: case 4161: case 4162: case 4163: case 4167: case 4168: case 4169: case 4170:
        case 4172: case 4183: case 4190: case 4203: case 4204: case 4206: case 4211: case 4212: case 4235: case 4236:
        case 4242: case 4243: case 4244: case 4248: case 4256: case 4257: case 4258: case 4259: case 4271: case 4272:
        case 4273: case 4276: case 4281: case 4304: case 4319: case 4321: case 4322: case 4323: case 4327: case 4328:
        case 4332: case 4334: case 4335: case 4336: case 4340: case 4341: case 4345: case 4350: case 4374: case 4379:
        case 4380: case 4381: case 4382: case 4383: case 4384: case 4385: case 4386: case 4387: case 4388: case 4389:
        case 4390: case 4396: case 4407: case 4408: case 4413: case 4414: case 4425: case 4438: case 4439: case 4440:
        case 4441: case 4442: case 4444: case 4445: case 4446: case 4454: case 4456: case 4457: case 4466: case 4477:
        case 4478: case 4479: case 4485: case 4498: case 4515: case 4525: case 4529: case 4533: case 4562: case 4563:
            //mark 1
            if(this.timer==1&&(this.type==2781||this.type==4024)){
                this.userCombatant.goal.anim.direction=directionCombatant(this.targetCombatant,this.userCombatant)
            }
            if(
                this.timer==1&&(
                    (this.type==780||this.type==1354)&&this.timer==1&&this.userManager.hand.numberAbstract(16,[[1],this.type])>0||
                    this.type==1724&&this.timer==1&&this.userManager.hand.numberAbstract(15,[[1]])>1||
                    this.type==1006&&!(this.userCombatant.luckCheck()?true:this.userCombatant.luckCheckFail()?false:floor(random(0,100))>=20*this.energy)
                )||
                this.type==427&&this.userCombatant.armed||
                this.type==806&&this.userCombatant.stance!=1||
                (this.type==947||this.type==1559)&&this.energy!=0||
                this.type==1135&&this.limit%4!=3||
                (this.type==1179||this.type==3702)&&this.userCombatant.energyParity(this.energy)!=0||
                this.type==1233&&this.battle.turn.total%2==1||
                (
                    this.type==1267||this.type==1268||this.type==1438||this.type==1569||this.type==1634||
                    this.type==1704||this.type==2277||this.type==2337||this.type==2646
                )&&this.relPos[0]!=1||
                this.type==1421&&this.userCombatant.energyParity(this.energy)==0||
                (this.type==1556||this.type==1705)&&this.relPos[0]!=2||
                this.type==1561&&this.energy<3||
                this.type==1597&&this.battle.turn.total%3!=0||
                (this.type==1662||this.type==1706)&&this.relPos[0]!=3||
                (this.type==1663||this.type==1707)&&this.relPos[0]!=4||
                this.type==1703&&this.relPos[0]!=0||
                this.type==1708&&this.relPos[0]!=5||
                this.type==1870&&(this.targetCombatant.block>0||this.targetCombatant.life==this.targetCombatant.base.life||this.battle.currency.money[this.player]<100)||
                this.type==1991&&this.battle.currency.money[this.player]<this.effect[1]||
                this.type==2017&&this.battle.currency.money[this.player]>this.effect[1]||
                this.type==2054&&this.userCombatant.stance!=5||
                this.type==2065&&this.battle.turn.total<4||
                this.type==2066&&this.battle.turn.total<10||
                this.type==2291&&this.battle.turn.total!=4||
                this.type==2328&&this.battle.turn.total>6||
                this.type==2331&&this.battle.turn.total%4!=0||
                this.type==2378&&this.battle.turn.total%2==0||
                this.type==2420&&this.userCombatant.block<=0||
                this.type==3345&&this.battle.turn.total!=420||
                this.type==3709&&this.limit%2!=1||
                (this.type==4336||this.type==4350)&&this.userCombatant.energyParity(this.mtgEnergy.length)!=0||
                this.type==4407&&this.mtgEnergy.length<5||
                this.type==4413&&this.mtgEnergy.length!=0
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
            if(this.remove){
                switch(this.type){
                    case 1905:
                        this.battle.turnManager.turns.push(new turn(0,this.battle,
                            this.targetCombatant.attack[this.targetCombatant.intent].type,
                            this.targetCombatant.attack[this.targetCombatant.intent].effect,this.user))
                    break
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
        case 1453: case 1456: case 1460: case 1514: case 1523: case 1532: case 1534: case 1603: case 1636: case 1696:
        case 1713: case 1728: case 1738: case 1742: case 1804: case 1814: case 1826: case 1861: case 1876: case 1877:
        case 1929: case 1963: case 1966: case 1983: case 1985: case 2003: case 2005: case 2035: case 2042: case 2052:
        case 2055: case 2067: case 2068: case 2069: case 2082: case 2092: case 2102: case 2111: case 2131: case 2133:
        case 2145: case 2152: case 2157: case 2162: case 2182: case 2199: case 2200: case 2206: case 2216: case 2218:
        case 2231: case 2234: case 2249: case 2256: case 2257: case 2266: case 2274: case 2280: case 2286: case 2289:
        case 2302: case 2303: case 2304: case 2305: case 2307: case 2309: case 2320: case 2329: case 2334: case 2346:
        case 2359: case 2360: case 2368: case 2396: case 2416: case 2423: case 2425: case 2469: case 2483: case 2484:
        case 2491: case 2495: case 2523: case 2560: case 2579: case 2591: case 2594: case 2607: case 2614: case 2615:
        case 2616: case 2618: case 2619: case 2625: case 2634: case 2661: case 2668: case 2669: case 2672: case 2675:
        case 2676: case 2679: case 2682: case 2689: case 2714: case 2720: case 2721: case 2724: case 2726: case 2735:
        case 2764: case 2767: case 2769: case 2772: case 2778: case 2780: case 2782: case 2793: case 2795: case 2799:
        case 2801: case 2804: case 2807: case 2818: case 2833: case 2835: case 2865: case 2877: case 2881: case 2892:
        case 2908: case 2914: case 2916: case 2918: case 2921: case 2947: case 2952: case 2954: case 2961: case 2972:
        case 2980: case 2988: case 2989: case 2996: case 3010: case 3011: case 3024: case 3028: case 3032: case 3033:
        case 3035: case 3042: case 3064: case 3070: case 3072: case 3086: case 3094: case 3097: case 3099: case 3101:
        case 3109: case 3114: case 3121: case 3127: case 3131: case 3138: case 3184: case 3189: case 3190: case 3191:
        case 3204: case 3211: case 3213: case 3219: case 3221: case 3229: case 3246: case 3255: case 3272: case 3276:
        case 3278: case 3296: case 3297: case 3301: case 3305: case 3308: case 3309: case 3311: case 3312: case 3317:
        case 3320: case 3339: case 3342: case 3343: case 3357: case 3367: case 3389: case 3412: case 3429: case 3450:
        case 3457: case 3481: case 3494: case 3495: case 3512: case 3524: case 3531: case 3533: case 3537: case 3538:
        case 3546: case 3561: case 3591: case 3600: case 3602: case 3639: case 3640: case 3657: case 3665: case 3668:
        case 3672: case 3677: case 3691: case 3713: case 3716: case 3719: case 3720: case 3732: case 3737: case 3738:
        case 3739: case 3740: case 3742: case 3745: case 3747: case 3749: case 3752: case 3758: case 3763: case 3772:
        case 3774: case 3775: case 3793: case 3794: case 3805: case 3806: case 3816: case 3817: case 3819: case 3838:
        case 3854: case 3883: case 3862: case 3877: case 3880: case 3894: case 3910: case 3947: case 3952: case 3955:
        case 3994: case 3998: case 4016: case 4017: case 4018: case 4025: case 4027: case 4038: case 4054: case 4060:
        case 4062: case 4064: case 4080: case 4081: case 4090: case 4112: case 4160: case 4164: case 4165: case 4166:
        case 4184: case 4185: case 4197: case 4207: case 4216: case 4245: case 4246: case 4247: case 4268: case 4270:
        case 4277: case 4279: case 4285: case 4296: case 4299: case 4368: case 4378: case 4392: case 4397: case 4467:
        case 4471: case 4480: case 4481: case 4482: case 4499: case 4503: case 4507: case 4524: case 4527: case 4547:
        case 4586:
            //mark 2
            if(
                this.timer==1&&(
                    this.type==2616&&this.userManager.hand.numberAbstract(15,[[2]])>1||
                    this.type==4017&&this.userCombatant.block>0
                )||
                this.type==809&&this.userCombatant.stance!=4||
                this.type==1713&&this.battle.turn.total%2==0||
                this.type==1804&&this.energy!=4||
                this.type==1814&&this.energy<2||
                this.type==2055&&this.userCombatant.stance!=5||
                this.type==2067&&this.battle.turn.total<4||
                this.type==2068&&this.battle.turn.total<10||
                this.type==2329&&this.battle.turn.total>6||
                this.type==2423&&this.battle.turn.total%2==1||
                this.type==2425&&this.battle.turn.total<6
            ){
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
        case 1143: case 1389: case 1509: case 1515: case 1570: case 1571: case 1572: case 1573: case 1574: case 1576:
        case 1577: case 1578: case 1579: case 1580: case 1581: case 1582: case 1583: case 1584: case 1585: case 1586:
        case 1587: case 1588: case 1589: case 1590: case 1643: case 1644: case 1647: case 1648: case 1671: case 1672:
        case 1673: case 1677: case 1680: case 1681: case 1759: case 1760: case 1761: case 1784: case 1785: case 1949:
        case 1978: case 1992: case 2008: case 2009: case 2033: case 2036: case 2037: case 2040: case 2047: case 2075:
        case 2103: case 2113: case 2140: case 2141: case 2159: case 2160: case 2166: case 2167: case 2173: case 2174:
        case 2175: case 2176: case 2177: case 2178: case 2179: case 2180: case 2202: case 2203: case 2293: case 2323:
        case 2324: case 2326: case 2327: case 2332: case 2370: case 2371: case 2383: case 2418: case 2431: case 2436:
        case 2439: case 2440: case 2456: case 2459: case 2475: case 2589: case 2600: case 2602: case 2603: case 2604:
        case 2608: case 2637: case 2652: case 2742: case 2743: case 2744: case 2745: case 2747: case 2750: case 2751:
        case 2752: case 2758: case 2759: case 2760: case 2761: case 2832: case 2850: case 2866: case 2925: case 2926:
        case 2927: case 2928: case 2929: case 2930: case 2931: case 2932: case 2933: case 2934: case 2935: case 2936:
        case 2938: case 2939: case 2940: case 2941: case 2942: case 2944: case 2945: case 2948: case 2955: case 2973:
        case 3013: case 3027: case 3054: case 3081: case 3102: case 3115: case 3117: case 3119: case 3157: case 3164:
        case 3218: case 3234: case 3332: case 3353: case 3354: case 3378: case 3404: case 3410: case 3476: case 3480:
        case 3491: case 3493: case 3629: case 3630: case 3631: case 3641: case 3642: case 3659: case 3663: case 3681:
        case 3735: case 3743: case 3746: case 3780: case 3788: case 3789: case 3790: case 3795: case 3796: case 3797:
        case 3798: case 3799: case 3800: case 3801: case 3802: case 3803: case 3814: case 3884: case 3930: case 3931:
        case 3943: case 4000: case 4056: case 4101: case 4104: case 4113: case 4141: case 4197: case 4198: case 4199:
        case 4208: case 4209: case 4210: case 4223: case 4224: case 4262: case 4284: case 4307: case 4308: case 4309:
        case 4310: case 4311: case 4312: case 4331: case 4337: case 4338: case 4339: case 4346: case 4347: case 4348:
        case 4349: case 4362: case 4363: case 4364: case 4365: case 4366: case 4367: case 4369: case 4370: case 4371:
        case 4394: case 4429: case 4430: case 4431: case 4432: case 4433: case 4434: case 4463: case 4464: case 4465:
        case 4473: case 4474: case 4475: case 4476: case 4483: case 4495: case 4496: case 4497: case 4514: case 4518:
        case 4519: case 4520: case 4521: case 4522: case 4523: case 4530: case 4531: case 4532: case 4552: case 4558:
            //mark 3
            if(
                this.timer==1&&(
                    this.type==3797&&this.userManager.hand.numberAbstract(15,[[3]])>1
                )||
                this.type==808&&this.userCombatant.stance!=3||
                this.type==1515&&this.timer==1&&!(floor(random(0,10))==0&&!this.userCombatant.luckCheck()||this.userCombatant.luckCheckFail())||
                this.type==2293&&this.battle.turn.total<4
            ){
                this.remove=true
                if(this.type==1515){
                    this.userCombatant.lowRoll()
                }
            }else if(this.type==1509&&(floor(random(0,4))==0&&!this.userCombatant.luckCheck()||this.userCombatant.luckCheckFail())){
                this.userCombatant.takeDamage(this.effect[1],-1)
                this.userCombatant.lowRoll()
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
                this.selfCall(21)
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
                    this.selfCall(21)
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
        case 5: case 121: case 764: case 987: case 1257: case 1445: case 1446: case 1796: case 1805: case 2136:
        case 2163: case 2611: case 2664: case 2776: case 3036: case 4066: case 4067: case 4550: case 4554:
            if(this.type==121&&this.userCombatant.armed){
                this.remove=true
            }else if(this.targetDistance==1){
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(this.userCombatant.name=='Sakura'&&this.type==121?27:3)
                }else if(this.timer==10){
                    switch(this.type){
                        case 2136:
                            this.targetCombatant.statusEffect('Jinx',this.effect[0])
                        break
                        case 3036:
                            let result3036=this.userManager.drawReturn(this.effect[0])
                            if(result3036.length>0&&result3036[0].class==3){
                                this.targetCombatant.statusEffect('Weak',this.effect[1])
                            }
                        break
                        default:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            switch(this.type){
                                case 764:
                                    this.userCombatant.enterStance(3)
                                break
                                case 987:
                                    this.userCombatant.statusEffect('Strength',this.effect[1])
                                break
                                case 1257:
                                    if((types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5)){
                                        this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[1])
                                    }
                                break
                                case 1445:
                                    this.targetCombatant.statusEffect('Freeze',this.effect[1])
                                break
                                case 1446:
                                    this.targetCombatant.statusEffect('Burn',this.effect[1])
                                break
                                case 1796:
                                    this.targetCombatant.statusEffect('Weak',this.effect[1])
                                break
                                case 1805:
                                    this.targetCombatant.statusEffect('Shock',this.effect[1])
                                break
                                case 2163:
                                    this.userCombatant.statusEffect('Cannot Be Pushed',1)
                                break
                                case 2611:
                                    this.targetCombatant.statusEffect('Cannot Move',1)
                                break
                                case 2664:
                                    if(!this.userCombatant.armed){
                                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                                        if(index>=0&&this.battle.tileManager.tiles[index].type.includes(3)){
                                            this.battle.tileManager.tiles[index].anim.upPart[this.battle.tileManager.tiles[index].type.indexOf(3)]=false
                                            this.userCombatant.armed=true
                                            la=0
                                        }
                                    }
                                break
                                case 4066:
                                    this.userCombatant.statusEffect('Dexterity',this.effect[1])
                                break
                                case 4067:
                                    this.targetCombatant.goal.anim.direction=this.relativeDirection
                                break
                                case 4550:
                                    this.userManager.hand.add(findName('Pristine',types.card),0,0)
                                break
                                case 4554:
                                    this.battle.overlayManager.overlays[10][this.player].active=true
                                    this.battle.overlayManager.overlays[10][this.player].activate([0,0,40,2])
                                break
                            }
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
                            if((types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5)){
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
        case -15: case -30: case -39: case -40: case -89: case -92:
        case 6: case 30: case 41: case 71: case 92: case 98: case 113: case 128: case 149: case 150:
        case 181: case 184: case 198: case 200: case 203: case 204: case 212: case 215: case 223: case 225:
        case 226: case 231: case 239: case 240: case 249: case 264: case 278: case 286: case 299: case 306:
        case 307: case 311: case 312: case 347: case 362: case 366: case 367: case 370: case 372: case 381:
        case 393: case 406: case 424: case 439: case 440: case 445: case 446: case 450: case 454: case 455:
        case 457: case 488: case 500: case 517: case 521: case 586: case 613: case 614: case 615: case 619:
        case 625: case 635: case 636: case 644: case 646: case 648: case 649: case 655: case 656: case 668:
        case 684: case 711: case 712: case 713: case 737: case 754: case 755: case 760: case 761: case 763:
        case 777: case 778: case 788: case 799: case 807: case 820: case 821: case 822: case 836: case 838:
        case 839: case 841: case 842: case 852: case 864: case 873: case 876: case 886: case 893: case 896:
        case 898: case 901: case 914: case 937: case 948: case 1008: case 1019: case 1033: case 1053: case 1063:
        case 1074: case 1079: case 1093: case 1094: case 1108: case 1124: case 1125: case 1138: case 1159: case 1165:
        case 1206: case 1208: case 1215: case 1220: case 1229: case 1260: case 1264: case 1265: case 1269: case 1294:
        case 1302: case 1304: case 1306: case 1323: case 1327: case 1365: case 1366: case 1375: case 1381: case 1396:
        case 1402: case 1407: case 1419: case 1466: case 1467: case 1468: case 1475: case 1476: case 1494: case 1497:
        case 1540: case 1542: case 1544: case 1549: case 1551: case 1553: case 1554: case 1563: case 1601: case 1638:
        case 1641: case 1657: case 1658: case 1659: case 1715: case 1717: case 1719: case 1734: case 1735: case 1741:
        case 1750: case 1758: case 1767: case 1802: case 1807: case 1816: case 1817: case 1832: case 1839: case 1840:
        case 1841: case 1842: case 1843: case 1844: case 1847: case 1896: case 1901: case 1915: case 1916: case 1942:
        case 1964: case 1988: case 1989: case 1993: case 1994: case 1995: case 1996: case 1997: case 1998: case 2015:
        case 2019: case 2020: case 2029: case 2031: case 2056: case 2105: case 2147: case 2205: case 2217: case 2258:
        case 2269: case 2278: case 2292: case 2294: case 2306: case 2312: case 2321: case 2322: case 2333: case 2335:
        case 2336: case 2372: case 2373: case 2376: case 2377: case 2385: case 2394: case 2407: case 2408: case 2409:
        case 2415: case 2417: case 2419: case 2429: case 2448: case 2472: case 2478: case 2486: case 2518: case 2549:
        case 2555: case 2558: case 2559: case 2566: case 2567: case 2568: case 2638: case 2639: case 2643: case 2673:
        case 2704: case 2741: case 2756: case 2768: case 2792: case 2802: case 2817: case 2826: case 2827: case 2922:
        case 2962: case 2966: case 2975: case 2984: case 2992: case 2993: case 3003: case 3029: case 3048: case 3050:
        case 3071: case 3083: case 3087: case 3092: case 3107: case 3122: case 3133: case 3161: case 3162: case 3167:
        case 3172: case 3199: case 3200: case 3203: case 3205: case 3206: case 3208: case 3209: case 3235: case 3236:
        case 3238: case 3253: case 3254: case 3269: case 3271: case 3299: case 3302: case 3325: case 3346: case 3348:
        case 3362: case 3388: case 3406: case 3408: case 3416: case 3417: case 3418: case 3419: case 3420: case 3421:
        case 3422: case 3423: case 3424: case 3425: case 3426: case 3427: case 3428: case 3434: case 3435: case 3436:
        case 3437: case 3438: case 3439: case 3440: case 3441: case 3442: case 3443: case 3444: case 3445: case 3466:
        case 3484: case 3497: case 3501: case 3502: case 3507: case 3508: case 3510: case 3514: case 3539: case 3540:
        case 3541: case 3542: case 3543: case 3544: case 3550: case 3551: case 3563: case 3571: case 3572: case 3575:
        case 3576: case 3589: case 3590: case 3596: case 3610: case 3624: case 3636: case 3648: case 3649: case 3650:
        case 3652: case 3653: case 3654: case 3655: case 3664: case 3676: case 3678: case 3679: case 3710: case 3718:
        case 3723: case 3750: case 3757: case 3760: case 3761: case 3769: case 3777: case 3783: case 3785: case 3820:
        case 3837: case 3841: case 3845: case 3856: case 3858: case 3859: case 3865: case 3887: case 3897: case 3898:
        case 3899: case 3900: case 3911: case 3914: case 3916: case 3934: case 3942: case 3956: case 3957: case 3958:
        case 3959: case 3960: case 3961: case 3962: case 3963: case 3964: case 3965: case 3966: case 3967: case 3968:
        case 3969: case 3970: case 3971: case 3972: case 3973: case 3974: case 3975: case 3976: case 3977: case 3978:
        case 3987: case 3991: case 3992: case 3993: case 4013: case 4032: case 4041: case 4042: case 4043: case 4044:
        case 4055: case 4057: case 4065: case 4074: case 4092: case 4111: case 4115: case 4116: case 4131: case 4134:
        case 4135: case 4136: case 4144: case 4147: case 4148: case 4171: case 4173: case 4174: case 4178: case 4187:
        case 4188: case 4189: case 4213: case 4214: case 4215: case 4239: case 4240: case 4241: case 4260: case 4292:
        case 4305: case 4313: case 4320: case 4324: case 4325: case 4326: case 4330: case 4342: case 4343: case 4344:
        case 4351: case 4352: case 4353: case 4398: case 4399: case 4400: case 4401: case 4402: case 4003: case 4404:
        case 4405: case 4406: case 4411: case 4412: case 4420: case 4435: case 4436: case 4437: case 4453: case 4455:
        case 4458: case 4459: case 4460: case 4468: case 4469: case 4470: case 4489: case 4490: case 4491: case 4492:
        case 4493: case 4494: case 4504: case 4505: case 4506: case 4534: case 4535: case 4536: case 4537: case 4538:
        case 4539: case 4540: case 4541: case 4542: case 4544: case 4545: case 4546: case 4549: case 4553: case 4555:
        case 4556: case 4557: case 4560: case 4561: case 4564: case 4565: case 4569: case 4570: case 4571: case 4572:
        case 4573: case 4574: case 4575: case 4576: case 4577: case 4579: case 4580: case 4581: case 4582: case 4583:
        case 4584:
            //mark 4
            if(
                this.timer==1&&(
                    this.type==2306&&this.userManager.hand.numberAbstract(2,[2])<=0
                )||(
                    (this.type==4489||this.type==4490||this.type==4491)&&this.userManager.hand.numberAbstract(2,[3])<=0
                )||
                (this.type==799||this.type==4468||this.type==4469||this.type==4470)&&this.battle.turn.total<4||
                this.type==807&&this.userCombatant.stance!=2||
                (this.type==820||this.type==4398||this.type==4399||this.type==4400)&&this.userCombatant.stance!=1||
                (this.type==821||this.type==4401||this.type==4402||this.type==4403)&&this.userCombatant.stance!=3||
                (this.type==822||this.type==4404||this.type==4405||this.type==4406)&&this.userCombatant.stance!=4||
                this.type==1638&&this.energy!=2||
                this.type==1802&&this.energy!=1||
                this.type==2056&&(this.userCombatant.stance<1||this.userCombatant.stance>4)||
                this.type==2294&&this.battle.turn.total<8||
                (this.type==2333||this.type==2335||this.type==2408)&&this.battle.turn.total%2==1||
                (this.type==2336||this.type==2409||this.type==3408)&&this.battle.turn.total%2==0||
                this.type==2567&&this.userCombatant.block<20||
                (this.type==4032||this.type==4351||this.type==4352||this.type==4353)&&this.userCombatant.block==0
            ){
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
        case 8: case 28: case 29: case 40: case 44: case 45: case 55: case 62: case 63: case 69:
        case 70: case 76: case 78: case 93: case 99: case 109: case 116: case 183: case 186: case 199:
        case 207: case 209: case 210: case 213: case 214: case 227: case 229: case 230: case 232: case 233:
        case 253: case 254: case 259: case 276: case 279: case 284: case 285: case 289: case 291: case 294:
        case 298: case 300: case 302: case 305: case 308: case 309: case 313: case 315: case 317: case 318:
        case 334: case 337: case 338: case 339: case 340: case 343: case 344: case 346: case 363: case 387:
        case 390: case 392: case 398: case 418: case 422: case 423: case 431: case 451: case 499: case 512:
        case 519: case 523: case 524: case 525: case 527: case 528: case 529: case 530: case 541: case 542:
        case 595: case 603: case 605: case 607: case 612: case 640: case 645: case 647: case 665: case 675:
        case 680: case 681: case 728: case 740: case 741: case 742: case 743: case 744: case 748: case 749:
        case 752: case 753: case 756: case 759: case 768: case 769: case 772: case 773: case 774: case 781:
        case 782: case 789: case 790: case 791: case 797: case 818: case 819: case 832: case 835: case 855:
        case 859: case 860: case 868: case 869: case 870: case 871: case 891: case 892: case 904: case 909:
        case 910: case 911: case 912: case 913: case 921: case 922: case 926: case 928: case 929: case 932:
        case 949: case 970: case 982: case 983: case 1005: case 1016: case 1026: case 1032: case 1042: case 1044:
        case 1045: case 1062: case 1064: case 1065: case 1066: case 1067: case 1078: case 1088: case 1095: case 1096:
        case 1098: case 1109: case 1110: case 1120: case 1121: case 1134: case 1151: case 1152: case 1158: case 1177:
        case 1184: case 1201: case 1214: case 1221: case 1224: case 1225: case 1226: case 1227: case 1237: case 1249:
        case 1250: case 1253: case 1254: case 1282: case 1289: case 1303: case 1326: case 1333: case 1361: case 1363:
        case 1378: case 1379: case 1380: case 1384: case 1392: case 1420: case 1422: case 1459: case 1473: case 1491:
        case 1496: case 1510: case 1527: case 1543: case 1608: case 1609: case 1624: case 1639: case 1650: case 1664:
        case 1675: case 1676: case 1685: case 1694: case 1695: case 1716: case 1718: case 1743: case 1747: case 1783:
        case 1806: case 1808: case 1813: case 1849: case 1853: case 1856: case 1857: case 1871: case 1872: case 1885:
        case 1886: case 1930: case 1936: case 1938: case 1939: case 1946: case 1952: case 1953: case 1956: case 1957:
        case 1987: case 2000: case 2039: case 2060: case 2061: case 2120: case 2153: case 2171: case 2196: case 2213:
        case 2238: case 2243: case 2246: case 2247: case 2254: case 2263: case 2267: case 2268: case 2275: case 2276:
        case 2281: case 2283: case 2285: case 2311: case 2318: case 2319: case 2325: case 2392: case 2403: case 2406:
        case 2410: case 2413: case 2426: case 2446: case 2447: case 2451: case 2455: case 2488: case 2499: case 2501:
        case 2512: case 2513: case 2514: case 2517: case 2563: case 2565: case 2573: case 2574: case 2677: case 2683:
        case 2684: case 2686: case 2687: case 2690: case 2691: case 2698: case 2699: case 2703: case 2706: case 2707:
        case 2708: case 2710: case 2715: case 2717: case 2718: case 2719: case 2736: case 2774: case 2788: case 2789:
        case 2796: case 2806: case 2809: case 2845: case 2849: case 2867: case 2869: case 2870: case 2882: case 2950:
        case 2956: case 3020: case 3025: case 3040: case 3045: case 3047: case 3055: case 3059: case 3060: case 3085:
        case 3105: case 3113: case 3123: case 3126: case 3141: case 3153: case 3154: case 3168: case 3217: case 3230:
        case 3248: case 3277: case 3281: case 3307: case 3324: case 3328: case 3330: case 3338: case 3355: case 3359:
        case 3371: case 3379: case 3380: case 3385: case 3387: case 3403: case 3414: case 3415: case 3446: case 3447:
        case 3451: case 3471: case 3472: case 3473: case 3474: case 3478: case 3486: case 3487: case 3489: case 3518:
        case 3525: case 3526: case 3547: case 3548: case 3549: case 3552: case 3553: case 3555: case 3556: case 3557:
        case 3567: case 3570: case 3578: case 3592: case 3607: case 3609: case 3612: case 3660: case 3666: case 3675:
        case 3684: case 3686: case 3687: case 3708: case 3712: case 3731: case 3768: case 3784: case 3791: case 3839:
        case 3842: case 3849: case 3850: case 3852: case 3869: case 3890: case 3891: case 3918: case 3919: case 3932:
        case 3936: case 3937: case 3938: case 3939: case 3949: case 3979: case 3980: case 3981: case 3997: case 4001:
        case 4002: case 4003: case 4004: case 4005: case 4006: case 4012: case 4014: case 4015: case 4031: case 4037:
        case 4047: case 4093: case 4099: case 4100: case 4106: case 4120: case 4175: case 4176: case 4177: case 4180:
        case 4181: case 4186: case 4194: case 4195: case 4196: case 4231: case 4251: case 4255: case 4267: case 4287:
        case 4288: case 4295: case 4297: case 4301: case 4302: case 4303: case 4329: case 4358: case 4359: case 4360:
        case 4361: case 4391: case 4415: case 4461: case 4462: case 4508: case 4509: case 4543:
            //mark 5
            if(
                (this.type==818||this.type==819)&&this.userCombatant.stance!=2||
                this.type==1459&&this.relPos[0]!=1||
                this.type==2406&&this.battle.turn.total>=4||
                (this.type==4302||this.type==4303)&&this.battle.turn.total%2==1
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
        case 9: case 333: case 569: case 650: case 1591: case 1592: case 1593: case 1594: case 1645: case 1646:
        case 2095: case 2164: case 2165: case 2380: case 2626: case 4071:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
                if(this.targetClass==2&&this.type!=650&&this.type!=1646&&this.type!=2165){
                    this.targetCombatant.goal.anim.direction=this.relativeDirection
                }
                if(this.type==1645||this.type==1646){
                    this.procedure[0]=this.userCombatant.luckCheck()?0:this.userCombatant.luckCheckFail()?1:floor(random(0,2))
                }
            }
            if(this.timer<=15*this.targetDistance){
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.targetClass==2){
                    this.targetCombatant.moveTile(this.direction,-this.distance/(15*this.targetDistance))
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(15*this.targetDistance))
                }
            }
            if(this.timer==15*this.targetDistance){
                if(this.targetClass==2){
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                    this.targetCombatant.moveTilePosition(this.tilePosition.x,this.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.battle.activate(1,this.targetCombatant.id)
                    switch(this.type){
                        case 569:
                            this.userCombatant.evoke(1,this.targetCombatant.id,[1])
                        break
                        case 1591:
                            this.targetCombatant.statusEffect('Freeze',this.effect[0])
                        break
                        case 1592:
                            this.targetCombatant.statusEffect('Burn',this.effect[0])
                        break
                        case 1593:
                            this.targetCombatant.takeDamage(this.effect[0])
                            this.userCombatant.heal(this.effect[1])
                        break
                        case 1594:
                            if(this.targetCombatant.name!='Rewriter'){
                                let bank=copyArray(this.userCombatant.status.main)
                                this.userCombatant.status.main=copyArray(this.targetCombatant.status.main)
                                this.targetCombatant.status.main=copyArray(bank)
                            }
                        break
                        case 2095:
                            this.targetCombatant.statusEffect('Shock',this.effect[0])
                        break
                        case 2164: case 2165:
                            this.userCombatant.statusEffect('Take 3/4 Damage',1)
                        break
                        case 2380:
                            this.targetCombatant.block=0
                        break
                        case 2626:
                            if(this.targetCombatant.block<=0){
                                this.targetCombatant.statusEffect('Bleed',this.effect[0])
                            }
                        break
                        case 4071:
                            this.userCombatant.addBlock(min(this.targetCombatant.block,this.effect[0]))
                            this.targetCombatant.block=max(0,this.targetCombatant.block-this.effect[0])
                        break
                    }
                }else{
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                }
                if(!((this.type==1645||this.type==1646)&&this.procedure[0]==1&&this.targetClass==2)){
                    this.remove=true
                }
            }
            if((this.type==1645||this.type==1646)&&this.procedure[0]==1&&this.targetClass==2&&this.timer>15*this.targetDistance){
                this.userCombatant.moveTile(this.direction,-this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(-1/15,0)
                if(this.targetClass==2){
                    this.targetCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                }
                if(this.timer>=30*this.targetDistance){
                    this.targetCombatant.moveTilePosition(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                    this.userCombatant.moveTilePosition(this.tilePosition.x,this.tilePosition.y)
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            }
        break
        case -13: case -21: case -33: case -36: case -41: case -62: case -77:
        case 10: case 64: case 72: case 73: case 74: case 164: case 166: case 167: case 168: case 169:
        case 170: case 171: case 180: case 195: case 202: case 224: case 283: case 349: case 360: case 369:
        case 380: case 391: case 442: case 456: case 470: case 608: case 641: case 642: case 643: case 659:
        case 924: case 952: case 953: case 954: case 960: case 961: case 962: case 984: case 985: case 1021:
        case 1041: case 1043: case 1101: case 1102: case 1112: case 1186: case 1203: case 1204: case 1205: case 1230:
        case 1235: case 1236: case 1287: case 1322: case 1325: case 1331: case 1370: case 1388: case 1415: case 1495:
        case 1518: case 1528: case 1533: case 1539: case 1606: case 1617: case 1665: case 1710: case 1712: case 1803:
        case 1824: case 1827: case 1836: case 1931: case 1933: case 1986: case 2154: case 2250: case 2310: case 2338:
        case 2341: case 2352: case 2353: case 2354: case 2402: case 2412: case 2432: case 2433: case 2449: case 2450:
        case 2452: case 2502: case 2507: case 2508: case 2509: case 2519: case 2548: case 2581: case 2590: case 2598:
        case 2642: case 2688: case 2695: case 2727: case 2738: case 2805: case 2820: case 2895: case 2958: case 2965:
        case 2990: case 3005: case 3008: case 3171: case 3223: case 3259: case 3267: case 3268: case 3282: case 3283:
        case 3285: case 3291: case 3483: case 3490: case 3515: case 3521: case 3522: case 3562: case 3597: case 3601:
        case 3603: case 3604: case 3685: case 3734: case 3764: case 3776: case 3840: case 3954: case 4048: case 4191:
        case 4192: case 4193: case 4283: case 4286: case 4395: case 4416: case 4417: case 4418: case 4421: case 4422:
        case 4423:
            //mark 6
            if(
                this.type==1322&&this.userCombatant.energyParity(this.energy)==0||
                this.type==1617&&this.relPos[0]!=0&&this.relPos[0]!=this.relPos[1]||
                this.type==1803&&this.energy!=3||
                this.type==2432&&this.relPos[1]!=0
            ){
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
            }else{
                this.remove=true
            }
        break
        case 14: case 448: case 458: case 1595:
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
            }else if(this.timer==15&&this.targetDistance==2){
                let middle=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x/2+this.tilePosition.x/2,this.targetTile.tilePosition.y/2+this.tilePosition.y/2)
                switch(this.type){
                    case 448:
                        if(middle>=0&&this.battle.combatantManager.combatants[middle].block<=0){
                            this.battle.combatantManager.combatants[middle].statusEffect('Bleed',this.effect[0])
                        }
                    break;
                    case 458:
                        this.userManager.hand.add(findName('Chain\nShift',types.card),this.level,this.color)
                    break
                    case 1595:
                        if(middle>=0&&this.battle.combatantManager.combatants[middle].block<=0){
                            this.battle.combatantManager.combatants[middle].statusEffect('Jinx',this.effect[0])
                        }
                    break
                }
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
        case 16: case 436: case 1001: case 1017: case 2443: case 2552:
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
                    case 2443:
                        if(this.battle.turn.total>=2){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 2552:
                        let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x*2-this.targetCombatant.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetCombatant.tilePosition.y)
                        this.targetCombatant.takeDamage(index<0||this.battle.tileManager.tiles[index].occupied!=0?this.effect[0]+this.effect[1]:this.effect[0],this.user)
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
                    if(this.type==1001){
                        this.battle.updateTargetting()
                    }
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
                    if(this.type==1001){
                        this.battle.updateTargetting()
                    }
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
        case 1447: case 1448: case 2132: case 2314: case 2490: case 2629: case 2681: case 2692: case 2797: case 2878:
        case 2903: case 2923: case 3004: case 3021: case 3052: case 3073: case 3130: case 3196: case 3237: case 3303:
        case 3583: case 3748: case 3766: case 3846: case 3983: case 4089: case 4114: case 4121: case 4282: case 4306:
            //mark 7
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
                this.userCombatant.moveTile(this.direction,this.distance/15)
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/15)
                this.userCombatant.runAnimation(1/15,0)
                this.targetCombatant.moveTile(this.direction,-this.distance/15)
                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/15)
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
        case 21: case 3431: case 3433: case 3464: case 3465:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
            }
            this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
            this.userCombatant.runAnimation(1/15,0)
            if(this.timer>=15*this.targetDistance-15){
                switch(this.type){
                    case 3431:
                        this.userManager.draw(this.effect[0])
                    break
                    case 3433:
                        if(this.userManager.hand.turnPlayed[1]>0){
                            this.userManager.draw(this.effect[0])
                        }
                    break
                    case 3464:
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                    break
                    case 3465:
                        this.targetCombatant.statusEffect('Cannot Move',this.effect[0])
                    break
                }
                let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                this.battle.activate(1,this.userCombatant.id)
                this.remove=true
            }
        break
        case 22: case 4157: case 4158: case 4159:
            if(this.timer==1){
                this.userCombatant.startAnimation(11)
            }
            this.userCombatant.runAnimation(1/10,11)
            if(this.timer==10){
                switch(this.type){
                    case 22:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userCombatant.takeDamage(this.effect[1],-1,1)
                    break
                    case 4157:
                        this.battle.addSpecificEnergy(2,this.player,5)
                        this.userCombatant.takeDamage(this.effect[0],-1,1)
                    break
                    case 4158:
                        this.battle.addSpecificEnergy(2,this.player,5)
                        this.battle.addSpecificEnergy(1,this.player,0)
                        this.userCombatant.takeDamage(this.effect[0],-1,1)
                    break
                    case 4159:
                        this.battle.addSpecificEnergy(1,this.player,6)
                        this.battle.addSpecificEnergy(2,this.player,5)
                        this.userCombatant.takeDamage(this.effect[0],-1,1)
                    break
                }
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
        case 25: case 1246: case 1274: case 1367: case 1524: case 1610: case 2048: case 2142: case 2143: case 2496:
        case 2505: case 2943: case 3270: case 3605: case 3701: case 3844: case 3944: case 4426:
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
                    switch(this.type){
                        case 1610:
                            this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.charge>=this.effect[1]?2:1),this.user)
                        break
                        case 3270:
                            this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.block>0?2:1)*(this.targetCombatant.getStatus('Vulnerable')>0?2:1),this.user)
                        break
                        case 3844:
                            this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.block>0?2:1),this.user)
                        break
                        default:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                    }
                    switch(this.type){
                        case 1246:
                            this.battle.addEnergy(this.effect[1],this.player)
                        break
                        case 1274:
                            this.targetCombatant.statusEffect('Freeze',this.effect[1])
                            this.targetCombatant.statusEffect('Shock',this.effect[2])
                        break
                        case 1367:
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                            this.targetCombatant.statusEffect('Shock',this.effect[2])
                        break
                        case 2048:
                            if(this.userCombatant.luckCheck()){
                                this.targetCombatant.statusEffect('Freeze',this.effect[1])
                                this.targetCombatant.statusEffect('Shock',this.effect[2])
                            }else if(!this.userCombatant.luckCheckFail()){
                                if(floor(random(0,2))==0){
                                    this.targetCombatant.statusEffect('Freeze',this.effect[1])
                                }else{
                                    this.targetCombatant.statusEffect('Shock',this.effect[2])
                                }
                            }
                        break
                        case 2142:
                            this.targetCombatant.statusEffect('Jinx',this.effect[1])
                            this.targetCombatant.statusEffect('Shock',this.effect[2])
                        break
                        case 2143:
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                            this.targetCombatant.statusEffect('Shock',this.effect[2])
                        break
                        case 2496:
                            this.targetCombatant.statusEffect('Poison',this.effect[1])
                            this.userManager.drawAbstract(this.effect[2],0,4,[2])
                        break
                        case 2505:
                            if(this.userCombatant.energyParity(this.energy)==1){
                                this.userManager.draw(this.effect[1])
                            }
                        break
                        case 2943:
                            this.targetCombatant.statusEffect('Freeze',this.effect[1])
                            this.userManager.drawAbstract(this.effect[2],0,4,[2])
                        break
                        case 3605:
                            this.userManager.draw(this.effect[1])
                        break
                        case 3701:
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                            this.targetCombatant.statusEffect('Shock',this.effect[2])
                        break
                        case 3944:
                            this.battle.overlayManager.overlays[117][this.player].active=true
                            this.battle.overlayManager.overlays[117][this.player].activate([this.effect[1],[this.effect[2],0,4,[2]]])
                        break
                        case 4426:
                            this.userManager.draw(this.effect[1]*this.selfCall(26))
                        break
                    }
                }else if(this.timer>=36){
                    this.remove=true
                }
            }
        break
        case 27: case 2628:
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
                if(this.type==2628&&this.userCombatant.armed){
                    this.userCombatant.armed=false
                    this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)].addType(3)
                }
            }else if(this.timer>=15*this.targetDistance+15){
                if(this.targetDistance>1){
                    this.battle.activate(1,this.userCombatant.id)
                }
                this.remove=true
            }
        break
        case 31: case 576: case 652: case 2183:
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
                if(this.timer==10){
                    switch(this.type){
                        case 652:
                            this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                        break
                        case 2183:
                            this.targetCombatant[a].statusEffect('Weak',this.effect[0])
                        break
                    }
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
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }else if(this.timer>=10*this.targetDistance+25){
                this.remove=true
            }
        break
        case 33: case 127: case 130: case 437: case 504: case 1461: case 1622: case 1623: case 1889: case 1924:
        case 2006: case 2126: case 2575: case 2663: case 3051: case 3195: case 3871: case 4501: case 4502:
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
                this.selfCall(18)
            }else if(this.timer>=15*this.targetDistance+15){
                this.remove=true
                if(this.targetDistance>1){
                    this.battle.activate(1,this.userCombatant.id)
                }
            }
        break
        case 36: case 39: case 47: case 384: case 412: case 413: case 441: case 599: case 1157: case 1188:
        case 1194: case 1195: case 1196: case 1197: case 1198: case 1199: case 1212: case 1297: case 1332: case 1358:
        case 1427: case 1428: case 1463: case 1474: case 1649: case 1740: case 1822: case 1828: case 1829: case 1830:
        case 1934: case 1967: case 1968: case 2627: case 2630: case 2649: case 2651: case 3220: case 3349: case 3516:
        case 3692: case 3906: case 4085:
            if(
                (this.type==1649||this.type==1740)&&this.userCombatant.energyParity(this.energy)!=this.limit%2||
                this.type==1822&&this.energy<2
            ){
                this.remove=true
            }else if(variants.nobasicanim){
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
        case 37: case 432: case 1210: case 1343: case 2659:
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
                        case 2659:
                            let partial=floor(random(0,this.targetDistance+1))/this.targetDistance
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(round(this.userCombatant.tilePosition.x*partial+this.targetCombatant.tilePosition.x*(1-partial)),round(this.userCombatant.tilePosition.y*partial+this.targetCombatant.tilePosition.y*(1-partial)))].addType(3)
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
        case 1119: case 1139: case 1150: case 1156: case 1162: case 1163: case 1168: case 1182: case 1185: case 1189:
        case 1211: case 1232: case 1244: case 1247: case 1248: case 1252: case 1255: case 1256: case 1258: case 1259:
        case 1261: case 1262: case 1263: case 1266: case 1273: case 1279: case 1280: case 1285: case 1298: case 1308:
        case 1310: case 1313: case 1316: case 1337: case 1342: case 1344: case 1346: case 1348: case 1352: case 1353:
        case 1359: case 1360: case 1362: case 1376: case 1383: case 1400: case 1405: case 1410: case 1411: case 1412:
        case 1413: case 1417: case 1418: case 1425: case 1426: case 1430: case 1431: case 1434: case 1435: case 1437:
        case 1441: case 1442: case 1443: case 1444: case 1451: case 1452: case 1454: case 1455: case 1469: case 1471:
        case 1472: case 1479: case 1480: case 1481: case 1482: case 1483: case 1484: case 1504: case 1507: case 1512:
        case 1519: case 1530: case 1545: case 1560: case 1562: case 1599: case 1616: case 1619: case 1620: case 1626:
        case 1627: case 1628: case 1629: case 1633: case 1655: case 1683: case 1684: case 1689: case 1692: case 1693:
        case 1697: case 1698: case 1699: case 1714: case 1721: case 1722: case 1723: case 1729: case 1736: case 1745:
        case 1751: case 1753: case 1755: case 1756: case 1768: case 1777: case 1780: case 1782: case 1788: case 1795:
        case 1837: case 1845: case 1850: case 1852: case 1858: case 1863: case 1864: case 1866: case 1867: case 1868:
        case 1874: case 1878: case 1879: case 1880: case 1888: case 1890: case 1892: case 1894: case 1902: case 1907:
        case 1908: case 1943: case 1945: case 1950: case 1951: case 1955: case 1958: case 1969: case 1972: case 2018:
        case 2010: case 2011: case 2016: case 2022: case 2023: case 2024: case 2030: case 2045: case 2050: case 2076:
        case 2091: case 2094: case 2096: case 2097: case 2124: case 2151: case 2158: case 2214: case 2253: case 2272:
        case 2273: case 2345: case 2369: case 2393: case 2404: case 2434: case 2435: case 2458: case 2470: case 2476:
        case 2482: case 2506: case 2546: case 2561: case 2569: case 2570: case 2577: case 2605: case 2648: case 2713:
        case 2794: case 2803: case 2816: case 2819: case 2872: case 2875: case 2880: case 2898: case 2924: case 2977:
        case 2978: case 2981: case 2995: case 3006: case 3026: case 3031: case 3034: case 3053: case 3124: case 3125:
        case 3155: case 3156: case 3158: case 3179: case 3183: case 3187: case 3242: case 3244: case 3256: case 3260:
        case 3279: case 3295: case 3310: case 3316: case 3319: case 3321: case 3322: case 3331: case 3337: case 3384:
        case 3386: case 3393: case 3411: case 3463: case 3485: case 3517: case 3554: case 3616: case 3617: case 3620:
        case 3646: case 3647: case 3667: case 3688: case 3733: case 3762: case 3809: case 3810: case 3811: case 3812:
        case 3813: case 3848: case 3863: case 3868: case 3870: case 3915: case 3984: case 3985: case 4052: case 4137:
        case 4138: case 4140: case 4142: case 4200: case 4201: case 4237: case 4238: case 4250: case 4252: case 4253:
        case 4254: case 4280: case 4289: case 4294: case 4298: case 4300: case 4318: case 4333: case 4372: case 4484:
        case 4500: case 4511: case 4512: case 4585:
            //mark 8
            if(
                this.type==1162&&this.energy<3||
                this.type==1247&&this.userCombatant.energyParity(this.energy)!=0||
                this.type==1259&&this.userCombatant.energyParity(this.energy)!=0||
                this.type==1285&&this.effect[0]>0||
                this.type==1342&&(this.relPos[0]!=3||this.energy!=3)||
                this.type==1362&&this.userCombatant.energyParity(this.energy)!=0||
                this.type==1633&&this.userCombatant.energyParity(this.energy)==0||
                this.type==1736&&this.relPos[0]%2!=0||
                this.type==4237&&this.mtgEnergy.length<3
            ){
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
                    this.userCombatant.startAnimation(this.type==48?9:3)
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
                            this.battle.updateTargetting()
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
                    this.battle.activateTile(1,this.userCombatant.id)
                    this.battle.updateTargetting()
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
                        this.battle.updateTargetting()
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
        case 54: case 87: case 486: case 976: case 979: case 988: case 2382: case 2658: case 2748: case 2749:
        case 2762: case 2946: case 4076: case 4278:
            if(this.timer==1){
                this.userCombatant.startAnimation(19)
            }
            this.userCombatant.runAnimation(1/20,19)
            if(this.timer==10){
                switch(this.type){
                    case 87:
                        this.battle.combatantManager.clearTile(this.targetTile)
                    break
                    case 976:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 979:
                        this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.targetTile.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                    break
                    case 2382:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                    break
                    case 2658:
                        if(this.userCombatant.armed){
                            this.userCombatant.armed=false
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)].addType(3)
                        }
                    break
                    case 2748:
                        if(this.userCombatant.elemental){
                            this.userCombatant.statusEffect('Awakening',this.effect[0])
                        }
                    break
                    case 2749:
                        this.userCombatant.loseHealth(this.effect[0])
                    break
                    case 2762:
                        this.battle.attackManager.endAfter=true
                    break
                    case 2946:
                        this.userManager.draw(this.effect[0],5)
                    break
                    case 4278:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Wisp',types.card),0,game.playerNumber+1)
                        }
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
        case 57: case 1492: case 1773: case 1982: case 2028: case 2282: case 3344: case 3560: case 3645: case 3706:
            if(this.timer==1){
                this.userCombatant.startAnimation(15)
            }
            if(this.timer<=30){
                this.userCombatant.runAnimation(1/15,15)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,5,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),7.5*this.targetDistance-2]))
            }else if(this.timer==30*this.targetDistance+10){
                switch(this.type){
                    case 1492:
                        let luckCheck=this.userCombatant.luckCheck()
                        if(luckCheck||!this.userCombatant.luckCheck()){
                            if(floor(random(0,4))!=0||luckCheck){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                            }
                            if(floor(random(0,4))!=0||luckCheck){
                                this.userCombatant.addBlock(this.effect[0])
                            }
                        }
                    break
                    case 2028:
                        this.userCombatant.addBlock(this.effect[0])
                        this.targetCombatant.takeDamage(this.effect[1]*this.userCombatant.diceRoll(1,6),this.user)
                    break
                    case 3344:
                        this.userCombatant.addBlock(this.effect[0])
                        this.userCombatant.takeDamage(this.effect[1]*this.userCombatant.diceRoll(1,6),this.user)
                    break
                    case 3645:
                        this.targetCombatant.block=0
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 3706:
                        if(this.userCombatant.block<=0){
                            this.targetCombatant.takeDamage(this.effect[0]*0.5,this.user)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.userCombatant.block=max(0,this.userCombatant.block-this.effect[1])
                        }
                    break
                    default:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        switch(this.type){
                            case 1773:
                                let roll=this.userCombatant.luckCheck()?6:this.userCombatant.luckCheckFail()?1:floor(random(1,7))
                                this.userCombatant.addBlock(roll)
                            break
                            case 1982:
                                this.userCombatant.addBlock(this.effect[1]*this.userCombatant.diceRoll(1,6))
                            break
                            case 2282:
                                if((types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5)){
                                    this.userManager.draw(this.effect[1])
                                }else{
                                    this.battle.addEnergy(this.effect[2],this.player)
                                }
                            break
                            case 3560:
                                if(this.userCombatant.block<=0){
                                    this.userCombatant.addBlock(this.effect[1])
                                }else{
                                    this.userCombatant.block=max(0,this.userCombatant.block-this.effect[2])
                                }
                            break
                        }
                    break
                }
            }else if(this.timer>=30*this.targetDistance+15){
                this.remove=true
            }
        break
        case 61: case 1927:
            if(this.timer==1){
                this.userCombatant.startAnimation(21)
            }
            this.userCombatant.runAnimation(1/30,21)
            if(this.timer==15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.targetCombatant.life<=0){
                    switch(this.type){
                        case 61:
                            this.battle.addCurrency(this.effect[1],this.player)
                        break
                        case 1927:
                            this.battle.loseCurrency(this.battle.currency.money[this.player],this.player)
                        break
                    }
                }
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 66: case 68: case 421: case 465: case 466: case 467: case 468: case 1281: case 1288:
        case 1320: case 1339: case 1432: case 1548: case 1567: case 1568: case 1618: case 1744: case 1869:
        case 1906: case 1932: case 2595: case 2596: case 2597: case 2662: case 2785: case 2786: case 3284:
        case 3394: case 3857: case 4443:
            //mark 9
            if(
                this.type==1288&&this.relPos[1]!=0
            ){
                this.remove=true
            }else if(variants.nobasicanim){
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
            if(this.remove){
                switch(this.type){
                    case 1906:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.turnManager.turns.push(new turn(0,this.battle,
                                this.targetCombatant.attack[this.targetCombatant.intent].type,
                                this.targetCombatant.attack[this.targetCombatant.intent].effect,this.user))
                            }
                    break
                }
            }
        break
        case 67:
            if(this.timer==1){
                this.userCombatant.startAnimation(23)
            }
            this.userCombatant.runAnimation(1/15,23)
            if(this.timer==15){
                switch(this.type){
                    case 67:
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                    break
                }
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 75: case 3257:
            if(this.timer==1){
                let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x-offset[0],this.userCombatant.tilePosition.y-offset[1])
                this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                this.userCombatant.startAnimation(0)
            }
            if(this.timer==10){
                switch(this.type){
                    case 3257:
                        this.userCombatant.heal(this.effect[1])
                    break
                }
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
        case 77: case 1503: case 1538:
            if(this.timer==1){
                this.userCombatant.startAnimation(24)
            }
            this.userCombatant.runAnimation(1/12,24)
            if(this.timer==6){
                if(this.type==1503){
                    if(this.targetCombatant.block==0){
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    }
                }else{
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.userCombatant.heal(this.effect[1])
                    if(this.type==1538&&(floor(random(0,4))==0&&!this.userCombatant.luckCheck()||this.userCombatant.luckCheckFail())){
                        this.userCombatant.statusEffect('Poison',this.effect[2])
                        this.userCombatant.lowRoll()
                    }
                }
            }else if(this.timer>=12){
                this.remove=true
            }
        break
        case 80: case 590: case 594: case 609: case 632: case 633: case 634: case 915: case 1002: case 1009:
        case 1034: case 1036: case 1047: case 1052: case 1126: case 1149: case 1171: case 1319: case 1640: case 1801:
        case 1900: case 2127: case 2308: case 2398: case 3175: case 3373: case 3452: case 3594: case 3786: case 3901:
        case 3946: case 3990: case 4559:
            //mark 10
            if(this.type==1640&&this.energy!=this.effect[0]){
                this.remove=true
            }else if(variants.nobasicanim){
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
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                }else if(this.timer==5*this.targetDistance+15){
                    this.selfCall(9)
                }else if(this.timer>=max(30,5*this.targetDistance+25)){
                    this.remove=true
                }
            }
        break
        case 82: case 3595: case 3613: case 4427:
            if(this.timer==1){
                this.userCombatant.startAnimation(15)
            }
            if(this.timer<=30){
                this.userCombatant.runAnimation(1/15,15)
            }
            if(this.timer==15){
                switch(this.type){
                    case 82: case 3595:
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,7,[atan2(this.targetTile.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetTile.position.y),5*this.targetDistance-2]))
                    break
                    case 3613: case 4427:
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,113,[atan2(this.targetTile.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetTile.position.y),5*this.targetDistance-2]))
                    break
                }
            }else if(this.timer==10*this.targetDistance+15){
                switch(this.type){
                    case 82: case 3595:
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetTile.position.x,this.targetTile.position.y,10,[10]))
                    break
                    case 3613:
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetTile.position.x,this.targetTile.position.y,52,[15]))
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 4427:
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetTile.position.x,this.targetTile.position.y,52,[15]))
                        this.battle.addSpecificEnergy(this.selfCall(26),this.player,0)
                    break
                }
                this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.targetTile.tilePosition,[0],[0,1],false,0)
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
        case -14: case -60:
        case 102: case 112: case 114: case 219: case 270: case 324: case 325: case 341: case 403: case 404:
        case 405: case 426: case 587: case 637: case 670: case 676: case 683: case 710: case 792: case 845:
        case 888: case 889: case 927: case 936: case 941: case 969: case 1020: case 1099: case 1107: case 1132:
        case 1140: case 1142: case 1190: case 1207: case 1218: case 1223: case 1245: case 1276: case 1290: case 1299:
        case 1300: case 1317: case 1318: case 1329: case 1338: case 1340: case 1341: case 1349: case 1364: case 1368:
        case 1371: case 1382: case 1385: case 1414: case 1423: case 1449: case 1450: case 1499: case 1500: case 1511:
        case 1516: case 1541: case 1552: case 1637: case 1679: case 1701: case 1702: case 1726: case 1727: case 1757:
        case 1771: case 1789: case 1792: case 1812: case 1834: case 1846: case 1899: case 1919: case 1925: case 1935:
        case 2038: case 2125: case 2129: case 2130: case 2194: case 2209: case 2226: case 2232: case 2239: case 2240:
        case 2252: case 2279: case 2397: case 2414: case 2438: case 2441: case 2453: case 2454: case 2457: case 2571:
        case 2572: case 2587: case 2592: case 2599: case 2601: case 2645: case 2705: case 2733: case 2777: case 2790:
        case 2814: case 2831: case 2841: case 2842: case 2843: case 2847: case 2848: case 2854: case 2855: case 2856:
        case 2857: case 2858: case 2859: case 2861: case 2871: case 2874: case 2879: case 2894: case 2902: case 2968:
        case 2985: case 2991: case 3018: case 3058: case 3061: case 3069: case 3090: case 3091: case 3116: case 3147:
        case 3148: case 3169: case 3174: case 3180: case 3185: case 3186: case 3192: case 3197: case 3201: case 3202:
        case 3240: case 3250: case 3273: case 3286: case 3287: case 3288: case 3289: case 3290: case 3306: case 3318:
        case 3340: case 3361: case 3369: case 3370: case 3374: case 3402: case 3458: case 3468: case 3496: case 3498:
        case 3528: case 3536: case 3559: case 3588: case 3593: case 3599: case 3618: case 3683: case 3690: case 3703:
        case 3714: case 3722: case 3728: case 3729: case 3730: case 3755: case 3756: case 3773: case 3782: case 3818:
        case 3866: case 3867: case 3881: case 3882: case 3888: case 3889: case 3903: case 3922: case 3982: case 3986:
        case 3988: case 3989: case 4007: case 4008: case 4021: case 4022: case 4023: case 4036: case 4040: case 4073:
        case 4086: case 4094: case 4095: case 4118: case 4119: case 4132: case 4182: case 4202: case 4205: case 4220:
        case 4221: case 4222: case 4266: case 4354: case 4424: case 4452: case 4487: case 4578: case 4591: case 4592:
        case 4593:
            //mark 11
            if(
                this.type==1935&&this.userCombatant.energyParity(this.energy)!=0||
                this.type==3703&&this.userManager.hand.turnPlayed[1]<2
            ){
                this.remove=true
            }else if(variants.nobasicanim){
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
        case 132: case 136: case 290: case 557: case 1711: case 1937: case 3265:
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
                    case 132: case 1711:
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
                        case 1711:
                            this.userCombatant.combo=max(0,this.userCombatant.combo-this.effect[2])
                        break
                        case 3265:
                            this.userManager.hand.add(findName(['Square\nSculpture','Arc\nSculpture'][floor(random(0,2))],types.card),this.level,this.color)
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
        case 138: case 139: case 175: case 400: case 453: case 516: case 1436: case 1709: case 1781: case 1914:
        case 2044: case 2384: case 2654: case 3014: case 3573: case 3587:
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
        case 147: case 1596:
            if(this.timer==1){
                this.userCombatant.startAnimation(19)
                this.targetCombatant.size=1
            }
            this.userCombatant.runAnimation(1/20,19)
            this.targetCombatant.size=1-sin(this.timer*9)
            if(this.timer==10){
                let userPosition={x:this.userCombatant.tilePosition.x,y:this.userCombatant.tilePosition.y}
                this.userCombatant.moveTile(this.direction,this.distance)
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                this.targetCombatant.moveTile(this.direction,-this.distance)
                this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance)
                this.targetCombatant.moveTilePosition(userPosition.x,userPosition.y)
                this.battle.activate(1,this.userCombatant.id)
                if(this.type==1596){
                    this.userCombatant.activate(0)
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 153: case 1786: case 2168:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
            }
            this.userCombatant.moveTile(this.direction,this.distance/(24*this.targetDistance))
            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(24*this.targetDistance))
            this.userCombatant.runAnimation(1/12,0)
            if(this.timer==16*this.targetDistance&&this.type==2168){
                this.userCombatant.statusEffect('Step Next Turn',1)
            }
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
        case 176: case 1720: case 2146: case 2229: case 3143: case 3506: case 4516:
            if(this.timer==1){
                this.userCombatant.startAnimation(15)
            }
            if(this.timer<=30){
                this.userCombatant.runAnimation(1/15,15)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[this.userCombatant.animSet.hand].bottom.y,7,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
            }else if(this.timer==10*this.targetDistance+15){
                if(this.type==1720&&(floor(random(0,4))==0&&!this.userCombatant.luckCheck()||this.userCombatant.luckCheckFail())){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,10,[10]))
                    this.userCombatant.takeDamage(this.effect[0],this.user)
                    this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                }else if(this.type==176){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,10,[10]))
                    this.targetCombatant.takeDamage(this.effect[0],this.user,2)
                    this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,2],this.targetCombatant.tilePosition,[3,this.targetCombatant.id],[0,1],false,0)
                }else if(this.type==3506){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,10,[10]))
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    let targets=this.battle.combatantManager.getAreaId(this.targetCombatant.id,this.targetCombatant.tilePosition,1)
                    let luckCheck=this.userCombatant.luckCheck()
                    let luckCheckFail=false
                    if(!luckCheck){
                        luckCheckFail=this.userCombatant.luckCheckFail()
                    }
                    for(let a=0,la=targets.length;a<la;a++){
                        if(luckCheck||floor(random(0,2))==0&&!luckCheckFail){
                            targets[a].takeDamage(this.effect[0],this.user)
                        }
                    }
                }else{
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,10,[10]))
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.targetCombatant.tilePosition,[3,this.targetCombatant.id],[0,1],false,0)
                }
                switch(this.type){
                    case 2146:
                        this.userCombatant.statusEffect('Energy Next Turn',-this.effect[1])
                    break
                    case 2229:
                        this.userCombatant.statusEffect('Temporary Strength Next Turn',-this.effect[1])
                    break
                    case 3143:
                        this.battle.combatantManager.summonConstructRandom(this.targetCombatant.tilePosition,findName('Duck',types.combatant),this.battle.players+1,this.direction,this.user)
                    break
                    case 4516:
                        this.userCombatant.statusEffect('Random Mana Next Turn',-this.effect[1])
                    break
                }
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
                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
            }
            if(this.timer==5*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }else if(this.timer==5*this.targetDistance+20){
                this.targetCombatant.takeDamage(this.effect[0]-1,this.user)
            }else if(this.timer==5*this.targetDistance+25){
                this.targetCombatant.takeDamage(this.effect[0]-2,this.user)
            }else if(this.timer==5*this.targetDistance+30){
                this.targetCombatant.takeDamage(this.effect[0]-3,this.user)
            }else if(this.timer>=max(45,5*this.targetDistance+40)){
                this.remove=true
            }
        break
        case 179: case 3504: case 3505: case 4510:
            if(this.targetDistance==1&&this.type==179){
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
                    this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.targetCombatant.tilePosition,[0],[0,1],false,0)
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,2,[8]))
                    switch(this.type){
                        case 3504:
                            this.targetCombatant.statusEffect('Stun',this.effect[1])
                        break
                        case 3505:
                            if(this.relPos[0]==0){
                                this.battle.addEnergy(this.effect[1],this.player)
                            }
                        break
                        case 4510:
                            if(this.relPos[0]==0){
                                this.battle.addSpecificEnergy(2,this.player,0)
                            }
                        break
                    }
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            }
        break
        case 188: case 3623:
            if(this.timer==1){
                this.userCombatant.startAnimation(2)
            }
            this.userCombatant.runAnimation(1/30,2)
            if(this.timer==15){
                switch(this.type){
                    case 188:
                        this.targetCombatant.statusEffect('Damage Taken Up',this.effect[0])
                        this.targetCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 3623:
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                        this.targetCombatant.statusEffect('Strength',this.effect[1])
                    break
                }
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
                if(this.targetDistance>1){
                    this.battle.activate(1,this.userCombatant.id)
                }
                this.remove=true
            }
        break
        case 211: case 255: case 501: case 616: case 617: case 618: case 1172: case 1173: case 1815: case 1891:
        case 2228: case 2653: case 2711: case 2765: case 2813: case 3007: case 3336: case 3488: case 3577: case 3634:
        case 3635: case 4105:
            if(this.type==1815&&this.energy!=0){
                this.remove=true
            }else{
                if(this.timer==1&&this.targetDistance>1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-14||this.timer==15*this.targetDistance+1){
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
                    if(this.timer==15*this.targetDistance-3){
                        switch(this.type){
                            case 4105:
                                this.userCombatant.addBlock(min(this.targetCombatant.block,this.effect[0]))
                                this.targetCombatant.block=max(0,this.targetCombatant.block-this.effect[0])
                            break
                        }
                    }
                    switch(this.type){
                        case 3007:
                            this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.block>0?2:1),this.user,2)
                        break
                        case 4105:
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                        break
                        default:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                    }
                    if(this.timer==15*this.targetDistance-3){
                        switch(this.type){
                            case 211:
                                this.userCombatant.statusEffect('Dodge',this.effect[1])
                            break
                            case 501:
                                this.userCombatant.statusEffect('Claw Up',this.effect[1])
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
                            case 2228:
                                if(this.targetCombatant.block<=0){
                                    this.targetCombatant.statusEffect('Weak',this.effect[1])
                                }
                            break
                            case 2653:
                                if(this.targetCombatant.blocked>0){
                                    this.targetCombatant.statusEffect('Bleed',this.effect[1])
                                }
                            break
                            case 2711:
                                if(this.userCombatant.elemental){
                                    this.userCombatant.statusEffect('Strength',this.effect[1])
                                }
                            break
                            case 2765:
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.userManager.randomEffect(2,2,[0])
                                }
                            break
                            case 3336:
                                this.targetCombatant.statusEffect('Burn',this.effect[1])
                            break
                        }
                    }else if(this.timer==15*this.targetDistance+3){
                        switch(this.type){
                            case 1891:
                                this.userCombatant.statusEffect('Double Damage',this.effect[1])
                            break
                            case 2228:
                                if(this.targetCombatant.block<=0){
                                    this.targetCombatant.statusEffect('Weak',this.effect[1])
                                }
                            break
                            case 2653:
                                if(this.targetCombatant.blocked>0){
                                    this.targetCombatant.statusEffect('Bleed',this.effect[1])
                                }
                            break
                            case 2813:
                                this.targetCombatant.statusEffect('Damage Taken Up',this.effect[1])
                                this.userCombatant.statusEffect('Dodge',this.effect[2])
                            break
                            case 3336:
                                this.userCombatant.loseHealth(this.effect[2])
                            break
                            case 3488:
                                this.targetCombatant.statusEffect('Damage Taken Up',this.effect[1])
                                this.userCombatant.statusEffect('Intangible',this.effect[2])
                            break
                            case 3577:
                                this.targetCombatant.statusEffect('Frail',this.effect[1])
                                this.userCombatant.statusEffect('Dodge',this.effect[2])
                            break
                            case 3634:
                                this.targetCombatant.statusEffect('Bleed',this.effect[1])
                                this.userCombatant.statusEffect('Intangible',this.effect[2])
                            break
                            case 3635:
                                this.targetCombatant.statusEffect('Lock On',this.effect[1])
                                this.userCombatant.statusEffect('Dodge',this.effect[2])
                            break
                        }
                    }
                    switch(this.type){
                        case 1815:
                            this.targetCombatant.statusEffect('Poison',this.effect[1])
                        break
                    }
                }else if(this.timer>=15*this.targetDistance+15){
                    if(this.targetDistance>1){
                        this.battle.activate(1,this.userCombatant.id)
                    }
                    this.remove=true
                }
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
                this.targetCombatant.takeDamage(this.effect[0],this.user)
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
                this.targetCombatant.takeDamage(this.effect[0],this.user)
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
                    this.targetCombatant.statusEffect('Freeze',this.userCombatant.getStatus('Shiv Freeze'))
                    this.targetCombatant.statusEffect('Burn',this.userCombatant.getStatus('Shiv Burn'))
                }else if(this.timer>=15*this.targetDistance-5){
                    if(this.targetDistance>1){
                        this.battle.activate(1,this.userCombatant.id)
                    }
                    this.remove=true
                }
            }
        break
        case 328: case 572: case 707: case 708: case 709: case 813: case 814: case 815: case 2107:
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
        case 329: case 1787:
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
            this.userCombatant.runAnimation(1/10,32)
            if(this.timer==5){
                this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,2],false,0)
            }else if(this.timer>=10){
                this.remove=true
            }
        break
        case -52: case -53:
        case 342: case 350: case 353: case 407: case 425: case 473: case 476: case 477: case 478: case 479:
        case 480: case 481: case 490: case 491: case 492: case 493: case 494: case 495: case 498: case 505:
        case 506: case 520: case 526: case 531: case 532: case 534: case 535: case 536: case 543: case 544:
        case 545: case 549: case 550: case 551: case 552: case 553: case 554: case 555: case 556: case 560:
        case 561: case 562: case 563: case 564: case 565: case 566: case 567: case 568: case 577: case 578:
        case 579: case 583: case 584: case 600: case 671: case 672: case 673: case 767: case 785: case 847:
        case 851: case 854: case 856: case 879: case 894: case 956: case 971: case 1000: case 1056: case 1060:
        case 1103: case 1105: case 1116: case 1117: case 1122: case 1272: case 1278: case 1347: case 1350: case 1351:
        case 1391: case 1403: case 1404: case 1408: case 1409: case 1470: case 1517: case 1520: case 1546: case 1547:
        case 1555: case 1566: case 1604: case 1632: case 1669: case 1670: case 1691: case 1746: case 1762: case 1763:
        case 1764: case 1765: case 1775: case 1776: case 1797: case 1798: case 1799: case 1800: case 1818: case 1819:
        case 1820: case 1823: case 1833: case 1855: case 1859: case 1860: case 1873: case 1884: case 1903: case 1917:
        case 1918: case 1941: case 1954: case 1965: case 2013: case 2014: case 2043: case 2057: case 2058: case 2059:
        case 2080: case 2081: case 2083: case 2084: case 2085: case 2086: case 2087: case 2088: case 2098: case 2099:
        case 2100: case 2115: case 2117: case 2119: case 2122: case 2138: case 2148: case 2188: case 2189: case 2190:
        case 2191: case 2192: case 2193: case 2265: case 2271: case 2284: case 2287: case 2317: case 2340: case 2386:
        case 2387: case 2399: case 2421: case 2422: case 2473: case 2503: case 2515: case 2516: case 2524: case 2543:
        case 2544: case 2547: case 2564: case 2620: case 2624: case 2644: case 2655: case 2674: case 2693: case 2729:
        case 2800: case 2812: case 2828: case 2829: case 2830: case 2838: case 2840: case 2862: case 2911: case 2912:
        case 2913: case 2957: case 2967: case 2969: case 2983: case 2998: case 3012: case 3015: case 3030: case 3039:
        case 3044: case 3074: case 3075: case 3076: case 3077: case 3078: case 3082: case 3084: case 3093: case 3134:
        case 3135: case 3140: case 3144: case 3159: case 3160: case 3166: case 3170: case 3176: case 3181: case 3182:
        case 3193: case 3210: case 3252: case 3314: case 3315: case 3334: case 3335: case 3351: case 3366: case 3375:
        case 3381: case 3382: case 3383: case 3390: case 3395: case 3396: case 3397: case 3461: case 3477: case 3523:
        case 3568: case 3569: case 3584: case 3585: case 3586: case 3608: case 3615: case 3643: case 3689: case 3721:
        case 3724: case 3725: case 3726: case 3727: case 3781: case 3843: case 3864: case 3892: case 3895: case 3896:
        case 3908: case 3909: case 3933: case 3995: case 3996: case 4020: case 4033: case 4035: case 4039: case 4049:
        case 4051: case 4070: case 4075: case 4078: case 4079: case 4097: case 4103: case 4171: case 4179: case 4217:
        case 4218: case 4219: case 4226: case 4227: case 4228: case 4229: case 4230: case 4232: case 4233: case 4234:
        case 4249: case 4261: case 4274: case 4316: case 4317: case 4373: case 4375: case 4376: case 4377: case 4449:
        case 4526: case 4548: case 4551: case 4590:
            //mark 12
            if(this.type==2265&&this.userManager.exhaust.cards.length<5){
                this.remove=true
            }else{
                if(variants.nobasicanim){
                    this.selfCall(19)
                    this.selfCall(12)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(32)
                        this.selfCall(19)
                    }
                    this.userCombatant.runAnimation(1/20,32)
                    if(this.timer==10){
                        this.selfCall(12)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
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
        case 358: case 2657: case 3872: case 3878:
            if(this.timer==1){
                this.userCombatant.startAnimation(2)
            }
            this.userCombatant.runAnimation(1/30,2)
            if(this.timer==15){
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 2657:
                            this.userCombatant.addBlock(this.effect[1])
                        break
                        case 3872:
                            this.targetCombatant[a].statusEffect('Lock On',this.effect[1])
                        break
                        case 3878:
                            this.userManager.draw(this.effect[1])
                        break
                    }
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
        case 411: case 3598:
            if(this.timer==1){
                this.userCombatant.startAnimation(35)
            }
            this.userCombatant.runAnimation(1/30,35)
            if(this.timer==15){
                switch(this.type){
                    case 411:
                        this.userCombatant.statusEffect('Draw Up',this.effect[0])
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 3598:
                        this.userCombatant.balance+=this.effect[0]
                    break
                }
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
        case 464: case 2108: case 4447: case 4448:
            if(this.targetDistance==1){
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
            }else{
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
                this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
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
        case 591: case 593: case 1072: case 1598: case 4428:
            if(this.timer==1){
                this.userCombatant.startAnimation(25)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/10,25)
            }
            if(this.timer>=14&&this.timer<=16){
                for(let a=0,la=3;a<la;a++){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30)+random(-12,12),this.distance/30-2]))
                }
            }else if(this.timer==5*this.targetDistance+15&&!(this.type==1598&&(floor(random(0,4))!=0&&!this.userCombatant.luckCheck()||this.userCombatant.luckCheckFail()))){
                this.targetCombatant.takeDamage(this.effect[0]-this.effect[1]*(this.targetDistance-1),this.user)
                switch(this.type){
                    case 593:
                        if(this.targetCombatant.life<=0){
                            this.battle.addEnergy(this.effect[2],this.player)
                        }
                    break
                    case 4428:
                        if(this.targetCombatant.life<=0){
                            this.battle.addSpecificEnergy(3,this.player,5)
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
                    this.targetCombatant[0].takeDamage(this.effect[0],this.user)
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
        case 651: case 727: case 3432:
            if(this.targetClass==2){
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer>=15*this.targetDistance-15){
                    switch(this.type){
                        case 3432:
                            this.userManager.draw(this.effect[0])
                        break
                    }
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
                    switch(this.type){
                        case 3432:
                            this.userManager.draw(this.effect[0])
                        break
                    }
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
        case 674: case 2763:
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
            if(this.remove&&this.type==2763){
                this.battle.attackManager.endAfter=true
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
            if(this.timer==1){
                this.procedure[0]=this.userCombatant.stance==1?1:0
            }
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
            if(this.timer==1){
                this.procedure[0]=this.userCombatant.stance==2?1:0
            }
            if(variants.nobasicanim){
                this.remove=true
                if(this.procedure[0]==1){
                    this.userManager.draw(this.effect[0])
                }else{
                    this.userCombatant.enterStance(2)
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
                        this.userCombatant.enterStance(2)
                    }
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 750:
            if(this.timer==1){
                this.procedure[0]=this.userCombatant.stance==3?1:0
            }
            if(variants.nobasicanim){
                if(this.procedure[0]==1){
                    this.userCombatant.moveTile(this.direction,this.distance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    this.battle.activate(1,this.userCombatant.id)
                }else{
                    this.userCombatant.enterStance(3)
                }
                this.remove=true
            }else if(this.procedure[0]==1){
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
            if(this.timer==1){
                this.procedure[0]=this.userCombatant.stance==4?1:0
            }
            if(variants.nobasicanim){
                this.remove=true
                if(this.procedure[0]==4){
                    this.targetCombatant.statusEffect('Frail',this.effect[0])
                    this.targetCombatant.statusEffect('Dexterity',this.effect[1])
                }else{
                    this.userCombatant.enterStance(4)
                }
            }else if(this.procedure[0]==1){
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
                    this.userCombatant.enterStance(4)
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 793: case 908: case 1893: case 2316: case 2734: case 2808:
            if(this.effect[1]<=0){
                this.remove=true
            }else{
                if(this.timer%30==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/30,2)
                if(this.timer%30==15){
                    switch(this.type){
                        case 2316:
                            this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Shock')>=this.effect[2]?2:1),this.user)
                        break
                        default:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        break
                    }
                    if(this.timer==15){
                        switch(this.type){
                            case 2734:
                                this.userCombatant.statusEffect('Knowledge',this.effect[2])
                                if(this.userCombatant.elemental){
                                    this.userCombatant.statusEffect('Wisdom',this.effect[3])
                                }
                            break
                            case 2808:
                                this.userManager.hand.add(findName('Spiked',types.card),0,game.playerNumber+1)
                            break
                        }
                    }
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
                this.procedure[0]=this.userCombatant.luckCheck()?1:this.userCombatant.luckCheckFail()?2:0
            }
            if(this.timer<=15||this.timer>10+this.effect[2]*5){
                this.userCombatant.runAnimation(1/30,17)
            }
            if(this.timer%5==0&&this.timer>=15&&this.timer<=10+this.effect[2]*5){
                this.targetCombatant.takeDamage(this.procedure[0]==1?this.effect[1]:this.procedure[0]==2?this.effect[0]:floor(random(this.effect[0],this.effect[1]+1)),this.user)
            }else if(this.timer>=25+this.effect[2]*5){
                this.remove=true
            }
        break
        case 957:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    42,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
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
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    43,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
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
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    44,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
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
        case 986: case 2657:
            if(this.timer==1){
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.x/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.y/this.targetDistance[a])
                    let index2=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*(1+2/this.targetDistance[a])-this.userCombatant.tilePosition.x*2/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+2/this.targetDistance[a])-this.userCombatant.tilePosition.y*2/this.targetDistance[a])
                    this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:(index>=0&&this.battle.tileManager.tiles[index].occupied==0||index2>=0&&a==0&&this.targetCombatant.length>1&&this.battle.tileManager.tiles[index2].occupied==0)?0:1
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
                    if(this.timer==18&&!(a==0&&la==2)){
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
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
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
                        this.targetCombatant[0].takeDamage(this.effect[1],this.user)
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
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.x/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.y/this.targetDistance[a])
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
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40/this.targetDistance[a])
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40/this.targetDistance[a])
                        }else if(this.timer>38&&this.timer<=46){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40/this.targetDistance[a])
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40/this.targetDistance[a])
                        }
                    }else if(this.procedure[a]==1){
                        if(this.timer>30&&this.timer<=38){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10/this.targetDistance[a])
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10/this.targetDistance[a])
                        }else if(this.timer>38&&this.timer<=46){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/10/this.targetDistance[a])
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer==38){
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.x/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.y/this.targetDistance[a])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[a]==0){
                        if(this.timer>30){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10/this.targetDistance[a])
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer>=40){
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.x/this.targetDistance[a],this.targetCombatant[a].tilePosition.y*(1+1/this.targetDistance[a])-this.userCombatant.tilePosition.y/this.targetDistance[a])
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
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
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
            }else if(this.timer<=15*this.targetDistance-15){
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
            }
            if(this.timer==15*this.targetDistance-15||this.targetDistance==1&&this.timer==1){
                let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                if(this.targetDistance>1){
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                }
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
            }else if(this.timer>=15*this.targetDistance-15){
                this.remove=true
            }
        break
        case 1373:
            if(this.timer==1){
                if(this.energy!=1){
                    this.remove=true
                }
                this.userCombatant.startAnimation(14)
            }
            if(!this.remove){
                if(this.timer<=15){
                    this.userCombatant.runAnimation(1/15,14)
                }
                if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.targetCombatant.statusEffect('Weak',this.effect[1])
                }
                if(this.timer>=15){
                    this.remove=true
                }
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
                    let offset=transformDirection(0,this.relativeDirection)
                    this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x-offset[0],this.userCombatant.tilePosition.y-offset[1])
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
                this.procedure[0]=this.userCombatant.luckCheck()?0:this.userCombatant.luckCheckFail()?1:floor(random(0,2))
            }
            if(this.procedure[0]==0){
                if(this.timer==1){
                    this.userCombatant.startAnimation(25)
                }
                if(this.timer<=10||this.timer>20&&this.timer<=30){
                    this.userCombatant.runAnimation(1/10,25)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
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
                    this.targetCombatant.takeDamage(this.effect[2],this.user)
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
        case 1575:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
                let index=this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x*2-this.targetTile.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetTile.tilePosition.y)
                if(index>=0){
                    this.targetCombatant=this.battle.combatantManager.combatants[index]
                }else{
                    this.targetCombatant=-1
                }
            }
            this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
            this.userCombatant.runAnimation(1/15,0)
            if(this.targetCombatant!=-1){
                this.targetCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
            }
            if(this.timer==10*this.targetDistance){
                this.selfCall(2)
            }
            if(this.timer>=15*this.targetDistance){
                if(this.targetCombatant!=-1){
                    this.targetCombatant.moveTilePosition(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                }
                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                if(this.type==205){
                    this.battle.activateTile(1,this.userCombatant.id)
                }else{
                    this.battle.activate(1,this.userCombatant.id)
                }
                this.remove=true
            }
        break
        case 1602:
            if(this.timer==1){
                let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                this.userCombatant.startAnimation(9)
            }
            this.userCombatant.runAnimation(1/10,9)
            if(this.timer==10){
                if(this.targetCombatant.block==0){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else{
                    this.usermanager.draw(this.effect[1])
                }
            }else if(this.timer==20){
                this.remove=true
            }
        break
        case 1651: case 1652: case 1653: case 1654:
            if(this.timer==1){
                this.userCombatant.startAnimation(38)
            }
            if(this.timer<=5||this.timer>25){
                this.userCombatant.runAnimation(0.06,38)
            }else{
                this.userCombatant.runAnimation(0.02,38)
            }
            if(this.timer==15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                switch(this.type){
                    case 1651:
                        this.targetCombatant.statusEffect('Chained',this.effect[1])
                    break
                    case 1652:
                        if(this.userManager.hand.cards.length>0){
                            this.userManager.hand.cards[0].deSize=true
                        }
                        this.userManager.draw(1)
                    break
                    case 1653:
                        if(this.userManager.hand.cards.length>0){
                            this.userManager.hand.cards[0].cost=0
                        }
                    break
                }
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 1674:
            if(this.timer==1){
                this.targetCombatant.startAnimation(0)
            }
            this.targetCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
            this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
            this.targetCombatant.runAnimation(1/15,0)
            if(this.timer>=15*this.targetDistance){
                this.targetCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                this.battle.activate(1,this.targetCombatant.id)
                this.remove=true
            }
        break
        case 1682:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
            }
            if(this.timer<=15*this.targetDistance+5){
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
            }else{
                this.userCombatant.moveTile(this.direction,-this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(15*this.targetDistance))
            }
            this.userCombatant.runAnimation(1/15,0)
            if(this.timer==15*this.targetDistance+5){
                this.userCombatant.takeDamage(game.collisionDamage,-1)
            }
            if(this.timer>=15*this.targetDistance+10){
                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                this.battle.activate(1,this.userCombatant.id)
                this.userCombatant.startAnimation(0)
                this.userCombatant.runAnimation(0,0)
                this.remove=true
            }
        break
        case 1688:
            if(this.timer==1){
                this.targetCombatant.size=1
            }
            this.targetCombatant.size=1-sin(this.timer*9)
            if(this.timer==10){
                this.targetCombatant.moveTile(this.direction,this.distance)
                this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance)
                this.targetCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                this.battle.activate(1,this.targetCombatant.id)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 1700:
            if(variants.nobasicanim){
                this.selfCall(1)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/10,1)
                if(this.timer==5){
                    this.selfCall(1)
                }else if(this.timer>=10){
                    this.remove=true
                }
            }
        break
        case 1821:
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
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,47,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                }else if(this.timer==5*this.targetDistance+15){
                    this.selfCall(9)
                }else if(this.timer>=max(30,5*this.targetDistance+25)){
                    this.remove=true
                }
            }
        break
        case 1911:
            if(variants.nobasicanim){
                this.selfCall(11)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(39)
                }
                this.userCombatant.runAnimation(1/30,39)
                if(this.timer==15){
                    this.selfCall(11)
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 1912:
            if(variants.nobasicanim){
                this.selfCall(11)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(40)
                }
                this.userCombatant.runAnimation(1/30,40)
                if(this.timer==15){
                    this.selfCall(11)
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 1913:
            if(variants.nobasicanim){
                this.selfCall(7)
                this.selfCall(7)
                this.selfCall(7)
                this.remove=true
            }else{
                if(this.timer%10==1){
                    this.userCombatant.startAnimation(17)
                }
                this.userCombatant.runAnimation(1/10,17)
                if(this.timer==5||this.timer==15||this.timer==25){
                    this.selfCall(7)
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 1928:
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
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,48,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                }else if(this.timer==8*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.targetCombatant.goal.animDirection+=floor(random(1,6))*60
                }else if(this.timer>=max(30,8*this.targetDistance+25)){
                    this.remove=true
                }
            }
        break
        case 1947:
            if(this.limit[0]>=0&&this.limit[0]<this.battle.combatantManager.combatants.length){
                this.targetCombatant=this.battle.combatantManager.combatants[this.limit[0]]
                if(this.targetCombatant.attack.length>0){
                    this.battle.turnManager.turns.push(new turn(0,this.battle,
                        this.targetCombatant.attack[this.limit[1]].type,
                        this.targetCombatant.attack[this.limit[1]].effect,this.user))
                    }
            }
            this.remove=true
        break
        case 1962:
            if(this.disProcedure==0){
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction2,this.distance2/(15*this.targetDistance2))
                this.userCombatant.moveRelativeTile(this.relativeDirection2,this.relativeDistance2/(15*this.targetDistance2))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer==10*this.targetDistance2){
                    this.selfCall(2)
                }
                if(this.timer>=15*this.targetDistance2){
                    this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    if(this.type==205){
                        this.battle.activateTile(1,this.userCombatant.id)
                    }else{
                        this.battle.activate(1,this.userCombatant.id)
                    }
                    this.disProcedure=1
                    this.timer=1
                }
            }else{
                if(this.timer==2){
                    this.procedure=[[],[]]
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let offset=transformDirection(0,this.relativeDirection[a]+120)
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                        this.procedure[1][a]=atan2(sin(this.relativeDirection[a]+120)*6/5,cos(this.relativeDirection[a]+120)/sqrt(3))
                        this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        if(index>=0){
                            if(this.procedure[0][a]==0){
                                let index2=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x,this.targetCombatant[a].tilePosition.y)
                                this.battle.tileManager.tiles[index2].occupied=0
                            }
                            this.distance[a]=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant[a].position.x,this.targetCombatant[a].position.y)
                        }
                    }
                    for(let b=0,lb=5;b<lb;b++){
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            if(this.procedure[0][a]==1){
                                let offset=transformDirection(0,this.relativeDirection[a]+120)
                                let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                                this.procedure[1][a]=atan2(sin(this.relativeDirection[a]+120)*6/5,cos(this.relativeDirection[a]+120)/sqrt(3))
                                this.procedure[0][a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                                if(index>=0){
                                    if(this.procedure[0][a]==0){
                                        let index2=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x,this.targetCombatant[a].tilePosition.y)
                                        this.battle.tileManager.tiles[index2].occupied=0
                                    }
                                    this.distance[a]=dist(this.battle.tileManager.tiles[index].position.x,this.battle.tileManager.tiles[index].position.y,this.targetCombatant[a].position.x,this.targetCombatant[a].position.y)
                                }
                            }
                        }
                    }
                    this.userCombatant.startAnimation(10)
                }
                if(this.timer<=21){
                    this.userCombatant.runAnimation(1/10,10)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.procedure[0][a]==2){
                        if(this.timer>11&&this.timer<=19){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,this.relativeDistance[a]/40/this.targetDistance[a])
                        }else if(this.timer>19&&this.timer<=28){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,-this.relativeDistance[a]/40/this.targetDistance[a])
                        }
                    }else if(this.procedure[0][a]==1){
                        if(this.timer>11&&this.timer<=19){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,this.relativeDistance[a]/10/this.targetDistance[a])
                        }else if(this.timer>19&&this.timer<=27){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+60,-this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer==19){
                            this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                            let offset=transformDirection(0,this.relativeDirection+120)
                            let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            if(index>=0){
                                this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                            }
                        }
                    }else if(this.procedure[0][a]==0){
                        if(this.timer>11){
                            this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+120,this.relativeDistance[a]/10/this.targetDistance[a])
                        }
                        if(this.timer>=21){
                            let offset=transformDirection(0,this.relativeDirection[a]+120)
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                            this.battle.activate(1,this.targetCombatant[a].id)
                            this.procedure[0][a]=-1
                        }
                    }
                }
                if(this.timer>=27){
                    this.remove=true
                }
            }
        break
        case 1999:
            if(this.timer==1){
                this.userCombatant.startAnimation(15)
            }
            if(this.timer<=10||this.timer>10*this.targetDistance+30){
                this.userCombatant.runAnimation(1/10,15)
            }
            if(this.timer==15||this.timer==20||this.timer==25||this.timer==30){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,35,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
            }
            if(this.timer==10*this.targetDistance+15||this.timer==10*this.targetDistance+20||this.timer==10*this.targetDistance+25||this.timer==10*this.targetDistance+30){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }else if(this.timer>=10*this.targetDistance+40){
                this.remove=true
            }
        break
        case 2070: case 2071: case 2072: case 2073: case 2074: case 2109: case 2348:
            if(variants.nobasicanim){
                this.selfCall(14)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(41)
                }
                this.userCombatant.runAnimation(1/20,41)
                if(this.timer==10){
                    this.selfCall(14)
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 2090:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    49,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+15),5*this.targetDistance-1]))
            }else if(this.timer==10*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.userManager.draw(this.effect[1])
                this.userManager.hand.discard(this.effect[2])
            }else if(this.timer>=10*this.targetDistance+25){
                this.remove=true
            }
        break
        case 2169:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
                let index=this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x*2-this.targetTile.tilePosition.x,this.userCombatant.tilePosition.y*2-this.targetTile.tilePosition.y)
                if(index>=0){
                    this.targetCombatant=this.battle.combatantManager.combatants[index]
                    index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }else{
                    this.targetCombatant=-1
                    this.procedure[0]=-1
                }
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
                this.battle.activate(1,this.userCombatant.id)
            }
            if(this.procedure[0]==2){
                if(this.timer>10&&this.timer<=18){
                    this.targetCombatant.moveTile(this.direction,-this.distance/40)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                }else if(this.timer>18&&this.timer<=26){
                    this.targetCombatant.moveTile(this.direction,this.distance/40)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                }
                if(this.timer>=26){
                    this.procedure[0]=-1
                }
            }else if(this.procedure[0]==1){
                if(this.timer>10&&this.timer<=18){
                    this.targetCombatant.moveTile(this.direction,-this.distance/10)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                }else if(this.timer>18&&this.timer<=26){
                    this.targetCombatant.moveTile(this.direction,this.distance/10)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                }
                if(this.timer==18){
                    this.targetCombatant.takeDamage(game.collisionDamage,-1)
                    let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                    if(index>=0){
                        this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                    }
                }else if(this.timer>=26){
                    this.procedure[0]=-1
                }
            }else if(this.procedure[0]==0){
                if(this.timer>10){
                    this.targetCombatant.moveTile(this.direction,-this.distance/10)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                }
                if(this.timer>=20){
                    this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                    this.battle.activate(1,this.targetCombatant.id)
                    this.procedure[0]=-1
                }
            }else if(this.timer>=15*this.targetDistance){
                this.remove=true
            }
        break
        case 2185:
            if(this.timer<=15*this.targetDistance-30){
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
                if(this.timer==15*this.targetDistance-30){
                    let offset=transformDirection(0,this.userCombatant.goal.anim.direction)
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0]*2,this.targetCombatant.tilePosition.y-offset[1]*2)
                    this.battle.activate(1,this.userCombatant.id)
                }
            }else{
                if(this.timer==15*this.targetDistance-29){
                    this.userCombatant.startAnimation(17)
                }
                if(this.timer<=15*this.targetDistance-20||this.timer>15*this.targetDistance-10&&this.timer<=15*this.targetDistance){
                    this.userCombatant.runAnimation(1/20,17)
                }
                if(this.timer==15*this.targetDistance-15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    49,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+15),9]))
                }else if(this.timer==15*this.targetDistance+5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    this.userManager.hand.discard(this.effect[1])
                }else if(this.timer>=15*this.targetDistance+15){
                    this.remove=true
                }
            }
        break
        case 2186:
            if(this.timer==1){
                let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*(this.targetDistance+1)/this.targetDistance-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(this.targetDistance+1)/this.targetDistance-this.userCombatant.tilePosition.y/this.targetDistance)
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    49,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+15),5*this.targetDistance-1]))
            }else if(this.timer==10*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.userManager.hand.discard(this.effect[1])
            }
            if(this.procedure[0]==2){
                if(this.timer>10*this.targetDistance+25&&this.timer<=10*this.targetDistance+33){
                    this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                }else if(this.timer>10*this.targetDistance+33&&this.timer<=10*this.targetDistance+41){
                    this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                }
                if(this.timer>=10*this.targetDistance+41){
                    this.remove=true
                }
            }else if(this.procedure[0]==1){
                if(this.timer>10*this.targetDistance+25&&this.timer<=10*this.targetDistance+33){
                    this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                }else if(this.timer>10*this.targetDistance+33&&this.timer<=10*this.targetDistance+41){
                    this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer==10*this.targetDistance+33){
                    this.targetCombatant.takeDamage(game.collisionDamage,-1)
                    let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*(this.targetDistance+1)/this.targetDistance-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(this.targetDistance+1)/this.targetDistance-this.userCombatant.tilePosition.y/this.targetDistance)
                    if(index>=0){
                        this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                    }
                }else if(this.timer>=10*this.targetDistance+41){
                    this.remove=true
                }
            }else{
                if(this.timer>10*this.targetDistance+25){
                    this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer>=10*this.targetDistance+35){
                    this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*(this.targetDistance+1)/this.targetDistance-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(this.targetDistance+1)/this.targetDistance-this.userCombatant.tilePosition.y/this.targetDistance)
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            }
        break
        case 2187:
            if(this.timer==1){
                this.procedure=[[],[]]
                this.offset=[this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y]
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    let index=this.battle.tileManager.getTileIndex(this.battle.combatantManager.combatants[a].tilePosition.x+this.offset[0],this.battle.combatantManager.combatants[a].tilePosition.y+this.offset[1])
                    this.procedure[0][a]=this.battle.combatantManager.combatants[a].team==this.userCombatant.team?3:this.battle.combatantManager.combatants[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.procedure[1][a]=0
                }
                this.userCombatant.startAnimation(3)
            }else if(this.timer==10){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }
            if(this.timer<=20){
                this.userCombatant.runAnimation(1/10,3)
            }
            let allDone2=true
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                this.procedure[1][a]++
                if(this.procedure[0][a]==2){
                    allDone2=false
                    if(this.procedure[1][a]>10&&this.procedure[1][a]<=18){
                        this.battle.combatantManager.combatants[a].moveTile(this.direction,this.distance/40)
                        this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/40)
                    }else if(this.procedure[1][a]>18&&this.procedure[1][a]<=26){
                        this.battle.combatantManager.combatants[a].moveTile(this.direction,-this.distance/40)
                        this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,-this.relativeDistance/40)
                    }
                    if(this.procedure[1][a]>=26){
                        this.procedure[0][a]=3
                    }
                }else if(this.procedure[0][a]==1){
                    allDone2=false
                    if(this.procedure[1][a]>10&&this.procedure[1][a]<=18){
                        this.battle.combatantManager.combatants[a].moveTile(this.direction,this.distance/10)
                        this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }else if(this.procedure[1][a]>18&&this.procedure[1][a]<=26){
                        this.battle.combatantManager.combatants[a].moveTile(this.direction,-this.distance/10)
                        this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,-this.relativeDistance/10)
                    }
                    if(this.procedure[1][a]==18){
                        this.battle.combatantManager.combatants[a].takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.battle.combatantManager.combatants[a].tilePosition.x+this.offset[0],this.battle.combatantManager.combatants[a].tilePosition.y+this.offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.procedure[1][a]>=26){
                        this.procedure[0][a]=3
                    }
                }else if(this.procedure[0][a]==0){
                    allDone2=false
                    if(this.procedure[1][a]>10){
                        this.battle.combatantManager.combatants[a].moveTile(this.direction,this.distance/10)
                        this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/10)
                    }
                    if(this.procedure[1][a]>=20){
                        this.battle.combatantManager.combatants[a].moveTilePosition(this.battle.combatantManager.combatants[a].tilePosition.x+this.offset[0],this.battle.combatantManager.combatants[a].tilePosition.y+this.offset[1])
                        this.battle.activate(1,this.battle.combatantManager.combatants[a].id)
                        let index=this.battle.tileManager.getTileIndex(this.battle.combatantManager.combatants[a].tilePosition.x+this.offset[0],this.battle.combatantManager.combatants[a].tilePosition.y+this.offset[1])
                        this.procedure[0][a]=this.battle.combatantManager.combatants[a].team==this.userCombatant.team?3:this.battle.combatantManager.combatants[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                        this.procedure[1][a]=0
                    }
                }
            }
            if(allDone2){
                this.remove=true
            }
        break
        case 2210: case 2211: case 3258:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    50,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+15),5*this.targetDistance-1]))
            }else if(this.timer==10*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }else if(this.timer>=10*this.targetDistance+25){
                this.remove=true
            }
        break
        case 2248:
            if(variants.nobasicanim){
                this.selfCall(0)
                this.procedure[0]++
                if(this.procedure[0]>=((types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5)?2:1)){
                    this.remove=true
                }else{
                    this.timer=0
                }
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/30,2)
                if(this.timer==15){
                    this.selfCall(0)
                }else if(this.timer>=30){
                    this.procedure[0]++
                    if(this.procedure[0]>=((types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5)?2:1)){
                        this.remove=true
                    }else{
                        this.timer=0
                    }
                }
            }
        break
        case 2264:
            if(this.procedure[0]==0){
                this.procedure[0]=this.userCombatant.diceRoll(1,3)
                this.procedure[1]=0
            }
            if(variants.nobasicanim){
                for(let a=0,la=this.proedure[0];a<la;a++){
                    this.selfCall(0)
                }
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/30,2)
                if(this.timer==15){
                    this.selfCall(0)
                }else if(this.timer>=30){
                    this.procedure[1]++
                    if(this.procedure[1]>=this.procedure[0]){
                        this.remove=true
                    }else{
                        this.timer=0
                    }
                }
            }
        break
        case 2296: case 2297:
            if(this.targetClass==2){
                if(this.targetVariant){
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
                    this.userCombatant.moveTile(this.direction,this.distance/(24*this.targetDistance))
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(24*this.targetDistance))
                    this.userCombatant.runAnimation(1/12,0)
                    if(this.timer>=24*this.targetDistance-24){
                        let offset=[
                            (this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x)/this.targetDistance,
                            (this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y)/this.targetDistance
                        ]
                        this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-offset[0],this.targetCombatant.tilePosition.y-offset[1])
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
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
        case 1334: case 1335: case 1336: case 1613: case 1614: case 2139: case 2444: case 2445: case 2465:
        case 4419: case 4488:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/20,17)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,53,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                this.selfCall(15)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 2527: case 2528: case 2529: case 2530: case 2531: case 2532: case 2533: case 2534: case 2535:
        case 2536: case 2537: case 2538: case 2539: case 2540: case 2541: case 2542: case 2556: case 2557:
        case 3409: case 3462: case 3564: case 3565: case 3566: case 3673:
            if(this.type==2265&&this.userManager.exhaust.cards.length<5){
                this.remove=true
            }else{
                if(variants.nobasicanim){
                    this.selfCall(16)
                    this.remove=true
                }else{
                    if(this.timer==1){
                        this.userCombatant.startAnimation(32)
                    }
                    this.userCombatant.runAnimation(1/20,32)
                    if(this.timer==10){
                        current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,54,[25]))
                        this.selfCall(16)
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            }
        break
        case 2545:
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].id==this.userCombatant.id){
                    if(this.timer==1){
                        this.battle.combatantManager.combatants[a].startAnimation(19)
                    }
                    this.battle.combatantManager.combatants[a].runAnimation(1/20,19)
                }else{
                    this.battle.combatantManager.combatants[a].size=this.userCombatant.size
                }
                if(this.timer==10){
                    if(this.battle.combatantManager.combatants[a].id==this.userCombatant.id){
                        this.battle.combatantManager.combatants[a].moveTile(this.direction,this.distance)
                        this.battle.combatantManager.combatants[a].moveRelativeTile(this.relativeDirection,this.relativeDistance)
                        this.battle.combatantManager.combatants[a].moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                    }else{
                        let targetTile=this.battle.tileManager.getRandomTile()
                        let direction=atan2(targetTile.position.x-this.battle.combatantManager.combatants[a].position.x,targetTile.position.y-this.battle.combatantManager.combatants[a].position.y)
                        let distance=sqrt((targetTile.position.x-this.battle.combatantManager.combatants[a].position.x)**2+(targetTile.position.y-this.battle.combatantManager.combatants[a].position.y)**2)
                        let relativeDirection=atan2(targetTile.relativePosition.x-this.battle.combatantManager.combatants[a].relativePosition.x,targetTile.relativePosition.y-this.battle.combatantManager.combatants[a].relativePosition.y)
                        let relativeDistance=sqrt((targetTile.relativePosition.x-this.battle.combatantManager.combatants[a].relativePosition.x)**2+(targetTile.relativePosition.y-this.battle.combatantManager.combatants[a].relativePosition.y)**2)
                        this.battle.combatantManager.combatants[a].moveTile(direction,distance)
                        this.battle.combatantManager.combatants[a].moveRelativeTile(relativeDirection,relativeDistance)
                        this.battle.combatantManager.combatants[a].moveTilePosition(targetTile.tilePosition.x,targetTile.tilePosition.y)
                    }
                }else if(this.timer>=20){
                    this.battle.activate(1,this.battle.combatantManager.combatants[a].id)
                }
            }
            if(this.timer>=20){
                this.remove=true
                this.battle.updateTargetting()
            }
        break
        case 2550:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/10,17)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,55,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                if(this.userManager.deck.cards.length>=50){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 2553: case 2617:
            if(variants.nobasicanim){
                this.selfCall(1)
                this.selfCall(1)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/20,1)
                if(this.timer==10||this.timer==30){
                    this.selfCall(1)
                }else if(this.timer>=40){
                    this.remove=true
                }
            }
        break
        case 2562:
            if(this.timer==1){
                for(let a=0,la=this.effect[0];a<la;a++){
                    let index=floor(random(0,types.card.length))
                    this.userManager.hand.addAbstract(index,0,types.card[index].list<0?0:types.card[index].list>=types.color.card.list?0:types.card[index].list,0,[1],[])
                }
            }else if(this.timer==20){
                this.remove=true
            }
            if(this.timer==5||this.timer==10||this.timer==15||this.timer==20){
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+random(-30,30),this.userCombatant.position.y-random(20,80),56,[10]))
            }
        break
        case 2631: case 2632: case 2633: case 2635: case 2640: case 2844: case 2846: case 2851: case 2852: case 2853:
        case 2868: case 3606: case 4146: case 4528:
            if(variants.nobasicanim){
                this.selfCall(17)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(4)
                }
                this.userCombatant.runAnimation(1/10,4)
                if(this.timer==10){
                    this.selfCall(17)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,57,[20]))
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 2667:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/10,17)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,58,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.userCombatant.getStatus('Awakening')<=0){
                    this.userCombatant.vision+=this.effect[1]
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 2696:
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
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y-30,59,[this.targetCombatant.position.x,this.targetCombatant.position.y-600]))
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 2700:
            if(variants.nobasicanim){
                this.selfCall(13)
                if(this.elemental){
                    this.selfCall(13)
                }
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(10)
                    this.procedure[0]=this.userCombatant.elemental?1:0
                }
                this.userCombatant.runAnimation(1/10,10)
                if(this.timer==10||this.timer==30){
                    this.selfCall(13)
                }else if(this.timer>=20+this.procedure[0]*20){
                    this.remove=true
                }
            }
        break
        case 2731:
            if(variants.nobasicanim){
                for(let a=0,la=this.elemental?4:1;a<la;a++){
                    this.battle.combatantManager.randomEnemyEffect(3,[this.effect[0],this.user])
                    this.userCombatant.statusEffect('Vision',this.effect[1])
                }
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(32)
                    this.procedure[0]=this.userCombatant.elemental?1:0
                }
                this.userCombatant.runAnimation(1/10,32)
                if(this.timer==5||this.timer==15||this.timer==25||this.timer==35){
                    this.battle.combatantManager.randomEnemyEffect(0,[this.effect[0]])
                    this.userCombatant.vision+=this.effect[1]
                }else if(this.timer>=10+this.procedure[0]*30){
                    this.remove=true
                }
            }
        break
        case 2740: case 2901: case 2917: case 2974: case 3002: case 3023: case 3038: case 3046: case 3056: case 3274:
        case 3529: case 3611: case 3807: case 4275: case 4314:
            if(variants.nobasicanim){
                this.selfCall(4)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(5)
                }
                this.userCombatant.runAnimation(1/10,5)
                if(this.timer==10){
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,73,[20]))
                    this.selfCall(4)
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 2815:
            if(variants.nobasicanim){
                this.selfCall(7)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(17)
                }
                this.userCombatant.runAnimation(1/20,17)
                if(this.timer==10||this.timer==30){
                    this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userManager.hand.numberAbstract(4,[[5]]))
                    current.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x+random(-30,30),this.targetCombatant.position.y-random(20,80),60,[10]))
                }else if(this.timer>=40){
                    this.remove=true
                }
            }
        break
        case 2823: case 2883: case 2884: case 2885:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    61,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),7*this.targetDistance]))
            }else if(this.timer==21+this.targetDistance*3||this.timer==69-this.targetDistance*3){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.timer==69-this.targetDistance*3){
                    switch(this.type){
                        case 2823:
                            this.userManager.hand.add(findName(['Discus of Mountain\nand Rain','Discus of Wind\nand Thunder'][floor(random(0,2))],types.card),this.level,0)
                        break
                        case 2883:
                            this.battle.overlayManager.overlays[10][this.player].active=true
                            this.battle.overlayManager.overlays[10][this.player].activate([this.level,0,21,3])
                        break
                        case 2884:
                            this.userManager.hand.add(findName('Dual\nDiscus',types.card),this.level,0)
                        break
                        case 2885:
                            this.userCombatant.addBarrier(this.effect[1])
                        break
                    }
                }
            }else if(this.timer>=75){
                this.remove=true
            }
        break
        case 2824: case 2887:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    62,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),7*this.targetDistance]))
            }else if(this.timer==21+this.targetDistance*3||this.timer==69-this.targetDistance*3){
                switch(this.type){
                    case 2824:
                        this.targetCombatant.takeDamage(this.effect[0],this.user,2)
                        if(this.timer==69-this.targetDistance*3){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 2887:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.timer==69-this.targetDistance*3){
                            this.userCombatant.statusEffect('Counter',this.effect[1])
                        }
                    break
                }
            }else if(this.timer>=75){
                this.remove=true
            }
        break
        case 2825: case 2888:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    63,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),7*this.targetDistance]))
            }else if(this.timer==21+this.targetDistance*3||this.timer==69-this.targetDistance*3){
                this.targetCombatant.takeDamage(this.effect[0],this.user,2)
                if(this.timer==69-this.targetDistance*3){
                    switch(this.type){
                        case 2825:
                            this.targetCombatant.takeDamage(this.effect[0],this.user,2)
                            if(this.timer==69-this.targetDistance*3){
                                this.userCombatant.statusEffect('Temporary Strength',this.effect[1])
                            }
                        break
                        case 2888:
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            if(this.timer==69-this.targetDistance*3){
                                this.userCombatant.statusEffect('Temporary Strength',this.effect[1])
                            }
                        break
                    }
                }
            }else if(this.timer>=75){
                this.remove=true
            }
        break
        case 2837:
            if(this.procedure[0]==0){
                if(this.timer==1){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[1]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    this.userCombatant.startAnimation(3)
                }else if(this.timer==10){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.timer<=20){
                    this.userCombatant.runAnimation(1/10,3)
                }
                if(this.procedure[1]==2){
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
                }else if(this.procedure[1]==1){
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
                    for(let a=0,la=this.targetCombatant.length;a<la;a++){
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                        this.procedure[a+1]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                    }
                    this.userCombatant.startAnimation(14)
                }
                if(this.timer<=15){
                    this.userCombatant.runAnimation(1/15,14)
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    if(this.timer==10){
                        this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                    }
                    if(this.procedure[a+1]==2){
                        if(this.timer>10&&this.timer<=18){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/40)
                        }else if(this.timer>18&&this.timer<=26){
                            this.targetCombatant[a].moveTile(this.direction[a],-this.distance[a]/40)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],-this.relativeDistance[a]/40)
                        }
                    }else if(this.procedure[a+1]==1){
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
                    }else if(this.procedure[a+1]==0){
                        if(this.timer>10){
                            this.targetCombatant[a].moveTile(this.direction[a],this.distance[a]/10)
                            this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a],this.relativeDistance[a]/10)
                        }
                        if(this.timer>=20){
                            this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                            this.battle.activate(1,this.targetCombatant[a].id)
                            this.procedure[a+1]=-1
                        }
                    }
                }
                if(this.timer>=26){
                    this.remove=true
                }
            }
        break
        case 2886:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    64,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),7*this.targetDistance]))
            }else if(this.timer==21+this.targetDistance*3||this.timer==69-this.targetDistance*3){
                switch(this.type){
                    case 2886:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.timer==69-this.targetDistance*3){
                            this.userManager.hand.exhaust(this.effect[1])
                        }
                    break
                }
            }else if(this.timer>=75){
                this.remove=true
            }
        break
        case 2891: case 2893: case 2896: case 2906: case 2910: case 2960: case 2963: case 2964: case 2970: case 3017:
        case 3022: case 3049: case 3341: case 3347: case 3500: case 3534: case 4046: case 4315: case 4513:
            if(variants.nobasicanim){
                this.selfCall(1)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.selfCall(1)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,65,[20]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 2897: case 2899:
            if(variants.nobasicanim){
                this.selfCall(1)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    switch(this.type){
                        case 2897:
                            this.userCombatant.barrier+=this.userCombatant.block
                            this.userCombatant.block=0
                            this.userCombatant.statusEffect('Block Barrier Convert',999)
                        break
                        case 2899:
                            this.userCombatant.statusEffect('Barrier Damage Random',this.effect[0])
                        break
                    }
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,66,[20]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 2951:
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
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y-30,67,[this.targetCombatant.position.x,this.targetCombatant.position.y-600]))
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 2976:
            if(variants.nobasicanim){
                this.selfCall(0)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(0)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    if(this.userCombatant.barrier>0){
                        current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,68,[20]))
                    }
                    this.selfCall(0)
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 2982: case 3065:
            if(variants.nobasicanim){
                this.selfCall(10)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(26)
                }
                this.userCombatant.runAnimation(1/10,26)
                if(this.timer==10){
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,74,[20]))
                    this.selfCall(10)
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 3000: case 3001:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/10,17)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,69,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                this.selfCall(15)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3016:
            if(this.effect[1]<=0){
                this.remove=true
            }else{
                if(this.timer%10==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/10,2)
                if(this.timer%10==5){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    if(this.timer==5){
                        this.userCombatant.statusEffect('Intangible',this.effect[2])
                    }
                }else if(this.timer>=10*this.effect[1]){
                    this.remove=true
                }
            }
        break
        case 3037: case 3945:
            if(this.timer==1){
                this.userCombatant.startAnimation(5)
            }
            this.userCombatant.runAnimation(1/10,5)
            if(this.timer==10){
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,75,[20]))
                switch(this.type){
                    case 3037:
                        this.battle.overlayManager.overlays[67][this.player].active=true
                        this.battle.overlayManager.overlays[67][this.player].activate([this.effect[0],this.effect[1],this.targetCombatant.id])
                    break
                    case 3945:
                        this.battle.overlayManager.overlays[118][this.player].active=true
                        this.battle.overlayManager.overlays[118][this.player].activate([this.effect[0],this.effect[1],this.targetCombatant.id])
                    break
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3057:
            if(variants.nobasicanim){
                this.selfCall(1)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.userCombatant.statusEffect('Dexterity',this.effect[0])
                    this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,72,[20]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 3080:
            this.targetCombatant.takeDamage(this.effect[0],this.user)
            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
            this.remove=true
        break
        case 3104: case 3628:
            if(this.timer==1){
                this.userCombatant.startAnimation(5)
            }
            this.userCombatant.runAnimation(1/10,5)
            if(this.timer==10){
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,76,[30]))
                this.battle.addEnergyGen(this.effect[0],this.player)
                switch(this.type){
                    case 3104:
                        this.battle.drop(this.player,findName('Dazed',types.card),0,game.playerNumber+1)
                        this.battle.drop(this.player,findName('Burn',types.card),0,game.playerNumber+1)
                        this.battle.drop(this.player,findName('Void',types.card),0,game.playerNumber+1)
                    break
                    case 3628:
                        this.battle.drop(this.player,findName('Quiet\nMoonlight',types.card),0,game.playerNumber+1)
                        this.battle.drop(this.player,findName('Refracted\nSunlight',types.card),0,game.playerNumber+1)
                        this.battle.drop(this.player,findName('Glamorous\nStarlight',types.card),0,game.playerNumber+1)
                    break
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3128:
            if(variants.nobasicanim){
                let prelife=this.targetCombatant.life
                for(let a=0,la=2;a<la;a++){
                    this.selfCall(9)
                }
                if(this.targetCombatant.life<prelife){
                    this.userCombatant.addBarrier(prelife-this.targetCombatant.life)
                }
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(25)
                    this.procedure[0]=this.targetCombatant.life
                }
                if(this.timer<=10||this.timer>25&&this.timer<=35){
                    this.userCombatant.runAnimation(1/10,25)
                }
                if(this.timer==15||this.timer==25){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,
                        78,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                }
                if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+25){
                    this.selfCall(9)
                    if(this.targetCombatant.life<this.procedure[0]&&this.timer==5*this.targetDistance+25){
                        this.userCombatant.addBarrier(this.procedure[0]-this.targetCombatant.life)
                    }
                }else if(this.timer>=max(35,5*this.targetDistance+30)){
                    this.remove=true
                }
            }
        break
        case 3129:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                        79,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),2.5*this.targetDistance+2]))
            }else if(this.timer==5*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.battle.combatantManager.allEffect(39,[this.effect[0]/2,this.targetCombatant.id])
                this.userCombatant.statusEffect('Strength',-this.effect[1])
            }else if(this.timer>=max(30,5*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 3132:
            if(this.type==2265&&this.userManager.exhaust.cards.length<5){
                this.remove=true
            }else{
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
                        current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,80,[20]))
                    }else if(this.timer>=20){
                        this.remove=true
                    }
                }
            }
        break
        case 3136:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                for(let a=0,la=5;a<la;a++){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    81,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30)+random(-3,3)-a*12+a*6,10]))
                }
            }else if(this.timer==5*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.targetCombatant.statusEffect('Freeze',this.effect[1])
                this.userManager.hand.add(findName('Snowflake',types.card),0,this.color)
            }else if(this.timer>=max(30,5*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 3137: case 3231:
            if(variants.nobasicanim){
                for(let a=0,la=2;a<la;a++){
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
                if(this.timer==15||this.timer==25){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,
                        82,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                }
                if(this.timer==5*this.targetDistance+15||this.timer==5*this.targetDistance+25){
                    this.selfCall(9)
                    if(this.timer==5*this.targetDistance+25&&this.targetCombatant.life<=0){
                        switch(this.type){
                            case 3137:
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.userManager.addRandomAbstract(2,0,0,0,0,[0],[3,4])
                                }
                            break
                            case 3231:
                                for(let a=0,la=this.effect[1];a<la;a++){
                                    this.userManager.addRandomAbstract(2,0,0,0,1,[0],[3,4,0])
                                }
                            break
                        }
                    }
                }else if(this.timer>=max(35,5*this.targetDistance+30)){
                    this.remove=true
                }
            }
        break
        case 3142:
            if(this.timer==1){
                this.procedure=[[],[],[]]
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    this.procedure[2][a]=60*(floor(random(0,3))-1)
                    let offset=transformDirection(0,this.relativeDirection[a]+this.procedure[2][a])
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                    this.procedure[1][a]=atan2(sin(this.relativeDirection[a]+this.procedure[2][a])*6/5,cos(this.relativeDirection[a]+this.procedure[2][a])/sqrt(3))
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
                if(this.timer==10){
                    this.targetCombatant[a].statusEffect('Invisible',999)
                }
                if(this.procedure[0][a]==2){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/40)
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+this.procedure[2][a],this.relativeDistance[a]/40/this.targetDistance[a])
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/40)
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+this.procedure[2][a],-this.relativeDistance[a]/40/this.targetDistance[a])
                    }
                }else if(this.procedure[0][a]==1){
                    if(this.timer>10&&this.timer<=18){
                        this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+this.procedure[2][a],this.relativeDistance[a]/10/this.targetDistance[a])
                    }else if(this.timer>18&&this.timer<=26){
                        this.targetCombatant[a].moveTile(this.procedure[1][a],-this.distance[a]/10)
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+this.procedure[2][a],-this.relativeDistance[a]/10/this.targetDistance[a])
                    }
                    if(this.timer==18){
                        this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                        let offset=transformDirection(0,this.relativeDirection+this.procedure[2][a])
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x+offset[0],this.targetCombatant[a].tilePosition.y+offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }
                }else if(this.procedure[0][a]==0){
                    if(this.timer>10){
                        this.targetCombatant[a].moveTile(this.procedure[1][a],this.distance[a]/10)
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection[a]+this.procedure[2][a],this.relativeDistance[a]/10/this.targetDistance[a])
                    }
                    if(this.timer>=20){
                        let offset=transformDirection(0,this.relativeDirection[a]+this.procedure[2][a])
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
        case 3145:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=15||this.timer>60){
                this.userCombatant.runAnimation(1/30,17)
            }
            if(this.timer==15||this.timer==30||this.timer==45||this.timer==60){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,124,[100]))
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.timer==60){
                    this.procedure[0]=this.userManager.hand.cards.length
                    this.userManager.hand.allEffect(22)
                    for(let a=0,la=min(100,this.procedure[0]);a<la;a++){
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                    }
                }
            }else if(this.timer>=75){
                this.remove=true
            }
        break
        case 3150:
            if(variants.nobasicanim){
                this.selfCall(9)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(25)
                    this.procedure[0]=this.targetCombatant.life
                }
                if(this.timer<=10||this.timer>15&&this.timer<=25){
                    this.userCombatant.runAnimation(1/10,25)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,
                        83,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                }
                if(this.timer==5*this.targetDistance+15){
                    this.selfCall(9)
                    if(this.targetCombatant.life<this.procedure[0]&&this.timer==5*this.targetDistance+25){
                        this.userCombatant.addBarrier(this.procedure[0]-this.targetCombatant.life)
                    }
                }else if(this.timer>=max(25,5*this.targetDistance+20)){
                    this.remove=true
                }
            }
        break
        case 3163:
            if(this.timer==1){
                this.userCombatant.startAnimation(32)
            }
            this.userCombatant.runAnimation(1/20,32)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,84,[20]))
                this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
                for(let a=0;a<this.effect[1];a++){
                    this.userManager.addRandomAbstract(2,0,0,1,0,[],[0,0])
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3165: case 3448: case 4587: case 4588: case 4589:
            if(this.timer==1){
                this.userCombatant.startAnimation(6)
            }
            this.userCombatant.runAnimation(1/10,6)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y,85,[20]))
                switch(this.type){
                    case 3165:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                        this.userCombatant.loseHealth(this.effect[1])
                    break
                    case 3448:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userManager.draw(this.effect[1])
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                        this.userCombatant.loseHealth(this.effect[2])
                    break
                    case 4587:
                        this.battle.addSpecificEnergy(2,this.player,6)
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                        this.userCombatant.loseHealth(this.effect[1])
                    break
                    case 4588:
                        this.battle.addSpecificEnergy(3,this.player,6)
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                        this.userCombatant.loseHealth(this.effect[1])
                    break
                    case 4589:
                        this.battle.addSpecificEnergy(4,this.player,6)
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                        this.userCombatant.loseHealth(this.effect[1])
                    break
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3177:
            if(this.timer==1){
                this.userCombatant.startAnimation(32)
            }
            this.userCombatant.runAnimation(1/20,32)
            if(this.timer==5||this.timer==15){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,86,[20]))
                this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3178:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==10||this.timer==15||this.timer==20){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,87,[this.targetCombatant.position.x+random(-5,5),this.targetCombatant.position.y-30+random(-5,5)]))
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.timer==20){
                    this.userManager.hand.add(findName('Lunacy',types.card),0,game.playerNumber+1)
                }
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 3188:
            if(this.timer==1){
                this.userCombatant.startAnimation(10)
                this.procedure[0]=0
            }
            this.userCombatant.runAnimation(1/10,10)
            if(this.timer%20==10){
                this.procedure[0]=max(this.procedure[0],this.battle.combatantManager.areaAbstract(0,[this.effect[0],this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,1)>0?1:0)
            }else if(this.timer>=20+this.procedure[0]*20){
                this.remove=true
            }
        break
        case 3194:
            if(this.timer==1){
                this.userCombatant.startAnimation(32)
            }
            this.userCombatant.runAnimation(1/20,32)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,88,[20]))
                this.userCombatant.statusEffect('Intangible',this.effect[0])
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.dropDrawShuffle(this.user,findName('Raiment',types.card),0,0)
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3198:
            if(variants.nobasicanim){
                this.selfCall(7)
                this.selfCall(7)
                this.remove=true
            }else{
                if(this.timer%10==1){
                    this.userCombatant.startAnimation(17)
                }
                this.userCombatant.runAnimation(1/10,17)
                if(this.timer==5||this.timer==15){
                    this.selfCall(7)
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 3207: case 3243:
            if(this.timer==1){
                this.userCombatant.startAnimation(10)
            }
            this.userCombatant.runAnimation(1/10,10)
            if(this.timer%20==10){
                this.selfCall(13)
                if(this.timer==30&&this.type==3243){
                    this.userManager.hand.add(findName('Safety',types.card),0,0)
                }
            }else if(this.timer>=40){
                this.remove=true
            }
        break
        case 3214:
            if(this.timer==1&&this.targetDistance>1){
                this.userCombatant.startAnimation(0)
            }else if(this.timer==15*this.targetDistance-14){
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
                if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+5){
                    this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer==15*this.targetDistance+5){
                    this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.battle.updateTargetting()
                } 
                if(this.timer==15*this.targetDistance+6){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                    this.procedure[1]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }
                if(this.procedure[1]==2){
                    if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                        this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                        this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+21){
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }else if(this.procedure[1]==1){
                    if(this.timer>15*this.targetDistance+5&&this.timer<=15*this.targetDistance+13){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }else if(this.timer>15*this.targetDistance+13&&this.timer<=15*this.targetDistance+21){
                        this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer==15*this.targetDistance+13){
                        this.targetCombatant.takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.timer>=15*this.targetDistance+21){
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }else{
                    if(this.timer>15*this.targetDistance+5){
                        this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                        this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                    }
                    if(this.timer>=15*this.targetDistance+15){
                        this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*3/2-this.userCombatant.tilePosition.x/2,this.targetCombatant.tilePosition.y*3/2-this.userCombatant.tilePosition.y/2)
                        this.battle.activate(1,this.targetCombatant.id)
                        this.remove=true
                    }
                }
            }
        break
        case 3222: case 3232:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                89,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+15),5*this.targetDistance-1]))
            }else if(this.timer==10*this.targetDistance+15){
                let life=this.targetCombatant.life
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.targetCombatant.life==life){
                    this.battle.addEnergy(this.effect[1],this.player)
                    switch(this.type){
                        case 3222:
                            for(let a=0,la=this.effect[2];a<la;a++){
                                this.userManager.addRandomAbstract(2,0,0,0,0,[0],[3,2])
                            }
                        break
                        case 3232:
                            for(let a=0,la=this.effect[2];a<la;a++){
                                this.userManager.addRandomAbstract(2,0,0,0,1,[0],[3,2,0])
                            }
                        break
                    }
                }
            }else if(this.timer>=10*this.targetDistance+25){
                this.remove=true
            }
        break
        case 3280:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
                this.procedure[0]=-1
            }
            this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
            this.userCombatant.runAnimation(1/15,0)
            if(this.timer==15*this.targetDistance){
                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                if(this.type==205){
                    this.battle.activateTile(1,this.userCombatant.id)
                }else{
                    this.battle.activate(1,this.userCombatant.id)
                }
                let offset=transformDirection(0,this.relativeDirection)
                this.procedure[0]=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x+offset[0],this.targetTile.tilePosition.y+offset[1])
                if(this.procedure[0]==-1){
                    this.remove=true
                }else{
                    this.targetCombatant=this.battle.combatantManager.combatants[this.procedure[0]]
                    this.targetCombatant.goal.anim.direction=this.relativeDirection
                }
            }
            if(this.timer>15*this.targetDistance){
                if(this.timer>15*this.targetDistance&&this.timer<=15*this.targetDistance+15){
                    this.targetCombatant.moveTile(this.direction,-this.distance/(15*this.targetDistance))
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/(15*this.targetDistance))
                }
                if(this.timer==15*this.targetDistance+15){
                    let hold=[this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y]
                    this.userCombatant.moveTilePosition(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                    this.targetCombatant.moveTilePosition(hold[0],hold[1])
                    this.battle.activate(1,this.userCombatant.id)
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            }
        break
        case 3292:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
                if(this.userCombatant.metal>=this.effect[1]){
                    let index=this.battle.tileManager.getTileIndex(this.targetTile.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetTile.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                    if(index>=0){
                        this.userCombatant.metal-=this.effect[1]
                        let index2=this.battle.tileManager.getTileIndex(this.targetTile.tilePosition.x*(1+2/this.targetDistance)-this.userCombatant.tilePosition.x*2/this.targetDistance,this.targetTile.tilePosition.y*(1+2/this.targetDistance)-this.userCombatant.tilePosition.y*2/this.targetDistance)
                        if(index2>=0){
                            this.targetTile=this.battle.tileManager.tiles[index2]
                            this.targetDistance+=2
                        }else{
                            this.targetTile=this.battle.tileManager.tiles[index]
                            this.targetDistance++
                        }
                        this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                        this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                        this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                        this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                    }
                }
            }
            this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
            this.userCombatant.runAnimation(1/15,0)
            if(this.timer==15*this.targetDistance){
                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                this.battle.activate(1,this.userCombatant.id)
                this.remove=true
            }
        break
        case 3293:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
                if(this.userCombatant.charge>=this.effect[1]){
                    let index=this.battle.tileManager.getTileIndex(this.targetTile.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetTile.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                    if(index>=0){
                        this.userCombatant.charge-=this.effect[1]
                        this.userCombatant.chargeConsumed()
                        let index2=this.battle.tileManager.getTileIndex(this.targetTile.tilePosition.x*(1+2/this.targetDistance)-this.userCombatant.tilePosition.x*2/this.targetDistance,this.targetTile.tilePosition.y*(1+2/this.targetDistance)-this.userCombatant.tilePosition.y*2/this.targetDistance)
                        if(index2>=0){
                            this.targetTile=this.battle.tileManager.tiles[index2]
                            this.targetDistance+=2
                        }else{
                            this.targetTile=this.battle.tileManager.tiles[index]
                            this.targetDistance++
                        }
                        this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                        this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                        this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                        this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                    }
                }
            }
            this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
            this.userCombatant.runAnimation(1/15,0)
            if(this.timer==15*this.targetDistance){
                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                this.battle.activate(1,this.userCombatant.id)
                this.remove=true
            }
        break
        case 3294:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
                this.procedure=[[],[],[]]
                this.offset=[this.targetTile.tilePosition.x-this.userCombatant.tilePosition.x,this.targetTile.tilePosition.y-this.userCombatant.tilePosition.y]
                this.targetCombatant=[]
                for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                    if(this.battle.combatantManager.combatants[a].construct&&distTargetCombatant(0,this.battle.combatantManager.combatants[a],this.userCombatant)==1){
                        this.targetCombatant.push(this.battle.combatantManager.combatants[a])
                    }
                }
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+this.offset[0]/this.targetDistance,this.targetCombatant[a].tilePosition.y+this.offset[1]/this.targetDistance)
                    let fakeOccupied=false
                    if(this.userCombatant.tilePosition.x==this.targetCombatant[a].tilePosition.x+this.offset[0]/this.targetDistance&&this.userCombatant.tilePosition.y==this.targetCombatant[a].tilePosition.y+this.offset[1]/this.targetDistance){
                        fakeOccupied=true
                    }
                    this.procedure[0][a]=index>=0&&(this.battle.tileManager.tiles[index].occupied==0||fakeOccupied)?0:1
                    this.procedure[1][a]=10
                    this.procedure[2][a]=this.targetDistance
                }
            }
            if(this.timer<=15*this.targetDistance){
                this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                this.userCombatant.runAnimation(1/15,0)
            }
            if(this.timer==15*this.targetDistance){
                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                this.battle.activate(1,this.userCombatant.id)
            }
            let allDone3294=true
            for(let a=0,la=this.targetCombatant.length;a<la;a++){
                if(this.procedure[0][a]==2){
                    if(this.procedure[1][a]>10&&this.procedure[1][a]<=22){
                        this.targetCombatant[a].moveTile(this.direction,this.distance/60/this.targetDistance)
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/60/this.targetDistance)
                    }else if(this.procedure[1][a]>22&&this.procedure[1][a]<=34){
                        this.targetCombatant[a].moveTile(this.direction,-this.distance/60/this.targetDistance)
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection,-this.relativeDistance/60/this.targetDistance)
                    }
                    if(this.procedure[1][a]>=34){
                        this.procedure[0][a]=3
                    }
                    allDone3294=false
                }else if(this.procedure[0][a]==1){
                    if(this.procedure[1][a]>10&&this.procedure[1][a]<=22){
                        this.targetCombatant[a].moveTile(this.direction,this.distance/15/this.targetDistance)
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/15/this.targetDistance)
                    }else if(this.procedure[1][a]>22&&this.procedure[1][a]<=34){
                        this.targetCombatant[a].moveTile(this.direction,-this.distance/15/this.targetDistance)
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection,-this.relativeDistance/15/this.targetDistance)
                    }
                    if(this.procedure[1][a]==22){
                        this.targetCombatant[a].takeDamage(game.collisionDamage,-1)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant[a].tilePosition.x+this.offset[0],this.targetCombatant[a].tilePosition.y+this.offset[1])
                        if(index>=0){
                            this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                        }
                    }else if(this.procedure[1][a]>=34){
                        this.procedure[0][a]=3
                    }
                    allDone3294=false
                }else if(this.procedure[0][a]==0){
                    if(this.procedure[1][a]>10){
                        this.targetCombatant[a].moveTile(this.direction,this.distance/15/this.targetDistance)
                        this.targetCombatant[a].moveRelativeTile(this.relativeDirection,this.relativeDistance/15/this.targetDistance)
                    }
                    if(this.procedure[1][a]>=25){
                        this.targetCombatant[a].moveTilePosition(this.targetCombatant[a].tilePosition.x+this.offset[0]/this.targetDistance,this.targetCombatant[a].tilePosition.y+this.offset[1]/this.targetDistance)
                        this.battle.activate(1,this.targetCombatant[a].id)
                        this.procedure[2][a]--
                        if(this.procedure[2][a]>0){
                            let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x+this.offset[0]/this.targetDistance,this.targetCombatant[a].tilePosition.y+this.offset[1]/this.targetDistance)
                            let fakeOccupied=false
                            if(this.userCombatant.tilePosition.x==this.targetCombatant[a].tilePosition.x+this.offset[0]/this.targetDistance&&this.userCombatant.tilePosition.y==this.targetCombatant[a].tilePosition.y+this.offset[1]/this.targetDistance){
                                fakeOccupied=true
                            }
                            this.procedure[0][a]=index>=0&&(this.battle.tileManager.tiles[index].occupied==0||fakeOccupied)?0:1
                            this.procedure[1][a]=10
                        }else{
                            this.procedure[0][a]=3
                        }
                        print(this.timer,this.procedure[0][a])
                    }
                    allDone3294=false
                }
                this.procedure[1][a]++
            }
            if(this.timer>=15*this.targetDistance&&allDone3294){
                this.remove=true
            }
        break
        case 3313: case 3391:
            if(this.timer==1){
                this.userCombatant.startAnimation(32)
            }
            this.userCombatant.runAnimation(1/20,32)
            if(this.timer==5||this.timer==15){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,90,[20]))
                switch(this.type){
                    case 3313:
                        if(this.timer==5){
                            for (let a=0,la=this.effect[0];a<la;a++){
                                this.battle.dropDrawShuffle(this.player,findName('Miracle',types.card),0,0)
                            }
                        }else if(this.timer==15){
                            for (let a=0,la=this.effect[1];a<la;a++){
                                this.battle.dropDrawShuffle(this.player,findName('Dual\nDiscus',types.card),0,0)
                            }
                        }
                    break
                    case 3391:
                        if(this.timer==5){
                            for (let a=0,la=this.effect[0];a<la;a++){
                                this.battle.dropDrawShuffle(this.player,findName('Dual\nDiscus',types.card),this.level,0)
                            }
                        }else if(this.timer==15){
                            for (let a=0,la=this.effect[1];a<la;a++){
                                this.battle.dropDrawShuffle(this.player,findName('Miracle',types.card),0,0)
                            }
                        }
                    break
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3329:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/20,17)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,91,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.battle.addEnergy(this.effect[1],this.player)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3333:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
                this.offset=[(this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x)/this.targetDistance,(this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y)/this.targetDistance]
            }
            if(this.timer<=20){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,92,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }
            if(this.targetDistance>=2){
                if(this.timer>10&&this.timer<=25){
                    this.targetCombatant.moveTile(this.direction,-this.distance/15/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/15/this.targetDistance)
                }
                if(this.timer==25){
                    this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x-this.offset[0],this.targetCombatant.tilePosition.y-this.offset[1])
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }    
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3356:
            if(this.timer==1){
                this.userCombatant.startAnimation(43)
            }
            this.userCombatant.runAnimation(1/10,43)
            if(this.timer==10){
                this.battle.addCurrency(this.effect[0],this.user)
                this.targetCombatant.addBarrier(this.effect[1])
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3365:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                for(let a=0,la=4;a<la;a++){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    94,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30)+random(-3,3)-a*12+a*6,10]))
                }
            }else if(this.timer==5*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0]*(this.energy+this.effect[1]),this.user)
            }else if(this.timer>=max(30,5*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 3368:
            if(this.timer==1&&this.targetDistance>1){
                this.userCombatant.startAnimation(0)
            }else if(this.timer==15*this.targetDistance-14){
                this.procedure[2]=-120+floor(random(0,5))*60
                let offset=transformDirection(0,this.relativeDirection+this.procedure[2])
                let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                this.procedure[1]=atan2(sin(this.relativeDirection+this.procedure[2])*6/5,cos(this.relativeDirection+this.procedure[2])/sqrt(3))
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
                    this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2],this.relativeDistance/40/this.targetDistance)
                }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                    this.targetCombatant.moveTile(this.procedure[1],-this.distance/40)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2],-this.relativeDistance/40/this.targetDistance)
                }
                if(this.timer>=15*this.targetDistance+11){
                    this.remove=true
                }
            }else if(this.procedure[0]==1){
                if(this.timer>15*this.targetDistance-5&&this.timer<=15*this.targetDistance+3){
                    this.targetCombatant.moveTile(this.procedure[1],this.distance/10)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2],this.relativeDistance/10/this.targetDistance)
                }else if(this.timer>15*this.targetDistance+3&&this.timer<=15*this.targetDistance+11){
                    this.targetCombatant.moveTile(this.procedure[1],-this.distance/10)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2],-this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer==15*this.targetDistance+3){
                    this.targetCombatant.takeDamage(game.collisionDamage,-1)
                    let offset=transformDirection(0,this.relativeDirection+this.procedure[2])
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
                    this.targetCombatant.moveRelativeTile(this.relativeDirection+this.procedure[2],this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer>=15*this.targetDistance+5){
                    let offset=transformDirection(0,this.relativeDirection+this.procedure[2])
                    this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x+offset[0],this.targetCombatant.tilePosition.y+offset[1])
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            }
        break
        case 3377:
            if(this.timer==1){
                this.userCombatant.startAnimation(32)
            }
            this.userCombatant.runAnimation(1/20,32)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,95,[20]))
                this.battle.addEnergyGen(this.effect[0],this.player)
                if(this.userCombatant.elemental){
                    this.battle.dropDrawShuffle(this.player,findName('Vitality',types.card),0,0)
                    this.userManager.draw(this.effect[1])
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3398:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    96,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),7*this.targetDistance]))
            }else if(this.timer==21+this.targetDistance*3||this.timer==69-this.targetDistance*3){
                switch(this.type){
                    case 3398:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.timer==69-this.targetDistance*3){
                            if(this.userManager.reserve.cards.length>0){
                                this.userManager.reserve.send(this.userManager.hand.cards,0,1,1)
                            }
                            if(this.userManager.discard.cards.length>0){
                                if(this.userManager.discard.cards[this.userManager.discard.cards.length-1].name=='Fatigue'&&this.userManager.discard.cards.length>1){
                                    this.userManager.discard.send(this.userManager.hand.cards,this.userManager.discard.cards.length-2,this.userManager.discard.cards.length-1,1)
                                }else{
                                    this.userManager.discard.send(this.userManager.hand.cards,this.userManager.discard.cards.length-1,this.userManager.discard.cards.length,1)
                                }
                            }
                        }
                    break
                }
            }else if(this.timer>=75){
                this.remove=true
            }
        break
        case 3430:
            if(this.timer==1){
                this.userCombatant.startAnimation(32)
            }
            this.userCombatant.runAnimation(1/20,32)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,97,[10]))
                if(variants.mtg){
                    this.battle.addEnergy(this.effect[0],this.player)
                }else{
                    this.userCombatant.statusEffect('Temporary Free Non-Rare Colorless',this.effect[0])
                }
                this.userManager.draw(this.effect[1])
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3449:
            if(this.timer==1){
                this.userCombatant.startAnimation(25)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/10,25)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,98,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
            }else if(this.timer==5*this.targetDistance+15){
                this.selfCall(9)
            }else if(this.timer>=max(30,5*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 3454:
            if(variants.nobasicanim){
                this.selfCall(1)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.selfCall(1)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,99,[20]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 3459:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    100,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),7*this.targetDistance]))
            }else if(this.timer==21+this.targetDistance*3||this.timer==69-this.targetDistance*3){
                if(this.timer==69-this.targetDistance*3){
                    let list=[this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                    for(let a=0,la=list.length;a<la;a++){
                        for(let b=0,lb=list[a].length;b<lb;b++){
                            if(list[a][b].id==this.id){
                                this.battle.overlayManager.overlays[70][this.player].active=true
                                this.battle.overlayManager.overlays[70][this.player].activate([list[a][b],this.targetCombatant.id,this.user])
                            }
                        }
                    }
                }
            }else if(this.timer>=75){
                this.remove=true
            }
        break
        case 3460: case 4225:
            if(this.timer==1){
                this.userCombatant.startAnimation(32)
            }
            this.userCombatant.runAnimation(1/30,32)
            if(this.timer==5||this.timer==25){
                for(let a=0,la=10;a<la;a++){
                    this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                        101,[360*(a+0.5)/la,20]))
                }
            }
            if(this.timer==15){
                for(let a=0,la=2;a<la;a++){
                    this.battle.combatantManager.randomEnemyEffect(3,[this.effect[0],this.id])
                }
                for(let a=0,la=10;a<la;a++){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                        101,[360*a/la,30]))
                }
                switch(this.type){
                    case 3460:
                        if(this.userCombatant.getStatus('Temporary Strength')>0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                        if(this.userCombatant.getStatus('Temporary Dexterity')>0){
                            this.battle.addEnergy(this.effect[2],this.player)
                        }
                    break
                    case 4225:
                        if(this.userCombatant.getStatus('Temporary Strength')>0){
                            this.battle.addSpecificEnergy(2,this.player,5)
                        }
                        if(this.userCombatant.getStatus('Temporary Dexterity')>0){
                            this.battle.addSpecificEnergy(2,this.player,1)
                        }
                    break
                }
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 3467:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                for(let a=0,la=4;a<la;a++){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    102,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30)+random(-3,3)-a*12+a*6,10]))
                }
            }else if(this.timer==5*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.drop(this.player,findName('Glamorous\nStarlight',types.card),0,game.playerNumber+1)
                }
            }else if(this.timer>=max(30,5*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 3482: case 3580:
            if(this.timer==1){
                this.userCombatant.startAnimation(26)
            }
            this.userCombatant.runAnimation(2/(4+4*this.effect[1]),26)
            if(this.timer%4==0&&this.timer<=4*this.effect[1]){
                switch(this.type){
                    case 3482:
                        this.battle.combatantManager.randomEnemyEffect(3,[this.effect[0],this.user])
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                            this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                            this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                            103,[this.timer+4]))
                    break
                    case 3580:
                        this.battle.combatantManager.randomEnemyEffect(11,[this.effect[0],this.user,2])
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                            this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                            this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                            110,[this.timer+4]))
                    break
                }
                if(this.timer==4*this.effect[1]){
                    switch(this.type){
                        case 3580:
                            this.userCombatant.statusEffect('Strength',this.effect[2])
                        break
                    }
                }
            }else if(this.timer>=4+4*this.effect[1]){
                this.remove=true
            }
        break
        case 3499:
            if(this.timer==1){
                this.userCombatant.startAnimation(26)
            }
            this.userCombatant.runAnimation(1/10,26)
            if(this.timer==10){
                this.userCombatant.statusEffect('Strength',this.effect[0])
                this.battle.dropDrawShuffle(this.player,findName('Refracted\nSunlight',types.card),0,game.playerNumber+1)
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    104,[20]))
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3509:
            if(this.timer==1){
                this.userCombatant.startAnimation(25)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/10,25)
            }
            if(this.timer==9||this.timer==13||this.timer==17||this.timer==21){
                for(let a=0,la=(this.timer-5)/4;a<la;a++){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,
                        105,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y)+5-la*5+a*10,60]))
                }
            }
            if(this.timer==10*this.targetDistance+12||this.timer==10*this.targetDistance+18){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.timer==10*this.targetDistance+18){
                    this.battle.drop(this.player,findName('Dark\nResidue',types.card),0,game.playerNumber+1)
                }
            }else if(this.timer>=max(30,10*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 3511:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/20,17)
            if(this.timer==10||this.timer==30){
                this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userManager.hand.numberAbstract(4,[[5]]))
            }else if(this.timer>=40){
                this.remove=true
            }
        break
        case 3527:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/10,17)
            if(this.timer==5||this.timer==15||this.timer==25){
                this.targetCombatant.takeDamage(this.effect[0])
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 3532:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/20,17)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    107,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.userCombatant.addBlock(this.effect[1]*(this.userCombatant.stance==5?3:this.userCombatant.stance==1?2:1))
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3558:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                        108,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),8*this.targetDistance-1]))
            }else if(this.timer==15*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.userCombatant.statusEffect('Random Card Cost Less Next Turn',this.effect[1])
            }else if(this.timer>=max(30,15*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 3582:
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
                    for(let a=0,la=5;a<la;a++){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,
                            this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,
                            this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,
                            111,[atan2(this.targetCombatant[0].position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant[0].position.y+30)-50+a*25,20]))
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 3828: case 3832: case 3835: case 4126: case 4127: case 4129:
            if(variants.nobasicanim){
                this.selfCall(22)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.selfCall(22)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,114,[15]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 3622: case 3827: case 3829: case 3834: case 3873: case 4124: case 4128:
            if(variants.nobasicanim){
                this.selfCall(22)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.selfCall(22)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,115,[15]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 3831: case 3833: case 3875:
            if(variants.nobasicanim){
                this.selfCall(22)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.selfCall(22)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,116,[15]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 3625:
            if(this.timer==1){
                this.userCombatant.startAnimation(5)
            }
            this.userCombatant.runAnimation(1/10,5)
            if(this.timer==10){
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,117,[30]))
                for(let a=0,la=this.effect[0];a<la;a++){
                    this.userManager.hand.add(findName('Miracle',types.card),0,0)
                }
                this.userManager.draw(this.effect[1])
                this.battle.drop(this.player,findName('Quiet\nMoonlight',types.card),0,game.playerNumber+1)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3626:
            if(this.timer==1){
                this.userCombatant.startAnimation(5)
            }
            this.userCombatant.runAnimation(1/10,5)
            if(this.timer==10){
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,118,[30]))
                for(let a=0,la=this.effect[0];a<la;a++){
                    this.userManager.hand.add(findName('Miracle',types.card),0,0)
                }
                this.userManager.draw(this.effect[1])
                this.battle.drop(this.player,findName('Refracted\nSunlight',types.card),0,game.playerNumber+1)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3627:
            if(this.timer==1){
                this.userCombatant.startAnimation(5)
            }
            this.userCombatant.runAnimation(1/10,5)
            if(this.timer==10){
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,119,[30]))
                for(let a=0,la=this.effect[0];a<la;a++){
                    this.userManager.hand.add(findName('Miracle',types.card),0,0)
                }
                this.userManager.draw(this.effect[1])
                this.battle.drop(this.player,findName('Glamorous\nStarlight',types.card),0,game.playerNumber+1)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3632:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    123,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-10),this.distance/15-3]))
            }else if(this.timer==5*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.userCombatant.statusEffect('Extra Turn',1)
                this.userCombatant.statusEffect('Temporary All Cost Up Next Turn',this.effect[1])
            }else if(this.timer>=max(30,5*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 3633:
            if(this.timer==1){
                this.userCombatant.startAnimation(32)
                this.selfCall(19)
            }
            if(this.timer<=10||this.timer>30){
                this.userCombatant.runAnimation(1/20,32)
            }
            if(this.timer==10){
                current.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y-50,122,[30]))
            }else if(this.timer==30){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.battle.dropDrawShuffle(this.player,findName('Prismatic\nBomb',types.card),0,0)
                }
            }else if(this.timer>=40){
                this.remove=true
            }
        break
        case 3680:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                for(let a=0,la=8;a<la;a++){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,
                        this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                        this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    127,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30)+random(-1,1)-a*6+a*3,20]))
                }
            }else if(this.timer==5*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.userCombatant.elemental||this.userCombatant.luckCheck()){
                    this.targetCombatant.statusEffect('Freeze',this.effect[1])
                    this.targetCombatant.statusEffect('Poison',this.effect[2])
                    if(this.targetCombatant.blocked>0){
                        this.targetCombatant.statusEffect('Bleed',this.effect[3])
                    }
                }else if(!this.userCombatant.luckCheckFail()){
                    if(floor(random(0,3))==0){
                        this.targetCombatant.statusEffect('Freeze',this.effect[1])
                    }else if(floor(random(0,2))==0){
                        this.targetCombatant.statusEffect('Poison',this.effect[2])
                    }else if(this.targetCombatant.blocked>0){
                        this.targetCombatant.statusEffect('Bleed',this.effect[3])
                    }
                }
            }else if(this.timer>=max(30,5*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 3694: case 3695: case 3696: case 3697: case 3698: case 3699:
            if(this.timer==1){
                this.userCombatant.startAnimation(2)
            }
            this.userCombatant.runAnimation(1/30,2)
            if(this.timer==15){
                let offset=random(0,72)
                for(let a=0,la=5;a<la;a++){
                    this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,128,[offset+a*72]))
                }
                switch(this.type){
                    case 3694:
                        this.targetCombatant.takeDamage(this.effect[0],this.player,this.limit%2==1?2:0)
                    break
                    case 3695:
                        if(this.limit%2==1){
                            this.targetCombatant.takeDamage(this.effect[0],this.player)
                        }else{
                            this.targetCombatant.heal(this.effect[1])
                        }
                    break
                    case 3696:
                        this.targetCombatant.takeDamage(this.effect[0],this.player)
                        if(this.limit%2==1){
                            this.userCombatant.addBlock(this.effect[0])
                        }
                    break
                    case 3697:
                        if(this.limit%2==1){
                            this.targetCombatant.takeDamage(this.effect[0],this.player)
                        }else{
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 3698:
                        if(this.limit%4==3){
                            this.targetCombatant.takeDamage(this.effect[0],this.player)
                        }else{
                            this.targetCombatant.heal(this.effect[1])
                        }
                    break
                    case 3699:
                        if(this.limit%4==3){
                            this.targetCombatant.heal(this.effect[0]*2)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0]*(this.limit%2==1?2:1),this.player)
                        }
                    break
                }
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 3705:
            if(this.timer==1){
                this.userCombatant.startAnimation(32)
            }
            this.userCombatant.runAnimation(1/20,32)
            if(this.timer==5){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,129,[10]))
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,130,[10]))
            }
            if(this.timer==10){
                this.battle.combatantManager.areaAbstract(0,[this.effect[0]*this.energy*max(0,this.userManager.hand.turnPlayed[0]-1),this.user,0],this.userCombatant.tilePosition,[3,this.userCombatant.id],[0,1],false,0)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3715:
            if(this.limit%2==1){
                if(this.timer==1){
                    this.userCombatant.startAnimation(10)
                }
                this.userCombatant.runAnimation(1/10,10)
                if(this.timer==10){
                    this.selfCall(13)
                }else if(this.timer>=20){
                    this.remove=true
                }
            }else{
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
        break
        case 3717:
            if(this.targetDistance==1){
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/30,2)
                if(this.timer==15){
                    this.selfCall(0)
                }else if(this.timer>=30){
                    this.remove=true
                }
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(15)
                }
                if(this.timer<=10||this.timer>10*this.targetDistance+15){
                    this.userCombatant.runAnimation(1/10,15)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,131,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y),5*this.targetDistance-2]))
                }
                if(this.timer==10*this.targetDistance+15){
                    this.selfCall(0)
                }else if(this.timer>=10*this.targetDistance+25){
                    this.remove=true
                }
            }
        break
        case 3736:
            if(this.timer==1){
                this.userCombatant.startAnimation(5)
            }
            this.userCombatant.runAnimation(1/10,5)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,134,[20,0,0]))
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,134,[20,0.5,10]))
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,133,[5]))
                this.battle.combatantManager.allEffect(48,['Temporary Strength',-this.effect[0]])
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.userManager.hand.add(findName('Shadow',types.card),0,game.playerNumber+1)
                }
                this.userCombatant.wish+=this.effect[2]
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3751:
            if(this.timer==1){
                this.userCombatant.startAnimation(5)
            }
            this.userCombatant.runAnimation(1/10,5)
            if(this.timer==10){
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,135,[2]))
                this.battle.combatantManager.fullAllEffect(12,['Dodge',this.effect[0]])
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3765:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
                this.procedure[0]=this.selfCall(29)
            }
            this.userCombatant.runAnimation(1/30,17)
            if(this.timer%30==15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }else if(this.timer>=30+this.procedure[0]*30){
                this.remove=true
            }
        break
        case 3767:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/30,17)
            if(this.timer==15){
                if(this.targetCombatant.life<this.effect[1]){
                    this.targetCombatant.statusEffect('Stun',this.effect[2])
                }
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                current.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y-50,136,[10]))
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 3770:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=30){
                this.userCombatant.runAnimation(1/30,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    137,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-10),150,[150,255,100]]))
            }else if(this.timer==20*this.targetDistance+10){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.targetCombatant.upRandomStatus(this.effect[1],[1,3])
            }else if(this.timer>=20*this.targetDistance+15){
                this.remove=true
            }
        break
        case 3771:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=15||this.timer>25&&this.timer<=40){
                this.userCombatant.runAnimation(1/30,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    137,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-10),150,[150,255,100]]))
            }else if(this.timer==25){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    138,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-10)+2,150,[220,200,40]]))
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    138,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-10)-2,150,[40,0,60]]))
            }else if(this.timer==20*this.targetDistance+10){
                this.targetCombatant.takeDamage(this.effect[0]-this.effect[1]*(this.targetDistance-1),this.user)
                this.targetCombatant.upRandomStatus(this.effect[2],[1,3])
            }else if(this.timer>=max(40,20*this.targetDistance+15)){
                this.remove=true
            }
        break
        case 3779:
            if(this.timer==1){
                this.targetCombatant[0].startAnimation(19)
                this.targetCombatant[1].startAnimation(19)
            }
            this.targetCombatant[0].runAnimation(1/20,19)
            this.targetCombatant[1].runAnimation(1/20,19)
            if(this.timer==10){
                let userPosition={x:this.targetCombatant[0].tilePosition.x,y:this.targetCombatant[0].tilePosition.y}
                this.targetCombatant[0].moveTile(this.direction,-this.distance)
                this.targetCombatant[0].moveRelativeTile(this.relativeDirection,-this.relativeDistance)
                this.targetCombatant[0].moveTilePosition(this.targetCombatant[1].tilePosition.x,this.targetCombatant[1].tilePosition.y)
                this.targetCombatant[1].moveTile(this.direction,this.distance)
                this.targetCombatant[1].moveRelativeTile(this.relativeDirection,this.relativeDistance)
                this.targetCombatant[1].moveTilePosition(userPosition.x,userPosition.y)
                this.battle.activate(1,this.userCombatant.id)
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 3804:
            if(this.timer==1){
                this.userCombatant.startAnimation(1)
            }
            this.userCombatant.runAnimation(1/30,1)
            if(this.timer==15){
                this.selfCall(1)
                current.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,139,[15]))
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 3821:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.targetCombatant.position.x+900/sqrt(2),this.targetCombatant.position.y-900/sqrt(2),
                        140,[225,45]))
            }else if(this.timer==105){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                this.userCombatant.statusEffect('Random Card Cost More Next Turn',this.effect[2])
            }else if(this.timer>=120){
                this.remove=true
            }
        break
        case 3822:
            if(variants.nobasicanim){
                this.selfCall(1)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.selfCall(1)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,141,[100]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 3823:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                        142,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+120),8*this.targetDistance-1]))
            }else if(this.timer==15*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                for(let a=0,la=this.effect[1];a<la;a++){
                    this.userManager.hand.add(findName('Miracle',types.card),0,0)
                }
                this.userCombatant.statusEffect('Strength',this.effect[2]*this.userManager.hand.totalPlayed[4])
            }else if(this.timer>=max(30,15*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 3824:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=40){
                this.userCombatant.runAnimation(1/40,17)
            }
            if(this.timer==20){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x*0.8+this.userCombatant.graphics.arms[1].bottom.x*0.8,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y*0.5+this.userCombatant.graphics.arms[1].bottom.y*0.5,
                    144,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.amplify){
                    this.userManager.allEffectArgs(2,21,[this.effect[1]])
                }
            }else if(this.timer>=60){
                this.remove=true
            }
        break
        case 3825:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=40){
                this.userCombatant.runAnimation(1/40,17)
            }
            if(this.timer==20||this.timer==30||this.timer==40){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }
            if(this.timer==20){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x*0.8+this.userCombatant.graphics.arms[1].bottom.x*0.8,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y*0.5+this.userCombatant.graphics.arms[1].bottom.y*0.5,
                    147,[this.targetCombatant.position.x,this.targetCombatant.position.y-30,this.userCombatant.position.x,this.userCombatant.position.y]))
            }else if(this.timer>=60){
                this.remove=true
            }
        break
        case 3826:
            if(this.timer==1){
                this.userCombatant.startAnimation(32)
            }
            if(this.timer<=10||this.timer>110&&this.timer<=120){
                this.userCombatant.runAnimation(1/20,32)
            }
            if(this.timer<=60&&this.timer%2==0){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                    this.targetCombatant.position.x,
                    this.targetCombatant.position.y+600,
                    149+floor(random(0,3)),[random(-10,10),random(10,20)*(floor(random(0,2))*2-1),random(3,5)]))
            }
            if(this.timer==90||this.timer==110){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }else if(this.timer==120){
                this.targetCombatant.loseHealth(this.effect[1]*this.battle.counter.killed)
            }
            if(this.timer>=150){
                this.remove=true
            }
        break
        case 3836:
            if(variants.nobasicanim){
                this.selfCall(22)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.selfCall(22)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,152,[15]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 3874:
            if(variants.nobasicanim){
                this.selfCall(22)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.selfCall(22)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,154,[15]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 3913: case 4063:
            if(this.timer==1){
                for(let a=0,la=this.targetCombatant.length;a<la;a++){
                    let index=this.battle.tileManager.getTileIndex(this.targetCombatant[a].tilePosition.x*2-this.userCombatant.tilePosition.x,this.targetCombatant[a].tilePosition.y*2-this.userCombatant.tilePosition.y)
                    this.procedure[a]=this.targetCombatant[a].getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }
                this.userCombatant.startAnimation(this.type==3913?9:3)
            }
            if(this.timer<=20){
                this.userCombatant.runAnimation(1/10,this.type==3913?9:3)
            }
            for(let a=0,la=this.targetCombatant.length;a<la;a++){
                if(this.timer==10){
                    this.targetCombatant[a].takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
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
                this.userCombatant.combo=0
                this.battle.updateTargetting()
                this.remove=true
            }
        break
        case 3920:
            if(this.timer==1){
                this.userCombatant.startAnimation(2)
            }
            this.userCombatant.runAnimation(1/20,2)
            if(this.timer%20==1){
                this.selfCall(0)
            }else if(this.timer>=80){
                this.remove=true
            }
        break
        case 3925:
            if(this.timer==1){
                this.userCombatant.startAnimation(1)
            }
            this.userCombatant.runAnimation(1/30,1)
            if(this.timer==15){
                for(let a=0,la=this.effect[0];a<la;a++){
                    this.userManager.deck.add(findName('Strike',types.card),this.level,this.color,floor(random(0,7)))
                }
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,155,[10]))
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 3926:
            if(this.timer==1){
                this.userCombatant.startAnimation(1)
            }
            this.userCombatant.runAnimation(1/30,1)
            if(this.timer==15){
                for(let a=0,la=this.effect[0];a<la;a++){
                    this.userManager.deck.add(findName('Defend',types.card),this.level,this.color,floor(random(0,7)))
                }
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,156,[10]))
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 3927:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                        157,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),8*this.targetDistance-1]))
            }else if(this.timer==15*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                    this.userManager.drawAbstract(this.effect[1],0,0,[2])
                }else{
                    this.userManager.drawAbstract(this.effect[2],0,0,[1])
                }
            }else if(this.timer>=max(30,15*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 4028:
            if(variants.nobasicanim){
                this.selfCall(13)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(10)
                }
                this.userCombatant.runAnimation(1/10,10)
                if(this.timer==10){
                    let direction=random(0,360)
                    for(let a=0,la=9;a<la;a++){
                        this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                            this.userCombatant.position.x,
                            this.userCombatant.position.y,
                            158,[direction+360*a/la,random(10,20)*(floor(random(0,2))*2-1),random(3,5)]))
                    }
                    this.selfCall(13)
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 4034:
            if(this.timer==1){
                this.userCombatant.startAnimation(25)
            }
            if(this.timer<=10||this.timer>40&&this.timer<=50){
                this.userCombatant.runAnimation(1/10,25)
            }
            if(this.timer==20){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,
                    159,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y)]))
            }
            if(this.timer==25||this.timer==30||this.timer==35||this.timer==40){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,
                    159,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y)+20-this.timer]))
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,
                    159,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y)-20+this.timer]))
            }
            if(this.timer==20){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                for(let a=0,la=this.effect[1];a<la;a++){
                    if(!this.userManager.hand.randomEffect(60,[1])){
                        this.userManager.randomEffect(2,45,[0])
                    }
                }
            }else if(this.timer>=50){
                this.remove=true
            }
        break
        case 4053: case 4409: case 4410:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    160,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
            }else if(this.timer==5*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                switch(this.type){
                    case 4053:
                        this.battle.addEnergy(this.effect[1]*occurences(this.userCombatant.orbs,4),this.player)
                    break
                    case 4409:
                        this.battle.addSpecificEnergy(occurences(this.userCombatant.orbs,4),this.player,3)
                    break
                    case 4410:
                        this.battle.addSpecificEnergy(occurences(this.userCombatant.orbs,4)*2,this.player,3)
                    break
                }
            }else if(this.timer>=max(30,5*this.targetDistance+25)){
                this.remove=true
            }
        break
        case 4058:
            if(this.timer==1){
                this.userCombatant.startAnimation(0)
            }
            this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
            this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
            this.userCombatant.runAnimation(1/15,0)
            if(this.targetClass==2){
                this.userCombatant.offset.position.y=lsin(this.timer/15/this.targetDistance*180)*-30
            }
            if(this.timer>=15*this.targetDistance){
                this.userCombatant.moveTilePosition(this.targetTile.tilePosition.x,this.targetTile.tilePosition.y)
                this.battle.activate(1,this.userCombatant.id)
                this.remove=true
            }
        break
        case 4068:
            if(this.timer==1){
                this.userCombatant.startAnimation(25)
                let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                this.procedure[0]=this.targetCombatant.getStatus('Cannot Be Pushed')>0?2:index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/10,25)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
            }else if(this.timer==5*this.targetDistance+15){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
            }
            if(this.procedure[0]==2){
                if(this.timer>5*this.targetDistance+15&&this.timer<=5*this.targetDistance+23){
                    this.targetCombatant.moveTile(this.direction,this.distance/40/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/40/this.targetDistance)
                }else if(this.timer>5*this.targetDistance+23&&this.timer<=5*this.targetDistance+31){
                    this.targetCombatant.moveTile(this.direction,-this.distance/40/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/40/this.targetDistance)
                }
                if(this.timer>=5*this.targetDistance+31){
                    this.remove=true
                }
            }else if(this.procedure[0]==1){
                if(this.timer>5*this.targetDistance+15&&this.timer<=5*this.targetDistance+23){
                    this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                }else if(this.timer>5*this.targetDistance+23&&this.timer<=5*this.targetDistance+31){
                    this.targetCombatant.moveTile(this.direction,-this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer==5*this.targetDistance+23){
                    this.targetCombatant.takeDamage(game.collisionDamage,-1)
                    let index=this.battle.combatantManager.getCombatantIndex(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                    if(index>=0){
                        this.battle.combatantManager.combatants[index].takeDamage(game.collisionDamage,-1)
                    }
                }else if(this.timer>=5*this.targetDistance+31){
                    this.remove=true
                }
            }else{
                if(this.timer>5*this.targetDistance+15){
                    this.targetCombatant.moveTile(this.direction,this.distance/10/this.targetDistance)
                    this.targetCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/10/this.targetDistance)
                }
                if(this.timer>=5*this.targetDistance+25){
                    this.targetCombatant.moveTilePosition(this.targetCombatant.tilePosition.x*(1+1/this.targetDistance)-this.userCombatant.tilePosition.x/this.targetDistance,this.targetCombatant.tilePosition.y*(1+1/this.targetDistance)-this.userCombatant.tilePosition.y/this.targetDistance)
                    this.battle.activate(1,this.targetCombatant.id)
                    this.remove=true
                }
            }
        break
        case 4072:
            if(this.targetDistance==1){
                if(this.timer==1){
                    this.userCombatant.startAnimation(25)
                }
                if(this.timer<=10||this.timer>20&&this.timer<=30){
                    this.userCombatant.runAnimation(1/10,25)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                }else if(this.timer==5*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }else if(this.timer>=max(30,5*this.targetDistance+25)){
                    this.remove=true
                }
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(25)
                    let offset=transformDirection(0,this.relativeDirection)
                    let index=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                    this.procedure[0]=index>=0&&this.battle.tileManager.tiles[index].occupied==0?0:1
                }
                if(this.timer<=10||this.timer>20&&this.timer<=30){
                    this.userCombatant.runAnimation(1/10,25)
                }
                if(this.timer==15){
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),this.distance/30-2]))
                }else if(this.timer==5*this.targetDistance+15){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                }
                if(this.procedure[0]==0){
                    if(this.timer==31){
                        this.userCombatant.startAnimation(0)
                    }
                    if(this.timer>30&&this.timer<=45){
                        this.userCombatant.moveTile(this.direction,this.distance/(15*this.targetDistance))
                        this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/(15*this.targetDistance))
                        this.userCombatant.runAnimation(1/15,0)
                    }
                    if(this.timer>=max(45,5*this.targetDistance+25)){
                        let offset=transformDirection(0,this.relativeDirection)
                        this.userCombatant.moveTilePosition(this.userCombatant.tilePosition.x+offset[0],this.userCombatant.tilePosition.y+offset[1])
                        this.battle.activate(1,this.userCombatant.id)
                        this.remove=true
                    }
                }else if(this.timer>=max(30,5*this.targetDistance+25)){
                    this.remove=true
                }
            }
        break
        case 4082: case 4594:
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
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y+600,161,[this.targetCombatant.position.x,this.targetCombatant.position.y-600]))
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 4083:
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
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y-30,162,[1]))
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 4084:
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
                    this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y-30,163,[5]))
                    this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y-30,164,[5]))
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 4087:
            if(this.timer==1){
                this.userCombatant.startAnimation(25)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/10,25)
            }
            let allDone4087=true
            for(let a=0,la=this.targetCombatant.length;a<la;a++){
                if(this.timer>=14&&this.timer<=16){
                    for(let b=0,lb=3;b<lb;b++){
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.x,this.userCombatant.position.y+this.userCombatant.graphics.arms[1-this.userCombatant.animSet.hand].bottom.y,6,[atan2(this.targetCombatant[a].position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant[a].position.y+30)+random(-12,12),2.5*this.targetDistance[a]-1]))
                    }
                }else if(this.timer==5*this.targetDistance[a]+15){
                    this.targetCombatant[a].takeDamage(this.effect[0]-this.effect[1]*(this.targetDistance[a]-1),this.user)
                }
                if(this.timer<max(30,5*this.targetDistance[a]+25)){
                    allDone4087=false
                }
            }
            if(allDone4087){
                this.remove=true
            }
        break
        case 3298: case 4088:
            if(this.targetDistance==1){
                if(this.timer==15*this.targetDistance-14||this.timer==15*this.targetDistance+1){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer>=15*this.targetDistance-14){
                    this.userCombatant.runAnimation(1/15,2)
                }
                if(this.timer==15*this.targetDistance-3||this.timer==15*this.targetDistance+3){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 3298:
                            this.targetCombatant.statusEffect('Frail',this.effect[1])
                            this.battle.loseCurrency(this.effect[2],this.player)
                        break
                        case 4088:
                            this.targetCombatant.statusEffect('Frail',this.effect[1])
                            this.battle.loseCurrency(this.effect[2],this.player)
                            this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,165,[10,0,0]))
                            this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,165,[10,0.5,10]))
                        break
                    }
                }else if(this.timer>=30){
                    this.remove=true
                }
            }else{
                if(this.timer==1||this.timer==15*this.targetDistance+1){
                    this.userCombatant.startAnimation(0)
                }else if(this.timer==15*this.targetDistance-19){
                    this.userCombatant.startAnimation(2)
                }
                if(this.timer<=15*this.targetDistance-20||this.timer>15*this.targetDistance){
                    this.userCombatant.runAnimation((this.targetDistance-1)/(this.targetDistance*15-20),0)
                }else if(this.timer>15*this.targetDistance-20&&this.timer<=15*this.targetDistance){
                    this.userCombatant.runAnimation(1/10,2)
                }
                if(this.timer<=15*this.targetDistance-20){
                    this.userCombatant.moveTile(this.direction,this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,this.relativeDistance/15/this.targetDistance)
                }else if(this.timer>15*this.targetDistance){
                    this.userCombatant.moveTile(this.direction,-this.distance/15/this.targetDistance)
                    this.userCombatant.moveRelativeTile(this.relativeDirection,-this.relativeDistance/15/this.targetDistance)
                }
                if(this.timer==15*this.targetDistance-8||this.timer==15*this.targetDistance-2){
                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                    switch(this.type){
                        case 3298:
                            this.targetCombatant.statusEffect('Frail',this.effect[1])
                            this.battle.loseCurrency(this.effect[2],this.player)
                        break
                        case 4088:
                            this.targetCombatant.statusEffect('Frail',this.effect[1])
                            this.battle.loseCurrency(this.effect[2],this.player)
                            this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,165,[20,0,0]))
                            this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,165,[20,0.5,10]))
                        break
                    }
                }else if(this.timer>=30*this.targetDistance-20){
                    this.remove=true
                }
            }
        break
        case 4117:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>40&&this.timer<=50){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer>=15&&this.timer<=40&&this.timer%2==0){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                166,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30)+random(-20,20),60]))
            }else if(this.timer==5*this.targetDistance+25||this.timer==5*this.targetDistance+35){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.lastPlayed[0][2]!=this.color){
                    this.userCombatant.charge+=this.effect[1]
                }
            }else if(this.timer>=max(50,5*this.targetDistance+50)){
                this.remove=true
            }
        break
        case 4123:
            if(variants.nobasicanim){
                this.selfCall(4)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(5)
                }
                this.userCombatant.runAnimation(1/10,5)
                if(this.timer==10){
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,168,[10]))
                    this.selfCall(4)
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 4125:
            if(variants.nobasicanim){
                this.selfCall(22)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.selfCall(22)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,169,[15]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 4130:
            if(variants.nobasicanim){
                this.selfCall(22)
                this.remove=true
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.selfCall(22)
                    current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,170,[15]))
                }else if(this.timer>=30){
                    this.remove=true
                }
            }
        break
        case 4149:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    171,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),7*this.targetDistance]))
            }else if(this.timer==21+this.targetDistance*3||this.timer==69-this.targetDistance*3){
                switch(this.type){
                    case 4149:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.timer==69-this.targetDistance*3){
                            this.userCombatant.addBlock(this.effect[1]*this.userManager.hand.turnPlayed[1])
                        }
                    break
                }
            }else if(this.timer>=75){
                this.remove=true
            }
        break
        case 4150:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=10||this.timer>20&&this.timer<=30){
                this.userCombatant.runAnimation(1/20,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particles.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    172,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y+30),7*this.targetDistance]))
            }else if(this.timer==21+this.targetDistance*3||this.timer==69-this.targetDistance*3){
                switch(this.type){
                    case 4150:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.timer==69-this.targetDistance*3){
                            this.userManager.hand.duplicate(this.effect[1])
                        }
                    break
                }
            }else if(this.timer>=75){
                this.remove=true
            }
        break
        case 4263: case 4264: case 4265:
            if(this.timer==1){
                this.userCombatant.startAnimation(1)
            }
            this.userCombatant.runAnimation(1/30,1)
            if(this.timer==15){
                switch(this.type){
                    case 4263:
                        this.battle.addSpecificEnergy(1,this.player,2)
                        this.userManager.drawAbstract(this.effect[0],16,0,[2])
                    break
                }
                current.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y-50,173,[8]))
            }else if(this.timer>=30){
                this.remove=true
            }
        break
        case 4269:
            if(this.timer==1){
                this.procedure[0]=this.userCombatant.stance==4?1:0
            }
            if(variants.nobasicanim){
                this.remove=true
                if(this.procedure[0]==1){
                    this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                }else{
                    this.userCombatant.enterStance(4)
                }
            }else if(this.procedure[0]==1){
                if(this.timer==1){
                    this.userCombatant.startAnimation(17)
                }
                this.userCombatant.runAnimation(1/30,17)
                if(this.timer==15){
                    this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                }else if(this.timer>=30){
                    this.remove=true
                }
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(5)
                }
                this.userCombatant.runAnimation(1/10,5)
                if(this.timer==10){
                    this.userCombatant.enterStance(4)
                }else if(this.timer>=20){
                    this.remove=true
                }
            }
        break
        case 4293:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            this.userCombatant.runAnimation(1/20,17)
            if(this.timer==10){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,175,[this.targetCombatant.position.x,this.targetCombatant.position.y-30]))
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.amplify){
                    this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                }
            }else if(this.timer>=20){
                this.remove=true
            }
        break
        case 4472:
            if(this.timer==1){
                this.userCombatant.startAnimation(17)
            }
            if(this.timer<=30){
                this.userCombatant.runAnimation(1/30,17)
            }
            if(this.timer==15){
                this.battle.particleManager.particlesBack.push(new particle(this.battle.layer,
                    this.userCombatant.position.x+this.userCombatant.graphics.arms[0].bottom.x/2+this.userCombatant.graphics.arms[1].bottom.x/2,
                    this.userCombatant.position.y+this.userCombatant.graphics.arms[0].bottom.y/2+this.userCombatant.graphics.arms[1].bottom.y/2,
                    176,[atan2(this.targetCombatant.position.x-this.userCombatant.position.x,this.userCombatant.position.y-this.targetCombatant.position.y-10),75]))
            }else if(this.timer==10*this.targetDistance+10){
                this.targetCombatant.takeDamage(this.effect[0],this.user)
                if(this.targetCombatant.blocked<=1){
                    this.userManager.hand.discard(this.effect[1])
                }
            }else if(this.timer>=max(30,10*this.targetDistance+15)){
                this.remove=true
            }
        break
        case 4486:
            if(this.timer==1){
                this.procedure[0]=this.battle.turn.total%2==0?0:1
            }
            if(this.procedure[0]==0){
                if(this.timer==1){
                    this.userCombatant.startAnimation(2)
                }
                this.userCombatant.runAnimation(1/30,2)
                if(this.timer==15){
                    this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                }else if(this.timer>=30){
                    this.remove=true
                }
            }else{
                if(this.timer==1){
                    this.userCombatant.startAnimation(1)
                }
                this.userCombatant.runAnimation(1/30,1)
                if(this.timer==15){
                    this.userCombatant.addBlock(this.effect[1]*this.energy)
                }else if(this.timer>=30){
                    this.remove=true
                }
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
                if(this.userCombatant.getStatus('Single Damage Up')>0&&this.clearAttack[1]){
                    this.userCombatant.status.main[findList('Single Damage Up',this.userCombatant.status.name)]=0
                }
                if(this.userCombatant.getStatus('Triple Damage')>0&&this.clearAttack[2]){
                    this.userCombatant.status.main[findList('Triple Damage',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('1.5x Damage')>0&&this.clearAttack[3]){
                    this.userCombatant.status.main[findList('1.5x Damage',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('Double Damage-1')>0&&this.clearAttack[4]){
                    this.userCombatant.status.main[findList('Double Damage-1',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('No Damage')>0&&this.clearAttack[5]){
                    this.userCombatant.status.main[findList('No Damage',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('Temporary Single Damage Up')>0&&this.clearAttack[6]){
                    this.userCombatant.status.main[findList('Temporary Single Damage Up',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('Double Curse')>0&&this.clearAttack[7]){
                    this.userCombatant.status.main[findList('Double Curse',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('Single Damage Down')>0&&this.clearAttack[8]){
                    this.userCombatant.status.main[findList('Single Damage Down',this.userCombatant.status.name)]=0
                }
                if(this.userCombatant.getStatus('Double Damage Next')>0&&this.clearAttack[9]){
                    this.userCombatant.status.main[findList('Double Damage',this.userCombatant.status.name)]++
                    this.userCombatant.status.main[findList('Double Damage Next',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('Damage Block Convert')>0&&this.clearAttack[10]){
                    this.userCombatant.status.main[findList('Damage Block Convert',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('Damage Half Block Convert')>0&&this.clearAttack[11]){
                    this.userCombatant.status.main[findList('Damage Half Block Convert',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('Damage Repeat in 2 Turns')>0&&this.clearAttack[12]){
                    this.userCombatant.status.main[findList('Damage Repeat in 2 Turns',this.userCombatant.status.name)]--
                }
                if(this.userCombatant.getStatus('Single Attack Bleed')>0&&this.clearAttack[13]){
                    this.userCombatant.status.main[findList('Single Attack Bleed',this.userCombatant.status.name)]=0
                }
                if(this.userCombatant.getStatus('1.5x Damage+1')>0&&this.clearAttack[14]){
                    this.userCombatant.status.main[findList('1.5x Damage+1',this.userCombatant.status.name)]--
                }
                this.userCombatant.tempStatus=[1,0,0,0,0]
            break
        }
    }
}