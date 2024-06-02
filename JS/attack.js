class attack{
    constructor(type,battle,player,effect,attackClass,user,level,color,energy,target,targetDistance,targetClass,combo,replayData,amplify,relPos,limit,id,edition,drawn,cost){
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
        this.edition=edition
        this.drawn=drawn
        this.cost=cost

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
                this.clearAttack=[false,false,false,false,false,false,false,false,false,false]
                if(this.userCombatant.getStatus('Double Damage')>0){
                    this.clearAttack[0]=true
                }
                if(this.userCombatant.getStatus('Single Damage Up')>0){
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
                if(this.userCombatant.getStatus('No Damage')>0){
                    this.clearAttack[5]=true
                }
                if(this.userCombatant.getStatus('Temporary Single Damage')>0){
                    this.clearAttack[6]=true
                }
                if(this.userCombatant.getStatus('Double Curse')>0&&floor(random(0,2))==0){
                    this.clearAttack[7]=true
                    this.userCombatant.doubling=true
                }
                if(this.userCombatant.getStatus('Single Damage Down')>0){
                    this.clearAttack[8]=true
                }
                if(this.userCombatant.getStatus('Double Damage Next')>0){
                    this.clearAttack[9]=true
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
        let tiles=[]
        switch(this.type){
            case -47:
            case 1: case 4: case 5: case 7: case 11: case 12: case 15: case 16: case 17: case 19: case 21: case 24: case 25: case 27: case 32: case 33: case 34: case 35: case 36: case 37:
            case 38: case 39: case 42: case 46: case 47: case 48: case 49: case 53: case 57: case 61: case 66: case 67: case 68: case 75: case 77: case 79: case 80: case 81: case 83: case 84:
            case 85: case 86: case 88: case 89: case 90: case 94: case 100: case 101: case 103: case 104: case 105: case 106: case 108: case 110: case 111: case 115: case 117: case 118: case 119: case 121:
            case 123: case 124: case 125: case 126: case 127: case 129: case 130: case 132: case 133: case 134: case 135: case 136: case 137: case 140: case 143: case 144: case 151: case 154: case 155: case 156:
            case 157: case 173: case 174: case 176: case 178: case 179: case 185: case 187: case 188: case 189: case 191: case 193: case 196: case 208: case 211: case 217: case 218: case 220: case 228: case 234:
            case 236: case 237: case 241: case 243: case 244: case 245: case 246: case 247: case 250: case 251: case 252: case 255: case 260: case 263: case 265: case 266: case 267: case 268: case 269: case 271:
            case 272: case 273: case 274: case 275: case 277: case 280: case 282: case 287: case 288: case 290: case 292: case 293: case 295: case 296: case 297: case 301: case 304: case 305: case 310: case 314:
            case 316: case 319: case 323: case 326: case 327: case 329: case 333: case 342: case 345: case 348: case 361: case 364: case 368: case 371: case 373: case 376: case 378: case 379: case 382: case 384:
            case 385: case 388: case 401: case 402: case 408: case 409: case 412: case 413: case 414: case 415: case 417: case 419: case 427: case 429: case 432: case 433: case 435: case 436: case 437: case 438:
            case 441: case 444: case 447: case 449: case 452: case 460: case 462: case 465: case 466: case 467: case 468: case 469: case 475: case 487: case 491: case 494: case 496: case 497: case 498: case 501:
            case 504: case 507: case 508: case 509: case 510: case 511: case 514: case 531: case 532: case 533: case 534: case 535: case 537: case 538: case 539: case 540: case 543: case 545: case 548: case 550:
            case 556: case 557: case 558: case 559: case 564: case 565: case 566: case 567: case 568: case 569: case 579: case 580: case 581: case 582: case 587: case 588: case 589: case 590: case 591: case 592:
            case 593: case 594: case 596: case 597: case 598: case 599: case 600: case 601: case 604: case 606: case 609: case 610: case 616: case 617: case 618: case 632: case 633: case 634: case 638: case 639:
            case 661: case 662: case 667: case 669: case 672: case 673: case 676: case 677: case 678: case 679: case 683: case 689: case 691: case 692: case 697: case 702: case 703: case 710: case 714: case 715:
            case 718: case 719: case 720: case 721: case 723: case 725: case 729: case 730: case 731: case 732: case 733: case 734: case 736: case 746: case 751: case 757: case 758: case 762: case 764: case 766:
            case 771: case 775: case 779: case 780: case 784: case 785: case 786: case 787: case 793: case 795: case 796: case 798: case 801: case 806: case 824: case 825: case 826: case 827: case 828: case 829:
            case 830: case 833: case 834: case 837: case 840: case 843: case 846: case 848: case 849: case 850: case 857: case 862: case 863: case 865: case 866: case 872: case 874: case 877: case 878: case 881:
            case 883: case 884: case 888: case 895: case 897: case 899: case 900: case 902: case 903: case 905: case 906: case 907: case 908: case 915: case 916: case 917: case 918: case 919: case 920: case 924:
            case 926: case 930: case 934: case 935: case 938: case 939: case 940: case 942: case 943: case 944: case 945: case 946: case 947: case 950: case 956: case 957: case 958: case 959: case 964: case 965:
            case 966: case 972: case 974: case 980: case 987: case 991: case 992: case 993: case 994: case 1001: case 1002: case 1003: case 1004: case 1006: case 1007: case 1009: case 1010: case 1014: case 1015: case 1017:
            case 1018: case 1022: case 1023: case 1027: case 1028: case 1029: case 1031: case 1034: case 1036: case 1038: case 1040: case 1046: case 1047: case 1049: case 1050: case 1052: case 1054: case 1055: case 1058: case 1059:
            case 1064: case 1066: case 1067: case 1068: case 1070: case 1072: case 1073: case 1075: case 1083: case 1087: case 1089: case 1090: case 1091: case 1092: case 1097: case 1100: case 1111: case 1123: case 1126: case 1128:
            case 1133: case 1135: case 1139: case 1144: case 1145: case 1147: case 1148: case 1149: case 1150: case 1153: case 1154: case 1155: case 1156: case 1157: case 1160: case 1162: case 1163: case 1164: case 1166: case 1167:
            case 1168: case 1171: case 1172: case 1173: case 1174: case 1175: case 1178: case 1179: case 1180: case 1181: case 1182: case 1183: case 1187: case 1188: case 1189: case 1191: case 1194: case 1195: case 1196: case 1202:
            case 1209: case 1210: case 1211: case 1212: case 1213: case 1217: case 1219: case 1222: case 1228: case 1231: case 1233: case 1234: case 1244: case 1246: case 1247: case 1248: case 1251: case 1252: case 1255: case 1256:
            case 1257: case 1258: case 1259: case 1261: case 1262: case 1263: case 1266: case 1267: case 1268: case 1270: case 1271: case 1273: case 1274: case 1279: case 1280: case 1281: case 1284: case 1285: case 1286: case 1288:
            case 1291: case 1295: case 1296: case 1297: case 1298: case 1305: case 1307: case 1308: case 1309: case 1310: case 1311: case 1312: case 1313: case 1314: case 1315: case 1316: case 1319: case 1320: case 1321: case 1324:
            case 1330: case 1332: case 1334: case 1335: case 1336: case 1337: case 1338: case 1339: case 1342: case 1343: case 1344: case 1345: case 1348: case 1349: case 1350: case 1353: case 1354: case 1355: case 1356: case 1358:
            case 1359: case 1360: case 1362: case 1367: case 1372: case 1373: case 1374: case 1376: case 1377: case 1386: case 1390: case 1391: case 1395: case 1397: case 1399: case 1400: case 1401: case 1403: case 1405: case 1406:
            case 1410: case 1411: case 1412: case 1413: case 1416: case 1418: case 1421: case 1424: case 1425: case 1426: case 1427: case 1428: case 1429: case 1430: case 1431: case 1432: case 1434: case 1435: case 1437: case 1438:
            case 1439: case 1440: case 1441: case 1442: case 1443: case 1444: case 1445: case 1446: case 1449: case 1451: case 1452: case 1454: case 1455: case 1457: case 1461: case 1462: case 1463: case 1465: case 1470: case 1471:
            case 1472: case 1474: case 1478: case 1479: case 1480: case 1481: case 1482: case 1483: case 1484: case 1485: case 1490: case 1492: case 1493: case 1497: case 1498: case 1499: case 1501: case 1502: case 1503: case 1504:
            case 1505: case 1506: case 1507: case 1508: case 1512: case 1513: case 1519: case 1521: case 1522: case 1524: case 1525: case 1526: case 1528: case 1530: case 1531: case 1535: case 1537: case 1538: case 1539: case 1541:
            case 1545: case 1546: case 1547: case 1548: case 1550: case 1556: case 1557: case 1558: case 1559: case 1560: case 1561: case 1562: case 1566: case 1567: case 1568: case 1569: case 1596: case 1597: case 1598: case 1599:
            case 1600: case 1602: case 1605: case 1607: case 1610: case 1611: case 1613: case 1614: case 1616: case 1617: case 1618: case 1619: case 1620: case 1621: case 1622: case 1623: case 1625: case 1626: case 1627: case 1628:
            case 1629: case 1630: case 1631: case 1633: case 1634: case 1635: case 1640: case 1642: case 1649: case 1651: case 1652: case 1653: case 1654: case 1655: case 1656: case 1660: case 1661: case 1662: case 1663: case 1683:
            case 1684: case 1666: case 1667: case 1668: case 1678: case 1686: case 1687: case 1689: case 1690: case 1692: case 1693: case 1697: case 1698: case 1699: case 1703: case 1704: case 1705: case 1706: case 1707: case 1708:
            case 1711: case 1714: case 1720: case 1721: case 1722: case 1723: case 1724: case 1725: case 1729: case 1730: case 1731: case 1732: case 1733: case 1736: case 1737: case 1739: case 1740: case 1744: case 1745: case 1746:
            case 1748: case 1749: case 1751: case 1752: case 1753: case 1754: case 1755: case 1756: case 1762: case 1763: case 1764: case 1765: case 1766: case 1768: case 1769: case 1770: case 1772: case 1773: case 1774: case 1775:
            case 1776: case 1777: case 1778: case 1779: case 1780: case 1782: case 1787: case 1788: case 1790: case 1791: case 1793: case 1794: case 1795: case 1796: case 1798: case 1799: case 1800: case 1805: case 1801: case 1809:
            case 1810: case 1811: case 1815: case 1818: case 1819: case 1820: case 1821: case 1822: case 1823: case 1825: case 1828: case 1829: case 1830: case 1831: case 1833: case 1835: case 1837: case 1838: case 1845: case 1848:
            case 1850: case 1851: case 1852: case 1854: case 1858: case 1862: case 1863: case 1864: case 1865: case 1866: case 1867: case 1868: case 1869: case 1870: case 1873: case 1874: case 1875: case 1878: case 1879: case 1880:
            case 1882: case 1883: case 1884: case 1887: case 1888: case 1889: case 1889: case 1890: case 1891: case 1892: case 1893: case 1894: case 1895: case 1897: case 1898: case 1900: case 1902: case 1904: case 1905: case 1906:
            case 1907: case 1908: case 1909: case 1910: case 1913: case 1920: case 1921: case 1922: case 1923: case 1924: case 1926: case 1927: case 1928: case 1932: case 1934: case 1935: case 1937: case 1940: case 1943: case 1944:
            case 1945: case 1946: case 1948: case 1950: case 1951: case 1952: case 1954: case 1955: case 1958: case 1959: case 1960: case 1961: case 1967: case 1968: case 1969: case 1970: case 1971: case 1972: case 1973: case 1979:
            case 1980: case 1981: case 1982: case 1984: case 1990: case 1991: case 1999: case 2001: case 2002: case 2004: case 2006: case 2007: case 2010: case 2011: case 2012: case 2016: case 2017: case 2018: case 2021: case 2022:
            case 2023: case 2024: case 2025: case 2026: case 2027: case 2028: case 2030: case 2032: case 2034: case 2041: case 2042: case 2045: case 2046: case 2048: case 2049: case 2050: case 2051: case 2053: case 2054: case 2062:
            case 2063: case 2065: case 2066: case 2076: case 2080: case 2081: case 2083: case 2084: case 2085: case 2086: case 2087: case 2088: case 2089: case 2090: case 2091: case 2093: case 2094: case 2096: case 2097: case 2098:
            case 2099: case 2100: case 2101: case 2104: case 2106: case 2110: case 2112: case 2114: case 2122: case 2123: case 2124: case 2125: case 2126: case 2127: case 2128: case 2129: case 2130: case 2134: case 2135: case 2136:
            case 2136: case 2137: case 2139: case 2142: case 2143: case 2144: case 2146: case 2148: case 2149: case 2150: case 2151: case 2155: case 2156: case 2158: case 2161: case 2163: case 2170: case 2171: case 2172: case 2181:
            case 2184: case 2185: case 2186: case 2187: case 2188: case 2189: case 2190: case 2191: case 2192: case 2193: case 2195: case 2197: case 2198: case 2201: case 2204: case 2207: case 2208: case 2210: case 2211: case 2212:
            case 2213: case 2214: case 2215: case 2219: case 2220: case 2221: case 2222: case 2223: case 2224: case 2225: case 2226: case 2227: case 2228: case 2229: case 2230: case 2233: case 2235: case 2236: case 2237: case 2241:
            case 2249: case 2250: case 2251: case 2253: case 2255: case 2259: case 2260: case 2261: case 2262: case 2265: case 2270: case 2271: case 2272: case 2273: case 2277: case 2282: case 2284: case 2288: case 2290: case 2291:
            case 2295: case 2298: case 2299: case 2300: case 2301: case 2308: case 2315: case 2316: case 2317: case 2328: case 2330: case 2331: case 2337: case 2339: case 2340: case 2342: case 2343: case 2344: case 2345: case 2347:
            case 2349: case 2350: case 2351: case 2355: case 2356: case 2357: case 2358: case 2361: case 2362: case 2363: case 2364: case 2365: case 2366: case 2367: case 2369: case 2374: case 2375: case 2378: case 2379: case 2381:
            case 2388: case 2389: case 2390: case 2391: case 2393: case 2395: case 2398: case 2400: case 2401: case 2404: case 2405: case 2410: case 2411: case 2420: case 2427: case 2428: case 2430: case 2434: case 2435: case 2437:
            case 2442: case 2443: case 2444: case 2445: case 2458: case 2460: case 2461: case 2464: case 2465: case 2466: case 2467: case 2468: case 2470: case 2471: case 2473: case 2474: case 2476: case 2477: case 2481: case 2482:
            case 2485: case 2487: case 2492: case 2493: case 2494: case 2496: case 2497: case 2498: case 2504: case 2505: case 2506: case 2520: case 2521: case 2522: case 2524: case 2525: case 2526: case 2546: case 2550: case 2552:
            case 2554: case 2561: case 2562: case 2569: case 2570: case 2575: case 2576: case 2577: case 2580: case 2582: case 2583: case 2584: case 2585: case 2586: case 2588: case 2593: case 2595: case 2596: case 2597: case 2605:
            case 2606: case 2609: case 2610: case 2611: case 2612: case 2613: case 2620: case 2621: case 2622: case 2623: case 2624: case 2627: case 2628: case 2630: case 2636: case 2641: case 2646: case 2647: case 2648: case 2649:
            case 2650: case 2651: case 2653: case 2655: case 2656: case 2659: case 2660: case 2662: case 2663: case 2664: case 2665: case 2666: case 2667: case 2670: case 2671: case 2674: case 2678: case 2680: case 2685: case 2693:
            case 2696: case 2697: case 2700: case 2701: case 2702: case 2705: case 2709: case 2711: case 2712: case 2713: case 2716: case 2719: case 2722: case 2723: case 2725: case 2728: case 2729: case 2730: case 2733: case 2734:
            case 2737: case 2739: case 2746: case 2753: case 2754: case 2755: case 2757: case 2765: case 2766: case 2770: case 2771: case 2773: case 2775: case 2776: case 2783: case 2784: case 2785: case 2786: case 2787: case 2791:
            case 2794: case 2798: case 2800: case 2803: case 2806: case 2808: case 2810: case 2811: case 2813: case 2815: case 2816: case 2819: case 2823: case 2824: case 2825: case 2828: case 2829: case 2830: case 2834: case 2836:
            case 2838: case 2839: case 2841: case 2842: case 2847: case 2854: case 2855: case 2856: case 2857: case 2858: case 2859: case 2860: case 2863: case 2864: case 2872: case 2875: case 2876: case 2883: case 2884: case 2885:
            case 2886: case 2887: case 2888: case 2889: case 2890: case 2898: case 2900: case 2907: case 2909: case 2913: case 2915: case 2919: case 2920: case 2924: case 2937: case 2943: case 2949: case 2951: case 2953: case 2959:
            case 2969: case 2971: case 2976: case 2977: case 2978: case 2979: case 2981: case 2983: case 2986: case 2987: case 2994: case 2995: case 2997: case 2999: case 3000: case 3001: case 3006: case 3007: case 3009: case 3016:
            case 3019: case 3026: case 3031: case 3034: case 3036: case 3037: case 3041: case 3051: case 3053: case 3062: case 3063: case 3066: case 3067: case 3068: case 3069: case 3079: case 3080: case 3093: case 3095: case 3096:
            case 3098: case 3100: case 3103: case 3106: case 3108: case 3110: case 3111: case 3112: case 3118: case 3120: case 3124: case 3125: case 3128: case 3129: case 3136: case 3137: case 3139: case 3140: case 3143: case 3145:
            case 3146: case 3149: case 3150: case 3151: case 3152:
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
            case 1387: case 1389: case 1469: case 1509: case 1515: case 1570: case 1571: case 1572: case 1573: case 1574:
            case 1575: case 1576: case 1577: case 1578: case 1579: case 1580: case 1581: case 1582: case 1583: case 1584:
            case 1585: case 1586: case 1587: case 1588: case 1589: case 1590: case 1595: case 1643: case 1644: case 1647:
            case 1648: case 1669: case 1671: case 1672: case 1673: case 1677: case 1680: case 1681: case 1682: case 1759:
            case 1760: case 1761: case 1784: case 1785: case 1786: case 1949: case 1978: case 1992: case 2008: case 2009:
            case 2033: case 2036: case 2037: case 2040: case 2047: case 2075: case 2103: case 2108: case 2113: case 2140:
            case 2141: case 2159: case 2160: case 2166: case 2167: case 2168: case 2169: case 2173: case 2174: case 2175:
            case 2176: case 2177: case 2178: case 2179: case 2180: case 2202: case 2203: case 2293: case 2323: case 2324:
            case 2326: case 2327: case 2332: case 2370: case 2371: case 2382: case 2383: case 2418: case 2431: case 2436:
            case 2439: case 2440: case 2456: case 2459: case 2475: case 2545: case 2589: case 2600: case 2602: case 2603:
            case 2604: case 2608: case 2637: case 2652: case 2658: case 2742: case 2743: case 2744: case 2745: case 2747:
            case 2748: case 2749: case 2750: case 2751: case 2752: case 2758: case 2759: case 2760: case 2761: case 2762:
            case 2832: case 2850: case 2866: case 2880: case 2925: case 2926: case 2927: case 2928: case 2929: case 2930:
            case 2931: case 2932: case 2933: case 2934: case 2935: case 2936: case 2938: case 2939: case 2940: case 2941:
            case 2942: case 2944: case 2945: case 2946: case 2948: case 2955: case 2973: case 2980: case 3013: case 3027:
            case 3054: case 3081: case 3102: case 3115: case 3117: case 3119:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
            break
            case 9: case 650: case 651: case 727: case 1591: case 1592: case 1593: case 1594: case 1645: case 1646:
            case 2095: case 2164: case 2165: case 2380: case 2626:
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
            case 31: case 489: case 356: case 357: case 459: case 652: case 653: case 654: case 658: case 2183:
            case 3142:
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
            case 138: case 139: case 175: case 400: case 453: case 516: case 1436: case 1709: case 2384: case 2654:
            case 3014:
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
            case 328: case 572: case 707: case 708: case 709: case 813: case 814: case 815: case 2107:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.targetVariant=distTargetCombatant(0,this,this.targetTile)>0

                this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
            break
            case 358: case 986: case 2657:
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
            case 674: case 2673:
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
                tiles=this.battle.tileManager.getArea(this.userCombatant.tilePosition,1)
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
            case 1536:
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                if(this.userManager.hand.cards.length!=7){
                    this.remove=true
                }
            break
            case 1674:
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                tiles=this.battle.tileManager.getArea(this.targetCombatant.tilePosition,1)
                if(tiles.length>0){
                    this.targetTile=tiles[floor(random(0,tiles.length))]
                    this.direction=atan2(this.targetTile.position.x-this.targetCombatant.position.x,this.targetTile.position.y-this.targetCombatant.position.y)
                    this.distance=sqrt((this.targetTile.position.x-this.targetCombatant.position.x)**2+(this.targetTile.position.y-this.targetCombatant.position.y)**2)
                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.targetCombatant.relativePosition.x,this.targetTile.relativePosition.y-this.targetCombatant.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.targetCombatant.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.targetCombatant.relativePosition.y)**2)
                    this.targetDistance=distTargetCombatant(0,this.targetCombatant,this.targetTile)
                }
            break
            case 1688:
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                let maxLength=0
                for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                    if(this.battle.tileManager.tiles[a].occupied==0){
                        maxLength=max(maxLength,dist(this.targetCombatant.position.x,this.targetCombatant.position.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y))
                    }
                }
                tiles=[]
                for(let a=0,la=this.battle.tileManager.tiles.length;a<la;a++){
                    if(this.battle.tileManager.tiles[a].occupied==0){
                        if(dist(this.targetCombatant.position.x,this.targetCombatant.position.y,this.battle.tileManager.tiles[a].position.x,this.battle.tileManager.tiles[a].position.y)==maxLength){
                            tiles.push(a)
                        }
                    }
                }
                if(tiles.length>0){
                    this.targetTile=this.battle.tileManager.tiles[tiles[floor(random(0,tiles.length))]]
                    this.direction=atan2(this.targetTile.position.x-this.targetCombatant.position.x,this.targetTile.position.y-this.targetCombatant.position.y)
                    this.distance=sqrt((this.targetTile.position.x-this.targetCombatant.position.x)**2+(this.targetTile.position.y-this.targetCombatant.position.y)**2)
                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.targetCombatant.relativePosition.x,this.targetTile.relativePosition.y-this.targetCombatant.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.targetCombatant.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.targetCombatant.relativePosition.y)**2)
                    this.targetDistance=distTargetCombatant(0,this.targetCombatant,this.targetTile)
                }
            break
            case 1911: case 1912:
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
                    let offset=transformDirection(0,this.relativeDirection[0]+(60+a*60)*((this.type-1911)*2-1))
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
            case 1962:
                this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                this.direction2=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                this.distance2=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                this.relativeDirection2=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                this.relativeDistance2=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                this.targetDistance2=this.targetDistance

                this.targetCombatant=this.battle.combatantManager.getArea(this.userCombatant.team,this.targetTile.tilePosition,1)
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
                this.disProcedure=0
            break
            case 2248: case 2264:
                this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]

                this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                this.procedure[0]=0
            break
            case 2296: case 2297:
                if(this.targetClass==1){
                    this.targetTile=this.battle.tileManager.tiles[this.target[0]]

                    this.direction=atan2(this.targetTile.position.x-this.position.x,this.targetTile.position.y-this.position.y)
                    this.distance=sqrt((this.targetTile.position.x-this.position.x)**2+(this.targetTile.position.y-this.position.y)**2)

                    this.relativeDirection=atan2(this.targetTile.relativePosition.x-this.relativePosition.x,this.targetTile.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetTile.relativePosition.x-this.relativePosition.x)**2+(this.targetTile.relativePosition.y-this.relativePosition.y)**2)
                }else if(this.targetClass==2){
                    this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                    this.targetVariant=distTargetCombatant(0,this,this.targetCombatant)>0
                    if(!this.targetVariant){
                        this.targetDistance=distTargetDiagonal(0,this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y)
                    }

                    this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                    this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                    this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                }
            break
            case 2781:
                let available=this.battle.combatantManager.getArea(this.userCombatant.team,this.userCombatant.tilePosition,1)
                if(available.length==0){
                    this.remove=true
                }else{
                    this.targetCombatant=available[floor(random(0,available.length))]

                    this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                    this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)

                    this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                    this.targetDistance=distTargetCombatant(0,this,this.targetCombatant)
                    this.userCombatant.goal.anim.direction=directionCombatant(this.targetCombatant,this.userCombatant)
                }
            break
            case 2837:
                if(this.userCombatant.elemental){
                    this.procedure[0]=1
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
                }else{
                    this.procedure[0]=0
                    this.targetCombatant=this.battle.combatantManager.combatants[this.target[0]]
                    this.direction=atan2(this.targetCombatant.position.x-this.position.x,this.targetCombatant.position.y-this.position.y)
                    this.distance=sqrt((this.targetCombatant.position.x-this.position.x)**2+(this.targetCombatant.position.y-this.position.y)**2)
                    this.relativeDirection=atan2(this.targetCombatant.relativePosition.x-this.relativePosition.x,this.targetCombatant.relativePosition.y-this.relativePosition.y)
                    this.relativeDistance=sqrt((this.targetCombatant.relativePosition.x-this.relativePosition.x)**2+(this.targetCombatant.relativePosition.y-this.relativePosition.y)**2)
                }
            break

        }
    }
    set(){
        if(this.replayData.replay==1){
            this.userCombatant=this.battle.combatantManager.combatants[this.user]
            if(this.replayData.direction!=-999){
                this.userCombatant.goal.anim.direction=this.replayData.direction
            }
            this.base()
        }
    }
    selfCall(type){
        switch(type){
            case 0:
                switch(this.type){
                    case 12: case 719: case 1213: case 1733: case 1944: case 2112: case 2241:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                    break
                    case 35:
                        if(this.targetCombatant.life==this.targetCombatant.base.life){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 46: case 661:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Bleed')>0?2:1),this.user)
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
                    case 140: case 2379:
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
                    case 193: case 3009:
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
                        if(this.userCombatant.energyParity(this.energy)==1){
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
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.life<=this.userCombatant.base.life*0.5?2:1),this.user)
                    break
                    case 376:
                        this.targetCombatant.takeDamage(floor(this.userCombatant.life/max(1,this.effect[1]))*this.effect[0],this.user)
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
                        let roll=this.userCombatant.luckCheck()?2:this.userCombatant.luckCheckFail?1:floor(random(1,3))
                        this.targetCombatant.takeDamage(this.effect[0]*roll,this.user)
                        if(roll==1){
                            this.userCombatant.lowRoll()
                        }else{
                            this.userCombatant.highRoll()
                        }
                    break
                    case 897: case 1007: case 1153:
                        let total=0
                        let luckCheck=this.userCombatant.luckCheck()
                        let luckCheckFail=false
                        if(!luckCheck){
                            luckCheckFail=this.userCombatant.luckCheckFail()
                        }
                        for(let a=0,la=this.effect[0];a<la;a++){
                            let roll=luckCheck?6:luckCheckFail?1:floor(random(1,7))
                            this.battle.particleManager.createNumber(41,this.userCombatant.position.x,this.userCombatant.position.y,roll)
                            total+=roll
                        }
                        if(total<this.effect[0]*3.5){
                            this.userCombatant.lowRoll()
                        }else{
                            this.userCombatant.highRoll()
                        }
                        this.targetCombatant.takeDamage(total,this.user)
                    break
                    case 900:
                        let prelife2=this.targetCombatant.life
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<prelife2){
                            let money=prelife2-this.targetCombatant.life
                            this.battle.overlayManager.overlays[25][this.player].active=true
                            this.battle.overlayManager.overlays[25][this.player].activate([0,[{type:0,value:[round(prelife2-this.targetCombatant.life)*(this.amplify?2:1)]}]])
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
                        }else if(!this.userCombatant.luckCheckFail()){
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
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,2))==0){
                                this.userCombatant.lowRoll()
                                this.battle.addEnergy(this.effect[1],this.player)
                            }else{
                                this.userCombatant.highRoll()
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                            }
                        }
                    break
                    case 1027:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.hand.totalCost(),this.user)
                    break
                    case 1049:
                        this.targetCombatant.statusEffect('Bruise',this.effect[0])
                    break
                    case 1058:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userManager.deck.classNumber([6]),this.user)
                    break
                    case 1083:
                        let roll2=this.userCombatant.luckCheck()?this.effect[0]:this.userCombatant.luckCheckFail()?1:floor(random(1,this.effect[0]+1))
                        this.battle.particleManager.createNumber(41,this.userCombatant.position.x,this.userCombatant.position.y,roll2)
                        if(roll2<this.effect[0]/2+1/2){
                            this.userCombatant.lowRoll()
                        }else{
                            this.userCombatant.highRoll()
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
                        if(this.userCombatant.energyParity(this.energy)==0&&this.energy>0){
                            this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                            this.battle.dropDrawShuffleEffect(this.player,findName('Snip',types.card),0,0,0,round(this.energy/2))
                        }
                    break
                    case 1307: case 1501:
                        this.targetCombatant.takeDamage(this.effect[1],this.user)
                    break
                    case 1311:
                        let total4=this.effect[0]
                        let left=4
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].attack!=1311&&this.userManager.hand.cards[a].effect[0]>0&&this.userManager.hand.cards[a].class==1&&this.userManager.hand.cards[a].effect.length>0&&!this.userManager.hand.cards[a].spec.includes(12)){
                                total4+=this.userManager.hand.cards[a].effect[0]
                                left--
                                if(left<=0){
                                    a=la
                                }
                            }
                        }
                        this.targetCombatant.takeDamage(total4,this.user)
                    break
                    case 1330:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.userCombatant.addBlock(this.effect[1])
                            this.userCombatant.highRoll()
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,4))==0){
                                this.userCombatant.takeDamage(this.effect[3],-1)
                                this.userCombatant.lowRoll()
                            }else if(floor(random(0,3))==0){
                                this.battle.loseCurrency(this.effect[2],this.player)
                                this.userCombatant.lowRoll()
                            }else if(floor(random(0,2))==0){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                this.userCombatant.highRoll()
                            }else{
                                this.userCombatant.addBlock(this.effect[1])
                                this.userCombatant.highRoll()
                            }
                        }
                    break
                    case 1355:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Freeze')>0?2:1),this.user)
                    break
                    case 1356:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Burn')>0?2:1),this.user)
                    break
                    case 1377:
                        this.targetCombatant.takeDamage(this.targetCombatant.life>this.effect[0]&&floor(random(0,2))==0?this.effect[1]:this.effect[0],this.user)
                    break
                    case 1397:
                        if(this.userCombatant.energyParity(this.energy)==0&&this.energy>0){
                            this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                            this.userCombatant.heal(this.effect[1]*this.energy)
                            this.battle.dropDrawShuffleEffect(this.player,findName('Snip',types.card),0,0,0,floor(random(1,this.energy)))
                        }
                    break
                    case 1424:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(6,this.user)
                            this.userCombatant.addBlock(6)
                        }else if(this.userCombatant.luckCheckFail()){
                            this.targetCombatant.takeDamage(1,this.user)
                            this.userCombatant.addBlock(1)
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
                    case 1478:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy+this.effect[1],this.user)
                    break
                    case 1493:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.life==this.targetCombatant.base.life?2:1),this.user)
                    break
                    case 1502:
                        let top=0
                        let bottom=100
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].cost>0){
                                top=max(top,this.userManager.hand.cards[a].cost)
                                bottom=min(bottom,this.userManager.hand.cards[a].cost)
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*(top-bottom),this.user)
                    break
                    case 1508:
                        let total6=0
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].attack!=1508&&this.userManager.hand.cards[a].effect[0]>0&&this.userManager.hand.cards[a].effect.length>0&&!this.userManager.hand.cards[a].spec.includes(12)){
                                total6+=this.userManager.hand.cards[a].effect[0]
                            }
                        }
                        this.targetCombatant.takeDamage(total6,this.user)
                    break
                    case 1513:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,10))!=0){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1521:
                        let total7=0
                        let left3=4
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].attack!=1521&&this.userManager.hand.cards[a].effect[0]>0&&this.userManager.hand.cards[a].class==1&&this.userManager.hand.cards[a].effect.length>0&&!this.userManager.hand.cards[a].spec.includes(12)){
                                total7+=min(this.effect[0],this.userManager.hand.cards[a].effect[0])
                                left3--
                                if(left3<=0){
                                    a=la
                                }
                            }
                        }
                        this.targetCombatant.takeDamage(total7,this.user)
                    break
                    case 1522:
                        if(this.relPos[0]==this.relPos[1]){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.statusEffect('Shock',this.effect[1])
                            this.battle.loseCurrency(this.effect[2],this.player)
                        }
                    break
                    case 1531:
                        this.targetCombatant.takeDamage(this.effect[0]*this.targetCombatant.attack.length,this.user)
                    break
                    case 1535:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(6,this.user)
                            this.userCombatant.addBlock(6)
                        }else if(this.userCombatant.luckCheckFail()){
                            this.targetCombatant.takeDamage(1,this.user)
                            this.userCombatant.addBlock(1)
                        }else{
                            let rolls=[]
                            for(let a=0,la=min(this.effect[0],100);a<la;a++){
                                rolls.push(floor(random(1,7)))
                            }
                            rolls.sort()
                            if(rolls.length>=2){
                                this.targetCombatant.takeDamage(rolls[0],this.user)
                                this.userCombatant.addBlock(rolls[1])
                            }
                        }
                    break
                    case 1556:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.battle.counter.turnPlayed[this.player]<=1?3:1),this.user)
                    break
                    case 1557:
                        let top2=0
                        let bottom2=1000
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].effect.length>0&&!this.userManager.hand.cards[a].spec.includes(12)){
                                top2=max(top2,this.userManager.hand.cards[a].effect[0])
                                bottom2=min(bottom2,this.userManager.hand.cards[a].effect[0])
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*(top2-bottom2),this.user)
                    break
                    case 1558:
                        this.targetCombatant.takeDamage(this.effect[0]+(this.targetCombatant.getStatus('Shock')>0?this.effect[1]:0),this.user)
                    break
                    case 1661:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.block>0?1/max(1,this.effect[1]):1),this.user)
                    break
                    case 1686:
                        this.targetCombatant.takeDamage(this.effect[0]*this.battle.counter.turnPlayed[0],this.user)
                    break
                    case 1687:
                        if(this.relPos[0]%2==1){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else{
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 1690:
                        this.targetCombatant.statusEffect('Shock',this.effect[0]*this.userManager.hand.cards.length)
                        this.userManager.allEffect(2,1)
                    break
                    case 1725:
                        if(this.energy%2==1){
                            this.userCombatant.addBlock(this.effect[1]*this.energy)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                        }
                    break
                    case 1730:
                        let total8=0
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].construct&&this.battle.combatantManager.combatants[a].life>0){
                                total8++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*total8,this.user,1)
                    break
                    case 1731:
                        let total9=0
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].construct&&this.battle.combatantManager.combatants[a].life>0){
                                total9++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*(total9>=2?2:1),this.user,1)
                    break
                    case 1732:
                        if(this.energy==2){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }else{
                            this.userCombatant.heal(this.effect[1])
                        }
                    break
                    case 1749:
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].attack!=1749&&this.userManager.hand.cards[a].effect[0]>0&&this.userManager.hand.cards[a].class==1&&this.userManager.hand.cards[a].effect.length>0&&!this.userManager.hand.cards[a].spec.includes(12)){
                                this.targetCombatant.takeDamage(this.userManager.hand.cards[a].effect[0],this.user)
                                if(prime(this.userManager.hand.cards[a].effect[0])){
                                    this.targetCombatant.statusEffect('Lock',this.effect[0])
                                }
                                a=la
                            }
                        }
                    break
                    case 1769:
                        if(this.targetCombatant.getStatus('Dodge')>0){
                            this.targetCombatant.status.main[findList('Dodge',this.targetCombatant.status.name)]=0
                            this.targetCombatant.takeDamage(this.effect[0]*3,this.user)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 1774:
                        if(this.targetCombatant.getStatus('Take Damage')>0){
                            this.targetCombatant.takeDamage(this.targetCombatant.getStatus('Take Damage'),this.user)
                            this.targetCombatant.status.main[findList('Take Damage',this.targetCombatant.status.name)]=0
                        }
                        if(this.targetCombatant.getStatus('Take Damage Next Turn')>0){
                            this.targetCombatant.takeDamage(this.targetCombatant.getStatus('Take Damage Next Turn'),this.user)
                            this.targetCombatant.status.main[findList('Take Damage Next Turn',this.targetCombatant.status.name)]=0
                        }
                        if(this.targetCombatant.getStatus('Take Damage Next Turn Next Turn')>0){
                            this.targetCombatant.takeDamage(this.targetCombatant.getStatus('Take Damage Next Turn Next Turn'),this.user)
                            this.targetCombatant.status.main[findList('Take Damage Next Turn Next Turn',this.targetCombatant.status.name)]=0
                        }
                        this.targetCombatant.statusEffect('Take Damage Next Turn',this.effect[0])
                    break
                    case 1779:
                        if(this.energy>=2){
                            this.targetCombatant.takeDamage(this.effect[0]*this.energy+this.effect[1],this.user)
                        }
                    break
                    case 1791:
                        if(this.targetCombatant.life!=this.targetCombatant.base.life){
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                        }
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 1794: case 2612:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.getStatus('Cannot Move')>0?2:1),this.user)
                    break
                    case 1809:
                        this.targetCombatant.takeDamage(this.userManager.deck.basicNumber()+this.effect[0],this.user)
                    break
                    case 1810:
                        if(this.userManager.hand.cards.length>0){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userManager.hand.randomEffect(0)
                            }
                        }
                    break
                    case 1835:
                        if(this.targetCombatant.block>0){
                            this.userCombatant.statusEffect('Counter All',this.effect[1])
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 1875:
                        this.targetCombatant.takeDamage(this.effect[0]+this.userCombatant.lastDeal,this.user)
                    break
                    case 1883:
                        let save=this.targetCombatant.life
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life==save){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 1887:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.battle.turn.total==1?3:this.battle.turn.total==2?2:1),this.user)
                    break
                    case 1898:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.hand.specNumber(35),this.user)
                    break
                    case 1910:
                        let roll1910=floor(random(1,7))
                        let luckCheck1910=this.userCombatant.luckCheck()
                        let luckCheckFail1910=false
                        if(!luckCheck1910){
                            luckCheckFail1910=this.userCombatant.luckCheckFail()
                        }
                        this.targetCombatant.takeDamage(this.effect[0]+luckCheck1910?6:luckCheckFail1910?1:roll1910,this.user)
                        if(luckCheck1910||roll1910<3.5&&!luckCheckFail1910){
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1920:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userCombatant.takeDamage(this.effect[0],this.user)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 1926:
                        let roll1926=floor(random(1,21))
                        let luckCheck1926=this.userCombatant.luckCheck()
                        let luckCheckFail1926=false
                        if(!luckCheck1926){
                            luckCheckFail1926=this.userCombatant.luckCheckFail()
                        }
                        this.targetCombatant.takeDamage(this.effect[0]+luckCheck1926?20:luckCheckFail1910?1:roll1926,this.user)
                        if(luckCheck1926||roll1926<3.5&&!luckCheckFail1926){
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                        if(luckCheck1926?20:luckCheckFail1926?1:roll1926==20){
                            this.targetCombatant.statusEffect('Stun',this.effect[0])
                        }
                    break
                    case 1959: case 1970:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userCombatant.diceRoll(1,6),this.user)
                    break
                    case 1960:
                        this.battle.turnManager.loadEnemyAttackRepeatBack(this.targetCombatant.id)
                        this.targetCombatant.gainMaxHP(this.effect[0])
                    break
                    case 1973:
                        let roll1973=this.userCombatant.diceRoll(1,6)
                        this.targetCombatant.takeDamage(this.effect[0]*roll1973,this.user)
                        this.userCombatant.addBlock(this.effect[1]*roll1973)
                    break
                    case 1979:
                        let roll1979=this.userCombatant.diceRoll(1,20)
                        this.targetCombatant.takeDamage(this.effect[0]*roll1979,this.user)
                        if(roll1979==20){
                            this.targetCombatant.statusEffect('Jinx',this.effect[1])
                        }
                    break
                    case 1980:
                        let roll1980=this.userCombatant.diceRoll(1,20)
                        this.targetCombatant.takeDamage(this.effect[0]*roll1980,this.user)
                        if(roll1980==19||roll1980==20){
                            this.targetCombatant.statusEffect('Jinx',this.effect[1])
                        }
                    break
                    case 1981:
                        let roll1981=this.userCombatant.diceRoll(1,20)
                        this.targetCombatant.takeDamage(this.effect[0]*roll1981,this.user)
                        if(roll1981==18||roll1981==19||roll1981==20){
                            this.targetCombatant.statusEffect('Jinx',this.effect[1])
                        }
                    break
                    case 1990:
                        this.targetCombatant.takeDamage(this.effect[0]*floor(this.battle.currency.money[this.player]/max(1,this.effect[1])),this.user)
                    break
                    case 2025:
                        let roll2025=this.userCombatant.diceRoll(1,20)
                        this.targetCombatant.takeDamage(this.effect[0]*roll2025,this.user)
                        if(roll2025==20){
                            this.targetCombatant.statusEffect('Free Card',this.effect[1])
                        }
                    break
                    case 2026:
                        let roll2026=this.userCombatant.diceRoll(1,20)
                        this.targetCombatant.takeDamage(this.effect[0]*roll2026,this.user)
                        if(roll2026==19||roll2026==20){
                            this.targetCombatant.statusEffect('Free Card',this.effect[1])
                        }
                    break
                    case 2027:
                        let roll2027=this.userCombatant.diceRoll(1,20)
                        this.targetCombatant.takeDamage(this.effect[0]*roll2027,this.user)
                        if(roll2027==18||roll2027==19||roll2027==20){
                            this.targetCombatant.statusEffect('Free Card',this.effect[1])
                        }
                    break
                    case 2032:
                        let roll2032=this.userCombatant.diceRoll(1,6)
                        this.targetCombatant.takeDamage(this.effect[0]*roll2032,this.user)
                        this.battle.addCurrency(this.effect[1]*roll2032,this.player)
                    break
                    case 2041:
                        let index2041=this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)
                        if(index2041>=0){
                            this.targetCombatant.takeDamage(this.effect[0]*(this.battle.tileManager.tiles[index2041].type.length>0?2:1),this.user)
                        }
                    break
                    case 2046:
                        let roll2046=this.userCombatant.diceRoll(1,20)
                        this.targetCombatant.takeDamage(this.effect[0]*roll2046,this.user)
                        if(roll2046==1){
                            this.userCombatant.life-=this.effect[1]
                        }
                    break
                    case 2089:
                        this.targetCombatant.statusEffect('Shock',this.effect[0])
                        this.userManager.allGroupClaw(this.effect[1])
                    break
                    case 2093:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Shock')>0?2:1),this.user)
                    break
                    case 2114:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.battle.turn.total>=2?2:1),this.user)
                    break
                    case 2134:
                        if(this.userCombatant.life<=this.userCombatant.base.life*0.5){
                            this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 2149:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.turnManager.loadEnemyAttackRepeatBack(this.targetCombatant.id)
                        }
                        this.targetCombatant.life-=this.effect[1]
                    break
                    case 2150:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Jinx')>0?3:1),this.user)
                    break
                    case 2156:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.battle.turn.total==0?3:1),this.user)
                    break
                    case 2170:
                        if(this.targetCombatant.getStatus('Weak')>0){
                            this.userCombatant.statusEffect('Single Damage Up',this.effect[1])
                        }
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                    break
                    case 2181:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Weak')>0?2:1),this.user)
                    break
                    case 2204:
                        if(this.battle.turn.total%2==1){
                            this.userCombatant.addBlock(this.effect[1]*this.energy)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                        }
                    break
                    case 2212:
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].name=='Shiv'||this.userManager.hand.cards[a].name=='Broken\nShiv'||this.userManager.hand.cards[a].name=='Deluxe\nShiv'){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                a=la
                            }
                        }
                    break
                    case 2219:
                        this.targetCombatant.takeDamage(this.userCombatant.energyParity(this.energy)==1?this.effect[0]+this.effect[1]:this.effect[0],this.user)
                    break
                    case 2230:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.energy==5?3:1),this.user)
                    break
                    case 2233:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userManager.hand.classLimit(1,1)?2:1),this.user)
                    break
                    case 2270:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.totalUniqueStatus(2)>=2?2:1),this.user)
                    break
                    case 2315:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.minion?2:1),this.user)
                    break
                    case 2342:
                        this.targetCombatant.takeDamage(this.userCombatant.cable(this.targetCombatant,0)?this.effect[0]+this.effect[1]:this.effect[0],this.user)
                    break
                    case 2343:
                        this.targetCombatant.takeDamage(this.userCombatant.cable(this.targetCombatant,2)?this.effect[0]+this.effect[1]:this.effect[0],this.user)
                    break
                    case 2344:
                        this.targetCombatant.takeDamage(this.userCombatant.cable(this.targetCombatant,4)?this.effect[0]+this.effect[1]:this.effect[0],this.user)
                    break
                    case 2355:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.relPos[1]==0?2:1),this.user)
                    break
                    case 2395:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.getStatus('Shock')>0?2:1),this.user)
                    break
                    case 2400:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.block>0?2:1),this.user)
                    break
                    case 2401:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.relPos[1]>=7?3:1),this.user)
                    break
                    case 2427:
                        let works2427=false
                        if(this.targetCombatant.life>this.userCombatant.life){
                            works2427=true
                        }
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(works2427){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 2442:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.battle.getEnergyBase(this.player)-this.energy),this.user)
                    break
                    case 2468:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Freeze')>0?2:1&&this.targetCombatant.getStatus('Burn')>0?2:1),this.user)
                    break
                    case 2474:
                        this.targetCombatant.takeDamage(this.userCombatant.armed?this.effect[0]+this.effect[1]:this.effect[0],this.user)
                    break
                    case 2477:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.edition>0?2:1),this.user)
                    break
                    case 2485:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userManager.deck.cards.length<=20?2:1),this.user)
                    break
                    case 2497:
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].attack!=2497&&this.userManager.hand.cards[a].effect[0]>0&&this.userManager.hand.cards[a].class==1&&this.userManager.hand.cards[a].effect.length>0&&!this.userManager.hand.cards[a].spec.includes(12)){
                                this.targetCombatant.takeDamage(this.userManager.hand.cards[a].effect[0],this.user)
                                if(prime(this.userManager.hand.cards[a].effect[0])){
                                    this.userCombatant.statusEffect('Burn',this.effect[0])
                                }
                                a=la
                            }
                        }
                    break
                    case 2521:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.userCombatant.addBlock(this.effect[1])
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,4))==0){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                            }else if(floor(random(0,3))==0){
                                this.userCombatant.addBlock(this.effect[1])
                            }
                        }
                    break
                    case 2522:
                        let works2522=false
                        if(this.targetCombatant.life>this.userCombatant.life){
                            works2522=true
                        }
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(works2522){
                            this.userCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 2576:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.life<this.userCombatant.life?2:1),this.user)
                    break
                    case 2583:
                        this.userManager.hand.playedSpecific[1]++
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userManager.hand.playedSpecific[1]%3==0?2:1),this.user)
                    break
                    case 2585:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.life>this.userCombatant.life?2:1),this.user)
                    break
                    case 2588:
                        this.targetCombatant.takeDamage(ceil(this.userCombatant.block/2),this.user)
                        this.userCombatant.statusEffect('Block Next Turn',ceil(this.userCombatant.block/2))
                        this.userCombatant.block=0
                    break
                    case 2613:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Cannot Move')>0?2:1),this.user)
                    break
                    case 2636:
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].spec.includes(53)){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                a=la
                            }
                        }
                    break
                    case 2650:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.getStatus('Bleed')>0?2:1),this.user)
                    break
                    case 2656:
                        this.targetCombatant.takeDamage(this.userCombatant.armed?this.effect[0]:this.effect[0]+this.effect[1],this.user)
                    break
                    case 2666:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2671:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.drawn>=2?2:1),this.user)
                    break
                    case 2685: case 2701:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userCombatant.getStatus('Knowledge'),this.user)
                    break
                    case 2722:
                        this.targetCombatant.takeDamage((this.effect[0]+this.effect[1]*this.userCombatant.getStatus('Knowledge'))*(this.userCombatant.getStatus('Knowledge')>=6?2:1),this.user)
                    break
                    case 2725:
                        this.userManager.draw(this.effect[1])
                        this.targetCombatant.takeDamage(this.userManager.hand.cards.length>0&&this.userManager.hand.cards[this.userManager.hand.cards.length-1].class==1?this.effect[0]+this.effect[2]:this.effect[0],this.user)
                    break
                    case 2730:
                        this.targetCombatant.block=0
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userCombatant.getStatus('Knowledge'),this.user)
                    break
                    case 2784:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.battle.counter.turnPlayed[0]>=this.effect[1]?2:1),this.user)
                    break
                    case 2839:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user,this.energy>=4?2:9)
                    break
                    case 2863:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.battle.itemManager.total[this.player]==this.battle.itemManager.items[this.player].length-1?2:1),this.user)
                    break
                    case 2864:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.battle.itemManager.total[this.player]==0?2:1),this.user)
                    break
                    case 2889:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.barrier>0?2:1),this.user)
                    break
                    case 2907:
                        let result2907=this.userManager.drawReturn(this.effect[1])
                        this.targetCombatant.takeDamage(result2907.length>0&&result2907[0].class==1?this.effect[0]+this.effect[2]:this.effect[0],this.user)
                    break
                    case 2915:
                        let result2915=this.userManager.drawReturn(this.effect[0])
                        let total2915=0
                        for(let a=0,la=result2915.length;a<la;a++){
                            if(result2915[a].class==1){
                                total2915++
                            }
                        }
                        if(total2915>0){
                            this.targetCombatant.takeDamage(total2915*this.effect[1],this.user)
                        }
                    break
                    case 2919:
                        this.targetCombatant.takeDamage(this.userManager.deck.uniqueNumber(),this.user)
                    break
                    case 2976:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userCombatant.barrier,this.user)
                    break
                    case 2987:
                        if(this.userCombatant.barrier>0){
                            this.targetCombatant.block=0
                        }
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 2999:
                        this.targetCombatant.takeDamage(this.targetCombatant.base.life%4==0?this.effect[0]+this.effect[1]:this.effect[0],this.user)
                    break
                    case 3066:
                        let result3066=this.userManager.drawReturn(this.effect[1])
                        this.targetCombatant.takeDamage(result3066.length>0&&result3066[0].class==1?this.effect[0]-this.effect[2]:this.effect[0],this.user)
                    break
                    case 3068:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.drawn>=5?2:1),this.user)
                    break
                    case 3079:
                        if(this.userCombatant.block>0||this.userCombatant.barrier>0){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                    break
                    case 3095:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.battle.encounter.class==2?3:this.battle.encounter.class==1?2:1),this.user)
                    break
                    case 3110:
                        let active3110=false
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].name=='Pristine'){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                active3110=true
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*(active3110?2:1),this.user)
                    break
                    case 3146:
                        this.targetCombatant.takeDamage(this.userCombatant.lastDeal,this.user)
                        this.userCombatant.addBlock(this.userCombatant.lastBlock)
                    break
                    default:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    //mark 1p
                }
                switch(this.type){
                    case -47:
                        this.userCombatant.takeDamage(this.effect[1],this.user)
                    break
                    case 7:
                        if(this.targetCombatant.life<=0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 34: case 2471: case 2665:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                    break
                    case 42: case 1354: case 1561: case 1770: case 1794: case 2128:
                        this.userManager.draw(this.effect[1])
                    break
                    case 53:
                        this.userCombatant.statusEffect('Dodge',this.effect[1])
                    break
                    case 90:
                        this.userCombatant.statusEffect('Single Damage Up',this.effect[1])
                    break
                    case 94:
                        this.userManager.hand.exhaust(this.effect[1])
                    break
                    case 103:
                        this.userCombatant.statusEffect('Temporary Draw',-this.effect[1])
                    break
                    case 105:
                        if(this.targetCombatant.life<=0){
                            this.battle.loseEnergy(1,this.player)
                        }
                    break
                    case 106:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
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
                        this.battle.dropDrawShuffle(this.player,findName('Anger',types.card),this.level,this.color,this.edition)
                    break
                    case 123:
                        this.battle.drop(this.player,findName('Slow\nBleed',types.card),this.level,game.playerNumber+1)
                    break
                    case 124:
                        this.userManager.randomEffect(2,13,[])
                    break
                    case 125:
                        this.userCombatant.statusEffect('Single Damage Up',-this.effect[1])
                    break
                    case 126: case 2248:
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 137:
                        this.userCombatant.statusEffect('Strength Next Turn',this.effect[1])
                    break
                    case 155:
                        this.battle.addEnergy(this.effect[1],this.player)
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
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 269:
                        if(this.targetCombatant.getStatus('Vulnerable')>0){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 271:
                        this.userCombatant.statusEffect('Counter',this.effect[1])
                    break
                    case 273: case 2135: case 2378: case 2770:
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
                    case 361: case 2356:
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
                        this.userManager.hand.add(findName('Pain\nStrike',types.card),this.level,this.color,this.edition)
                    break
                    case 462:
                        this.userManager.deAbstract(1,this.effect[1],[])
                    break
                    case 496:
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 497:
                        this.userManager.allGroupClaw(this.effect[1])
                    break
                    case 507:
                        if(this.targetCombatant.life<=0){
                            this.battle.addEnergy(this.effect[1],this.player)
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
                    case 725: case 2054:
                        this.userCombatant.enterStance(0)
                    break
                    case 730:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                            this.userCombatant.enterStance(1)
                        }
                    break
                    case 731:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                            this.userCombatant.enterStance(2)
                        }
                    break
                    case 732:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                            this.userCombatant.enterStance(3)
                        }
                    break
                    case 733:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
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
                            this.battle.addEnergy(this.effect[2],this.player)
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
                        this.battle.addEnergu(floor(this.userManager.deck.cards.length/max(1,this.effect[1])),this.player)
                    break
                    case 884:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                        this.userCombatant.statusEffect('Energy Next Turn Next Turn',this.effect[1])
                    break
                    case 934:
                        if(this.targetCombatant.life<=0&&this.battle.encounter.class>=1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.relicManager.addRandomRelic(this.player)
                            }
                        }
                    break
                    case 940:
                        this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                    break
                    case 946:
                        this.battle.setEnergy(this.effect[1],this.player)
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
                            this.battle.addEnergy(this.effect[1],this.player)
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
                                let roll=this.userCombatant.luckCheck()?6:this.userCombatant.luckCheckFail()?1:floor(random(1,7))
                                if(total<3.5){
                                    this.userCombatant.lowRoll()
                                }else{
                                    this.userCombatant.highRoll()
                                }
                                this.battle.particleManager.createNumber(41,tempTargetCombatant.position.x,tempTargetCombatant.position.y,roll)
                                total+=roll
                                tempTargetCombatant.takeDamage(total,this.user)
                                tempTargetCombatant.takeDamage(this.effect[1],this.user)
                            }
                        }
                    break
                    case 1014:
                        if(abs(this.relPos[0]-this.relPos[1]/2)<=0.5){
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 1015:
                        if(abs(this.relPos[0]-this.relPos[1]/2)<=0.5){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
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
                            this.battle.dropDrawShuffle(this.player,findName('Strike',types.card),0,this.color)
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
                        this.battle.dropDrawShuffle(this.player,findName('Credit',types.card),this.level,this.color)
                    break
                    case 1089:
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[2])
                        }
                    break
                    case 1090:
                        this.userCombatant.addBlock(this.effect[2])
                    break
                    case 1091: case 1778:
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
                    case 1153: case 1970:
                        this.userCombatant.statusEffect('Cannot Move',this.effect[1])
                    break
                    case 1154:
                        this.battle.dropDrawShuffle(this.player,findName('Diamond',types.card),0,0)
                    break
                    case 1155:
                        this.userManager.addRandomCharacter(2,game.playerNumber+2,0,3)
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
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,4))==0){
                                this.targetCombatant.statusEffect('Bleed',this.effect[1])
                            }else if(floor(random(0,3))==0){
                                this.userCombatant.addBlock(this.effect[1])
                            }else if(floor(random(0,2))==0){
                                this.userCombatant.heal(this.effect[1])
                            }else{
                                this.battle.addCurrency(this.effect[1],this.player)
                            }
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
                        if(this.targetCombatant.size<1||this.targetCombatant.name=='Daiyousei'){
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
                        if(variants.cyclicDraw){
                            this.userManager.drops=0
                        }
                    break
                    case 1228:
                        this.userManager.hand.allEffectArgs(7,[this.effect[1]])
                    break
                    case 1231:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1234:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,4))==0){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userManager.draw(this.effect[2])
                            this.userCombatant.highRoll()
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
                        this.userManager.hand.playedSpecific[0]++
                        if(this.userManager.hand.playedSpecific[0]%3==0){
                            this.battle.addCurrency(this.effect[1],this.player)
                        }
                    break
                    case 1286:
                        if(this.targetCombatant.life<=0){
                            let list1286=[this.userManager.deck.cards,this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                            for(let a=0,la=list1286.length;a<la;a++){
                                for(let b=0,lb=list1286[a].length;b<lb;b++){
                                    if(list1286[a][b].id==this.id){
                                        list1286[a][b].effect[0]+=list1286[a][b].effect[1]
                                    }
                                }
                            }
                        }
                    break
                    case 1291:
                        if(this.battlegetEnergy(this.player)>0){
                            if(!this.userCombatant.luckCheck()){
                                this.battle.setEnergy(this.userCombatant.luckCheckFail()?0:floor(random(0,this.battle.getEnergy(this.player)+1)),this.player)
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
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 1324: case 1909:
                        this.userManager.randomEffect(2,20)
                    break
                    case 1374:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1390:
                        let amount=this.userManager.hand.cards.length
                        this.userManager.allEffect(2,1)
                        this.userManager.draw(amount)
                    break
                    case 1395:
                        this.targetCombatant.statusEffect('Take Damage',this.effect[1])
                    break
                    case 1399:
                        this.targetCombatant.statusEffect(['Burn','Freeze','Shock','Weak'][this.battle.turn.total%4],this.effect[1])
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
                    case 1498:
                        this.userCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 1506:
                        this.userManager.allEffect(2,50)
                    break
                    case 1508:
                        this.userManager.allEffect(2,1)
                    break
                    case 1526:
                        this.userManager.deck.randomEffect(21)
                    break
                    case 1537:
                        this.userManager.randomEffect(2,24)
                    break
                    case 1550:
                        this.userManager.drawSetCost(this.effect[1],3)
                    break
                    case 1559:
                        this.battle.loseCurrency(this.effect[1],this.player)
                        this.userManager.draw(this.effect[2])
                    break
                    case 1569:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                            this.targetCombatant.statusEffect('Stun',this.effect[1])
                        }
                    break
                    case 1600:
                        this.battle.combatantManager.statusDupes('Stun',this.effect[1])
                    break
                    case 1605:
                        if(this.energy==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1607:
                        this.userCombatant.statusEffect('Energy Next Turn',this.battle.getEnergy(this.player))
                        this.battle.setEnergy(0,this.player)
                    break
                    case 1611:
                        this.targetCombatant.statusEffect('Take Damage',this.effect[0])
                        this.targetCombatant.statusEffect('Take Damage Next Turn',this.effect[0])
                        this.userCombatant.statusEffect('Temporary Draw',-this.effect[1])
                    break
                    case 1621:
                        this.userCombatant.statusEffect('Jinx',this.effect[1])
                    break
                    case 1625:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                    break
                    case 1634:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('3-Miracle',types.card),0,0)
                        }
                    break
                    case 1656:
                        this.userCombatant.base.life-=this.effect[1]
                        this.userManager.hand.add(findName('Pain\nStrike',types.card),this.level,this.color)
                    break
                    case 1660:
                        this.userManager.draw(this.effect[1])
                        this.userCombatant.statusEffect('No Draw',1)
                    break
                    case 1662:
                        this.targetCombatant.statusEffect('Mixed',this.effect[1])
                    break
                    case 1663:
                        this.targetCombatant.statusEffect('Silence',this.effect[1])
                    break
                    case 1666:
                        this.userManager.hand.discard(this.effect[1])
                    break
                    case 1668:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Poison\nThorn',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 1678:
                        if(this.userCombatant.stance==4){
                            this.userCombatant.enterStance(0)
                        }
                    break
                    case 1703:
                        this.userManager.draw(this.effect[1])
                        this.userManager.reserve.addShuffle(findName('Number 2',types.card),0,this.color)
                    break
                    case 1704:
                        this.userManager.draw(this.effect[1])
                        this.userManager.reserve.addShuffle(findName('Number 3',types.card),0,this.color)
                    break
                    case 1705:
                        this.userManager.draw(this.effect[1])
                        this.userManager.reserve.addShuffle(findName('Number 4',types.card),0,this.color)
                    break
                    case 1706:
                        this.userManager.draw(this.effect[1])
                        this.userManager.reserve.addShuffle(findName('Number 5',types.card),0,this.color)
                    break
                    case 1707:
                        this.userManager.draw(this.effect[1])
                        this.userManager.reserve.addShuffle(findName('Number 6',types.card),0,this.color)
                    break
                    case 1733:
                        if(this.effect[1]-this.energy>0){
                            this.targetCombatant.statusEffect('Poison',this.effect[1]-this.energy)
                        }
                    break
                    case 1737:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.userCombatant.statusEffect('Peak Next Turn',1)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1748:
                        this.userManager.hand.randomEffect(27,[this.effect[1]])
                    break
                    case 1752:
                        if(this.battle.getEnergy(this.player)>0){
                            this.userManager.hand.allEffectArgs(8,[this.battle.getEnergy(this.player)])
                            this.battle.setEnergy(0,this.player)
                        }
                    break
                    case 1754:
                        this.userManager.addRandomCharacter(2,[7,2][this.battle.turn.total%2],0,3)
                    break
                    case 1766:
                        if(this.targetCombatant.blocked<=1){
                            this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                        }
                    break
                    case 1772:
                        if(this.targetCombatant.blocked<=1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userManager.addRandomSub(2,0)
                            }
                        }
                    break
                    case 1790:
                        if(this.energy==4){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1793:
                        this.userCombatant.statusEffect('Cannot Move',this.effect[1])
                    break
                    case 1811:
                        this.userManager.draw(this.userManager.hand.allEffectArgs(10,[2]))
                    break
                    case 1825:
                        if(this.targetCombatant.blocked<=1){
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 1831:
                        if(this.targetCombatant.getStatus('Poison')==0){
                            this.targetCombatant.statusEffect('Poison',this.effect[1])
                        }
                    break
                    case 1838:
                        this.userCombatant.statusEffect('Lose Next Turn',this.effect[1])
                    break
                    case 1848:
                        this.userManager.randomEffect(2,4,[0])
                    break
                    case 1851:
                        if(this.targetCombatant.blocked<=1){
                            this.userManager.hand.duplicate(this.effect[1])
                        }
                    break
                    case 1854:
                        if(this.targetCombatant.blocked<=1){
                            this.userCombatant.statusEffect('Armor',this.effect[1])
                        }
                    break
                    case 1862:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.statusEffect('Extra Turn',1)
                        }
                    break
                    case 1865:
                        for(let a=0,la=min(min(this.battle.getEnergy(this.player),this.effect[1]),100);a<la;a++){
                            this.battle.loseEnergy(1,this.player)
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
                        }
                    break
                    case 1882:
                        this.battle.addEnergy(floor(random(1,this.effect[1]+1)),this.player)
                    break
                    case 1895:
                        this.userCombatant.heal(this.effect[1])
                        this.userCombatant.statusEffect('Take Damage',this.effect[2])
                    break
                    case 1897:
                        let hold=[this.targetCombatant.getStatus('Freeze'),this.targetCombatant.getStatus('Burn')]
                        this.targetCombatant.statusEffect('Freeze',hold[1]-hold[0])
                        this.targetCombatant.statusEffect('Burn',hold[0]-hold[1])
                    break
                    case 1904:
                        this.targetCombatant.statusEffect('Damage Cycle 3 3',this.effect[0])
                    break
                    case 1921:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1922:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Worker\nBee',types.card),0,0)
                        }
                        this.targetCombatant.statusEffect('Shock',this.targetCombatant.getStatus('Sting')*3)
                        this.targetCombatant.status.main[findList('Sting',this.targetCombatant.status.name)]=0
                    break
                    case 1923:
                        this.targetCombatant.statusEffect('Sting',this.effect[1])
                    break
                    case 1940:
                        if(this.userCombatant.energyParity(this.energy)==0){
                            this.userCombatant.statusEffect('Armor',this.effect[1])
                        }
                    break
                    case 1948:
                        this.userCombatant.statusEffect('Single Damage Convert',1)
                    break
                    case 1971:
                        this.userCombatant.statusEffect('Vulnerable',this.effect[1])
                    break
                    case 1984:
                        this.userManager.allEffect(2,58)
                    break
                    case 2001:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userCombatant.statusEffect('Luck Guarantee',1)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2002:
                        this.userManager.allEffect(2,60)
                    break
                    case 2004:
                        this.userCombatant.statusEffect('Strength',this.userManager.hand.basicClassNumber(1))
                    break
                    case 2012:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.userManager.hand.add(findName('Diamond',types.card),0,0)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2021:
                        if(this.targetCombatant.blocked<=1){
                            this.userCombatant.statusEffect('Luck Guarantee',1)
                        }
                    break
                    case 2034:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Strike',types.card),0,this.color)
                        }
                    break
                    case 2049:
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                        this.userCombatant.statusEffect('Weak',this.effect[2])
                    break
                    case 2051:
                        this.userManager.allGroupEffectArgs(5,[-this.effect[1]])
                    break
                    case 2062:
                        this.userCombatant.statusEffect('Frail',this.effect[1])
                    break
                    case 2104:
                        if(this.targetCombatant.life<=0){
                            for(let a=0;a<this.effect[1];a++){
                                this.userManager.addRandomColor(2,0,0,1)
                            }
                        }
                    break
                    case 2110:
                        if(this.battle.turn.total==1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2112:
                        this.userManager.hand.discard(this.effect[1]*this.energy)
                    break
                    case 2123:
                        this.targetCombatant.statusEffect('Jinx',this.effect[1])
                        this.userManager.hand.upgrade(this.effect[2])
                    break
                    case 2137:
                        if(this.targetCombatant.blocked<=1){
                            this.userCombatant.statusEffect('Jinx',this.effect[1])
                        }
                    break
                    case 2144:
                        if(this.targetCombatant.blocked<=1){
                            this.userManager.hand.discard(this.effect[1])
                        }
                    break
                    case 2155:
                        this.userCombatant.statusEffect('Temporary Strength',this.effect[1])
                        this.userCombatant.statusEffect('Temporary Strength Next Turn',-this.effect[2])
                    break
                    case 2161:
                        if(this.userCombatant.energyParity(this.energy)==0){
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 2172:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.randomEffect(2,[0])
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(8,[])
                        }
                    break
                    case 2184:
                        if(this.targetCombatant.getStatus('Weak')==0){
                            this.userCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 2195:
                        if(this.targetCombatant.life<=0){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userManager.hand.add(findName('Shiv',types.card),0,0)
                            }
                        }
                    break
                    case 2201:
                        this.targetCombatant.statusEffect('Jinx',this.effect[1])
                        this.userManager.hand.exhaust(this.effect[2])
                    break
                    case 2207:
                        this.userCombatant.statusEffect('Block Next Turn',this.userCombatant.block)
                        this.userCombatant.block=0
                    break
                    case 2208:
                        if(this.targetCombatant.life<=this.targetCombatant.base.life*0.5){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userManager.hand.add(findName('Shiv',types.card),0,0)
                            }
                        }
                    break
                    case 2220:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 2221:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 2222:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userCombatant.statusEffect('Armor',this.effect[1])
                        }
                    break
                    case 2223:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                        }
                    break
                    case 2225:
                        this.battle.combatantManager.allEffect(31,[this.targetCombatant.name,this.effect[0],this.targetCombatant.id])
                    break
                    case 2227:
                        this.battle.combatantManager.randomEnemyEffect(5,[this.effect[1]])
                    break
                    case 2235:
                        this.userCombatant.addBlock(this.effect[1])
                        let list2235=[this.userManager.deck.cards,this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                        for(let a=0,la=list2235.length;a<la;a++){
                            for(let b=0,lb=list2235[a].length;b<lb;b++){
                                if(list2235[a][b].id==this.id){
                                    list2235[a][b].effect[0]+=list2235[a][b].effect[1]
                                    list2235[a][b].effect[1]+=list2235[a][b].effect[2]
                                }
                            }
                        }
                    break
                    case 2236: case 2781:
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                    break
                    case 2237:
                        this.userManager.drawPrice(this.effect[1],1)
                    break
                    case 2241:
                        for(let a=0,la=min(this.energy,1000);a<la;a++){
                            this.userManager.addRandomAll(2,this.level,0)
                        }
                    break
                    case 2251:
                        this.userCombatant.addBlock(this.effect[1]*this.userManager.hand.cards.length)
                    break
                    case 2255:
                        this.userManager.hand.randomEffect(32,[0,'Strike'])
                    break
                    case 2259:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.statusEffect('Metallicize',this.effect[1])
                        }
                    break
                    case 2260:
                        this.userManager.discard.sendCost(this.userManager.hand.cards,0,this.effect[1])
                    break
                    case 2262:
                        this.userManager.hand.allEffect(69)
                    break
                    case 2277:
                        let lucky=this.userCombatant.luckCheck()
                        let unlucky=false
                        if(!lucky){
                            unlucky=this.userCombatant.luckCheckFail()
                        }
                        if(floor(random(0,2))==0&&!unlucky||lucky){
                            this.userCombatant.highRoll()
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        }else{
                            this.userCombatant.lowRoll()
                        }
                        if(floor(random(0,2))==0&&!unlucky||lucky){
                            this.userCombatant.highRoll()
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[2])
                        }else{
                            this.userCombatant.lowRoll()
                        }
                        if(floor(random(0,2))==0&&!unlucky||lucky){
                            this.userCombatant.highRoll()
                            this.targetCombatant.statusEffect('Frail',this.effect[3])
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2288:
                        this.battle.overlayManager.overlays[46][this.player].active=true
                        this.battle.overlayManager.overlays[46][this.player].activate([1])
                    break
                    case 2290:
                        this.userCombatant.addBlock(this.effect[1])
                        this.userCombatant.enterStance(2)
                    break
                    case 2298:
                        this.userManager.drawClass(this.effect[1],1)
                    break
                    case 2299:
                        this.userManager.drawClass(this.effect[1],2)
                    break
                    case 2300:
                        this.userManager.drawClass(this.effect[1],3)
                    break
                    case 2301:
                        this.userManager.drawClass(this.effect[1],4)
                    break
                    case 2330:
                        if(this.battle.turn.total==0){
                            this.userCombatant.statusEffect('Extra Turn',1)
                        }
                    break
                    case 2337:
                        this.targetCombatant.statusEffect('Jinx',this.effect[1])
                    break
                    case 2339:
                        this.battle.overlayManager.overlays[8][this.player].active=true
                        this.battle.overlayManager.overlays[8][this.player].activate()
                    break
                    case 2347:
                        if(this.targetCombatant.life<=0){
                            let list2347=[this.userManager.deck.cards,this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                            for(let a=0,la=list2347.length;a<la;a++){
                                for(let b=0,lb=list2347[a].length;b<lb;b++){
                                    if(list2347[a][b].id==this.id){
                                        list2347[a][b]=upgradeCard(list2347[a][b])
                                    }
                                }
                            }
                        }
                    break
                    case 2349:
                        if(targetDirection(0,this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y)==3){
                            this.userCombatant.statusEffect('Temporary Strength',this.effect[1])
                        }
                    break
                    case 2350:
                        if(targetDirection(0,this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y)==1){
                            this.userCombatant.statusEffect('Temporary Strength',this.effect[1])
                        }
                    break
                    case 2351:
                        if(targetDirection(0,this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y)==5){
                            this.userCombatant.statusEffect('Temporary Strength',this.effect[1])
                        }
                    break
                    case 2357:
                        if(this.userCombatant.getStatus('Weak')>0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2358:
                        this.userCombatant.statusEffect('Energy Next Turn Next Turn',this.effect[1])
                    break
                    case 2361:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.deAbstract(1,this.effect[1],[])
                        }
                    break
                    case 2362:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                    break
                    case 2363:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userManager.addRandomAll(2,0,3,floor(random(1,7)))
                            }
                        }
                    break
                    case 2364:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.targetCombatant.statusEffect('Poison',this.effect[1])
                        }
                    break
                    case 2365:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userManager.hand.add(findName('Tetraphobia',types.card),0,types.card[findName('Tetraphobia',types.card)].list)
                            }
                        }
                    break
                    case 2366:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.drawClass(this.effect[1],4)
                        }
                    break
                    case 2367:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.userManager.hand.add(findName('Spark',types.card),0,0)
                            }
                        }
                    break
                    case 2374:
                        if(this.targetCombatant.blocked<=1){
                            this.userCombatant.statusEffect('Control',this.effect[1])
                        }
                    break
                    case 2375:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.statusEffect('Buffer',this.effect[1])
                        }
                    break
                    case 2379:
                        this.battle.combatantManager.damageAreaID(this.effect[1],this.user,this.userCombatant.id,this.userCombatant.tilePosition,2)
                    break
                    case 2381:
                        this.userManager.randomEffect(2,35,[1])
                    break
                    case 2388:
                        if(targetDirection(0,this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y)==0){
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 2389:
                        if(targetDirection(0,this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y)==2){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
                    break
                    case 2390:
                        if(targetDirection(0,this.targetCombatant.tilePosition.x-this.userCombatant.tilePosition.x,this.targetCombatant.tilePosition.y-this.userCombatant.tilePosition.y)==4){
                            this.targetCombatant.statusEffect('Frail',this.effect[1])
                        }
                    break
                    case 2391:
                        this.targetCombatant.removeRandomStatus([0,2])
                    break
                    case 2405:
                        if(this.battle.turn.total%2==0){
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        }else{
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[2])
                        }
                    break
                    case 2411:
                        this.userCombatant.statusEffect('Temporary Damage Up',-this.effect[1])
                    break
                    case 2420:
                        this.userCombatant.block=max(0,this.userCombatant.block-this.effect[1])
                    break
                    case 2428:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,2,12])
                    break
                    case 2430:
                        if(this.targetCombatant.life>0){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 2437:
                        this.battle.overlayManager.overlays[47][this.player].active=true
                        this.battle.overlayManager.overlays[47][this.player].activate([1])
                    break
                    case 2460:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                                this.battle.overlayManager.overlays[49][this.player].active=true
                                this.battle.overlayManager.overlays[49][this.player].activate()
                                this.userCombatant.highRoll()
                            }else{
                                this.userCombatant.lowRoll()
                            }
                        }
                    break
                    case 2461:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.addRandomCompleteAllCostCostDown(2,0,4,2)
                        }
                    break
                    case 2464:
                        if(this.targetCombatant.life<=0){
                            this.battle.combatantManager.allEffect(32,[this.targetCombatant.name,this.targetCombatant.id])
                        }
                    break
                    case 2466:
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                        this.targetCombatant.statusEffect('Freeze',this.effect[2])
                    break
                    case 2467:
                        this.targetCombatant.statusEffect('Buffer',this.effect[1])
                    break
                    case 2481:
                        this.targetCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 2487:
                        this.userCombatant.statusEffect('Luck Guarantee Fail',1)
                    break
                    case 2492:
                        this.userManager.hand.allEffect(76)
                    break
                    case 2493:
                        this.userManager.hand.costDown(1)
                    break
                    case 2494:
                        this.userManager.hand.costUp(1)
                    break
                    case 2498:
                        this.userManager.hand.allEffect(77)
                    break
                    case 2504:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userCombatant.statusEffect('Single Damage Up',this.effect[1])
                        }
                    break
                    case 2520:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.addRandomCompleteAllContainClass(2,this.level,['Cable','cable'],1,0)
                        }
                    break
                    case 2582:
                        if(this.userManager.deck.cards.length>=30){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 2584:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class!=1&&types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class!=5){
                            this.userCombatant.statusEffect('Control',this.effect[1])
                        }
                    break
                    case 2586:
                        if(this.targetCombatant.life<this.userCombatant.life){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2606:
                        this.userCombatant.statusEffect('Cannot Move Next Turn',this.effect[1])
                    break
                    case 2609:
                        this.userManager.draw(this.userManager.hand.allEffectArgs(18,[3]))
                    break
                    case 2610:
                        this.targetCombatant.statusEffect('Cannot Move',this.effect[1])
                    break
                    case 2621:
                        if(this.userCombatant.getStatus('Cannot Move')>0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2622:
                        if(this.userCombatant.balance>=5){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2623:
                        this.userCombatant.balance=9
                    break
                    case 2646:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 2647:
                        if(this.energy==2){
                            this.targetCombatant.statusEffect('Strength',this.effect[1])
                        }else if(this.energy==3){
                            this.targetCombatant.statusEffect('Freeze',this.effect[1])
                        }
                    break
                    case 2660:
                        if(!this.userCombatant.armed){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 2670:
                        this.userCombatant.statusEffect('History',this.effect[1])
                    break
                    case 2678:
                        if(this.userCombatant.getStatus('Knowledge')>0){
                            this.userManager.draw(this.effect[1])
                        }
                        if(this.userCombatant.getStatus('History')>0){
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 2680:
                        if(this.userCombatant.elemental){
                            this.battle.overlayManager.overlays[57][this.player].active=true
                            this.battle.overlayManager.overlays[57][this.player].activate()
                        }else{
                            this.battle.overlayManager.overlays[56][this.player].active=true
                            this.battle.overlayManager.overlays[56][this.player].activate()
                        }
                    break
                    case 2685:
                        if(this.userCombatant.getStatus('Knowledge')<=2){
                            this.userCombatant.statusEffect('Knowledge',this.effect[1])
                        }
                    break
                    case 2697:
                        this.userManager.hand.rewind(this.effect[1])
                        if(this.userCombatant.elemental){
                            this.battle.addEnergy(this.effect[2],this.player)
                        }
                    break
                    case 2701:
                        if(this.userCombatant.elemental){
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 2702:
                        this.targetCombatant.statusEffect('Vision Return',this.effect[1])
                    break
                    case 2709:
                        this.userManager.hand.rewind(this.effect[1])
                    break
                    case 2712:
                        if(this.targetCombatant.life<=0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                        this.userManager.hand.add(findName('Afterlife\nOdyssey',types.card),this.level,this.color,this.edition)
                    break
                    case 2716:
                        this.userManager.hand.add(findName(this.userCombatant.elemental?'Refreshed':'Disappointed',types.card),0,game.playerNumber+1)
                    break
                    case 2723:
                        if(this.userManager.hand.deAbstract(3,1,[])==1){
                            this.userCombatant.statusEffect('Knowledge',this.effect[1])
                        }
                    break
                    case 2728:
                        this.userCombatant.statusEffect('Wisdom',this.effect[1])
                        if(this.userCombatant.elemental){
                            this.userCombatant.addBlock(this.effect[2])
                        }
                    break
                    case 2736:
                        if(this.targetCombatant.life<=0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2737:
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.permanentStrength++
                        }
                    break
                    case 2739:
                        this.userCombatant.addBlock(this.effect[1])
                        this.userManager.deAbstract(1,this.effect[2],[])
                    break
                    case 2746:
                        if(this.targetCombatant.blocked<=1){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 2753:
                        if(this.relPos[1]>=7){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2757:
                        if(this.userCombatant.elemental){
                            this.userCombatant.statusEffect('Dodge',this.effect[1])
                        }
                    break
                    case 2766:
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                        this.targetCombatant.statusEffect('Strength',this.effect[2])
                    break
                    case 2771:
                        if(this.userCombatant.block>0){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
                    break
                    case 2783:
                        if(this.userCombatant.luckCheck()){
                            this.userManager.hand.add(findName('Trip',types.card),0,0)
                            this.userManager.hand.add(findName('Entrance',types.card),0,0)
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,2))==0){
                                this.userManager.hand.add(findName('Trip',types.card),0,0)
                            }else{
                                this.userManager.hand.add(findName('Entrance',types.card),0,0)
                            }
                        }
                    break
                    case 2787:
                        this.userManager.randomEffect(2,42,[this.effect[1]])
                    break
                    case 2798:
                        this.userManager.draw(this.effect[1])
                        if(this.userManager.hand.cards.length>0&&this.userManager.hand.cards[this.userManager.hand.cards.length-1].name.includes('Strike')){
                            this.battle.addEnergy(this.effect[2],this.player)
                        }
                    break
                    case 2810:
                        if(this.targetCombatant.life>0){
                            this.userCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 2811:
                        if(this.battle.counter.turnPlayed[0]==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2836:
                        this.userCombatant.statusEffect('Dexterity',this.effect[1])
                        this.battle.overlayManager.overlays[56][this.player].active=true
                        this.battle.overlayManager.overlays[56][this.player].activate()
                    break
                    case 2860:
                        if(this.targetCombatant.blocked<=1){
                            this.battle.itemManager.tempEffectiveness[this.player]=max(2,this.battle.itemManager.tempEffectiveness[this.player])
                        }
                    break
                    case 2876:
                        this.userCombatant.statusEffect('Knowledge',this.effect[1])
                    break
                    case 2890:
                        if(this.userCombatant.barrier>0){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
                    break
                    case 2900:
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[1],0])
                    break
                    case 2909:
                        let result2909=this.userManager.drawReturn(this.effect[1])
                        if(result2909.length>0&&result2909[0].name.includes('Strike')){
                            this.battle.addEnergy(this.effect[2],this.player)
                        }
                    break
                    case 2920:
                        if(this.targetCombatant.life>this.userCombatant.life){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2937:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.statusEffect('Energy Next Turn',-this.effect[1])
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2959:
                        this.targetCombatant.statusEffect('Temporary Barrier Return',this.effect[1])
                    break
                    case 2971:
                        let result2971=this.userManager.drawReturn(this.effect[1])
                        if(result2971.length>0&&result2971[0].class==1){
                            result2971[0].cost=0
                        }
                    break
                    case 2979:
                        let result2979=this.userManager.drawReturn(this.effect[1])
                        if(result2979.length>0&&result2979[0].class==1){
                            this.userCombatant.statusEffect('Strength',this.effect[2])
                        }
                    break
                    case 2986:
                        if(this.userCombatant.barrier>0){
                            this.targetCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 2997:
                        this.userCombatant.addBarrier(this.effect[1])
                        this.userCombatant.barrier+=this.userCombatant.block
                        this.userCombatant.block=0
                    break
                    case 3019:
                        if(this.targetCombatant.life<=0){
                            this.battle.overlayManager.overlays[3][this.player].active=true
                            this.battle.overlayManager.overlays[3][this.player].activate([0,3,12])
                        }
                    break
                    case 3062:
                        if(this.userCombatant.barrier>0){
                            this.userCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
                    break
                    case 3063:
                        this.userCombatant.addBarrier(this.effect[1])
                        this.userCombatant.block=0
                    break
                    case 3096:
                        this.targetCombatant.statusEffect('Take Damage',this.effect[0])
                        this.targetCombatant.statusEffect('Take Damage Next Turn',this.effect[0])
                        this.targetCombatant.statusEffect('Take Damage Next Turn Next Turn',this.effect[0])
                    break
                    case 3106:
                        if(this.targetCombatant.life<=0){
                            for(let a=0;a<this.effect[1];a++){
                                this.userManager.addRandomColor(2,0,0,0)
                            }
                        }
                    break
                    case 3108:
                        this.userManager.randomEffect(2,45,[1])
                    break
                    case 3111:
                        this.userCombatant.statusEffect('Temporary Dexterity',this.effect[1])
                        this.userCombatant.statusEffect('Temporary Dexterity Next Turn',-this.effect[2])
                    break
                    case 3118:
                        this.userCombatant.statusEffect('No Damage Turn',this.effect[1])
                    break
                    case 3139:
                        this.userManager.draw(this.effect[0])
                        if(this.targetCombatant.blocked<=1){
                            this.battle.addEnergy(this.effect[1],this.user)
                        }
                    break
                    case 3151:
                        this.userManager.hand.playedSpecific[2]++
                        if(this.userManager.hand.playedSpecific[2]%2==0){
                            this.userManager.hand.add(findName('Graphene',types.card),0,0)
                        }
                    break
                    case 3152:
                        this.userManager.hand.playedSpecific[3]++
                        if(this.userManager.hand.playedSpecific[3]%2==0){
                            this.userManager.hand.add(findName('Diamond',types.card),0,0)
                        }
                    break

                }
                //mark 1
            break
            case 1:
                switch(this.type){
                    case 13: case 235: case 968: case 2289: case 2778:
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
                            this.battle.addEnergy(this.effect[1],this.player)
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
                        this.battle.
                        this.battle.addEnergy(floor(this.userManager.reserve.cards.length/max(1,this.effect[1]))*this.effect[0],this.player)
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
                        this.userCombatant.addBlock(this.userCombatant.charge*this.effect[0]+this.effect[1])
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
                        this.userCombatant.addBlock(this.battle.counter.turnPlayed[this.player]<=1?this.effect[0]+this.effect[1]:this.effect[0])
                    break
                    case 1061:
                        this.userCombatant.statusEffect('Armor',this.effect[0])
                        if(abs(this.relPos[0]-this.relPos[1]/2)<=0.5){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1077:
                        this.userCombatant.statusEffect('Block Up',this.effect[0])
                    break
                    case 1118:
                        this.userCombatant.statusEffect('Reflect',1)
                    break
                    case 1127:
                        let roll=this.userCombatant.luckCheck()?2:this.userCombatant.luckCheckFail()?1:floor(random(1,3))
                        this.userCombatant.addBlock(this.effect[0]*roll)
                        if(roll==1){
                            this.userCombatant.lowRoll()
                        }else{
                            this.userCombatant.highRoll()
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
                    case 1514:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,10))!=0){
                            this.userCombatant.addBlock(this.effect[0])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1534:
                        this.userCombatant.statusEffect('Block Next Turn',this.effect[0])
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1603:
                        this.userCombatant.statusEffect('Twos',this.effect[0])
                    break
                    case 1696:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userCombatant.addBlock(this.effect[0])
                            this.userManager.draw(this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1738:
                        let roll2=this.userCombatant.luckCheck()?this.effect[0]:this.userCombatant.luckCheckFail()?1:floor(random(1,this.effect[0]+1))
                        this.battle.particleManager.createNumber(41,this.userCombatant.position.x,this.userCombatant.position.y,roll2)
                        if(roll2<this.effect[0]/2+1/2){
                            this.userCombatant.lowRoll()
                        }else{
                            this.userCombatant.highRoll()
                        }
                        this.userCombatant.addBlock(roll2,this.user)
                    break
                    case 1861: case 2469:
                        this.userCombatant.statusEffect('Armor',this.effect[0])
                    break
                    case 1876:
                        if(this.userCombatant.block==0){
                            this.userManager.draw(this.effect[1])
                        }
                        this.userCombatant.addBlock(this.effect[0])
                    break
                    case 1963:
                        this.userCombatant.addBlock(this.effect[0]*this.userCombatant.diceRoll(1,6))
                    break
                    case 2082:
                        this.userCombatant.addBlock(this.effect[0]*(this.battle.turn.total==1?3:this.battle.turn.total==2?2:1))
                    break
                    case 2102:
                        this.userCombatant.addBlock(this.effect[0]*this.battle.turn.total)
                    break
                    case 2131:
                        let total2131=0
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].construct&&this.battle.combatantManager.combatants[a].life>0){
                                total2131++
                            }
                        }
                        this.userCombatant.addBlock(this.effect[0]*(total2131>=2?2:1))
                    break
                    case 2157:
                        this.userCombatant.addBlock(this.effect[0]*(this.battle.turn.total==0?3:1))
                    break
                    case 2182:
                        if(this.userCombatant.block==0){
                            this.userManager.hand.discard(this.effect[1])
                        }
                        this.userCombatant.addBlock(this.effect[0])
                    break
                    case 2218:
                        this.userCombatant.addBlock(this.userCombatant.energyParity(this.energy)==1?this.effect[0]+this.effect[1]:this.effect[0])
                    break
                    case 2231:
                        this.userCombatant.addBlock(this.effect[0]*(this.energy==5?3:1))
                    break
                    case 2249:
                        this.userCombatant.addBlock(this.targetCombatant.totalUniqueStatus(1)*this.effect[0])
                    break
                    case 2305:
                        this.userCombatant.addBlock(this.effect[0]*this.userManager.hand.cards.length)
                        this.userManager.draw(this.effect[1])
                    break
                    case 2368:
                        this.userCombatant.statusEffect('Reflect',1)
                        this.userCombatant.statusEffect('Vulnerable',this.effect[0])
                    break
                    case 2483:
                        this.userCombatant.statusEffect('Block Next Turn Next Turn',this.effect[0])
                    break
                    case 2661:
                        this.userCombatant.addBlock(this.effect[0]+this.effect[1]*this.userCombatant.balance)
                    break
                    case 2668:
                        this.userCombatant.addBlock(this.userCombatant.elemental?this.effect[0]+this.effect[2]:this.effect[0])
                    break
                    case 2675:
                        this.userCombatant.addBlock(this.effect[0]+this.effect[1]*this.userCombatant.getStatus('Knowledge'))
                    break
                    case 2714:
                        this.userCombatant.addBlock(this.effect[0]*(this.battle.counter.enemy-this.battle.counter.killed))
                        this.userCombatant.statusEffect('History',this.effect[1]*(this.battle.counter.enemy-this.battle.counter.killed))
                    break
                    case 2721:
                        this.userCombatant.addBlock(this.userManager.hand.allEffectArgs(19,[])*this.effect[0]*(this.userCombatant.elemental?2:1))
                    break
                    case 2772:
                        if(this.userCombatant.block>0){
                            this.userCombatant.statusEffect('Counter All',this.effect[0])

                        }else{
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 2793:
                        this.userCombatant.addBlock(this.effect[0]*(this.userManager.hand.specNumber(3)>=1?2:1))
                    break
                    case 2799: case 2807:
                        this.userCombatant.addBlock(this.effect[0]+this.effect[1]*this.userCombatant.getStatus('Strength'))
                    break
                    case 2835:
                        this.userCombatant.addBlock(this.effect[0]*(this.drawn>=2?2:1))
                    break
                    case 2865:
                        this.userCombatant.addBlock(this.effect[0]+this.effect[1]*this.battle.itemManager.total[this.player])
                    break
                    case 2891: case 2893: case 2896: case 2906: case 2910: case 2960: case 2963: case 2964: case 2970: case 3017:
                    case 3049:
                        this.userCombatant.addBarrier(this.effect[0])
                    break
                    case 2908:
                        let result2908=this.userManager.drawReturn(this.effect[1])
                        this.userCombatant.addBlock(result2908.length>0&&result2908[0].class==2?this.effect[0]+this.effect[2]:this.effect[0])
                    break
                    case 2916:
                        let result2916=this.userManager.drawReturn(this.effect[0])
                        let total2916=0
                        for(let a=0,la=result2916.length;a<la;a++){
                            if(result2916[a].class==2){
                                total2916++
                            }
                        }
                        if(total2916>0){
                            this.userCombatant.addBlock(total2916*this.effect[1])
                        }
                    break
                    case 2947:
                        this.userCombatant.addBarrier(this.effect[0]*(this.battle.currency.money[this.player]<=this.effect[1]?2:1))
                    break
                    case 2961:
                        let max2961=max(this.userCombatant.block,this.userCombatant.barrier)
                        this.userCombatant.block=max2961
                        this.userCombatant.barrier=max2961
                    break
                    case 2996:
                        this.userCombatant.addBlock(this.effect[0]*(this.userCombatant.barrier>0?2:1))
                    break
                    case 3022:
                        if(this.energy%2==1){
                            this.battle.combatantManager.damageArea(this.effect[1]*this.energy,this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        }else{
                            this.userCombatant.addBarrier(this.effect[0]*this.energy)
                        }
                    break
                    case 3032: case 3033:
                        this.userCombatant.addBarrier(this.effect[0]*this.energy)
                    break
                    case 3094:
                        this.userCombatant.addBlock(this.effect[0]*(this.battle.encounter.class==2?3:this.battle.encounter.class==1?2:1))
                    break
                    case 3099:
                        this.userCombatant.addBlock(this.effect[0]+this.effect[1]*this.userManager.hand.singleColorRarityNumber(0,0))
                    break
                    default:
                        this.userCombatant.addBlock(this.effect[0])
                    break
                    //mark 2p
                }
                switch(this.type){
                    case 23: case 2423:
                        this.userCombatant.statusEffect('Counter',this.effect[1])
                    break
                    case 26:
                        this.userCombatant.statusEffect('Cannot Be Pushed',1)
                    break
                    case 43: case 2200: case 2425: case 2804: case 3072:
                        this.userManager.draw(this.effect[1])
                    break
                    case 50:
                        this.userCombatant.statusEffect('Retain Block',this.effect[1])
                    break
                    case 65:
                        this.userCombatant.statusEffect('Cannot Gain Block',this.effect[1])
                    break
                    case 95: case 2893:
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
                    case 122: case 2960:
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
                        this.userCombatant.statusEffect('Single Damage Up',this.effect[1])
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
                        this.userManager.hand.add(findName('Pain\nDefend',types.card),this.level,this.color,this.edition)
                    break
                    case 463: case 2896:
                        this.userManager.deAbstract(1,this.effect[1],[])
                    break
                    case 502:
                        this.userManager.allGroupClaw(this.effect[1])
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
                    case 602: case 2910:
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
                    case 726: case 2055:
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
                        this.userCombatant.statusEffect('Free Attack',1)
                    break
                    case 794:
                        this.userCombatant.statusEffect('Cannot Die',1)
                    break
                    case 810:
                        this.userCombatant.statusEffect('Triple Block',this.effect[1])
                    break
                    case 811:
                        this.userCombatant.statusEffect('Single Damage Block Convert',this.effect[1])
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
                        this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
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
                        this.userManager.deAbstract(2,this.effect[1],['Burn'])
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
                            this.battle.addEnergy(this.effect[1],this.player)
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
                        if(abs(this.relPos[0]-this.relPos[1]/2)<=0.5){
                            this.userCombatant.statusEffect('Armor',this.effect[1])
                        }
                    break
                    case 1039:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.dropDrawShuffle(this.player,findName('Defend',types.card),0,this.color)
                        }
                    break
                    case 1141:
                        this.userCombatant.statusEffect('Temporary Ammo on Hit',this.effect[1])
                    break
                    case 1146: case 3049:
                        let list1146=[this.userManager.deck.cards,this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                        for(let a=0,la=list1146.length;a<la;a++){
                            for(let b=0,lb=list1146[a].length;b<lb;b++){
                                if(list1146[a][b].id==this.id){
                                    list1146[a][b].effect[0]+=list1146[a][b].effect[1]
                                }
                            }
                        }
                    break
                    case 1176:
                        this.userManager.allGroupEffectArgs(6,[this.effect[1]])
                    break
                    case 1301:
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
                    case 1523:
                        this.userManager.hand.randomEffect(23)
                    break
                    case 1532:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userManager.draw(this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1636:
                        this.userCombatant.statusEffect('Metallicize',this.effect[1])
                        this.userCombatant.statusEffect('Control',this.effect[2])
                    break
                    case 1728:
                        this.userManager.drawClass(this.effect[1],4)
                    break
                    case 1742:
                        this.userManager.hand.randomEffect(26,[this.effect[1]])
                    break
                    case 1814:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                    break
                    case 1826:
                        this.userCombatant.statusEffect('Poison',this.effect[1])
                    break
                    case 1861:
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(28)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1877:
                        this.userCombatant.heal(this.effect[1])
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.addRandomAll(2,0,0)
                        }
                    break
                    case 1929:
                        if(this.userCombatant.stance==3){
                            this.userCombatant.enterStance(0)
                        }
                    break
                    case 1983:
                        let amount=this.userManager.hand.cards.length
                        this.userManager.allEffect(2,1)
                        this.userManager.draw(amount)
                    break
                    case 1985:
                        this.userManager.allEffect(2,59)
                    break
                    case 2003:
                        this.userManager.allEffect(2,61)
                    break
                    case 2005:
                        this.userCombatant.statusEffect('Dexterity',this.userManager.hand.basicClassNumber(2))
                    break
                    case 2035:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Defend',types.card),0,this.color)
                        }
                    break
                    case 2042:
                        this.targetCombatant.statusEffect('Damage Down',this.effect[1])
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.statusEffect('Burn',this.effect[2])
                            this.targetCombatant.statusEffect('Freeze',this.effect[3])
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,2))==0){
                                this.targetCombatant.statusEffect('Burn',this.effect[2])
                            }else{
                                this.targetCombatant.statusEffect('Freeze',this.effect[3])
                            }
                        }
                    break
                    case 2052:
                        this.userManager.allGroupEffectArgs(6,[-this.effect[1]])
                    break
                    case 2111:
                        if(this.battle.turn.total==1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2133:
                        this.userCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 2152:
                        this.userManager.hand.discard(this.effect[1])
                        if(this.userManager.discard.cards.length>=12){
                            this.battle.addEnergy(this.effect[2],this.player)
                        }
                    break
                    case 2162:
                        this.userCombatant.statusEffect('Counter All Combat',this.effect[1])
                        this.userCombatant.statusEffect('Cannot Move',this.effect[2])
                    break
                    case 2206:
                        this.userManager.draw(this.effect[1])
                        this.userCombatant.statusEffect('Temporary Draw',-this.effect[2])
                    break
                    case 2216:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2234:
                        if(this.relPos[1]==4){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2256:
                        this.userManager.hand.randomEffect(32,[0,'Defend'])
                    break
                    case 2257:
                        this.userCombatant.statusEffect('Block Break Splash',this.effect[1])
                    break
                    case 2266:
                        this.userCombatant.heal(this.effect[1])
                        this.userCombatant.statusEffect('Lose 1 HP',this.effect[2])
                    break
                    case 2274:
                        this.userManager.randomEffect(2,33)
                    break
                    case 2280:
                        this.userManager.hand.add(findName('Paradigm\nShift',types.card),0,0)
                    break
                    case 2286:
                        this.userCombatant.statusEffect('Block Single Damage Up Convert',1)
                    break
                    case 2289:
                        this.userCombatant.statusEffect('Retain Block',this.effect[1]*this.energy)
                    break
                    case 2302:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userCombatant.statusEffect('Counter',this.effect[1])
                        }
                    break
                    case 2303:
                        this.userCombatant.statusEffect('Strength Next Turn Next Turn',this.effect[1])
                    break
                    case 2304:
                        this.userCombatant.statusEffect('Dexterity Next Turn Next Turn',this.effect[1])
                    break
                    case 2307:
                        this.userManager.hand.randomEffect(34,[])
                    break
                    case 2309:
                        if(this.userCombatant.getStatus('Armor')==0){
                            this.userCombatant.statusEffect('Armor',this.effect[1])
                        }
                    break
                    case 2320:
                        this.battle.combatantManager.allEffect(6,[this.effect[1]])
                    break
                    case 2334:
                        this.userCombatant.statusEffect('Block-Fragile Draw',this.effect[1])
                    break
                    case 2346:
                        this.userCombatant.statusEffect('Counter',this.effect[1]*this.userManager.discard.cards.length)
                    break
                    case 2359:
                        this.userCombatant.statusEffect('Energy Next Turn Next Turn',this.effect[1])
                    break
                    case 2360:
                        this.userCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 2416:
                        this.userManager.discard.randomEffect(16,[this.userManager.hand.cards])
                    break
                    case 2484:
                        let list2484=[this.userManager.deck.cards,this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                        for(let a=0,la=list2484.length;a<la;a++){
                            for(let b=0,lb=list2484[a].length;b<lb;b++){
                                if(list2484[a][b].id==this.id){
                                    list2484[a][b].cost+=list2484[a][b].effect[1]
                                    list2484[a][b].base.cost+=list2484[a][b].effect[1]
                                }
                            }
                        }
                    break
                    case 2491:
                        this.userManager.allEffect(2,5)
                    break
                    case 2495:
                        this.userCombatant.heal(this.effect[1])
                        this.userManager.drawClass(this.effect[2],1,2)
                    break
                    case 2523:
                        this.userCombatant.statusEffect('Armor',this.effect[1])
                        this.userManager.hand.allEffect(80)
                    break
                    case 2560:
                        this.battle.combatantManager.statusAreaID('Weak',this.effect[1],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 2579:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,3,18,2])
                    break
                    case 2591:
                        this.battle.itemManager.addRandomItem(this.player)
                    break
                    case 2607:
                        this.userCombatant.statusEffect('Cannot Move Next Turn',this.effect[1])
                    break
                    case 2614:
                        this.userCombatant.statusEffect('Double Damage',this.effect[1])
                    break
                    case 2615:
                        this.userCombatant.status.main[findList('Freeze',this.userCombatant.status.name)]=0
                        this.userCombatant.status.main[findList('Burn',this.userCombatant.status.name)]=0
                    break
                    case 2618:
                        this.userCombatant.randomStatusInstant(this.effect[1],[1])
                    break
                    case 2619:
                        this.userCombatant.randomStatusInstant(this.effect[1],[1])
                        this.userCombatant.randomStatusInstant(this.effect[2],[1])
                    break
                    case 2625:
                        this.battle.overlayManager.overlays[46][this.player].active=true
                        this.battle.overlayManager.overlays[46][this.player].activate([1])
                    break
                    case 2634:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,3,19,53])
                    break
                    case 2668:
                        this.userManager.hand.rewind(this.effect[1])
                    break
                    case 2669:
                        this.userCombatant.statusEffect('History',this.effect[1])
                    break
                    case 2672:
                        if(this.drawn>=2){
                            this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                        }
                    break
                    case 2676:
                        for(let a=0,la=this.userCombatant.elemental?2:1;a<la;a++){
                            this.userManager.hand.add(findName('Refreshed',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 2679:
                        this.userCombatant.statusEffect('Strength',this.effect[1])
                        this.battle.overlayManager.overlays[56][this.player].active=true
                        this.battle.overlayManager.overlays[56][this.player].activate()
                    break
                    case 2689:
                        this.userCombatant.statusEffect('History',this.effect[1])
                        if(this.userCombatant.elemental){
                            this.userCombatant.statusEffect('Retain Block',this.effect[2])
                            this.userCombatant.statusEffect('Retain History',this.effect[3])
                        }
                    break
                    case 2724:
                        if(this.userManager.hand.deAbstract(3,1,[])==1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2726:
                        this.userManager.draw(this.effect[1])
                        if(this.userManager.hand.cards.length>0&&this.userManager.hand.cards[this.userManager.hand.cards.length-1].class==2){
                            this.userCombatant.addBlock(this.effect[2])
                        }
                    break
                    case 2735:
                        this.userCombatant.vision+=this.effect[1]
                    break
                    case 2764:
                        this.userManager.hand.rebound(1)
                    break
                    case 2767:
                        if(this.energy>this.battle.getEnergyBase(this.player)){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2769:
                        this.battle.overlayManager.overlays[59][this.player].active=true
                        this.battle.overlayManager.overlays[59][this.player].activate()
                    break
                    case 2778:
                        for(let a=0,la=this.effect[1]*this.energy;a<la;a++){
                            this.battle.dropDrawShuffle(this.player,findName('Dazed',types.card),this.level,game.playerNumber+1)
                        }
                    break
                    case 2780:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.randomEffect(2,2,[0])
                        }
                    break
                    case 2782: case 2891:
                        this.battle.overlayManager.overlays[19][this.player].active=true
                        this.battle.overlayManager.overlays[19][this.player].activate()
                    break
                    case 2795:
                        if(this.relPos[1]>=1){
                            if(this.relPos[1]%2==0&&this.relPos[0]!=this.relPos[1]/2){
                                this.userManager.hand.cards[this.relPos[0]>this.relPos[1]/2?this.relPos[1]/2:this.relPos[1]/2-1].deSize=true
                                this.userManager.hand.cards[this.relPos[0]>this.relPos[1]/2?this.relPos[1]/2:this.relPos[1]/2-1].exhaust=true
                            }else if(this.relPos[1]%2==1){
                                if(this.relPos[0]==round(this.relPos[1]/2-1/2)||this.relPos[0]==round(this.relPos[1]/2+1/2)){
                                    this.userManager.hand.cards[round(this.relPos[1]/2-1/2)].deSize=true
                                    this.userManager.hand.cards[round(this.relPos[1]/2-1/2)].exhaust=true
                                }else{
                                    this.userManager.hand.cards[round(this.relPos[1]/2-1/2)].deSize=true
                                    this.userManager.hand.cards[round(this.relPos[1]/2-1/2)].exhaust=true
                                    this.userManager.hand.cards[round(this.relPos[0]>this.relPos[1]/2?this.relPos[1]/2+1/2:this.relPos[1]/2-3/2)].deSize=true
                                    this.userManager.hand.cards[round(this.relPos[0]>this.relPos[1]/2?this.relPos[1]/2+1/2:this.relPos[1]/2-3/2)].exhaust=true
                                }
                            }
                        }
                    break
                    case 2801:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.itemManager.addItem(findName('Mundane Dust',types.item),this.player)
                        }
                    break
                    case 2807:
                        this.userCombatant.statusEffect('Counter',this.effect[2]+this.effect[3]*this.userCombatant.getStatus('Strength'))
                    break
                    case 2818:
                        if(this.userManager.hand.deAbstract(1,1,[])==1){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 2877:
                        this.userCombatant.statusEffect('Knowledge',this.effect[1])
                    break
                    case 2881:
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            if(this.battle.combatantManager.combatants[a].construct&&this.battle.combatantManager.combatants[a].life>0){
                                this.userCombatant.statusEffect('Dexterity',this.effect[1])
                                a=la
                            }
                        }
                    break
                    case 2892:
                        this.userCombatant.statusEffect('Temporary Strength',this.effect[1])
                    break
                    case 2914:
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[1],0])
                    break
                    case 2918:
                        this.userManager.hand.add(findName('Dual\nDiscus',types.card),this.level,0)
                    break
                    case 2921:
                        if(this.userCombatant.life<=this.userCombatant.base.life*0.5){
                            this.userCombatant.statusEffect('Regeneration',this.effect[1])
                        }
                    break
                    case 2952:
                        this.userManager.hand.allEffect(89)
                    break
                    case 2963:
                        this.userCombatant.statusEffect('Temporary Dexterity on Hit',this.effect[1])
                    break
                    case 2964:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
                        }
                    break
                    case 2972:
                        let result2972=this.userManager.drawReturn(this.effect[1])
                        if(result2972.length>0&&result2972[0].class==2){
                            result2972[0].cost=0
                        }
                    break
                    case 2980:
                        let result2980=this.userManager.drawReturn(this.effect[1])
                        if(result2980.length>0&&result2980[0].class==2){
                            this.userCombatant.statusEffect('Dexterity',this.effect[2])
                        }
                    break
                    case 2988:
                        this.battle.overlayManager.overlays[3][this.player].additionalOptions+=this.effect[1]
                    break
                    case 2989:
                        this.userManager.deAbstract(0,this.effect[1],[])
                    break
                    case 3010:
                        this.userManager.drawClass(this.effect[1],3,3)
                    break
                    case 3011:
                        this.userManager.drawClass(this.effect[1],2,3)
                    break
                    case 3017:
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[1],0])
                        this.battle.drop(this.player,findName('Void',types.card),0,game.playerNumber+1)
                    break
                    case 3024:
                        this.userCombatant.statusEffect('Barrier Next Turn',this.effect[1])
                    break
                    case 3028:
                        this.userManager.hand.add(findName('Pure\nEnergy',types.card),0,0)
                    break
                    case 3032:
                        if(this.energy>=1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 3033:
                        this.battle.addEnergy(this.effect[1],this.player)
                    break
                    case 3064:
                        this.battle.overlayManager.overlays[3][this.player].additionalOptions-=this.effect[1]
                    break
                    case 3070:
                        if(this.userCombatant.life<=this.userCombatant.base.life*0.5){
                            this.userCombatant.life-=this.effect[1]
                        }
                    break
                    case 3086:
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                    break
                    case 3097:
                        this.userCombatant.statusEffect('Block Next Turn',this.effect[0])
                        this.userCombatant.statusEffect('Block Next Turn Next Turn',this.effect[0])
                        this.userCombatant.statusEffect('Block Next Turn Next Turn Next Turn',this.effect[0])
                    break
                    case 3109:
                        this.userManager.randomEffect(2,45,[2])
                    break
                    case 3127:
                        this.userCombatant.statusEffect('Retain Block',this.effect[1])
                        this.userCombatant.statusEffect('Strength',this.effect[2])
                        this.userCombatant.statusEffect('Lose Per Turn',this.effect[3])
                    break
                    case 3131:
                        this.userCombatant.statusEffect('Counter Once',this.effect[1])
                    break
                    case 3138:
                        let result3138=this.userManager.drawReturn(this.effect[1])
                        if(result3138.length>0&&result3138[0].cost!=0){
                            result3138[0].deSizeDrop=true
                        }
                    break

                }
                //mark 2
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
                    case 973: case 1672: case 2140: case 2141: case 2159: case 2160: case 2180: case 2436: case 2459: case 2652:
                    case 3013:
                        let offset=transformDirection(0,this.relativeDirection)
                        let index=this.battle.combatantManager.getCombatantIndex(this.targetTile.tilePosition.x+offset[0],this.targetTile.tilePosition.y+offset[1])
                        if(index>=0){
                            switch(this.type){
                                case 973:
                                    this.battle.combatantManager.combatants[index].takeDamage(this.effect[1])
                                break
                                case 1672:
                                    this.battle.combatantManager.combatants[index].statusEffect('Bruise',this.effect[1])
                                break
                                case 2140:
                                    this.battle.combatantManager.combatants[index].block=0
                                break
                                case 2141:
                                    this.battle.combatantManager.combatants[index].statusEffect('Vulnerable',this.effect[1])
                                break
                                case 2159:
                                    this.battle.combatantManager.combatants[index].statusEffect('Weak',this.effect[1])
                                break
                                case 2160:
                                    this.battle.combatantManager.combatants[index].statusEffect('Jinx',this.effect[1])
                                break
                                case 2180:
                                    this.battle.addEnergy(this.effect[1],this.player)
                                break
                                case 2436:
                                    this.userCombatant.addBlock(this.effect[1])
                                break
                                case 2459:
                                    this.userManager.draw(this.effect[1])
                                break
                                case 2652:
                                    this.battle.combatantManager.combatants[index].statusEffect('Bleed',this.effect[1])
                                break
                                case 3013:
                                    this.battle.turnManager.loadEnemyRandomMove(index)
                                break
                            }
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
                            this.battle.addEnergy(this.effect[1],this.player)
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
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userCombatant.highRoll()
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
                    case 1570:
                        this.userCombatant.combo=max(0,this.userCombatant.combo-this.effect[1])
                    break
                    case 1571:
                        this.targetTile.addType(19)
                    break
                    case 1572:
                        this.userCombatant.balanceCap=max(1,this.userCombatant.balanceCap-this.effect[1])
                    break
                    case 1573:
                        if(this.battle.turn.total%2==0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1574:
                        this.userManager.hand.allEffectArgs(8,[this.effect[1]])
                    break
                    case 1576:
                        let list=['Instant\nWrath','Instant\nCalm','Instant\nHaste','Instant\nSturdy']
                        this.userManager.hand.add(findName(list[floor(random(0,list.length))],types.card),0,0)
                    break
                    case 1577:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 1578:
                        this.userCombatant.statusEffect('Gun Boost',this.effect[1])
                    break
                    case 1579:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1580:
                        this.userCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 1581:
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 1582:
                        this.battle.combatantManager.statusAreaID('Poison',this.effect[1],this.userCombatant.id,this.targetTile.tilePosition)
                    break
                    case 1583:
                        this.userCombatant.statusEffect('Single Attack Strength',this.effect[1])
                    break
                    case 1584:
                        this.userManager.deAbstract(1,this.effect[1],[])
                    break
                    case 1585:
                        this.userManager.drawClass(this.effect[1],1)
                    break
                    case 1586:
                        this.userManager.drawClass(this.effect[1],2)
                    break
                    case 1587:
                        this.userManager.drawClass(this.effect[1],3)
                    break
                    case 1588:
                        this.userManager.drawClass(this.effect[1],4)
                    break
                    case 1589:
                        if(this.userCombatant.tilePosition.x>this.targetTile.tilePosition.x&&this.userCombatant.tilePosition.y==this.targetTile.tilePosition.y){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1590:
                        if(this.userCombatant.tilePosition.x<this.targetTile.tilePosition.x&&this.userCombatant.tilePosition.y==this.targetTile.tilePosition.y){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1643:
                        this.battle.combatantManager.healAreaRuleless(this.effect[1],this.targetTile.tilePosition)
                    break
                    case 1644:
                        this.userCombatant.statusEffect('Strength',-this.effect[1])
                    break
                    case 1647:
                        this.userManager.allEffect(2,52)
                    break
                    case 1648:
                        if(!this.userCombatant.luckCheck()&&this.userCombatant.check10()||this.userCombatant.luckCheckFail()){
                            this.battle.addCurrency(-this.effect[1],this.player)
                            this.userCombatant.lowRoll()
                        }else{
                            this.userCombatant.highRoll()
                        }
                    break
                    case 1671:
                        this.userCombatant.combo+=this.effect[1]
                        this.userCombatant.statusEffect('Combo Next Turn',this.effect[2])
                    break
                    case 1673:
                        this.userCombatant.statusEffect('Temporary Single Damage',this.effect[1])
                    break
                    case 1677:
                        if(this.userCombatant.stance==3){
                            this.userCombatant.enterStance(0)
                        }
                    break
                    case 1680:
                        this.userManager.allEffect(2,1)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 1681:
                        this.battle.loseCurrency(this.effect[1],this.player)
                    break
                    case 1759:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.userCombatant.statusEffect('Dodge',this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1760:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,10))<=1){
                            this.userCombatant.statusEffect('Dodge',this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1761:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,10))<=2){
                            this.userCombatant.statusEffect('Dodge',this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1784:
                        this.userCombatant.statusEffect('Temporary Single Damage',-this.effect[1])
                    break
                    case 1785:
                        this.targetTile.addType(1)
                    break
                    case 1978:
                        this.userCombatant.statusEffect('Vulnerable',this.effect[1])
                    break
                    case 2008:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.userCombatant.statusEffect('Control',this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2009:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.userManager.drawPrice(this.effect[1],0)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2033:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.userCombatant.statusEffect('Armor',this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2036:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Strike',types.card),0,this.color)
                        }
                    break
                    case 2037:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Defend',types.card),0,this.color)
                        }
                    break
                    case 2040:
                        this.userCombatant.statusEffect('Temporary Single Damage',-this.effect[1])
                    break
                    case 2047:
                        this.userManager.hand.exhaust(this.effect[1])
                    break
                    case 2075:
                        if(this.battle.turn.total>=4){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2113:
                        if(this.battle.turn.total==1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2166:
                        this.userCombatant.statusEffect('Cannot Move',this.effect[1])
                    break
                    case 2167:
                        this.userCombatant.statusEffect('Single Weak',1)
                    break
                    case 2173:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
                        }
                    break
                    case 2174:
                        this.userCombatant.removeRandomStatus([1,3])
                    break
                    case 2175:
                        if(this.targetTile.tilePosition.y>this.userCombatant.tilePosition.y){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2176:
                        if(this.targetTile.tilePosition.y<this.userCombatant.tilePosition.y){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2177:
                        if(this.targetTile.tilePosition.y>this.userCombatant.tilePosition.y){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 2178:
                        if(this.targetTile.tilePosition.y<this.userCombatant.tilePosition.y){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 2179:
                        let offset2179=transformDirection(0,this.relativeDirection)
                        let index2179=this.battle.combatantManager.getCombatantIndex(this.userCombatant.tilePosition.x-offset2179[0],this.userCombatant.tilePosition.y-offset2179[1])
                        if(index2179>=0){
                            this.battle.combatantManager.combatants[index2179].takeDamage(this.effect[1])
                        }
                    break
                    case 2202:
                        if(this.targetTile.tilePosition.y>this.userCombatant.tilePosition.y){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2203:
                        if(this.targetTile.tilePosition.y<this.userCombatant.tilePosition.y){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2323:
                        if(this.userManager.hand.classNumber([3])>1){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 2324:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2326:
                        if(this.battle.turn.total%2==0){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2327:
                        if(this.battle.turn.total%2==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2332:
                        if(this.battle.turn.total%4==0){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 2370:
                        if(this.targetDistance==2){
                            this.userCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 2371:
                        if(this.targetDistance==1){
                            this.userCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 2383:
                        this.userCombatant.statusEffect('Intangible',this.effect[1])
                    break
                    case 2418:
                        this.userCombatant.statusEffect('Free Attack',1)
                    break
                    case 2431:
                        if(this.relPos[1]<=1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2439:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.addRandomCompleteAllContainClass(2,this.level,['Cable','cable'],1,0)
                        }
                    break
                    case 2440:
                        this.userCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 2456:
                        this.userCombatant.tickEarly()
                        this.userCombatant.tick()
                        this.userCombatant.tickLate()
                    break
                    case 2475:
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
                    case 2589:
                        if(this.userManager.deck.cards.length>=30){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 2600:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.itemManager.addItem(findName(['Salad','Energy Drink','Glass Shard','Molten Metal','Caffeine Pill','Attack Dust','Defense Dust','Mystery Box'][floor(random(0,8))],types.item),this.player)
                        }
                    break
                    case 2602:
                        if(this.targetTile.type.length>0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2603:
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                    break
                    case 2604:
                        if(this.userCombatant.life>=this.userCombatant.base.life*3/4){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2608:
                        this.userCombatant.statusEffect('Cannot Move Next Turn',this.effect[1])
                    break
                    case 2637:
                        this.userManager.addRandomSpec(2,0,53)
                    break
                    case 2742:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Refreshed',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 2743:
                        this.userManager.hand.rewind(this.effect[1])
                    break
                    case 2744:
                        if(this.userCombatant.block>0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2745:
                        if(this.userCombatant.elemental){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2747:
                        this.userCombatant.vision+=this.effect[1]
                    break
                    case 2750:
                        if(this.userCombatant.tilePosition.x>this.targetTile.tilePosition.x&&this.userCombatant.tilePosition.y==this.targetTile.tilePosition.y){
                            this.userCombatant.statusEffect('Knowledge',this.effect[1])
                        }
                    break
                    case 2751:
                        if(this.userCombatant.tilePosition.x<this.targetTile.tilePosition.x&&this.userCombatant.tilePosition.y==this.targetTile.tilePosition.y){
                            this.userCombatant.statusEffect('History',this.effect[1])
                        }
                    break
                    case 2752:
                        if(this.userCombatant.elemental){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 2758:
                        this.userManager.hand.rebound(1)
                    break
                    case 2759:
                        this.userCombatant.vision=0
                    break
                    case 2760:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Disappointed',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 2761:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.activateHistory()
                        }
                    break
                    case 2832:
                        if(this.drawn>=2){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2850:
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.itemManager.addItem(findName('Salad',types.item),this.player)
                        }
                    break
                    case 2866:
                        if(this.battle.itemManager.total[this.player]>=2){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2925:
                        if(this.battle.itemManager.total[this.player]==this.battle.itemManager.items[this.player].length-1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2926:
                        if(this.battle.itemManager.total[this.player]==0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2927:
                        this.userCombatant.statusEffect('Free Movement',1)
                    break
                    case 2928:
                        this.userManager.draw(this.effect[1]*this.userManager.hand.classNumber([3]))
                    break
                    case 2929:
                        this.userCombatant.addBarrier(this.effect[1])
                    break
                    case 2930:
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[1],0])
                    break
                    case 2935:
                        this.battle.combatantManager.statusAreaID('Take Per Card Played',this.effect[1],this.userCombatant.id,this.targetTile.tilePosition)
                    break
                    case 2936:
                        let result2936=this.userManager.drawReturn(this.effect[1])
                        if(result2936.length>0&&result2936[0].class==3){
                            this.battle.addEnergy(this.effect[2],this.player)
                        }
                    break
                    case 2938:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.statusEffect('Energy Next Turn',-this.effect[1])
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2939:
                        this.battle.setEnergy(this.effect[1],this.player)
                    break
                    case 2940:
                        if(this.userManager.hand.specNumber(54)>=1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2941:
                        this.battle.overlayManager.overlays[19][this.player].active=true
                        this.battle.overlayManager.overlays[19][this.player].activate()
                    break
                    case 2942:
                        if(this.targetTile.tilePosition.y<this.userCombatant.tilePosition.y){
                            this.userManager.hand.upgrade(this.effect[1])
                        }else if(this.targetTile.tilePosition.y>this.userCombatant.tilePosition.y){
                            this.userManager.hand.exhaust(this.effect[1])
                        }
                    break
                    case 2945:
                        this.userCombatant.addBarrier(this.effect[1]*this.battle.combatantManager.getArea(this.userCombatant.team,this.userCombatant.tilePosition,1).length)
                    break
                    case 2948:
                        if(this.battle.currency.money[this.player]<=this.effect[1]){
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 2973:
                        let result2973=this.userManager.drawReturn(this.effect[1])
                        if(result2973.length>0&&result2973[0].class==3){
                            result2973[0].cost=0
                        }
                    break
                    case 3027:
                        this.battle.overlayManager.overlays[3][this.player].additionalOptions+=this.effect[1]
                    break
                    case 3054:
                        this.userManager.drawClass(this.effect[1],this.targetTile.relativePosition.x>this.userCombatant.relativePosition.x?2:1)
                    break
                    case 3081:
                        if(this.userCombatant.block>0){
                            this.battle.loseEnergy(this.effect[1],this.player)
                        }
                    break
                    case 3115:
                        if(this.targetTile.tilePosition.y<this.userCombatant.tilePosition.y){
                            this.battle.combatantManager.randomEnemyEffect(0,[this.effect[1]])
                        }else if(this.targetTile.tilePosition.y>this.userCombatant.tilePosition.y){
                            this.userCombatant.addBlock(this.effect[2])
                        }
                    break
                    case 3117:
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                    break

                }
                //mark 3
            break
            case 3:
                switch(this.type){
                    case -15:
                        this.userCombatant.deStatus('Cannot Move',this.effect[0])
                    break
                    case -39:
                        this.userCombatant.statusEffect('Strength',-this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                    case -40:
                        this.userManager.hand.unupgrade(this.effect[0])
                    break
                    case 6: case 2567:
                        this.userCombatant.statusEffect('Double Damage',this.effect[0])
                    break
                    case 30:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                    break
                    case 41: case 807: case 820: case 821: case 822: case 2827:
                        this.battle.addEnergy(this.effect[0],this.player)
                    break
                    case 71:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,3,2])
                    break
                    case 92:
                        this.userManager.deAbstract(1,this.effect[0],[])
                    break
                    case 98: case 1802:
                        this.userCombatant.statusEffect('Temporary Damage Up',this.effect[0])
                    break
                    case 113:
                        this.battle.addEnergy(this.effect[0],this.player)
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
                        this.battle.addEnergyGen(this.effect[0],this.player)
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
                        this.userCombatant.statusEffect('Strength',floor(this.userCombatant.combo/max(1,this.effect[0])))
                        this.userCombatant.combo=0
                    break
                    case 264:
                        this.userCombatant.statusEffect('Shiv Boost',this.effect[0])
                    break
                    case 278:
                        this.userCombatant.statusEffect('Temporary Strength',this.effect[0])
                    break
                    case 286: case 1638:
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
                        this.battle.addEnergyGen(this.effect[1],this.player)
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
                        this.userCombatant.life-=this.effect[0]*this.userManager.deAbstractAll(1,[])
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
                        this.battle.addEnergyGen(this.effect[0],this.player)
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
                        this.battle.addEnergy(this.effect[0],this.player)
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
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.battle.drop(this.player,findName('Void',types.card),0,game.playerNumber+1)
                    break
                    case 521:
                        this.battle.multiplyEnergy(2,this.player)
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
                        this.userCombatant.statusEffect('Strength',floor(this.userCombatant.combo/max(1,this.effect[0])))
                        this.userCombatant.combo=this.effect[1]
                    break
                    case 655:
                        this.userManager.deAbstract(1,this.effect[0],[])
                        this.userManager.allGroupEffect(21)
                    break
                    case 656:
                        this.userManager.deAbstract(1,this.effect[0],[])
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
                    case 760: case 2217:
                        this.userCombatant.statusEffect('Single Damage Up',this.effect[0])
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
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userManager.draw(this.effect[1])
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
                        this.userManager.hand.rewind(this.effect[1])
                    break
                    case 873:
                        this.battle.addEnergy(this.userCombatant.charge,this.player)
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
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userCombatant.charge+=this.effect[1]
                    break
                    case 948:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userCombatant.statusEffect('Triple Damage',this.effect[0])
                            this.userCombatant.highRoll()
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
                        this.battle.addEnergy(this.effect[0],this.player)
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
                        this.battle.addEnergy(this.effect[0],this.player)*this.number
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
                            this.battle.dropDrawShuffle(this.player,findName('Basicity',types.card),0,game.playerNumber+1)
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
                        if(this.battle.getEnergy(this.player)==0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1260: case 2031:
                        this.userManager.draw(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        if(this.amplify){
                            this.userCombatant.statusEffect('Draw Up',this.effect[0])
                        }
                    break
                    case 1264:
                        this.battle.setEnergy(this.effect[0],this.player)
                    break
                    case 1265:
                        this.battle.setEnergy(this.effect[0],this.player)
                        this.userManager.hand.randomEffect(7,[this.effect[1]])
                    break
                    case 1269:
                        this.battle.addEnergy(this.effect[0],this.player)
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
                        this.battle.multiplyEnergy(this.amplify?3:2,this.player)
                    break
                    case 1323:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,4))==0){
                            for(let a=0,la=this.effect[1];a<la;a++){
                                this.battle.relicManager.addRandomRelic(this.player)
                            }
                            this.userCombatant.highRoll()
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
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userManager.drawCost(this.effect[1])
                    break
                    case 1407:
                        this.battle.setEnergyMainGen(player)
                    break
                    case 1419:
                        this.userCombatant.statusEffect('Extra Turn',1)
                        this.battle.attackManager.endAfter=true
                    break
                    case 1466:
                        this.userCombatant.statusEffect('Extra Turn',1)
                    break
                    case 1467:
                        this.battle.setEnergyMainGen(player)
                        this.userCombatant.statusEffect('Shock',this.effect[0])
                    break
                    case 1468:
                        this.battle.setEnergy(this.effect[0],this.player)
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
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,2))==0){
                                this.userCombatant.statusEffect('Double Damage',this.effect[0])
                            }else{
                                this.userManager.hand.duplicate(this.effect[0])
                            }
                        }
                    break
                    case 1494:
                        this.userCombatant.randomStatusInstant(this.effect[0],[0,2])
                        this.userCombatant.randomStatusInstant(this.effect[1],[0,2])
                        this.userCombatant.randomStatusInstant(this.effect[2],[0,2])
                    break
                    case 1497:
                        this.targetCombatant.statusEffect('Extra Turn',1)
                    break
                    case 1540:
                        this.userCombatant.statusEffect('Survive Fatal',this.effect[0])
                    break
                    case 1542:
                        this.userCombatant.status.main[findList('Cannot Move',this.userCombatant.status.name)]=0
                    break
                    case 1544:
                        this.userCombatant.statusEffect('Free 1 Cost Card',this.effect[0])
                    break
                    case 1549:
                        this.battle.overlayManager.overlays[43][this.player].active=true
                        this.battle.overlayManager.overlays[43][this.player].activate()
                    break
                    case 1551: case 2333:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                    break
                    case 1553:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userCombatant.statusEffect('Triple Damage',this.effect[0])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.statusEffect('No Damage',this.effect[0])
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1554:
                        this.userCombatant.statusEffect('1.5x Damage+1',this.effect[0])
                    break
                    case 1563:
                        this.userCombatant.statusEffect('Counter All Combat',this.effect[0])
                        this.battle.loseCurrency(this.effect[1],this.player)
                    break
                    case 1601:
                        this.userCombatant.statusEffect('Decrementing Armor',this.effect[0])
                    break
                    case 1641:
                        this.userCombatant.statusEffect('Lowroll Draw',this.effect[0])
                    break
                    case 1657:
                        this.userCombatant.statusEffect('Single Damage Up',this.effect[0])
                        this.userCombatant.statusEffect('Single Attack Regeneration',this.effect[1])
                    break
                    case 1658:
                        this.userCombatant.statusEffect('Shiv Freeze',this.effect[0])
                    break
                    case 1659:
                        this.userCombatant.statusEffect('Shiv Burn',this.effect[0])
                    break
                    case 1715:
                        this.userManager.hand.cards.reverse()
                        this.userManager.allEffect(2,53)
                        this.userManager.draw(this.effect[0])
                    break
                    case 1717:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                    case 1719:
                        this.userManager.hand.upgrade(this.effect[0])
                    break
                    case 1721:
                        this.targetCombatant.multiplyStatus('Poison',this.effect[0])
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 1734:
                        if(this.userCombatant.energyParity(this.energy)==0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }else{
                            this.battle.loseEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1735:
                        let total=0
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].spec.includes(12)){
                                for(let b=0,lb=this.userManager.hand.cards[a].effect.length;b<lb;b++){
                                    for(let c=0,lc=this.userManager.hand.cards[a].effect[b].length;c<lc;c++){
                                        if(this.userManager.hand.cards[a].effect[b][c]==1){
                                            total++;
                                            b=lb;
                                        }
                                    }
                                }
                            }else{
                                for(let b=0,lb=this.userManager.hand.cards[a].effect.length;b<lb;b++){
                                    if(this.userManager.hand.cards[a].effect[b]==1){
                                        total++;
                                        b=lb;
                                    }
                                }
                            }
                        }
                        if(total>=2){
                            this.battle.addEnergy(this.effect[0],this.player)
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1741:
                        this.userManager.hand.randomEffect(26,[this.effect[0]])
                    break
                    case 1750:
                        this.userCombatant.statusEffect('Double Countdowns',1)
                    break
                    case 1758:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.battle.addEnergy(this.effect[0],this.player)
                            this.userCombatant.highRoll()
                        }else{
                            this.battle.loseEnergy(this.effect[1],this.player)
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1767:
                        this.userManager.hand.freeDupes()
                        this.userManager.draw(this.effect[0])
                    break
                    case 1807:
                        this.userCombatant.statusEffect('10 or Less Damage Up',this.effect[0])
                    break
                    case 1816:
                        this.userCombatant.statusEffect('Odd Double Damage',this.effect[0])
                    break
                    case 1817:
                        this.userCombatant.statusEffect('10 or Less Double Damage',this.effect[0])
                    break
                    case 1832:
                        if(this.userManager.hand.discardDupes()){
                            this.battle.addEnergy(this.effect[0],this.player)
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1839:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.userCombatant.statusEffect('Strength',this.effect[2])
                        }
                    break
                    case 1840:
                        this.userCombatant.charge+=this.effect[0]
                        this.userManager.hand.upgrade(this.effect[1])
                    break
                    case 1841:
                        this.userCombatant.statusEffect('Damage Up',this.effect[0])
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.battle.addEnergy(this.effect[2],this.player)
                        }
                    break
                    case 1842:
                        if(this.userCombatant.energyParity(this.energy)==0){
                            this.userCombatant.statusEffect('Strength',this.effect[0]*this.energy+this.effect[2])
                        }else{
                            this.userCombatant.statusEffect('Dexterity',this.effect[1]*this.energy+this.effect[3])
                        }
                    break
                    case 1843:
                        this.userCombatant.statusEffect('Double Curse',this.effect[0])
                    break
                    case 1844:
                        this.userCombatant.randomStatusInstant(this.effect[0],[0])
                        this.userCombatant.randomStatusInstant(this.effect[1],[0])
                        this.userCombatant.randomStatusInstant(this.effect[2],[0])
                        this.userCombatant.randomStatusInstant(this.effect[3],[1])
                        this.userManager.draw(this.effect[4])
                    break
                    case 1847:
                        this.userCombatant.statusEffect('20 or More Double Damage Turn',999)
                    break
                    case 1896:
                        this.userCombatant.statusEffect('Take 2/5 Damage',this.effect[0])
                    break
                    case 1901:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        this.userCombatant.takeDamage(this.effect[1],-1)
                    break
                    case 1915:
                        this.userManager.draw(this.effect[0])
                        this.userManager.draw(this.effect[1],3)
                    break
                    case 1916:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.battle.loseEnergy(this.effect[0],this.player)
                        }
                    break
                    case 1942:
                        this.userManager.draw(this.effect[0])
                        this.userManager.draw(this.effect[1],2)
                    break
                    case 1964:
                        let possible1964=['Ace of\nSpades','Ace of\nClubs','Ace of\nHearts','Ace of\nDiamonds']
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.addRetain(findName(possible1964[floor(random(0,possible1964.length))],types.card),this.level,this.color)
                        }
                    break
                    case 1988:
                        this.userCombatant.statusEffect('Dice Up',this.effect[0])
                    break
                    case 1989:
                        this.userCombatant.statusEffect('Dice Up',this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                    case 1993:
                        this.userCombatant.statusEffect('Lowroll Dexterity',this.effect[0])
                    break
                    case 1994:
                        this.userCombatant.statusEffect('Lowroll Energy',this.effect[0])
                    break
                    case 1995:
                        this.userCombatant.statusEffect('Highroll Strength',this.effect[0])
                    break
                    case 1996:
                        this.userCombatant.statusEffect('Highroll Draw',this.effect[0])
                    break
                    case 1997:
                        this.userCombatant.statusEffect('Highroll Dexterity',this.effect[0])
                    break
                    case 1998:
                        this.userCombatant.statusEffect('Highroll Energy',this.effect[0])
                    break
                    case 2015:
                        if(this.userCombatant.charge>=this.effect[0]){
                            this.userCombatant.charge-=this.effect[0]
                            this.userCombatant.chargeConsumed()
                            this.battle.multiplyEnergy(3,this.player)
                        }else{
                            this.battle.multiplyEnergy(2,this.player)
                        }
                    break
                    case 2019:
                        this.userCombatant.statusEffect('Luck Guarantee Next Turn',1)
                    break
                    case 2020:
                        this.userCombatant.statusEffect('Luckier Time',this.effect[0])
                    break
                    case 2029:
                        this.userCombatant.statusEffect(this.amplify?'Triple Damage':'Double Damage',this.effect[0])
                    break
                    case 2056:
                        switch(this.userCombatant.stance){
                            case 1:
                                this.userCombatant.statusEffect('Strength',this.effect[0])
                            break
                            case 2:
                                this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                            break
                            case 3:
                                this.userCombatant.statusEffect('Dodge',this.effect[2])
                            break
                            case 4:
                                this.userCombatant.statusEffect('Dexterity',this.effect[3])
                            break
                        }
                    break
                    case 2105:
                        this.userCombatant.statusEffect('Extra Turn',1)
                        this.userCombatant.statusEffect('Shock',this.effect[0])
                    break
                    case 2147:
                        this.userManager.hand.plusDupes(this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                    case 2154:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                    break
                    case 2205:
                        if(this.battle.turn.total%2==0){
                            this.userCombatant.statusEffect('Strength',this.effect[0]*this.energy+this.effect[2])
                        }else{
                            this.userCombatant.statusEffect('Dexterity',this.effect[1]*this.energy+this.effect[3])
                        }
                    break
                    case 2258:
                        this.userCombatant.statusEffect('Block Next Turn',this.userCombatant.block)
                    break
                    case 2269:
                        this.userCombatant.statusEffect('Double Damage',this.effect[0])
                        if(this.userCombatant.getStatus('Shock')>0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2278:
                        this.userCombatant.statusEffect('Heal Damage Random',this.effect[0])
                    break
                    case 2292:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.battle.drop(this.player,findName('Nightfall',types.card),this.level,0)
                    break
                    case 2294:
                        this.userCombatant.statusEffect('Triple Damage',this.effect[0])
                    break
                    case 2306:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userManager.draw(this.effect[1])
                    break
                    case 2312:
                        this.battle.addEnergy(this.effect[0],this.player)*this.userManager.hand.classNumber([4])
                    break
                    case 2321:
                        this.battle.addEnergy(this.effect[0],this.player)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.randomEffect(8,[])
                        }
                    break
                    case 2322:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userManager.draw(this.effect[1])
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(8,[])
                        }
                    break
                    case 2335:
                        this.userCombatant.statusEffect('Buffer',this.effect[0])
                    break
                    case 2336:
                        this.userCombatant.statusEffect('Free Card',this.effect[0])
                    break
                    case 2372:
                        this.userCombatant.statusEffect('Double Damage Next',this.effect[0])
                    break
                    case 2373:
                        this.userCombatant.statusEffect('Strength Next Turn Next Turn Next Turn',this.effect[0])
                    break
                    case 2376:
                        this.userCombatant.statusEffect('Free Movement',1)
                    break
                    case 2377:
                        this.userCombatant.statusEffect('Free Movement',1)
                        this.userManager.draw(this.effect[0])
                    break
                    case 2385:
                        this.userManager.deAbstract(1,this.effect[0],[])
                        this.userCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 2394:
                        this.userManager.discard.randomEffect(37,[this.userManager.hand.cards])
                    break
                    case 2407:
                        this.userCombatant.statusEffect('Luck Guarantee',1)
                        this.userCombatant.life-=this.effect[0]
                    break
                    case 2408:
                        this.userManager.allEffect(2,17)
                    break
                    case 2409:
                        for(let a=0,la=4;a<la;a++){
                            this.userManager.drawClass(1,a+1,1)
                        }
                    break
                    case 2415:
                        this.userCombatant.statusEffect('Strength',this.userCombatant.ammo>=4?this.effect[0]+this.effect[1]:this.effect[0])
                    break
                    case 2417:
                        this.userCombatant.statusEffect('Temporary Strength',this.effect[0])
                        if(this.userCombatant.block>0){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 2419:
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                    case 2429:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        this.userManager.allEffect(2,52)
                    break
                    case 2448:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.draw(this.effect[0])
                        }else{
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2472:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userCombatant.statusEffect('Luck Guarantee Fail',1)
                    break
                    case 2478:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        this.userCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 2486:
                        this.userCombatant.statusEffect('Luck Guarantee Fail',1)
                    break
                    case 2518:
                        this.userCombatant.statusEffect('Random Card Cost Less Per Turn',this.effect[0])
                    break
                    case 2549:
                        this.userCombatant.statusEffect('Luck Guarantee Turn',999)
                    break
                    case 2555:
                        this.battle.overlayManager.overlays[55][this.player].active=true
                        this.battle.overlayManager.overlays[55][this.player].activate()
                    break
                    case 2558:
                        if(this.userCombatant.energyParity(this.energy)==0){
                            this.userCombatant.statusEffect('Double Damage',this.effect[0]*this.energy)
                        }else{
                            this.userCombatant.statusEffect('Conditioning',this.effect[1]*this.energy)
                        }
                    break
                    case 2559:
                        if(this.battle.turn.total%2==0){
                            this.userCombatant.statusEffect('Double Damage',this.effect[0]*this.energy)
                        }else{
                            this.userCombatant.statusEffect('Conditioning',this.effect[1]*this.energy)
                        }
                    break
                    case 2566:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,3,18,this.energy])
                    break
                    case 2568:
                        this.userCombatant.statusEffect('Damage Up',this.effect[0])
                        this.userCombatant.statusEffect('Damage Taken Up',this.effect[1])
                    break
                    case 2638:
                        let total2638=0
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].spec.includes(53)){
                                total2638++
                            }
                        }
                        this.userManager.hand.retain(this.effect[0]+total2638)
                    break
                    case 2639:
                        let total2639=0
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].spec.includes(53)){
                                total2639++
                            }
                        }
                        this.userManager.hand.upgrade(this.effect[0]+total2639)
                    break
                    case 2643:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        this.userCombatant.statusEffect('Cannot Move Next Turn',this.effect[1])
                    break
                    case 2673:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userManager.draw(this.effect[1])
                    break
                    case 2704:
                        this.userCombatant.statusEffect('Temporary Strength',this.userCombatant.getStatus('Knowledge')*this.effect[0])
                    break
                    case 2741:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        this.userCombatant.statusEffect('Bleed',this.effect[1])
                    break
                    case 2756:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        this.userCombatant.statusEffect('Vulnerable',this.effect[1])
                    break
                    case 2768:
                        this.battle.multiplyEnergy(2,this.player)
                        this.userCombatant.statusEffect('Energy Next Turn',-this.effect[0])
                    break
                    case 2792:
                        this.userCombatant.statusEffect('Triple Damage',this.effect[0])
                        this.userManager.hand.rebound(1)
                    break
                    case 2802:
                        this.battle.overlayManager.overlays[3][this.player].prune=true
                    break
                    case 2817:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        this.userCombatant.statusEffect('Temporary Strength',this.effect[1]*this.userCombatant.getStatus('Dodge'))
                    break
                    case 2826:
                        let number2826=this.userManager.hand.colorNumber()
                        this.battle.addEnergy(this.effect[0]*number2826,this.player)
                        if(this.effect[1]>0){
                            this.userManager.draw(this.effect[1]*number2826)
                        }
                    break
                    case 2922:
                        this.userCombatant.statusEffect(this.userCombatant.elemental?'Triple Damage':'Double Damage',this.effect[0])
                    break
                    case 2962:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                    case 2966:
                        this.userCombatant.statusEffect('Discus Boost',this.effect[0])
                    break
                    case 2975:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userManager.draw(this.effect[1])
                        this.battle.drop(this.player,findName('Defocus',types.card),0,game.playerNumber+1)
                    break
                    case 2984:
                        let result2984=this.userManager.drawReturn(this.effect[0])
                        if(result2984.length>0){
                            if(result2984[0].class==1){
                                this.userCombatant.statusEffect('Strength',this.effect[1])
                            }else if(result2984[0].class==2){
                                this.userCombatant.statusEffect('Dexterity',this.effect[2])
                            }
                        }
                    break
                    case 2992:
                        this.userCombatant.statusEffect('Base Energy Next Turn Next Turn',this.effect[0])
                    break
                    case 2993:
                        this.userCombatant.statusEffect('Scry Barrier',this.effect[0])
                    break
                    case 3003:
                        this.userCombatant.statusEffect('Double Damage',this.effect[0])
                        this.userManager.drawClass(this.effect[1],1)
                    break
                    case 3029:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.battle.cardManagers[this.player].randomEffect(2,1,[this.effect[1]])
                    break
                    case 3048:
                        this.userCombatant.statusEffect('Extra Turn Next Turn Next Turn',1)
                    break
                    case 3050:
                        this.userCombatant.statusEffect('Damage Taken Down',this.effect[0])
                    break
                    case 3071:
                        this.userCombatant.statusEffect('Dodge',this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                    break
                    case 3083:
                        this.userCombatant.statusEffect('Strength',this.userCombatant.totalUniqueStatus(2)+this.effect[0])
                    break
                    case 3087:
                        this.userCombatant.statusEffect('Temporary Free Common Colorless',this.effect[0])
                    break
                    case 3092:
                        this.userCombatant.statusEffect('Extra Drawless Turn',1)
                    break
                    case 3107:
                        this.userCombatant.statusEffect('Damage Highest',this.effect[0])
                    break
                    case 3122:
                        this.userCombatant.statusEffect('Double Damage',this.effect[0])
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                    break
                    case 3133:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userManager.draw(this.effect[1])
                        this.battle.drop(this.player,findName('Moonscape',types.card),0,game.playerNumber+1)
                    break

                }
                //mark 4
            break
            case 4:
                switch(this.type){
                    case 8: case 892: case 2406: case 2413:
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
                        this.userManager.discard.send(this.userManager.reserve.cards,0,-1,15)
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
                        this.userManager.hand.reserveFree(1)
                    break
                    case 76: case 3113:
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
                        this.userManager.allEffectArgs(2,21,[this.effect[0]])
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
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userManager.hand.discard(this.effect[1])
                    break
                    case 276:
                        this.userManager.hand.duplicate(this.effect[0])
                        this.userManager.randomEffect(2,0)
                    break
                    case 279: case 1856: case 2283:
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
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
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
                        this.battle.addEnergyGen(this.effect[0],this.player)
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
                        this.userManager.draw(this.effect[0])
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
                        this.userCombatant.statusEffect('Power Basic Orb',this.effect[0])
                    break
                    case 529:
                        this.userCombatant.statusEffect('Damage Taken Basic Orb',this.effect[0])
                    break
                    case 530:
                        this.userCombatant.statusEffect('Random Common Per Turn',this.effect[0])
                    break
                    case 541:
                        this.userCombatant.statusEffect('Focus',this.effect[0])
                        this.userCombatant.statusEffect('Focus Per Turn',-this.effect[1])
                    break
                    case 542:
                        this.userManager.discard.send(this.userManager.reserve.cards,0,-1,15)
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
                        this.userManager.draw(this.effect[0],1)
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
                        this.battle.addEnergy(this.effect[0],this.player)
                    break
                    case 773:
                        this.userCombatant.statusEffect('Miracle+ Time',this.energy)
                        this.battle.addEnergy(this.effect[0],this.player)
                    break
                    case 774:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                        this.userCombatant.statusEffect('Dexterity',this.effect[1])
                        this.battle.loseEnergyGen(this.effect[2],this.player)
                    break
                    case 781:
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[0])
                        this.userCombatant.statusEffect('Wrath Next Turn',1)
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
                        this.battle.addEnergy(floor(ceil(this.userManager.discard.cards.length/2)/max(1,this.effect[0])),this.player)
                        this.userManager.discard.halfEffect(0)
                    break
                    case 855:
                        this.userCombatant.statusEffect('Amplify Return',1)
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
                        this.battle.addEnergy(this.effect[0],this.player)
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
                        this.userManager.hand.add(findName('Slidebuffer',types.card),this.level,this.color,this.edition)
                    break
                    case 1026:
                        this.battle.addEnergy(this.effect[0],this.player)
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
                        this.battle.dropDrawShuffle(this.player,findName('Magic\nTrick Card',types.card),this.level,0)
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
                            this.userManager.addRandomCompleteAllContainFree(2,this.level,['Strike','strike'])
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
                        this.userCombatant.enterStance(this.userCombatant.luckCheck()?5:this.userCombatant.luckCheckFail()?0:floor(random(1,6)))
                    break
                    case 1214:
                        this.userManager.baseDrops+=this.effect[0]
                    break
                    case 1221:
                        if(variants.blackjack){
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.cardManagers[this.turn.main].draw(1)
                                this.cardManagers[this.turn.main].drops+=this.userCombatant.luckCheck()?6:this.userCombatant.luckCheckFail?1:floor(random(1,7))
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
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.battle.overlayManager.overlays[8][this.player].active=true
                            this.battle.overlayManager.overlays[8][this.player].activate()
                            this.userCombatant.highRoll()
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
                    case 1249: case 1806:
                        this.userManager.hand.allEffectArgs(8,[this.effect[0]])
                    break
                    case 1250:
                        this.userManager.hand.allEffectArgs(8,[this.energy+this.effect[0]])
                    break
                    case 1253:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,4))!=0){
                            this.battle.overlayManager.overlays[8][this.player].active=true
                            this.battle.overlayManager.overlays[8][this.player].activate()
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1254:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,10))!=0){
                            this.battle.overlayManager.overlays[8][this.player].active=true
                            this.battle.overlayManager.overlays[8][this.player].activate()
                            this.userCombatant.highRoll()
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
                        this.userManager.hand.rewind(this.effect[1])
                    break
                    case 1420:
                        this.userManager.hand.allEffect(49)
                    break
                    case 1422:
                        this.userManager.allEffectArgs(2,21,[this.effect[0]])
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
                    case 1496:
                        this.userCombatant.statusEffect('Self-Reflect',this.effect[0])
                    break
                    case 1510:
                        this.userManager.hand.discard(this.effect[0])
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1527:
                        this.userManager.hand.duplicate(this.effect[0])
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 1543:
                        this.userManager.hand.addEffect(findName('Snip',types.card),0,0,0,ceil(this.battle.getEnergy(this.player)/2))
                        this.battle.loseEnergy(ceil(this.battle.getEnergy(this.player)/2),this.player)
                    break
                    case 1608:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassFree(2,0,3,0)
                        }
                    break
                    case 1609:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassFree(2,0,3,1)
                        }
                    break
                    case 1624:
                        this.userManager.hand.add(findName('Ready\nor Not',types.card),0,0)
                    break
                    case 1639:
                        this.userManager.randomEffect(2,4,[0])
                    break
                    case 1650:
                        this.userManager.hand.add(findName(['Wind\nCrystal','Cauldron\nCrystal','Star\nCrystal','Pea Shooter\nCrystal'][floor(random(0,4))],types.card),this.level,0)
                    break
                    case 1664:
                        this.userCombatant.statusEffect('Faith Next Turn',this.effect[0])
                    break
                    case 1675:
                        this.userCombatant.faith+=this.effect[0]
                        this.userCombatant.life-=this.effect[1]
                        this.userManager.hand.exhaust(this.effect[2])
                    break
                    case 1676:
                        let roll=floor(random(1,5))
                        this.userCombatant.enterStance(roll)
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClass(2,0,[1,4,3,2][roll-1])
                        }
                    break
                    case 1685:
                        this.battle.dropDraw(this.player,findName('Peak',types.card),this.level,0)
                        this.battle.dropDraw(this.player,findName('Trough',types.card),this.level,game.playerNumber+1)
                    break
                    case 1694:
                        if(game.theme==3){
                            this.userManager.reCard('Fatigue',findName('Sandstone',types.card))
                        }else{
                            this.userManager.reCard('Fatigue',findName('Quicksand',types.card))
                            game.theme=3
                        }
                    break
                    case 1695:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userManager.draw(this.effect[0])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1716:
                        this.battle.dropDraw(this.player,findName('Uptick',types.card),this.level,0)
                        this.battle.dropDraw(this.player,findName('Downtick',types.card),this.level,game.playerNumber+1)
                    break
                    case 1718:
                        this.battle.dropDraw(this.player,findName('Buff\nUp',types.card),this.level,0)
                        this.battle.dropDraw(this.player,findName('Nerf\nUp',types.card),this.level,game.playerNumber+1)
                    break
                    case 1743:
                        this.userManager.hand.allEffectArgs(8,[this.effect[0]])
                        this.userManager.draw(this.effect[1])
                    break
                    case 1747:
                        this.userManager.hand.allEffect(54)
                    break
                    case 1783:
                        this.userManager.hand.allEffect(55)
                    break
                    case 1808:
                        this.userManager.hand.reserveRetain(this.effect[0])
                    break
                    case 1813:
                        if(this.battle.getEnergy(this.player)%3==0){
                            this.userManager.hand.addEffect(findName('Snip',types.card),0,0,0,ceil(this.battle.getEnergy(this.player/3)))
                            this.battle.loseEnergy(ceil(this.battle.getEnergy(this.player/3)),this.player)
                        }
                    break
                    case 1849:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.randomEffect(2,13,[])
                        }
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
                        }
                        if(this.relPos[1]==0){
                            this.userCombatant.heal(this.effect[2])
                        }
                    break
                    case 1853:
                        this.userManager.draw(this.effect[1])
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userCombatant.statusEffect('Miss',this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1857:
                        this.userManager.drawPrice(this.effect[0],0)
                        this.userCombatant.addBlock(this.effect[1])
                    break
                    case 1871:
                        if(this.userManager.exhaust.cards.length>0){
                            this.userManager.exhaust.send(this.userManager.hand.cards,this.userManager.exhaust.cards.length-1,this.userManager.exhaust.cards.length,1)
                        }
                    break
                    case 1872:
                        this.userManager.draw(this.userManager.exhaust.length+this.effect[0])
                    break
                    case 1885:
                        this.userManager.hand.randomEffect(27,[this.effect[0]])
                        this.userManager.draw(this.effect[1])
                    break
                    case 1886:
                        this.userManager.hand.allEffectArgs(8,[this.effect[0]])
                        this.userCombatant.statusEffect('Double Damage',this.effect[1])
                    break
                    case 1930:
                        this.userManager.draw(this.effect[0])
                        if(this.userCombatant.stance==3){
                            this.userCombatant.enterStance(0)
                        }
                    break
                    case 1936:
                        this.userManager.swap(1,3)
                        this.userManager.draw(this.effect[0])
                    break
                    case 1938:
                        this.userManager.reserve.allEffect(56)
                        this.userManager.discard.allEffect(56)
                        this.userManager.exhaust.allEffect(56)
                    break
                    case 1939:
                        this.userManager.reserve.allEffect(56)
                        this.userManager.discard.allEffect(56)
                        this.userManager.exhaust.allEffect(56)
                        this.userManager.draw(this.effect[0])
                    break
                    case 1946: case 1952:
                        this.userManager.hand.addLimit(findName('Stolen\nAttack',types.card),0,0,[this.targetCombatant.id,this.targetCombatant.intent])
                    break
                    case 1953:
                        this.userCombatant.statusEffect('2 Exhaust Draw',this.effect[0])
                    break
                    case 1956:
                        this.userManager.allEffect(2,57)
                        this.userManager.draw(this.effect[0])
                    break
                    case 1957:
                        this.userManager.allEffect(2,35)
                        this.userManager.draw(this.effect[0])
                    break
                    case 1987:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Strike',types.card),this.level,this.color)
                        }
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Defend',types.card),this.level,this.color)
                        }
                    break
                    case 2000:
                        this.userCombatant.balance=0
                        this.userManager.draw(this.effect[0])
                    break
                    case 2039:
                        for(let a=0;a<this.effect[0];a++){
                            this.userManager.addRandomColor(2,0,0,1)
                        }
                    break
                    case 2060:
                        this.userManager.hand.discard(this.effect[0])
                        this.userManager.hand.exhaust(this.effect[1])
                    break
                    case 2061:
                        this.userManager.hand.discard(this.effect[0])
                        this.userManager.hand.exhaust(this.effect[1])
                        this.battle.addEnergy(this.effect[2],this.player)
                    break
                    case 2120:
                        this.battle.overlayManager.overlays[44][this.player].active=true
                        this.battle.overlayManager.overlays[44][this.player].activate()
                    break
                    case 2153:
                        this.userManager.hand.discard(this.effect[0])
                        this.userManager.hand.duplicate(this.effect[1])
                    break
                    case 2171:
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.discard.costNumber(0),this.user)
                    break
                    case 2196:
                        this.userCombatant.statusEffect('Discard Block',this.effect[0])
                    break
                    case 2213:
                        if(this.targetCombatant.life<this.userCombatant.life){
                            this.userCombatant.statusEffect('Strength',this.effect[0])
                        }else{
                            this.userCombatant.statusEffect('Dexterity',this.effect[1])
                        }
                    break
                    case 2238:
                        this.userManager.drawPrice(this.effect[1],1)
                        this.userManager.draw(this.effect[0])
                    break
                    case 2243:
                        this.battle.overlayManager.overlays[18][this.player].active=true
                        this.battle.overlayManager.overlays[18][this.player].activate()
                        this.userManager.allEffect(2,17)
                    break
                    case 2246:
                        this.userManager.discard.send(this.userManager.hand.cards,0,min(2,this.userManager.discard.cards.length),2)
                    break
                    case 2247:
                        this.userCombatant.statusEffect('Regeneration',this.effect[0]*this.userManager.hand.allEffectArgs(12,[1]))
                    break
                    case 2254:
                        this.userCombatant.statusEffect('Block Heal',1)
                    break
                    case 2263:
                        this.userManager.draw(this.battle.counter.turnPlayed[0]>=this.effect[2]+1?this.effect[0]+this.effect[1]:this.effect[0])
                    break
                    case 2267:
                        this.userManager.draw(this.effect[0])
                        if(this.userCombatant.block>0){
                            this.userCombatant.statusEffect('Dexterity',this.effect[1])
                        }
                    break
                    case 2268:
                        this.userCombatant.statusEffect('2 Cost Block',this.effect[0])
                    break
                    case 2275:
                        this.userManager.drawPrice(this.effect[0],0)
                        this.userManager.hand.exhaust(this.effect[1])
                    break
                    case 2276:
                        this.userCombatant.heal(this.effect[0])
                        this.userManager.draw(this.effect[1],1)
                    break
                    case 2281:
                        this.userManager.draw(this.effect[0])
                        this.userCombatant.statusEffect('Control',this.effect[1])
                    break
                    case 2285:
                        this.userManager.hand.allEffect(71)
                    break
                    case 2311:
                        this.userManager.hand.discard(this.effect[0])
                        if(this.relPos[1]==0){
                            this.userCombatant.statusEffect('Weak',this.effect[1])
                        }
                    break
                    case 2318:
                        let amount2318=this.userManager.hand.cards.length
                        this.userManager.allEffect(2,1)
                        for(let a=0,la=amount2318+this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName(`${floor(random(1,14))} of\nNothings`,types.card),0,0)
                        }
                    break
                    case 2319:
                        this.userManager.allEffect(2,1)
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.duplicate(this.effect[1])
                    break
                    case 2325:
                        this.userManager.draw(this.effect[0])
                        this.userCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 2392:
                        this.userManager.hand.discardFree(this.effect[0])
                    break
                    case 2403:
                        this.userManager.drawSetCost(this.effect[0],7)
                    break
                    case 2410:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                            this.userCombatant.statusEffect('Buffer',this.effect[0])
                        }
                    break
                    case 2426:
                        this.userManager.allGroupEffect(73)
                    break
                    case 2446:
                        this.battle.overlayManager.overlays[48][this.player].active=true
                        this.battle.overlayManager.overlays[48][this.player].activate()
                    break
                    case 2447:
                        this.userManager.drawBottom(this.effect[0])
                        this.userManager.hand.discard(this.effect[1])
                    break
                    case 2451:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomSpec(2,0,52)
                        }
                    break
                    case 2455:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomCompleteAllContain(2,this.level,['Silver','silver'])
                        }
                    break
                    case 2488:
                        let holdLength=this.userManager.hand.cards.length
                        this.userManager.draw(1)
                        if(this.userManager.hand.cards.length>holdLength){
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.userManager.hand.copySelfInput(this.userManager.hand.cards.length-1)
                            }
                        }
                    break
                    case 2499:
                        this.battle.overlayManager.overlays[50][this.player].active=true
                        this.battle.overlayManager.overlays[50][this.player].activate()
                        this.userManager.allEffect(2,5)
                    break
                    case 2501:
                        this.userManager.drawPrice(this.effect[0],1)
                    break
                    case 2512:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,4))==0){
                            this.battle.overlayManager.overlays[44][this.player].active=true
                            this.battle.overlayManager.overlays[44][this.player].activate()
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2513:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,5))<=1){
                            this.battle.overlayManager.overlays[44][this.player].active=true
                            this.battle.overlayManager.overlays[44][this.player].activate()
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2514:
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.battle.overlayManager.overlays[44][this.player].active=true
                            this.battle.overlayManager.overlays[44][this.player].activate()
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2517:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.allEffect(2,78)
                        }
                    break
                    case 2563:
                        this.userManager.hand.discardTriple(this.effect[0])
                    break
                    case 2565:
                        this.userManager.draw(this.effect[0])
                        this.userCombatant.removeRandomStatus([1,3])
                    break
                    case 2573:
                        this.userCombatant.addBlock(this.userManager.deck.uniqueNumber())
                    break
                    case 2574:
                        this.userManager.allEffect(2,1)
                        this.userManager.draw(this.effect[0])
                    break
                    case 2677:
                        this.userCombatant.statusEffect('History',this.effect[0])
                        if(this.userCombatant.elemental){
                            this.battle.combatantManager.allEffect(30,[this.effect[1]])
                        }
                    break
                    case 2683:
                        this.userCombatant.vision+=this.effect[0]
                        if(this.userCombatant.elemental){
                            this.userCombatant.statusEffect('Dexterity',this.effect[1])
                        }
                    break
                    case 2684:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Refreshed',types.card),0,game.playerNumber+1)
                        }
                        this.userManager.hand.exhaust(this.effect[1])
                    break
                    case 2686:
                        this.userCombatant.vision+=this.effect[0]
                        if(this.userCombatant.elemental){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 2687:
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.rewind(this.effect[1])
                        this.userCombatant.vision+=this.effect[2]
                    break
                    case 2690:
                        this.userCombatant.vision+=this.userManager.hand.cards.length*this.effect[0]
                        this.userManager.hand.allEffect(86)
                        this.userManager.draw(this.effect[1])
                    break
                    case 2691:
                        this.userCombatant.statusEffect('Knowledge',this.effect[0])
                        if(this.userCombatant.elemental){
                            this.userCombatant.statusEffect('Wisdom',this.effect[1])
                        }
                    break
                    case 2698:
                        this.userCombatant.vision+=this.effect[0]
                        this.userManager.hand.rewindAny()
                    break
                    case 2699:
                        this.userCombatant.statusEffect('History Per Turn',this.effect[0])
                    break
                    case 2703:
                        this.userCombatant.vision+=this.userManager.hand.cards.length+this.effect[0]
                    break
                    case 2706:
                        this.userCombatant.statusEffect('3 Rewind Draw',this.effect[0])
                    break
                    case 2707:
                        this.userCombatant.statusEffect('2 Rewind Draw',this.effect[0])
                    break
                    case 2708:
                        this.userCombatant.statusEffect('Rewind Block',this.effect[0])
                    break
                    case 2710:
                        this.userCombatant.statusEffect('Knowledge',this.effect[0])
                        this.userCombatant.statusEffect('Draw Up',this.effect[1])
                        this.userCombatant.statusEffect('Turn Rewind',this.effect[2])
                    break
                    case 2715:
                        this.userManager.draw(this.effect[0])
                        this.userManager.hand.rewind(this.effect[1])
                        this.userManager.hand.add(findName('Disappointed',types.card),0,game.playerNumber+1)
                    break
                    case 2717:
                        this.battle.overlayManager.overlays[this.userCombatant.elemental?29:8][this.player].active=true
                        this.battle.overlayManager.overlays[this.userCombatant.elemental?29:8][this.player].activate()
                    break
                    case 2718:
                        let max2718=max(this.userCombatant.status.main[findList('Knowledge',this.userCombatant.status.name)],this.userCombatant.status.main[findList('History',this.userCombatant.status.name)])
                        this.userCombatant.status.main[findList('Knowledge',this.userCombatant.status.name)]=max2718
                        this.userCombatant.status.main[findList('History',this.userCombatant.status.name)]=max2718
                    break
                    case 2719:
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
                    break
                    case 2736:
                        this.userCombatant.statusEffect('Rewind Cost Down',999)
                    break
                    case 2740:
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[0],this.effect[1]])
                    break
                    case 2774:
                        this.userManager.draw(this.effect[0])
                        this.userCombatant.heal(this.effect[1])
                        this.userCombatant.statusEffect('Lose 1 HP',this.effect[2])
                    break
                    case 2788:
                        this.userManager.randomEffect(1,5,[])
                    break
                    case 2789:
                        this.userManager.draw(this.effect[0],4)
                    break
                    case 2796:
                        this.userManager.draw(this.effect[0])
                        this.userManager.allEffect(2,5)
                    break
                    case 2806:
                        this.userCombatant.statusEffect('Strength',this.effect[0]+this.targetCombatant.getStatus('Strength'))
                    break
                    case 2809:
                        this.battle.overlayManager.overlays[6][this.player].active=true
                        this.battle.overlayManager.overlays[6][this.player].activate([0,3,1])
                        this.userCombatant.life-=this.effect[0]
                    break
                    case 2845:
                        this.userManager.draw(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.itemManager.addItem(findName('Caffeine Pill',types.item),this.player)
                        }
                    break
                    case 2849:
                        this.userManager.hand.exhaust(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.itemManager.addItem(findName('Mystery Box',types.item),this.player)
                        }
                    break
                    case 2867:
                        let marker2867=constrain(this.battle.itemManager.total[this.player],0,this.effect[0])
                        this.userManager.drawPrice(marker2867,0)
                        this.userManager.draw(this.effect[0]-marker2867)
                    break
                    case 2869:
                        this.userCombatant.vision+=this.effect[0]
                        if(this.userCombatant.elemental){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 2870:
                        this.userManager.hand.rewind(this.effect[0])
                        if(this.userCombatant.elemental){
                            this.userManager.draw(this.effect[1],1)
                        }
                    break
                    case 2882:
                        if(this.relPos[0]>0){
                            this.userManager.hand.cards[this.relPos[0]-1].cost=0
                        }
                        if(this.relPos[0]<this.relPos[1]){
                            this.userManager.hand.cards[this.relPos[0]].cost=0
                        }
                    break
                    case 2901:
                        this.userCombatant.statusEffect('Scry Per Turn',this.effect[0])
                    break
                    case 2917:
                        this.battle.overlayManager.overlays[63][this.player].active=true
                        this.battle.overlayManager.overlays[63][this.player].activate([this.effect[0],this.effect[1]])
                    break
                    case 2950:
                        let result2950=this.userManager.drawReturn(this.effect[0])
                        if(result2950.length>0&&result2950[0].cost>0){
                            this.battle.addEnergy(result2950[0].cost,this.player)
                        }
                    break
                    case 2956:
                        this.userCombatant.statusEffect('Scry Up',this.effect[0])
                    break
                    case 2974:
                        this.userManager.draw(this.effect[0])
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[1],this.effect[2]])
                    break
                    case 3002:
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[0],0])
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                    break
                    case 3020:
                        this.userCombatant.statusEffect('Tick Per Turn',1)
                    break
                    case 3023:
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[0],this.effect[1]])
                        this.userCombatant.statusEffect('Energy Next Turn',-this.effect[2])
                    break
                    case 3025:
                        this.userManager.hand.exhaust(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.addRandomClassFree(2,0,1,0)
                        }
                    break
                    case 3038:
                        this.userManager.discard.send(this.userManager.reserve.cards,0,-1,15)
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.userManager.reserve.cards.length,0])
                    break
                    case 3040:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.randomEffect(2,3,[0])
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 3045:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,3,22,2,this.effect[0],this.effect[1]])
                    break
                    case 3046:
                        this.battle.overlayManager.overlays[68][this.player].active=true
                        this.battle.overlayManager.overlays[68][this.player].activate([this.effect[0],this.effect[1]])
                    break
                    case 3047:
                        this.userManager.drawSetCost(this.effect[0],2)
                        this.userManager.drawSetCost(this.effect[1],8)
                    break
                    case 3055:
                        let result3055=this.userManager.drawReturn(this.effect[0])
                        if(result3055.length>0&&result3055[0].class==4){
                            this.userCombatant.statusEffect('Intangible',this.effect[1])
                        }
                    break
                    case 3056:
                        this.battle.overlayManager.overlays[69][this.player].active=true
                        this.battle.overlayManager.overlays[69][this.player].activate([this.effect[0],this.effect[1],this.effect[2]])
                    break
                    case 3059:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassFree(2,0,4,0)
                        }
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 3060:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomClassFree(2,0,4,1)
                        }
                        this.userCombatant.life-=this.effect[1]
                    break
                    case 3085:
                        this.battle.overlayManager.overlays[71][this.player].active=true
                        this.battle.overlayManager.overlays[71][this.player].activate()
                        this.userManager.draw(this.effect[0])
                    break
                    case 3105:
                        for(let a=0;a<this.effect[0];a++){
                            this.userManager.addRandomColor(2,0,0,0)
                        }
                    break
                    case 3123:
                        this.userManager.hand.duplicateCommonColorless(this.effect[0])
                    break
                    case 3126:
                        this.userManager.deck.add(this.userManager.listing.card[0][0][floor(random(0,this.userManager.listing.card[0][0].length))],0,0)
                        this.battle.overlayManager.overlays[6][this.player].active=true
                        this.battle.overlayManager.overlays[6][this.player].activate([0,3,1])
                    break
                    case 3141:
                        this.userManager.allGroupEffectArgs(22,[this.effect[0]])
                    break
                    case 3153:
                        this.battle.overlayManager.overlays[72][this.player].active=true
                        this.battle.overlayManager.overlays[72][this.player].activate()
                    break

                }
                //mark 5
            break
            case 5:
                switch(this.type){
                    case -13: case -36:
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
                    case -41:
                        this.battle.combatantManager.damageAreaRuleless(this.effect[0],this.userCombatant.tilePosition)
                        this.userCombatant.statusEffect('Cannot Move',this.effect[1])
                    break
                    case -62:
                        this.userCombatant.statusEffect('Must Attack or Take Damage',this.effect[0])
                    break
                    case 10: case 1803: case 2598:
                        this.userCombatant.heal(this.effect[0])
                    break
                    case 64: case 2581:
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
                        }else if(this.userCombatant.luckCheckFail()){
                            this.userManager.hand.add(findName('Riot\nShield',types.card),0,this.color)
                            this.userManager.hand.add(findName('Pepper\nSpray',types.card),0,this.color)
                            this.userManager.hand.add(findName('Shock\nBaton',types.card),0,this.color)
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
                        }else if(this.userCombatant.luckCheckFail()){
                            this.userManager.hand.add(findName('Flamethrower',types.card),0,this.color)
                            this.userManager.hand.add(findName('Impact\nGrenade',types.card),0,this.color)
                            this.userManager.hand.add(findName('Safemine',types.card),0,this.color)
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
                        }else if(this.userCombatant.luckCheckFail()){
                            this.userManager.hand.add(findName('Submachine',types.card),0,this.color)
                            this.userManager.hand.add(findName('Antitank\nRocket',types.card),0,this.color)
                            this.userManager.hand.add(findName('Ammo\nBox',types.card),0,this.color)
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
                        this.battle.addEnergy(this.effect[0],this.player)
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
                        let total456=0
                        for(let a=0,la=this.battle.itemManager.items[this.player].length;a<la;a++){
                            if(this.battle.itemManager.items[this.player][a].type>1){
                                this.battle.itemManager.total[this.player]--
                                this.battle.itemManager.items[this.player][a].type=1
                                this.battle.itemManager.items[this.player][a].refresh()
                                total456++
                            }
                        }
                        this.userCombatant.gainMaxHP(this.effect[0]*total456)
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
                        }else if(this.userCombatant.luckCheckFail()){
                            this.userManager.hand.add(findName('Riot\nShield',types.card),0,this.color)
                            this.userManager.hand.add(findName('Pepper\nSpray',types.card),0,this.color)
                            this.userManager.hand.add(findName('Shock\nBaton',types.card),0,this.color)
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
                        }else if(this.userCombatant.luckCheckFail()){
                            this.userManager.hand.add(findName('Flamethrower',types.card),0,this.color)
                            this.userManager.hand.add(findName('Impact\nGrenade',types.card),0,this.color)
                            this.userManager.hand.add(findName('Safemine',types.card),0,this.color)
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
                        }else if(this.userCombatant.luckCheckFail()){
                            this.userManager.hand.add(findName('Submachine',types.card),0,this.color)
                            this.userManager.hand.add(findName('Antitank\nRocket',types.card),0,this.color)
                            this.userManager.hand.add(findName('Ammo\nBox',types.card),0,this.color)
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
                        }else if(this.userCombatant.luckCheckFail()){
                            this.userManager.hand.add(findName('Fire\nBall',types.card),0,this.color)
                            this.userManager.hand.add(findName('Water\nBall',types.card),0,this.color)
                            this.userManager.hand.add(findName('Grass\nBall',types.card),0,this.color)
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
                        }else if(this.userCombatant.luckCheckFail()){
                            this.userManager.hand.add(findName('Fire\nBall',types.card),0,this.color)
                            this.userManager.hand.add(findName('Water\nBall',types.card),0,this.color)
                            this.userManager.hand.add(findName('Grass\nBall',types.card),0,this.color)
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
                        }else if(this.userCombatant.luckCheckFail()){
                            this.userManager.hand.add(findName('Build\nWall',types.card),0,this.color)
                            this.userManager.hand.add(findName('MobJustice',types.card),0,this.color)
                            this.userManager.hand.add(findName('Indictment',types.card),0,this.color)
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
                        }else if(this.userCombatant.luckCheckFail()){
                            this.userManager.hand.add(findName('Build\nWall',types.card),0,this.color)
                            this.userManager.hand.add(findName('MobJustice',types.card),0,this.color)
                            this.userManager.hand.add(findName('Indictment',types.card),0,this.color)
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
                        if(this.battle.getEnergy(this.player)>=1&&this.battle.getEnergy(this.player)<=6){
                            if(this.userCombatant.luckCheck()){
                                this.battle.setEnergy(6,this.player)
                            }else if(this.userCombatant.luckCheckFail()){
                                this.battle.setEnergy(1,this.player)
                            }else{
                                let list=[1,2,3,4,5,6]
                                let index=list.indexOf(this.battle.getEnergy(this.player))
                                list.splice(index,1)
                                list.splice(list.indexOf(7-this.battle.getEnergy(this.player)),1)
                                this.battle.setEnergy(list[floor(random(0,list.length))],this.player)
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
                            this.userManager.hand.duplicate(this.effect[2])
                        }
                    break
                    case 1495:
                        this.userCombatant.statusEffect('Self Damage Immunity',1)
                    break
                    case 1518:
                        this.battle.loseCurrency(this.effect[0],this.player)
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.userCombatant.heal(this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1528:
                        this.userCombatant.heal(this.effect[0])
                        this.targetCombatant.heal(this.effect[1])
                    break
                    case 1533:
                        this.userCombatant.statusEffect('Cannot Move',1)
                        this.userCombatant.statusEffect('Cannot Be Pushed',1)
                    break
                    case 1539:
                        this.targetCombatant.statusEffect('Block Next Turn',this.targetCombatant.block)
                        this.targetCombatant.block=0
                    break
                    case 1606:
                        this.userCombatant.heal(this.effect[0])
                        this.userCombatant.statusEffect('Cannot Move',this.effect[1])
                        this.userManager.hand.add(findName('Fat\nDefend',types.card),0,types.card[findName('Fat\nDefend',types.card)].list)
                    break
                    case 1617:
                        if(this.relPos[0]==0){
                            this.targetCombatant.statusEffect('Freeze',this.effect[0])
                        }
                        if(this.relPos[0]==this.relPos[1]){
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                        }
                    break
                    case 1665:
                        this.userCombatant.statusEffect('Hook',1)
                    break
                    case 1710:
                        this.userCombatant.combo+=this.effect[0]
                        this.userCombatant.heal(this.effect[1])
                    break
                    case 1712:
                        this.battle.addEnergy(this.effect[0],this.player)
                        this.userCombatant.loseMaxHP(this.effect[1])
                    break
                    case 1824:
                        this.userCombatant.heal(this.effect[0])
                        this.userCombatant.statusEffect('Freeze',this.effect[1])
                    break
                    case 1827:
                        this.userCombatant.heal(this.effect[0])
                        this.userManager.hand.allEffectArgs(8,[this.effect[1]])
                    break
                    case 1836:
                        this.userCombatant.heal(this.effect[0])
                        this.userCombatant.statusEffect('Counter All Combat',this.effect[1])
                    break
                    case 1931:
                        this.userCombatant.life-=this.effect[0]
                        this.userManager.allEffect(2,5)
                    break
                    case 1933:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,0,11,3])
                    break
                    case 1986:
                        this.userManager.allGroupEffectArgs(11,[1])
                    break
                    case 2154:
                        this.userCombatant.statusEffect('Strength',this.effect[0])
                    break
                    case 2250:
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[0]*(this.battle.combatantManager.getArea(this.userCombatant.team,this.targetCombatant.tilePosition,1).length>=1?2:1))
                    break
                    case 2310:
                        this.userCombatant.statusEffect('Damage Taken Regeneration',this.effect[0])
                    break
                    case 2338:
                        this.userManager.hand.addEffect(findName('Timestamp',types.card),0,0,0,this.battle.turn.total)
                    break
                    case 2341:
                        this.userCombatant.heal(this.effect[0])
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2352:
                        this.userManager.allGroupEffect(72)
                    break
                    case 2353:
                        this.userManager.allGroupEffectArgs(14,[this.effect[0]])
                    break
                    case 2354:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomCompleteAllContainClass(2,this.level,['Cable','cable'],1,0)
                        }
                    break
                    case 2402:
                        this.userCombatant.statusEffect('Strike Block',this.effect[0])
                    break
                    case 2412:
                        this.userCombatant.heal(this.effect[0])
                        this.battle.overlayManager.overlays[13][this.battle.turn.main].active=true
                        this.battle.overlayManager.overlays[13][this.battle.turn.main].activate()
                    break
                    case 2432:
                        this.userManager.draw(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
                        }
                    break
                    case 2433:
                        this.userCombatant.statusEffect('Vulnerable',this.effect[0])
                        this.battle.addEnergy(this.effect[1],this.player)
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 2449:
                        this.userCombatant.statusEffect('Dexterity',this.effect[0])
                    break
                    case 2450:
                        this.userCombatant.statusEffect('Counter All',this.effect[0])
                    break
                    case 2452:
                        this.userCombatant.statusEffect('Jinxheal',this.effect[0])
                    break
                    case 2502:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomCompleteAllContainClass(2,this.level,['Cable','cable'],1,1)
                        }
                    break
                    case 2507:
                        this.userCombatant.statusEffect('Damage Dealt Currency',this.effect[0])
                    break
                    case 2508:
                        this.userCombatant.statusEffect('Damage Taken Currency',this.effect[0])
                    break
                    case 2509:
                        this.userCombatant.heal(this.effect[0]*this.userManager.hand.cards.length)
                        this.userManager.allEffect(2,1)
                    break
                    case 2519:
                        this.userManager.allGroupEffect(79)
                    break
                    case 2548:
                        this.battle.itemManager.dupeRandom(this.player)
                    break
                    case 2590:
                        this.userCombatant.statusEffect('Armor',this.effect[0])
                        this.userCombatant.statusEffect('Frail',this.effect[1])
                        this.userCombatant.statusEffect('Control',this.effect[2])
                    break
                    case 2642:
                        let total2642=0
                        for(let a=0,la=this.battle.itemManager.items[this.player].length;a<la;a++){
                            if(this.battle.itemManager.items[this.player][a].type>1){
                                this.battle.itemManager.total[this.player]--
                                this.battle.itemManager.items[this.player][a].type=1
                                this.battle.itemManager.items[this.player][a].refresh()
                                total2642++
                            }
                        }
                        this.userCombatant.statusEffect('Strength',this.effect[0]*total2642)
                    break
                    case 2688:
                        this.userCombatant.statusEffect('History Target All',999)
                    break
                    case 2695:
                        if(this.userCombatant.getStatus('Wisdom')<=1){
                            this.userCombatant.statusEffect('Wisdom',this.effect[0])
                        }
                        this.userManager.hand.rewindTop(this.effect[1])
                        this.userManager.draw(this.effect[2])
                    break
                    case 2727:
                        this.userCombatant.gainMaxHP(this.effect[0])
                        this.userCombatant.statusEffect('Weak',999)
                        this.userCombatant.statusEffect('Vulnerable',999)
                    break
                    case 2738:
                        this.userManager.hand.allEffect(22)
                        this.userCombatant.statusEffect('Knowledge',this.effect[0])
                        this.userCombatant.removeAllStatuses([1,3])
                    break
                    case 2805:
                        this.userManager.hand.exhaust(this.effect[0])
                        this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)].clearTypes()
                    break
                    case 2820:
                        this.userCombatant.heal(this.effect[0])
                        this.userCombatant.statusEffect('Retain Block',this.effect[1])
                    break
                    case 2895:
                        this.userCombatant.heal(this.effect[0])
                        this.userCombatant.barrier+=this.userCombatant.block
                        this.userCombatant.block=0
                    break
                    case 2958:
                        this.userCombatant.statusEffect('2+ Cost Energy',this.effect[0])
                        this.userCombatant.statusEffect('2+ Cost Draw',this.effect[1])
                    break
                    case 2965:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Dual\nDiscus',types.card),this.level,0)
                        }
                        this.userManager.hand.exhaust(this.effect[1])
                    break
                    case 2990:
                        this.userCombatant.heal(this.effect[0])
                        this.userCombatant.removeRandomStatus([1,3])
                    break
                    case 3005:
                        this.userCombatant.heal(this.effect[0])
                        let result3005=this.userManager.drawReturn(this.effect[1])
                        if(result3005.length>0&&result3005[0].class==1){
                            this.battle.loseEnergy(this.effect[2],this.player)
                        }
                    break
                    case 3008:
                        this.userCombatant.heal(this.effect[0])
                        this.battle.overlayManager.overlays[3][this.player].additionalOptions+=this.effect[1]
                    break

                }
                //mark 6
            break
            case 6:
                switch(this.type){
                    case 36: case 1649: case 1740:
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
                            this.targetCombatant.statusEffect('Burn',this.effect[0])
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                            this.userManager.draw(this.effect[2])
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,2))==0){
                                this.targetCombatant.statusEffect('Burn',this.effect[0])
                            }else{
                                this.targetCombatant.takeDamage(this.effect[1],this.user)
                                this.userManager.draw(this.effect[2])
                            }
                        }
                    break
                    case 1428:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.statusEffect('Freeze',this.effect[0])
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                            this.userManager.draw(this.effect[2])
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,2))==0){
                                this.targetCombatant.statusEffect('Freeze',this.effect[0])
                            }else{
                                this.targetCombatant.takeDamage(this.effect[1],this.user)
                                this.userManager.draw(this.effect[2])
                            }
                        }
                    break
                    case 1463:
                        this.targetCombatant.heal(this.effect[0])
                        this.targetCombatant.statusEffect('Poison',this.effect[1])
                    break
                    case 1474:
                        this.targetCombatant.statusEffect('Half Damage Turn',this.effect[0])
                    break
                    case 1822:
                        this.targetCombatant.statusEffect('Burn',this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                    break
                    case 1828:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.statusEffect('Burn',this.effect[0])
                            this.targetCombatant.statusEffect('Shock',this.effect[1])
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,2))==0){
                                this.targetCombatant.statusEffect('Burn',this.effect[0])
                            }else{
                                this.targetCombatant.statusEffect('Shock',this.effect[1])
                            }
                        }
                    break
                    case 1829:
                        this.targetCombatant.heal(this.effect[0])
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 1830:
                        this.targetCombatant.statusEffect('Shock',this.effect[0]*floor(this.userCombatant.life/max(1,this.effect[1])))
                    break
                    case 1934:
                        this.targetCombatant.statusEffect('Half Damage Turn',this.effect[0])
                        this.userCombatant.statusEffect('Half Damage Turn',this.effect[0])
                    break
                    case 1967:
                        this.targetCombatant.heal(this.effect[0])
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 1968:
                        this.targetCombatant.statusEffect('Bleed',this.effect[0])
                        this.targetCombatant.statusEffect('Bruise',this.effect[1])
                    break
                    case 2627:
                        this.targetCombatant.block=0
                        this.targetCombatant.statusEffect('Bleed',this.effect[0])
                    break
                    case 2630:
                        if(this.targetCombatant.block<=0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[0])
                        }
                        this.targetCombatant.statusEffect('Bleed Next Turn Next Turn',this.effect[1])
                    break
                    case 2649:
                        if(this.targetCombatant.block<=0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[0]*this.energy)
                        }
                    break
                    case 2651:
                        this.targetCombatant.takeDamage(this.effect[0],this.user,2)
                        if(this.targetCombatant.block>0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                    break
                }
            break
            case 7:
                switch(this.type){
                    case 38: case 1255: case 1348:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
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
                        this.battle.cardManagers[this.targetCombatant.id].deAbstract(3,this.effect[0],[])
                    break
                    case 173:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.turnManager.loadEnemyRandomMove(this.targetCombatant.id)
                        }
                    break
                    case 177:
                        this.targetTile.addType(2)
                    break
                    case 272: case 1852:
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
                    case 316: case 1655:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                    break
                    case 326:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
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
                        this.battle.dropDrawShuffle(this.player,findName('Dazed',types.card),this.level,game.playerNumber+1)
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
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 592:
                        this.targetCombatant.status.main[findList('Strength',this.targetCombatant.status.name)]=0
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                    break
                    case 620:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Spike Pillar',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 621:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Projector',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 622:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 623:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Readout',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 624:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Strengthener',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 626:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Explosive Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 627:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Multiturret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 628:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Barbed Pillar',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 629:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Gun Rack',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 630:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Repulse Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 631:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Machine Gun',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
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
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 686:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Metal Box',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 687:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Upgrader',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 688:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Transformer',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 695:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Doubler',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 696:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Exhauster',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 697:
                        this.targetCombatant.takeDamage(this.effect[1],this.user)
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.turnManager.loadEnemyRandomMove(this.targetCombatant.id)
                        }
                    break
                    case 700:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Teleporter Start',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Use Teleporter\nStart',types.card),0,0)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 701:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Teleporter End',types.combatant),this.userCombatant.team,this.direction,this.user)
                        this.userManager.hand.add(findName('Use Teleporter\nEnd',types.card),0,0)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
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
                        this.targetCombatant.takeDamage(this.effect[0]*floor(this.battle.relicManager.total[this.player]/max(1,this.effect[1])),this.user)
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
                    case 857: case 1248: case 1697: case 1698: case 1736: case 1753: case 1777: case 1788: case 1868: case 1913:
                    case 2546: case 2605: case 2803:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 865:
                        this.targetCombatant.takeDamage(this.amplify?this.energy*this.effect[1]:this.userManager.hand.cards.length+this.effect[0],this.user)
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
                        this.userManager.hand.reserve(this.effect[2])
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
                        this.battle.dropDrawShuffle(this.player,findName('Impending\nDoom',types.card),this.level,game.playerNumber+1)
                    break
                    case 1097:
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(max(this.effect[0],this.effect[2]),this.user)
                            this.userCombatant.heal(this.effect[1])
                            this.userCombatant.addBlock(this.effect[3])
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,2))==0){
                                this.targetCombatant.takeDamage(this.effect[0],this.user)
                                this.userCombatant.heal(this.effect[1])
                            }else{
                                this.targetCombatant.takeDamage(this.effect[2],this.user)
                                this.userCombatant.addBlock(this.effect[3])
                            }
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
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
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
                        this.battle.addEnergy(this.effect[1],this.player)
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
                        let roll=this.userCombatant.luckCheck()?1:this.userCombatant.luckCheckFail?0:floor(random(0,2))
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.addEnergy(this.effect[1],this.player)*(-1+roll*2)
                        if(roll==0){
                            this.userCombatant.lowRoll()
                        }else{
                            this.userCombatant.highRoll()
                        }
                    break
                    case 1232:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Mirror Shield',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 1244:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                            this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[0])
                        }
                    break
                    case 1247:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.energy==4){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1252:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.userCombatant.statusEffect('Double Damage',this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1256:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                            this.targetCombatant.attack[this.targetCombatant.intent].effect[0]=max(0,this.targetCombatant.attack[this.targetCombatant.intent].effect[0]-this.effect[0])
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1258:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.battle.addEnergy(this.effect[3],this.player)
                        }
                    break
                    case 1259:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.addEnergy(this.effect[1],this.player)
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
                        this.battle.addEnergy(this.effect[2],this.player)
                    break
                    case 1263:
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                        this.targetCombatant.statusEffect('Freeze',this.effect[2])
                        this.targetCombatant.statusEffect('Burn',this.effect[3])
                        this.targetCombatant.statusEffect('Weak',this.effect[4])
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[5])
                        this.targetCombatant.statusEffect('Frail',this.effect[6])
                        this.targetCombatant.statusEffect('Anti-Control',this.effect[7])
                        this.targetCombatant.statusEffect('Jinx',this.effect[8])
                    break
                    case 1266:
                        let total=0
                        let luckCheck=this.userCombatant.luckCheck()
                        let luckCheckFail=false
                        if(!luckCheck){
                            luckCheckFail=this.userCombatant.luckCheckFail()
                        }
                        for(let a=0,la=this.effect[0]+this.userManager.hand.cards.length;a<la;a++){
                            let roll=luckCheck?3:luckCheckFail?1:floor(random(1,4))
                            this.battle.particleManager.createNumber(41,this.userCombatant.position.x,this.userCombatant.position.y,roll)
                            total+=roll
                        }
                        if(total<(this.effect[0]+this.userManager.hand.cards.length)*2){
                            this.userCombatant.lowRoll()
                        }else{
                            this.userCombatant.highRoll()
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
                            this.battle.addEnergy(this.effect[4],this.player)
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
                        this.targetCombatant.takeDamage(this.effect[0]*this.userManager.deAbstractAll(2,['Burn']),this.user)
                    break
                    case 1346:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Armored Turret',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
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
                        if(this.energy>0){
                            this.targetCombatant.statusEffect(['Freeze','Burn'][this.userCombatant.energyParity(this.energy)],this.effect[1])
                        }
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
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.targetCombatant.statusEffect('Freeze',this.effect[1])
                        }
                    break
                    case 1442:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.energyParity(this.energy)==0){
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
                    case 1504:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Wet',this.effect[1])
                    break
                    case 1507:
                        this.userManager.hand.randomEffect(0)
                        let luckCheck2=this.userCombatant.luckCheck()
                        let luckCheckFail2=false
                        if(!luckCheck2){
                            luckCheckFail2=this.userCombatant.luckCheckFail()
                        }
                        if(luckCheck2||floor(random(0,4))!=0&&!luckCheckFail2){
                            this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                        }
                        if(luckCheck2||floor(random(0,4))!=0&&!luckCheckFail2){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1512:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.relPos[0]==0&&this.relPos[1]==0?2:1),this.user)
                    break
                    case 1519:
                        if(this.targetCombatant.life<this.effect[0]){
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                        }
                    break
                    case 1530:
                        this.targetCombatant.statusEffect('Stun',this.effect[0])
                        this.userCombatant.statusEffect('Half Damage Turn Next Turn',1)
                    break
                    case 1545:
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class!=1&&types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class!=2){
                            this.targetCombatant.statusEffect('Stun',this.effect[0])
                        }
                    break
                    case 1560:
                        this.targetCombatant.takeDamage(this.effect[0]+(this.battle.combatantManager.hasDupe(this.targetCombatant.name)?this.effect[1]:0),this.user)
                    break
                    case 1562:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.battle.counter.turnPlayed[this.player]<=1){
                            this.userCombatant.charge+=this.effect[1]
                        }
                    break
                    case 1599:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.randomStatusInstant(this.effect[1],[1])
                        this.userCombatant.randomStatusInstant(this.effect[2],[1])                            
                        this.userCombatant.randomStatusInstant(this.effect[3],[1])                            
                    break
                    case 1616:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect(['Burn','Freeze','Shock','Weak'][this.battle.turn.total%4],this.effect[1])
                    break
                    case 1619:
                        this.targetCombatant.statusEffect('Jinxshock',this.effect[0])
                    break
                    case 1620:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.draw(this.effect[1])
                        this.battle.addEnergy(this.effect[2],this.player)
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[3])
                    break
                    case 1626:
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,5))>=2){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1627:
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,4))>=1){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1628:
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,4))>=1){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 1629:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Poison',this.effect[1]*(this.targetCombatant.getStatus('Poison')>0?2:1))
                    break
                    case 1633:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.energy==1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1683:
                        this.targetCombatant.statusEffect('Mixed',this.effect[0])
                    break
                    case 1684:
                        this.targetCombatant.statusEffect('Silence',this.effect[0])
                    break
                    case 1689:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.randomEffect(26,[this.effect[1]])
                    break
                    case 1692:
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                        if(game.theme==2){
                            this.userManager.discard.add(findName('Last\nQuarter',types.card),0,this.color)
                        }else{
                            this.userManager.discard.add(findName('First\nQuarter',types.card),0,this.color)
                            game.theme=2
                        }
                    break
                    case 1693:
                        this.targetCombatant.statusEffect('Strength',-this.effect[0])
                        game.theme=0
                    break
                    case 1699:
                        if(this.userManager.hand.allEffectArgs(9,[2,this.effect[0]])==this.effect[0]){
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 1714:
                        if(this.userManager.hand.totalCost()==this.effect[0]){
                            this.targetCombatant.statusEffect('Poison',this.effect[1])
                        }
                    break
                    case 1722:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.drawSetCost(this.effect[0],4)
                    break
                    case 1723:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.itemManager.addItem(findName('Salad',types.item),this.player)
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1729:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                        let index=this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)
                        if(index>=0&&this.battle.tileManager.tiles[index].type.includes(19)){
                            this.battle.tileManager.tiles[index].addType(19)
                        }
                    break
                    case 1745:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Freeze',this.effect[1])
                    break
                    case 1751:
                        this.targetCombatant.takeDamage(this.effect[0],this.user,3)
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 1755:
                        if(this.userCombatant.charge>=this.effect[3]){
                            this.userCombatant.charge-=this.effect[3]
                            this.userCombatant.chargeConsumed()
                            this.targetCombatant.takeDamage(this.effect[0]*3,this.user)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1756:
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.targetCombatant.takeDamage(this.effect[0]*(this.energy+this.effect[2]),this.user)
                        }else{
                            this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                        }
                    break
                    case 1768:
                        this.targetCombatant.statusEffect('Dodge',this.effect[0])
                    break
                    case 1780:
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                        this.userCombatant.statusEffect('Miracle Next Turn',this.effect[1])
                        this.userManager.draw(this.effect[2])
                    break
                    case 1782:
                        this.targetCombatant.statusEffect('Dodge',this.effect[0])
                        this.battle.addEnergy(this.effect[1],this.player)
                    break
                    case 1795:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,4))!=0){
                            this.battle.addEnergy(this.effect[2],this.player)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1837:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.drawSetCost(this.effect[1],this.userCombatant.energyParity(this.energy)+5)
                    break
                    case 1845:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.targetCombatant.statusEffect('Miss',this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1850:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(28)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1858:
                        this.targetCombatant.statusEffect('Freeze',this.effect[0])
                        this.userManager.hand.allEffectArgs(8,[this.effect[1]])
                    break
                    case 1863:
                        this.targetCombatant.statusEffect('Freeze',this.effect[0])
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            this.targetCombatant.takeDamage(this.effect[2],this.user)
                        }
                    break
                    case 1864:
                        this.targetCombatant.statusEffect('Burn',this.effect[0]*(this.targetCombatant.getStatus('Freeze')>0&&this.targetCombatant.getStatus('Wet')>0?2:1))
                    break
                    case 1866:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Burn')>0?2:1),this.user)
                        this.targetCombatant.statusEffect('Freeze',this.effect[1]*(this.targetCombatant.getStatus('Burn')>0?2:1))
                    break
                    case 1867:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.targetCombatant.getStatus('Freeze')>0?2:1),this.user)
                        this.targetCombatant.statusEffect('Burn',this.effect[1]*(this.targetCombatant.getStatus('Freeze')>0?2:1))
                    break
                    case 1874:
                        let total3=0
                        for(let a=0,la=this.userCombatant.status.main.length;a<la;a++){
                            total3+=abs(this.userCombatant.status.main[a])
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*total3,this.user)
                    break
                    case 1878:
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                        this.targetCombatant.statusEffect('Strength',-this.effect[1])
                        this.userManager.draw(this.effect[2])
                        this.battle.addEnergy(this.effect[3],this.player)
                    break
                    case 1879:
                        this.targetCombatant.statusEffect('Silence',this.effect[0])
                        this.userManager.draw(this.effect[1])
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                            this.targetCombatant.takeDamage(this.effect[2],this.user)
                        }
                    break
                    case 1880:
                        this.targetCombatant.statusEffect('Lock',this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.addRandomCompleteAllCost(2,0,3)
                        }
                    break
                    case 1888:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            if(this.userManager.reserve.cards.length>0){
                                this.userManager.reserve.randomEffect(11,[])
                            }else if(this.userManager.discard.cards.length>0){
                                this.userManager.discard.randomEffect(11,[])
                            }else{
                                this.userManager.hand.randomEffect(11,[])
                            }
                        }
                    break
                    case 1890:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect(['Freeze','Burn'][this.userCombatant.energyParity(this.energy)],this.effect[1])
                    break
                    case 1892:
                        let card2=this.userManager.addRandomClassReturn(2,0,2)
                        if(card2.effect.length>0){
                            this.targetCombatant.takeDamage(card2.effect[0],this.user)
                        }
                    break
                    case 1894:
                        this.targetCombatant.heal(this.effect[0])
                        this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                        this.targetCombatant.randomStatusInstant(this.effect[2],[1])
                        this.targetCombatant.randomStatusInstant(this.effect[3],[1])
                    break
                    case 1902:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Shock',this.effect[1]*(this.relPos[1]==0?2:1))
                    break
                    case 1907:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.targetCombatant.statusEffect('Fade',this.effect[1])
                        }
                    break
                    case 1908:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Silence',this.effect[1])
                        this.userManager.hand.exhaust(this.effect[2])
                    break
                    case 1943:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 1945:
                        let luckCheck1945=this.userCombatant.luckCheck()
                        let luckCheckFail1945=false
                        if(!luckCheck1945){
                            luckCheckFail1945=this.userCombatant.luckCheckFail()
                        }
                        if(luckCheck1945||floor(random(0,4))!=0&&!luckCheckFail1945){
                            this.targetCombatant.statusEffect('Poison',this.effect[0])
                        }
                        if(luckCheck1945||floor(random(0,4))!=0&&!luckCheckFail1945){
                            this.targetCombatant.statusEffect('Shock',this.effect[1])
                        }
                        if(luckCheck1945||floor(random(0,4))!=0&&!luckCheckFail1945){
                            this.targetCombatant.statusEffect('Freeze',this.effect[2])
                        }
                        if(luckCheck1945||floor(random(0,4))!=0&&!luckCheckFail1945){
                            this.targetCombatant.statusEffect('Burn',this.effect[3])
                        }
                        if(luckCheck1945||floor(random(0,4))!=0&&!luckCheckFail1945){
                            this.targetCombatant.statusEffect('Weak',this.effect[4])
                        }
                        if(luckCheck1945||floor(random(0,4))!=0&&!luckCheckFail1945){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[5])
                        }
                        if(luckCheck1945||floor(random(0,4))!=0&&!luckCheckFail1945){
                            this.targetCombatant.statusEffect('Frail',this.effect[6])
                        }
                        if(luckCheck1945||floor(random(0,4))!=0&&!luckCheckFail1945){
                            this.targetCombatant.statusEffect('Anti-Control',this.effect[7])
                        }
                        if(luckCheck1945||floor(random(0,4))!=0&&!luckCheckFail1945){
                            this.targetCombatant.statusEffect('Jinx',this.effect[8])
                        }
                    break
                    case 1950:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.statusEffect('Miss',this.effect[1])
                            this.battle.turnManager.loadEnemyRandomMove(this.targetCombatant.id)
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,2))==0){
                                this.targetCombatant.statusEffect('Miss',this.effect[1])
                            }else{
                                this.battle.turnManager.loadEnemyRandomMove(this.targetCombatant.id)
                            }
                        }
                    break
                    case 1951:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Miss',this.effect[1])
                        this.battle.turnManager.loadEnemyRandomMove(this.targetCombatant.id)
                    break
                    case 1955:
                        this.targetCombatant.status.main[findList('Strength',this.targetCombatant.status.name)]=0
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                    break
                    case 1958:
                        this.battle.turnManager.aimInConstructs(this.targetCombatant)
                        this.userManager.draw(this.effect[0])
                    break
                    case 1969:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.energyParity(this.energy)==0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[1])
                        }
                    break
                    case 1972:
                        this.targetCombatant.takeDamage((this.effect[0]+this.userManager.hand.cards.length)*this.userCombatant.diceRoll(1,3),this.user)
                        this.userManager.hand.allEffect(2)
                    break
                    case 2010:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.targetCombatant.statusEffect('Vulnerable Next Turn',this.effect[1])
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2011:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&this.userCombatant.check10()){
                            this.battle.addCurrency(this.effect[1],this.player)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 2016:
                        this.targetCombatant.statusEffect('Shock',this.effect[0]*floor(this.battle.currency.money[this.player]/max(1,this.effect[1])))
                    break
                    case 2018:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.energyParity(this.energy)==0){
                            this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                        }
                    break
                    case 2022:
                        this.targetCombatant.statusEffect('Freeze',this.userCombatant.diceRoll(1,6)+this.effect[0])
                    break
                    case 2023:
                        this.targetCombatant.statusEffect('Burn',this.userCombatant.diceRoll(1,6)+this.effect[0])
                    break
                    case 2024:
                        this.targetCombatant.statusEffect('Shock',this.userCombatant.diceRoll(1,6)+this.effect[0])
                    break
                    case 2030:
                        let roll2030=this.userCombatant.diceRoll(1,6)
                        this.targetCombatant.takeDamage(this.effect[0]*roll2030,this.user)
                        this.targetCombatant.statusEffect(['Freeze','Burn'][roll2030%2],this.effect[1])
                    break
                    case 2045:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.takeDamage(this.userManager.hand.cards.length,-1)
                    break
                    case 2050:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.statusEffect(['Burn','Freeze','Shock','Weak'][this.battle.turn.total%4],this.effect[1])
                    break
                    case 2076:
                        switch(this.userCombatant.stance){
                            case 1:
                                this.targetCombatant.statusEffect('Burn',this.effect[0])
                            break
                            case 2:
                                this.targetCombatant.statusEffect('Freeze',this.effect[1])
                            break
                            case 3:
                                this.targetCombatant.statusEffect('Shock',this.effect[2])
                            break
                            case 4:
                                this.targetCombatant.statusEffect('Weak',this.effect[3])
                            break
                        }
                    break
                    case 2091:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                        this.userCombatant.heal(this.targetCombatant.getStatus('Shock'))
                    break
                    case 2094:
                        if(this.targetCombatant.getStatus('Shock')>0){
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                        }
                        this.targetCombatant.statusEffect('Shock',this.effect[0])
                    break
                    case 2096:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 2097:
                        this.targetCombatant.statusEffect('Shock',this.effect[0])
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 2124:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Poison',this.effect[1])
                        this.userCombatant.heal(this.targetCombatant.getStatus('Poison'))
                    break
                    case 2151:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.getStatus('Jinx')>0){
                            this.targetCombatant.statusEffect('Miss',this.effect[1])
                        }
                    break
                    case 2158:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.battle.turn.total==7){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 2214:
                        let total2214=0
                        for(let a=0,la=this.targetCombatant.status.main.length;a<la;a++){
                            total2214+=abs(this.targetCombatant.status.main[a])
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*(total2214==0?2:1),this.user)
                    break
                    case 2253:
                        this.targetCombatant.statusEffect('Frail',999)
                    break
                    case 2272:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<=this.targetCombatant.base.life*0.25){
                            this.userCombatant.statusEffect('Double Damage',this.effect[1])
                        }
                    break
                    case 2273:
                        if(this.targetCombatant.block>0){
                            this.targetCombatant.statusEffect('Stun',this.effect[0])
                        }
                        this.targetCombatant.block=0
                    break
                    case 2345:
                        this.targetCombatant.statusEffect('Freeze',this.effect[0])
                        this.targetCombatant.statusEffect('Take Per Card Played',this.effect[1])
                    break
                    case 2369:
                        this.userManager.drawPrice(this.effect[0],0)
                        this.targetCombatant.statusEffect('Take Per Card Played',this.effect[1])
                    break
                    case 2393:
                        if(this.targetCombatant.getStatus('Shock')>0){
                            this.targetCombatant.statusEffect('Poison',this.effect[1])
                        }
                        this.targetCombatant.statusEffect('Shock',this.effect[0])
                    break
                    case 2404:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.getStatus('Shock')>0){
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                        }
                    break
                    case 2434:
                        this.targetCombatant.statusEffect('Take Per Power Played Combat',this.effect[0])
                    break
                    case 2435:
                        this.targetCombatant.takeDamage(this.effect[0]*this.energy,this.user)
                        this.battle.drop(this.player,findName('Void',types.card),0,game.playerNumber+1)
                    break
                    case 2458:
                        this.targetCombatant.randomStatusInstant(this.effect[0],[1])
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2470:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Poison',this.effect[1])
                    break
                    case 2476:
                        if(this.targetCombatant.getStatus('Bleed')>0){
                            this.targetCombatant.takeDamage(this.effect[1],this.user)
                        }
                        if(this.userCombatant.block<=0){
                            this.targetCombatant.statusEffect('Bleed',this.effect[0])
                        }
                    break
                    case 2482:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.dropDrawShuffle(this.player,findName('Dazed',types.card),this.level,game.playerNumber+1)
                        }
                    break
                    case 2506:
                        this.userManager.draw(this.effect[0])
                        if(this.userCombatant.luckCheck()){
                            this.targetCombatant.takeDamage(max(this.effect[1],this.effect[3]),this.user)
                            this.userCombatant.heal(this.effect[2])
                            this.userCombatant.addBlock(this.effect[4])
                        }else if(!this.userCombatant.luckCheckFail()){
                            if(floor(random(0,2))==0){
                                this.targetCombatant.takeDamage(this.effect[1],this.user)
                                this.userCombatant.heal(this.effect[2])
                            }else{
                                this.targetCombatant.takeDamage(this.effect[3],this.user)
                                this.userCombatant.addBlock(this.effect[4])
                            }
                        }
                    break
                    case 2561:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<=0){
                            this.battle.dropDrawShuffle(this.player,findName('Dazed',types.card),this.level,game.playerNumber+1)
                            this.battle.dropDrawShuffle(this.player,findName('Dazed',types.card),this.level,game.playerNumber+1)
                        }
                    break
                    case 2569:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<=this.targetCombatant.base.life*0.25){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2570:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.life<=this.userCombatant.base.life*0.5){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        }
                    break
                    case 2577:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.itemManager.addItem(findName('Glass Shard',types.item),this.player)
                        }
                    break
                    case 2648:
                        let total2648=0
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].name=='Shiv'||this.userManager.hand.cards[a].name=='Broken\nShiv'||this.userManager.hand.cards[a].name=='Deluxe\nShiv'){
                                total2648++
                            }
                        }
                        this.targetCombatant.takeDamage(this.effect[0]*(1+total2648),this.user)
                    break
                    case 2713:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.getStatus('History')>this.effect[1]){
                            this.userManager.draw(this.effect[2])
                        }
                    break
                    case 2794:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==1||types.attack[this.targetCombatant.attack[this.targetCombatant.intent].type].class==5){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2816:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.getStatus('Freeze')>0){
                            this.userCombatant.addBlock(this.effect[1],this.user)
                        }
                    break
                    case 2819:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<=this.targetCombatant.base.life*0.5){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 2872:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.randomEffect(44,[])
                    break
                    case 2875:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.getStatus('Freeze')>0){
                            this.userManager.hand.upgrade(this.effect[1])
                        }
                    break
                    case 2880:
                        this.battle.combatantManager.summonConstruct(this.targetTile.tilePosition,findName('Shotgun',types.combatant),this.userCombatant.team,this.direction,this.user)
                        if(options.oldUnbuild){
                            this.userManager.hand.add(findName('Unbuild',types.card),0,0)
                        }
                    break
                    case 2898:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.statusEffect('Extra Turn',1)
                    break
                    case 2924:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.elemental){
                            this.userCombatant.heal(this.effect[1])
                        }
                    break
                    case 2977:
                        let result2977=this.userManager.drawReturn(this.effect[1])
                        this.targetCombatant.statusEffect('Take Per Card Played',result2977.length>0&&result2977[0].class==4?this.effect[0]+this.effect[2]:this.effect[0],this.user)
                    break
                    case 2978:
                        this.userCombatant.addBarrier(this.effect[0])
                        this.targetCombatant.statusEffect('Take Per Card Played',this.effect[1])
                    break
                    case 2981:
                        let result2981=this.userManager.drawReturn(this.effect[0])
                        if(result2981.length>0){
                            if(result2981[0].class==1){
                                this.targetCombatant.takeDamage(this.effect[1],this.user)
                            }else if(result2981[0].class==2){
                                this.userCombatant.addBlock(this.effect[2])
                            }
                        }
                    break
                    case 2995:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.getStatus('Freeze')>0){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 3006:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.overlayManager.overlays[3][this.player].additionalOptions+=this.effect[1]
                    break
                    case 3026:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.userManager.hand.singleColorRarityNumber(0,0),this.user)
                    break
                    case 3031:
                        this.userManager.drawPrice(this.effect[0],1)
                        this.targetCombatant.statusEffect('Take Per Card Played',this.effect[1])
                    break
                    case 3034:
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.drop(this.player,findName('Deluxe\nShiv',types.card),0,0)
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.battle.dropDrawShuffle(this.player,findName('Deluxe\nShiv',types.card),0,0)
                        }
                    break
                    case 3037:
                        this.battle.overlayManager.overlays[67][this.player].active=true
                        this.battle.overlayManager.overlays[67][this.player].activate([this.effect[0],this.effect[1],this.targetCombatant.id])
                    break
                    case 3053:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.barrier>0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 3124:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.allEffect(98)
                    break
                    case 3125:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.charge>=this.effect[1]){
                            this.userCombatant.charge-=this.effect[1]
                            this.userCombatant.chargeConsumed()
                            for(let a=0,la=this.effect[2];a<la;a++){
                                this.userManager.hand.add(findName('Miracle',types.card),0,0)
                            }
                        }
                    break

                }
                //mark 8
            break
            case 8:
                switch(this.type){
                    case 66:
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                    break
                    case 68:
                        this.targetCombatant.statusEffect('Temporary Strength',-this.effect[0])
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
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,4))!=0){
                            this.battle.addEnergy(this.effect[1],this.player)
                            this.userCombatant.highRoll()
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
                        if(this.userCombatant.energyParity(this.energy)==0){
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
                    case 1548:
                        if(this.energy==0){
                            this.targetCombatant.statusEffect('Shock',this.effect[0])
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1567:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.loseCurrency(this.effect[1],this.player)
                        if(this.battle.counter.turnPlayed[this.player]<=1){
                            this.targetCombatant.statusEffect('Freeze',this.effect[2])
                        }
                    break
                    case 1568:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.loseCurrency(this.effect[1],this.player)
                        if(this.battle.counter.turnPlayed[this.player]<=1){
                            this.targetCombatant.statusEffect('Burn',this.effect[2])
                        }
                    break
                    case 1618:
                        if(this.energy==0){
                            this.targetCombatant.statusEffect('Jinx',this.effect[0])
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1744:
                        this.targetCombatant.statusEffect('Burn',this.effect[0])
                        this.targetCombatant.statusEffect('Poison',this.effect[1])
                    break
                    case 1869:
                        if(this.energy==0){
                            this.targetCombatant.statusEffect('Lock',this.effect[0])
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1932:
                        this.targetCombatant.statusEffect('Fail',this.effect[0])
                    break
                    case 2595:
                        this.targetCombatant.statusEffect('Burn',this.effect[0])
                    break
                    case 2596:
                        this.targetCombatant.statusEffect('Freeze',this.effect[0])
                    break
                    case 2597:
                        this.targetCombatant.statusEffect('Shock',this.effect[0])
                    break
                    case 2662:
                        if(this.energy==0){
                            if(this.targetCombatant.block<=0){
                                this.targetCombatant.statusEffect('Bleed',this.effect[0])
                            }
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 2785:
                        this.targetCombatant.statusEffect('Strength',this.effect[0])
                        this.targetCombatant.statusEffect('Miss',this.effect[1])
                    break
                    case 2786:
                        this.targetCombatant.statusEffect('Strength',this.effect[0])
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                        this.targetCombatant.statusEffect('Miss',this.effect[2])
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
                        if(this.userCombatant.luckCheck()||!this.userCombatant.luckCheckFail()&&floor(random(0,2))==0){
                            this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                            this.userCombatant.highRoll()
                        }else{
                            this.userCombatant.lowRoll()
                        }
                    break
                    case 1036:
                        this.targetCombatant.takeDamage(this.effect[0]+this.userManager.hand.cards.length,this.user,1)
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
                    case 1640:
                        this.targetCombatant.takeDamage(this.effect[1],this.user,1)
                    break
                    case 1900:
                        this.targetCombatant.statusEffect('Poison',this.effect[0])
                    break
                    case 2127:
                        this.targetCombatant.takeDamage(this.effect[0],this.user,1)
                        this.userCombatant.statusEffect('Miss',this.effect[1])
                    break
                    case 2398:
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].attack!=2398&&this.userManager.hand.cards[a].effect[0]>0&&this.userManager.hand.cards[a].class==1&&this.userManager.hand.cards[a].effect.length>0&&!this.userManager.hand.cards[a].spec.includes(12)){
                                this.targetCombatant.takeDamage(this.userManager.hand.cards[a].effect[0],this.user)
                            }
                        }
                        this.userManager.hand.discard(this.effect[0])
                    break
                    case 3150:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.getStatus('Intangible')>0?2:1),this.user,1)
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
                        this.battle.dropDrawShuffle(this.player,findName('1-Shooter',types.card),0,0)
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
                            this.userManager.hand.add(findName('Hold the\nTrigger',types.card),this.level,this.color,this.edition)
                        }
                    break
                    case 1319: case 1900:
                        this.userCombatant.statusEffect('Single Attack Strength',this.effect[1])
                    break
                    case 1801:
                        if(this.userCombatant.energyParity(this.energy)==0){
                            this.battle.loseEnergy(this.effect[1],this.player)
                        }
                    break
                    case 1821:
                        this.userCombatant.heal(this.effect[1])
                        this.targetCombatant.statusEffect('Bleed',this.effect[2])
                    break
                    case 2308:
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 3150:
                        this.userCombatant.addBarrier(this.effect[1])
                    break
                }
            break
            case 10:
                switch(this.type){
                    case -14:
                        this.battle.loseCurrency(this.effect[0],this.player)
                    break
                    case -60:
                        this.battle.loseCurrency(this.effect[0],this.player)
                        this.userCombatant.statusEffect('Temporary Strength',this.effect[1])
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
                            if(this.userManager.hand.cards[a].name=='Broken\nShiv'){
                                this.userManager.hand.add(findName('Broken\nShiv',types.card),0,0)
                            }
                            if(this.userManager.hand.cards[a].name=='Deluxe\nShiv'){
                                this.userManager.hand.add(findName('Deluxe\nShiv',types.card),0,0)
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
                            this.battle.dropDrawShuffle(this.player,findName('Dark\nMatter',types.card),0,this.color)
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
                                this.battle.addPlayer(1,this.player)
                                this.userManager.draw(2)
                            }else if(!this.userCombatant.luckCheckFail()){
                                switch(roll){
                                    case 0: this.battle.addCurrency(10,this.player); break
                                    case 1: this.battle.itemManager.addRandomItem(this.player); break
                                    case 2: this.userCombatant.statusEffect('Strength',2); break
                                    case 3: this.userCombatant.statusEffect('Dexterity',2); break
                                    case 4: this.userCombatant.addBlock(5); break
                                    case 5: this.userCombatant.statusEffect('Buffer',1); break
                                    case 6: this.battle.addPlayer(1,this.player); break
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
                        if(variants.cyclicDraw){
                            this.userManager.drops+=this.effect[0]
                        }else{
                            this.userManager.draw(1)
                        }
                    break
                    case 1223:
                        this.userManager.hand.exhaust(this.effect[0])
                        if(variants.cyclicDraw){
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
                        this.battle.addCurrency(this.battle.currency.ss[this.player]*2,this.player)
                        this.battle.currency.ss[this.player]=0
                    break
                    case 1341:
                        this.battle.addCurrency(this.limit[1],this.player)
                    break
                    case 1349:
                        if(!this.targetCombatant.spec.includes(2)&&this.targetCombatant.team==0){
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
                    case 1499:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.getStatus('Miss')>0?3:1),this.user)
                    break
                    case 1500:
                        this.battle.combatantManager.fullAllEffect(6,[this.effect[0]])
                    break
                    case 1511:
                        this.battle.combatantManager.fullAllEffect(7,[this.effect[0]])
                    break
                    case 1516:
                        this.userManager.allEffect(2,1)
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('6-Miracle',types.card),0,0)
                        }
                    break
                    case 1541:
                        this.targetCombatant.statusEffect('Cannot Die',this.effect[0])
                    break
                    case 1552:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.randomEffect(25)
                        }
                    break
                    case 1637:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName(['Strike-','Strike-','Defend-','Defend-','Step-L','Step-R'][floor(random(0,6))],types.card),0,0)
                        }
                    break
                    case 1679:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.addEffectUp(findName('Shiv',types.card),0,0,0,this.effect[1])
                        }
                    break
                    case 1701:
                        for(let a=0,la=min(this.energy+this.effect[0],100);a<la;a++){
                            this.userManager.hand.add(findName('Quill',types.card),0,0)
                        }
                    break
                    case 1702:
                        this.userManager.allEffect(2,1)
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Sneeze',types.card),0,0)
                        }
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Spike',types.card),0,0)
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.add(findName('Sharp\nSpike',types.card),0,0)
                        }
                    break
                    case 1726:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Broken\nShiv',types.card),0,0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1727:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Deluxe\nShiv',types.card),0,0)
                        }
                    break
                    case 1757:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
                        }
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Wrong\nMiracle',types.card),0,0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 1771:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.dropDrawShuffle(this.player,findName('Shank',types.card),0,0)
                        }
                    break
                    case 1789:
                        this.userManager.allEffect(2,1)
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Red\nBeard',types.card),0,0)
                        }
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Pirate\nHookshot',types.card),0,0)
                        }
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.add(findName('Pirate\nHook',types.card),0,0)
                        }
                    break
                    case 1792:
                        this.userManager.allEffect(2,1)
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Inky\nJuggle',types.card),0,0)
                        }
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Baby Squid\nStrike',types.card),0,0)
                        }
                    break
                    case 1812:
                        this.userCombatant.statusEffect('Hyperquill Next Turn',this.energy+this.effect[0])
                    break
                    case 1834:
                        this.userCombatant.statusEffect('Draw Up',this.effect[0])
                    break
                    case 1846:
                        this.userManager.hand.add(findName('37 of\nNothings',types.card),0,0)
                    break
                    case 1899:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Sick\nShot',types.card),0,0)
                        }
                        this.userCombatant.ammo+=this.effect[1]
                    break
                    case 1919:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomCompleteAllCost(2,0,this.energy)
                        }
                    break
                    case 1925:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Broken\nShiv',types.card),0,0)
                        }
                    break
                    case 1935:
                        this.targetCombatant.statusEffect('Miss',this.effect[0])
                    break
                    case 2038:
                        this.battle.itemManager.loseRandom(this.player)
                    break
                    case 2125:
                        if(this.targetCombatant.getStatus('Shock')==0){
                            this.targetCombatant.statusEffect('Shock',this.effect[0])
                        }
                    break
                    case 2129:
                        this.targetCombatant.life=0
                        this.userCombatant.addBlock(this.effect[0])
                    break
                    case 2130:
                        this.targetCombatant.life=0
                        this.userManager.draw(this.effect[0])
                    break
                    case 2194:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
                        }
                        this.userCombatant.statusEffect('Energy Next Turn',this.effect[1])
                    break
                    case 2209:
                        this.userCombatant.statusEffect('Temporary Dexterity',this.effect[0])
                    break
                    case 2226:
                        this.targetCombatant.statusEffect('Strength',-this.effect[0])
                        this.battle.drop(this.player,findName('Void',types.card),0,game.playerNumber+1)
                    break
                    case 2232:
                        this.userManager.addRandomAllCostFree(2,this.level,2)
                    break
                    case 2239:
                        this.battle.addCurrency(this.effect[0],this.player)
                        this.userManager.addRandomAll(2,this.level,0)
                    break
                    case 2240:
                        this.battle.overlayManager.overlays[7][this.player].active=true
                        this.battle.overlayManager.overlays[7][this.player].activate()
                        this.userManager.addRandomAll(2,this.level,0)
                    break
                    case 2252:
                        this.userCombatant.statusEffect('8+ Block Shiv',this.effect[0])
                    break
                    case 2279:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
                        }
                        this.userManager.hand.allEffectArgs(13,[this.effect[1]])
                    break
                    case 2397:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
                        }
                        this.userCombatant.statusEffect('Cannot Gain Block',this.effect[1])
                    break
                    case 2414:
                        this.userManager.addRandomSpecCostDown(2,0,25,1)
                    break
                    case 2438:
                        this.userManager.allGroupEffectArgs(15,[this.effect[0]])
                    break
                    case 2441:
                        this.userManager.hand.allEffect(74)
                    break
                    case 2453:
                        this.userManager.allGroupEffectArgs(16,[this.effect[0]])
                    break
                    case 2454:
                        this.userCombatant.statusEffect('Always Odd Energy',999)
                    break
                    case 2457:
                        this.userManager.allGroupEffect(75)
                    break
                    case 2571:
                        this.battle.itemManager.addItemSlots(1,this.player)
                    break
                    case 2572:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.itemManager.addItem(findName('Energy Drink',types.item),this.player)
                        }
                    break
                    case 2587:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.itemManager.addItem(findName('Bottled Fairy',types.item),this.player)
                        }
                    break
                    case 2592:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.itemManager.addItem(findName('Molten Metal',types.item),this.player)
                        }
                    break
                    case 2599:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.itemManager.addItem(findName(['Salad','Energy Drink','Glass Shard','Molten Metal','Caffeine Pill','Attack Dust','Defense Dust','Mystery Box'][floor(random(0,8))],types.item),this.player)
                        }
                    break
                    case 2601:
                        for(let a=0,la=this.battle.itemManager.items[this.player].length;a<la;a++){
                            this.battle.itemManager.addItem(findName(['Salad','Energy Drink','Glass Shard','Molten Metal','Caffeine Pill','Attack Dust','Defense Dust','Mystery Box'][floor(random(0,8))],types.item),this.player)
                        }
                    break
                    case 2645:
                        this.userCombatant.statusEffect('Cannot Move Shiv',this.effect[0])
                    break
                    case 2705:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                        if(this.userCombatant.elemental){
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[2])
                        }
                    break
                    case 2733:
                        this.targetCombatant.statusEffect('Weak',this.effect[0])
                        if(this.userCombatant.elemental){
                            this.userCombatant.statusEffect('Strength',this.effect[1])
                        }
                    break
                    case 2777:
                        this.userManager.hand.add(findName('Smite',types.card),0,0)
                        this.userManager.hand.add(findName('Safety',types.card),0,0)
                    break
                    case 2790:
                        this.userManager.hand.retain(this.effect[0])
                        this.userCombatant.statusEffect('Block Next Turn',this.effect[1])
                    break
                    case 2814:
                        this.battle.addCurrency(this.effect[0],this.player)
                        this.userCombatant.statusEffect('Control',this.effect[1])
                    break
                    case 2831:
                        this.battle.dropDrawShuffle(this.player,findName('Sunny, Refracted\nSunlight',types.card),0,this.color)
                        this.battle.dropDrawShuffle(this.player,findName('Star, Showering\nStarlight',types.card),0,this.color)
                        this.battle.dropDrawShuffle(this.player,findName('Luna, Silent\nMoonlight',types.card),0,this.color)
                    break
                    case 2841: case 2842:
                        this.targetCombatant.statusEffect('Damage Taken Up to Nearest 5',999)
                    break
                    case 2843:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.itemManager.addItem(findName(['Salad','Energy Drink','Glass Shard','Molten Metal','Caffeine Pill','Attack Dust','Defense Dust','Mystery Box'][floor(random(0,8))],types.item),this.player)
                        }
                        this.battle.dropDrawShuffle(this.player,findName('Dazed',types.card),this.level,game.playerNumber+1)
                    break
                    case 2847:
                        this.battle.addCurrency(this.effect[0],this.player)
                        this.targetCombatant.statusEffect('Strength',this.effect[1])
                    break
                    case 2848:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.itemManager.addItem(findName('Attack Dust',types.item),this.player)
                        }
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.itemManager.addItem(findName('Defense Dust',types.item),this.player)
                        }
                    break
                    case 2854: case 2855:
                        this.targetCombatant.statusEffect('Damage Taken Up to 10',999)
                    break
                    case 2856: case 2857:
                        this.targetCombatant.statusEffect('10 Damage Taken Damage Down Convert',999)
                    break
                    case 2858: case 2859:
                        this.targetCombatant.statusEffect('20 Damage Taken Random Debuff',999)
                    break
                    case 2861:
                        this.userCombatant.statusEffect('Double Damage',this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.itemManager.addItem(findName(['Salad','Energy Drink','Glass Shard','Molten Metal','Caffeine Pill','Attack Dust','Defense Dust','Mystery Box'][floor(random(0,8))],types.item),this.player)
                        }
                    break
                    case 2871:
                        this.battle.addCurrency(this.effect[0]*(this.battle.encounter.class>=1?2:1),this.player)
                    break
                    case 2874:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.dropDrawShuffle(this.player,findName('Prismatic\nBomb',types.card),0,0)
                        }
                    break
                    case 2879:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.dropDrawShuffle(this.player,findName('Prismatic\nBomb',types.card),0,0)
                        }
                        this.battle.drop(this.player,findName('Void',types.card),0,game.playerNumber+1)
                    break
                    case 2894:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.addCost(findName('Dual\nDiscus',types.card),this.level,0,2)
                        }
                    break
                    case 2902:
                        this.userCombatant.statusEffect('Dual Discus Per Turn',this.effect[0])
                    break
                    case 2968:
                        this.userManager.hand.allEffect(90)
                    break
                    case 2982:
                        this.battle.addCurrency(this.effect[0],this.player)
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[1],0])
                    break
                    case 2985:
                        this.battle.overlayManager.overlays[65][this.player].active=true
                        this.battle.overlayManager.overlays[65][this.player].activate([this.effect[0],this.effect[1],this.effect[2]])
                    break
                    case 2991:
                        let result2981=this.userManager.drawReturn(this.effect[0])
                        if(result2981.length>0&&result2981[0].level>=1){
                            this.userCombatant.addBarrier(this.effect[1])
                        }
                    break
                    case 3018:
                        if(variants.mtg){
                            for(let a=0,la=this.effect[0];a<la;a++){
                                this.battle.addSpecificEnergy(1,this.user,a>=3?0:[3,4,1][a])
                            }
                        }else{
                            let roll3018=this.userCombatant.luckCheck()?this.effect[0]:this.userCombatant.luckCheckFail()?1:floor(random(1,this.effect[0]+1))
                            this.battle.particleManager.createNumber(41,this.userCombatant.position.x,this.userCombatant.position.y,roll3018)
                            if(roll3018<this.effect[0]/2+1/2){
                                this.userCombatant.lowRoll()
                            }else{
                                this.userCombatant.highRoll()
                            }
                            this.battle.addEnergy(roll3018,this.user)
                        }
                        this.userCombatant.statusEffect('Poison',this.effect[1])
                    break
                    case 3058:
                        this.battle.combatantManager.allEffect(30,[this.effect[0]])
                        this.battle.overlayManager.overlays[3][this.player].additionalOptions+=this.effect[1]
                        this.userManager.hand.add(findName('Trough',types.card),this.level,game.playerNumber+1)
                    break
                    case 3061:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.addCost(findName('Dual\nDiscus',types.card),this.level,0,3)
                        }
                    break
                    case 3065:
                        this.battle.loseCurrency(this.effect[0],this.player)
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[1],0])
                    break
                    case 3069:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.statusEffect('Weak',this.effect[1])
                        if(this.userCombatant.elemental){
                            this.userCombatant.statusEffect('Vulnerable',this.effect[2])
                        }
                    break
                    case 3090:
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                        this.userManager.draw(this.effect[0])
                        this.battle.drop(this.player,findName('Void',types.card),0,game.playerNumber+1)
                    break
                    case 3091:
                        this.battle.dropDraw(this.player,findName('Vitality',types.card),0,0)
                    break
                    case 3116:
                        if(this.energy%2==1){
                            this.userManager.hand.exhaust(this.effect[0])
                        }else{
                            this.userCombatant.statusEffect('Dodge',this.effect[1])
                        }
                    break
                    case 3147:
                        this.userCombatant.statusEffect('Common Temporary Strength',this.effect[0])
                    break
                    case 3148:
                        this.userCombatant.statusEffect('Temporary Strength Convert',this.effect[0])
                    break

                }
            break
            case 11:
                switch(this.type){
                    case 1781:
                        this.userCombatant.statusEffect('Single Damage Up',this.userCombatant.lastDeal)
                    break
                    case 1914:
                        this.userCombatant.statusEffect('Single Damage Up',ceil(this.userCombatant.lastTake/max(1,this.effect[0])))
                    break
                    case 2044:
                        this.userCombatant.statusEffect('Damage Up',ceil(this.userCombatant.lastTake/max(1,this.effect[0])))
                    break
                    default:
                        for(let a=0,la=this.targetCombatant.length;a<la;a++){
                            switch(this.type){
                                case 139: case 1709:
                                    this.targetCombatant[a].takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
                                break
                                case 175:
                                    this.targetCombatant[a].statusEffect('Burn',this.effect[0])
                                break
                                case 453:
                                    this.targetCombatant[a].takeDamage(this.effect[0],this.user)
                                    if(this.targetCombatant[a].blocked>0){
                                        this.targetCombatant[a].statusEffect('Bleed',this.effect[1])
                                    }
                                break
                                case 1436:
                                    this.targetCombatant[a].statusEffect('Freeze',this.effect[0])
                                break
                                case 2654:
                                    if(this.targetCombatant[a].block<=0){
                                        this.targetCombatant[a].statusEffect('Bleed',this.effect[0])
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
                            case 516: case 2654:
                                this.userManager.draw(this.effect[1])
                            break
                            case 2384:
                                this.userManager.allGroupClaw(this.effect[1])
                            break
                            case 3014:
                                this.userCombatant.addBarrier(this.effect[1])
                            break
                        }
                    break
                }
            break
            case 12:
                switch(this.type){
                    case -52:
                        this.battle.combatantManager.randomEnemyEffect(6,[this.effect[0]])
                    break
                    case -53:
                        this.userCombatant.statusEffect('Take Damage Next Turn',this.effect[0])
                    break
                    case 342: case 1403: case 2913:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                    break
                    case 350:
                        this.battle.addEnergyGen(this.effect[0],this.player)
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
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,37,[20]))
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
                            this.battle.combatantManager.combatants[index].takeDamage(this.effect[0],this.effect[1])
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
                        for(let a=0,la=min(this.energy,100);a<la;a++){
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
                                if(this.targetCombatant[a].life<=this.effect[1]){
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
                        }else{
                            this.targetCombatant.life=0
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
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<=0){
                            this.battle.addEnergyGen(this.effect[1],this.player)
                        }
                    break
                    case 1404:
                        if(this.energy==0){
                            this.userCombatant.statusEffect('Armor',this.effect[0])
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1408:
                        this.userManager.switch.miracle=true
                    break
                    case 1409:
                        this.battle.combatantManager.allEffect(22,[this.effect[0]])
                    break
                    case 1470:
                        let total5=this.effect[0]
                        let left2=2
                        for(let a=0,la=this.userManager.hand.cards.length;a<la;a++){
                            if(this.userManager.hand.cards[a].attack!=1470&&this.userManager.hand.cards[a].effect[0]>0&&this.userManager.hand.cards[a].class==1&&this.userManager.hand.cards[a].effect.length>0&&!this.userManager.hand.cards[a].spec.includes(12)){
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
                            this.targetCombatant.takeDamage(total5*3,this.user)
                        }else{
                            this.targetCombatant.takeDamage(total5,this.user)
                        }
                    break
                    case 1517:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.battle.combatantManager.summonConstructRandom(this.userCombatant.tilePosition,findName('Man',types.combatant),this.battle.players+1,-30+floor(random(0,6))*60,this.user)
                        }
                    break
                    case 1520:
                        if(this.battle.combatantManager.randomAnyEffect(1,[this.effect[0]])){
                            if(this.battle.combatantManager.randomAnyEffect(1,[this.effect[0]])){
                                this.battle.combatantManager.randomAnyEffect(0,[this.effect[0]])
                            }
                        }
                    break
                    case 1546:
                        if(this.userCombatant.energyParity(this.energy)==0){
                            this.targetCombatant.statusEffect('Weak',this.effect[0])
                        }else{
                            this.targetCombatant.statusEffect('Shock',this.effect[1])
                        }
                    break
                    case 1547:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(!this.userCombatant.luckCheck()&&floor(random(0,2))==0||this.userCombatant.luckCheckFail()){
                            this.userCombatant.lowRoll()
                            this.userCombatant.statusEffect('Lose Next Turn',this.effect[1])
                        }else{
                            this.userCombatant.highRoll()
                        }
                    break
                    case 1555:
                        this.userManager.allEffect(2,51)
                    break
                    case 1566:
                        this.targetCombatant.statusEffect('Burn',this.effect[0])
                        this.targetCombatant.statusEffect('Stun',this.effect[1])
                    break
                    case 1604:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Bouncy\nBall',types.card),0,0)
                        }
                    break
                    case 1632:
                        this.userCombatant.statusEffect('Burn Draw Up',this.effect[0])
                    break
                    case 1669:
                        this.targetTile.addType(19)
                    break
                    case 1670:
                        for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                            let index=this.battle.tileManager.getTileIndex(this.battle.combatantManager.combatants[a].tilePosition.x,this.battle.combatantManager.combatants[a].tilePosition.y)
                            if(index>=0){
                                this.battle.tileManager.tiles[index].addType(19)
                            }
                        }
                    break
                    case 1691:
                        if(game.theme==1){
                            this.userCombatant.gainMaxHP(this.userManager.hand.cards.length*this.effect[0])
                        }else{
                            game.theme=1
                            this.userCombatant.statusEffect('Strength',this.userManager.hand.cards.length*this.effect[1])
                        }
                        this.userManager.hand.allEffect(22)
                    break
                    case 1746:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                    break
                    case 1762:
                        this.targetCombatant.statusEffect('Fade',this.effect[0])
                    break
                    case 1763:
                        if(this.energy==0){
                            this.targetCombatant.statusEffect('Fade',this.effect[0])
                            this.userManager.draw(this.effect[1])
                        }
                    break
                    case 1764:
                        if(this.energy>=4){
                            this.targetCombatant.takeDamage(this.effect[0],this.user)
                            this.targetCombatant.statusEffect('Fade',this.effect[1])
                        }
                    break
                    case 1765:
                        this.targetCombatant.takeDamage(this.effect[0]*this.targetCombatant.getStatus('Fade'),this.user)
                    break
                    case 1775:
                        for(let a=0,la=100;a<la;a++){
                            if(this.targetCombatant.getStatus('Poison')>0){
                                this.targetCombatant.takeDamage(this.targetCombatant.getStatus('Poison'),this.user)
                                this.targetCombatant.status.main[findList('Poison',this.targetCombatant.status.name)]--
                            }else{
                                a=la
                            }
                        }
                    break
                    case 1776:
                        for(let a=0,la=100;a<la;a++){
                            if(this.targetCombatant.getStatus('Bleed')>0){
                                this.targetCombatant.takeDamage(this.targetCombatant.getStatus('Bleed'),this.user)
                                this.targetCombatant.status.main[findList('Bleed',this.targetCombatant.status.name)]--
                            }else{
                                a=la
                            }
                        }
                    break
                    case 1797:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName(['Blizzard','Inferno','Lightning\nBolt'][floor(random(0,3))],types.card),0,0)
                        }
                    break
                    case 1798:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Freeze',this.effect[1])
                    break
                    case 1799:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Burn',this.effect[1])
                    break
                    case 1800:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Shock',this.effect[1])
                    break
                    case 1818:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Poison',this.effect[1])
                    break
                    case 1819:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.heal(this.effect[1])
                    break
                    case 1820:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Weak',this.effect[1])
                    break
                    case 1823:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Freeze',this.targetCombatant.attack.length)
                    break
                    case 1833:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Fail',this.effect[1])
                    break
                    case 1855:
                        this.battle.attackManager.nodeAfter=true
                    break
                    case 1859:
                        this.battle.combatantManager.allEffect(19,[this.effect[0]])
                        this.battle.combatantManager.fullAllEffect(8,[this.effect[1]])
                    break
                    case 1860:
                        this.battle.combatantManager.rewriterSwitch+=this.effect[0]
                    break
                    case 1873:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.statusEffect('Temporary Draw',this.effect[1])
                    break
                    case 1884:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.blocked>0){
                            this.targetCombatant.statusEffect('Burn',this.effect[1])
                            this.targetCombatant.statusEffect('Freeze',this.effect[2])
                            this.targetCombatant.statusEffect('Shock',this.effect[3])
                        }
                    break
                    case 1903:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Wrong\nMiracle',types.card),0,0)
                        }
                    break
                    case 1917:
                        this.battle.attackManager.finalAfter=true
                    break
                    case 1918:
                        this.battle.attackManager.finalAfter=true
                        this.userCombatant.gainMaxHP(this.effect[0])
                    break
                    case 1941:
                        this.userCombatant.statusEffect('Freeze Draw Up',this.effect[0])
                    break
                    case 1954:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Bleed',this.effect[1])
                    break
                    case 1965:
                        let damage=this.effect[0]*this.userCombatant.diceRoll(1,6)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.combatantManager.randomEnemyEffect(3,[damage,this.user])
                        }
                    break
                    case 2013:
                        this.userCombatant.statusEffect('10% = 25%',999)
                    break
                    case 2014:
                        this.userCombatant.statusEffect('Perfect Dice Rolls',999)
                    break
                    case 2043:
                        for(let a=0,la=game.playerNumber;a<la;a++){
                            this.userManager.addRandomColor(2,this.level,a+1,3)
                        }
                    break
                    case 2057:
                        this.userManager.switch.teleport=true
                    break
                    case 2058:
                        this.userManager.switch.redraw=true
                    break
                    case 2059:
                        this.userManager.switch.smite=true
                    break
                    case 2080:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.allGroupClaw(this.effect[1])
                    break
                    case 2081:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.discard(this.effect[1])
                    break
                    case 2083:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.setTurn(this.battle.turn.total+this.effect[1])
                    break
                    case 2084:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Jinx',this.effect[1])
                    break
                    case 2085:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect(['Freeze','Burn'][this.userCombatant.energyParity(this.energy)],this.effect[1])
                    break
                    case 2086:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.upgrade(this.effect[1])
                    break
                    case 2087:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2088:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.addCurrency(this.effect[1],this.player)
                    break
                    case 2098:
                        this.targetCombatant.takeDamage(this.effect[0]*this.targetCombatant.getStatus('Burn'),this.user)
                    break
                    case 2099:
                        this.targetCombatant.takeDamage(this.effect[0]*this.targetCombatant.getStatus('Freeze'),this.user)
                    break
                    case 2100:
                        this.targetCombatant.takeDamage(this.effect[0]*this.targetCombatant.getStatus('Shock'),this.user)
                    break
                    case 2115:
                        this.battle.overlayManager.overlays[45][this.player].active=true
                        this.battle.overlayManager.overlays[45][this.player].activate([this.battle.nodeManager.world])
                    break
                    case 2117:
                        this.userManager.drawAmount++
                    break
                    case 2119:
                        this.userManager.allEffect(2,68)
                    break
                    case 2122:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Fail',this.effect[1])
                    break
                    case 2138:
                        this.battle.combatantManager.allEffect(28,[this.effect[0]])
                    break
                    case 2148:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(4)
                        }
                    break
                    case 2188:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.faith+=this.effect[1]
                    break
                    case 2189:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Shiv',types.card),0,0)
                        }
                    break
                    case 2190:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.transform(this.effect[1])
                    break
                    case 2191:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.enterStance(0)
                    break
                    case 2192:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.randomStatusInstant(this.effect[1],[1])
                    break
                    case 2193:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<=0){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2271:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userManager.hand.specNumber(5)>=1){
                            this.targetCombatant.statusEffect('Jinx',this.effect[1])
                        }
                    break
                    case 2284:
                        this.userCombatant.evoke(1,this.targetCombatant.id,[1])
                        this.userManager.draw(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userCombatant.holdOrb(12)
                        }
                    break
                    case 2287:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.userCombatant.position.x,this.userCombatant.position.y,51,[20]))
                        this.battle.dropDrawShuffle(this.player,findName('Comet',types.card),0,8)
                    break
                    case 2317:
                        for(let a=0,la=this.userCombatant.status.main.length;a<la;a++){
                            if(this.userCombatant.status.main[a]>0&&(this.userCombatant.status.class[a]==1||this.userCombatant.status.class[a]==3)||this.userCombatant.status.main[a]<0&&(this.userCombatant.status.class[a]==0||this.userCombatant.status.class[a]==2)){
                                this.targetCombatant.statusEffect(this.userCombatant.status.name[a],this.userCombatant.status.main[a])
                            }
                        }
                    break
                    case 2340:
                        this.battle.combatantManager.damageAreaRuleless(this.effect[0],this.targetCombatant.tilePosition)
                        this.battle.particleManager.particles.push(new particle(this.battle.layer,this.targetCombatant.position.x,this.targetCombatant.position.y,52,[15]))
                        if(this.userCombatant.energyParity(this.energy)==1){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2386:
                        for(let a=0,la=min(this.energy,100);a<la;a++){
                            this.userCombatant.holdOrb(floor(random(0,game.orbNumber)))
                        }
                    break
                    case 2387:
                        for(let a=0,la=min(this.energy+this.effect[0],100);a<la;a++){
                            this.userCombatant.holdOrb(floor(random(0,game.orbNumber)))
                        }
                    break
                    case 2399:
                        this.userCombatant.statusEffect('Cable Swap',999)
                    break
                    case 2421:
                        this.userCombatant.statusEffect('0 Cost Single Damage Up',this.effect[0])
                    break
                    case 2422:
                        this.userCombatant.statusEffect('Double Status',1)
                    break
                    case 2473:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.metal+=this.effect[1]
                    break
                    case 2503:
                        this.battle.overlayManager.overlays[10][this.player].active=true
                        this.battle.overlayManager.overlays[10][this.player].activate([0,0,13])
                    break
                    case 2515:
                        this.userManager.randomEffect(0,36,[0])
                    break
                    case 2516:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomCompleteAllCostDown(2,this.level,1)
                        }
                    break
                    case 2524:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.exhaust(this.effect[1])
                        this.userManager.hand.allEffect(81)
                    break
                    case 2543:
                        this.battle.combatantManager.allEffect(33,[])
                    break
                    case 2544:
                        this.battle.purchaseManager.free[this.player]++
                    break
                    case 2547:
                        this.battle.combatantManager.allEffect(34,[this.effect[0]])
                    break
                    case 2564:
                        this.userCombatant.statusEffect('Fragile Double Damage',1)
                    break
                    case 2620:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Cannot Move',this.effect[1])
                    break
                    case 2624:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 2644:
                        this.battle.combatantManager.fullAllEffect(9,[this.effect[0]])
                    break
                    case 2655:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.armed){
                            this.userCombatant.armed=false
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.targetCombatant.tilePosition.x,this.targetCombatant.tilePosition.y)].addType(3)
                        }
                    break
                    case 2674:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.addEnergy(this.userCombatant.getStatus('Awakening'),this.player)
                    break
                    case 2693:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Vulnerable',this.effect[1])
                        this.userCombatant.statusEffect('Wisdom',this.effect[2])
                    break
                    case 2696:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.userCombatant.elemental){
                            this.targetCombatant.statusEffect('Stun',this.effect[1])
                        }
                    break
                    case 2729:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userManager.hand.turnRewinds+this.effect[1]),this.user)
                    break
                    case 2800:
                        this.battle.overlayManager.overlays[60][this.player].active=true
                        this.battle.overlayManager.overlays[60][this.player].activate([this.targetCombatant.id])
                    break
                    case 2812:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
                        }
                        this.battle.attackManager.endAfter=true
                    break
                    case 2828:
                        let list2828=[this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards]
                        if(this.effect[3]>=7&&this.targetCombatant.id==this.userCombatant.id){
                            this.userCombatant.statusEffect('Strength',this.effect[2])
                            for(let a=0,la=list2828.length;a<la;a++){
                                for(let b=0,lb=list2828[a].length;b<lb;b++){
                                    if(list2828[a][b].id==this.id){
                                        list2828[a][b].effect[3]-=7
                                    }
                                }
                            }
                        }else if(this.effect[3]>=3&&this.targetCombatant.id==this.userCombatant.id){
                            this.userCombatant.statusEffect('Take 1/4 Damage',this.effect[1])
                            for(let a=0,la=list2828.length;a<la;a++){
                                for(let b=0,lb=list2828[a].length;b<lb;b++){
                                    if(list2828[a][b].id==this.id){
                                        list2828[a][b].effect[3]-=3
                                    }
                                }
                            }
                        }else{
                            if(this.targetCombatant.id!=this.userCombatant.id){
                                for(let a=0,la=2;a<la;a++){
                                    this.targetCombatant.takeDamage(this.effect[0],this.user)
                                }
                            }
                            for(let a=0,la=list2828.length;a<la;a++){
                                for(let b=0,lb=list2828[a].length;b<lb;b++){
                                    if(list2828[a][b].id==this.id){
                                        list2828[a][b].effect[3]++
                                    }
                                }
                            }
                        }
                    break
                    case 2829:
                        let list2829=[this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards]
                        if(this.effect[4]>=7&&this.targetCombatant.id!=this.userCombatant.id){
                            this.targetCombatant.takeDamage(this.effect[2],this.user)
                            this.targetCombatant.statusEffect('Vulnerable',this.effect[3])
                            for(let a=0,la=list2829.length;a<la;a++){
                                for(let b=0,lb=list2829[a].length;b<lb;b++){
                                    if(list2829[a][b].id==this.id){
                                        list2829[a][b].effect[4]-=7
                                    }
                                }
                            }
                        }else if(this.effect[4]>=3&&this.targetCombatant.id==this.userCombatant.id){
                            this.userCombatant.statusEffect('Dodge',this.effect[1])
                            for(let a=0,la=list2829.length;a<la;a++){
                                for(let b=0,lb=list2829[a].length;b<lb;b++){
                                    if(list2829[a][b].id==this.id){
                                        list2829[a][b].effect[4]-=3
                                    }
                                }
                            }
                        }else{
                            this.battle.combatantManager.damageArea(this.effect[0],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                            for(let a=0,la=list2829.length;a<la;a++){
                                for(let b=0,lb=list2829[a].length;b<lb;b++){
                                    if(list2829[a][b].id==this.id){
                                        list2829[a][b].effect[4]++
                                    }
                                }
                            }
                        }
                    break
                    case 2830:
                        let list2830=[this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards]
                        if(this.effect[3]>=7&&this.targetCombatant.id==this.userCombatant.id){
                            this.userCombatant.statusEffect('Intangible',this.effect[2])
                            for(let a=0,la=list2830.length;a<la;a++){
                                for(let b=0,lb=list2830[a].length;b<lb;b++){
                                    if(list2830[a][b].id==this.id){
                                        list2830[a][b].effect[3]-=7
                                    }
                                }
                            }
                        }else if(this.effect[3]>=3&&this.targetCombatant.id==this.userCombatant.id){
                            this.battle.addEnergy(this.effect[1],this.player)
                            for(let a=0,la=list2830.length;a<la;a++){
                                for(let b=0,lb=list2830[a].length;b<lb;b++){
                                    if(list2830[a][b].id==this.id){
                                        list2830[a][b].effect[3]-=3
                                    }
                                }
                            }
                        }else{
                            if(this.targetCombatant.id==this.userCombatant.id){
                                this.userCombatant.addBlock(this.effect[0])
                            }
                            for(let a=0,la=list2830.length;a<la;a++){
                                for(let b=0,lb=list2830[a].length;b<lb;b++){
                                    if(list2830[a][b].id==this.id){
                                        list2830[a][b].effect[3]++
                                    }
                                }
                            }
                        }
                    break
                    case 2838:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.battle.addEnergy(this.effect[1],this.player)
                        let list2838=[this.userManager.deck.cards,this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                        for(let a=0,la=list2838.length;a<la;a++){
                            for(let b=0,lb=list2838[a].length;b<lb;b++){
                                if(list2838[a][b].id==this.id){
                                    list2838[a][b].effect[1]+=list2838[a][b].effect[2]
                                }
                            }
                        }
                    break
                    case 2840:
                        this.userCombatant.statusEffect('Double Damage Without Power',1)
                    break
                    case 2862:
                        this.userCombatant.statusEffect('Taken Damage Repeat',1)
                    break
                    case 2911:
                        this.userCombatant.statusEffect('Intangible',this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.battle.dropDrawShuffle(this.player,findName('Dazed',types.card),this.level,game.playerNumber+1)
                        }
                    break
                    case 2912:
                        this.userManager.switch.dualDiscus=true
                    break
                    case 2951:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.statusEffect('Intangible',this.effect[1])
                        }
                    break
                    case 2957:
                        this.userCombatant.statusEffect('Freeze Temporary Damage Up',this.effect[0])
                    break
                    case 2967:
                        this.userCombatant.statusEffect('3+ Cost Free Discus',1)
                    break
                    case 2969:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.add(findName('Dual\nDiscus',types.card),this.level,0)
                    break
                    case 2983:
                        let result2983=this.userManager.drawReturn(this.effect[1])
                        this.targetCombatant.takeDamage(result2983.length>0&&result2983[0].class==1?this.effect[0]+this.effect[2]:this.effect[0],this.user)
                    break
                    case 2998:
                        this.userCombatant.addBarrier(this.effect[0])
                    break
                    case 3012:
                        this.userCombatant.statusEffect('Miracle Next Turn Next Turn',this.effect[0])
                    break
                    case 3015:
                        this.userCombatant.heal(this.effect[0])
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Miracle',types.card),0,0)
                        }
                    break
                    case 3030:
                        this.userCombatant.statusEffect('3+ Cost Free Upgraded Discus',1)
                    break
                    case 3039:
                        this.userCombatant.statusEffect('Miracle Next Turn Next Turn Next Turn',this.effect[0])
                    break
                    case 3044:
                        this.userManager.discard.send(this.userManager.reserve.cards,0,-1,15)
                        this.userManager.shuffle(1)
                        this.userManager.draw(this.effect[0])
                        this.battle.addEnergy(this.effect[1],this.player)
                    break
                    case 3074:
                        if(this.cost>=7){
                            this.selfCall(20)
                        }else if(this.cost>=3){
                            this.userCombatant.statusEffect('Take 1/4 Damage',this.effect[1])
                            let list=[this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                            for(let a=0,la=list.length;a<la;a++){
                                for(let b=0,lb=list[a].length;b<lb;b++){
                                    if(list[a][b].id==this.id){
                                        list[a][b].cost-=3
                                    }
                                }
                            }
                        }
                    break
                    case 3075:
                        if(this.cost>=7){
                            this.selfCall(20)
                        }else if(this.cost>=3){
                            this.userCombatant.statusEffect('Dodge',this.effect[1])
                            let list=[this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                            for(let a=0,la=list.length;a<la;a++){
                                for(let b=0,lb=list[a].length;b<lb;b++){
                                    if(list[a][b].id==this.id){
                                        list[a][b].cost-=3
                                    }
                                }
                            }
                        }
                    break
                    case 3076:
                        if(this.cost>=7){
                            this.selfCall(20)
                        }else if(this.cost>=3){
                            this.battle.addEnergy(this.effect[1],this.player)
                            let list=[this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                            for(let a=0,la=list.length;a<la;a++){
                                for(let b=0,lb=list[a].length;b<lb;b++){
                                    if(list[a][b].id==this.id){
                                        list[a][b].cost-=3
                                    }
                                }
                            }
                        }
                    break
                    case 3077:
                        this.userManager.discard.send(this.userManager.reserve.cards,0,-1,15)
                        this.userManager.shuffle(1)
                        this.userManager.draw(this.effect[0])
                        this.battle.addEnergy(this.effect[1],this.player)
                        this.battle.overlayManager.overlays[8][this.player].active=true
                        this.battle.overlayManager.overlays[8][this.player].activate()
                    break
                    case 3078:
                        if(this.cost>=9){
                            this.selfCall(20)
                        }else if(this.cost>=4){
                            this.battle.overlayManager.overlays[19][this.player].active=true
                            this.battle.overlayManager.overlays[19][this.player].activate()
                            let list=[this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                            for(let a=0,la=list.length;a<la;a++){
                                for(let b=0,lb=list[a].length;b<lb;b++){
                                    if(list[a][b].id==this.id){
                                        list[a][b].cost-=4
                                    }
                                }
                            }
                        }
                    break
                    case 3082:
                        if(this.cost>=6){
                            this.selfCall(20)
                        }else if(this.cost>=3){
                            this.userManager.allEffectArgs(2,21,[this.effect[0]])
                        }
                    break
                    case 3084:
                        this.userManager.hand.allEffect(96)
                    break
                    case 3093:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.userManager.hand.add(findName('Pristine',types.card),0,0)
                    break
                    case 3132:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.userCombatant.heal(this.effect[1])
                    break
                    case 3134:
                        if(this.cost>=7){
                            this.selfCall(20)
                        }else if(this.cost>=3){
                            this.userManager.allEffect(2,4)
                        }
                    break
                    case 3135:
                        if(this.cost>=12){
                            this.selfCall(20)
                        }else if(this.cost>=5){
                            this.userManager.hand.add(findName('17 of\nNothings',types.card),0,0)
                        }
                    break
                    case 3140:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        this.targetCombatant.statusEffect('Cannot Move',this.effect[1])
                        this.targetCombatant.statusEffect('Lose Per Turn',this.effect[2])
                        this.userCombatant.statusEffect('Lose Per Turn',this.effect[3])
                    break
                    case 3144:
                        this.battle.tileManager.typeArea(7,this.userCombatant.tilePosition)
                    break

                }
            break
            case 13:
                switch(this.type){
                    case 394:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.userCombatant.balance+=this.effect[1]
                    break
                    case 395:
                        this.battle.combatantManager.statusAreaIDBlock('Bleed',this.effect[0],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 420:
                        let total=this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.userCombatant.heal(this.effect[0]*total)
                    break
                    case 434:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.battle.combatantManager.intentNerfArea(1,this.effect[1],this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                    break
                    case 698:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.randomEffect(2,0,[])
                        }
                    break
                    case 739:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.battle.attackManager.endAfter=true
                    break
                    case 882:
                        this.battle.combatantManager.statusAreaID('Burn',this.effect[0],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 981:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        for(let a=0,la=this.effect[1];a<la;a++){
                            this.userManager.hand.add(findName('Burn',types.card),0,game.playerNumber+1)
                        }
                    break
                    case 1051:
                        this.battle.combatantManager.statusAreaID('Bruise',this.effect[0],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 1447: case 3052:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.battle.combatantManager.statusAreaID('Freeze',this.effect[1],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 1448:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.battle.combatantManager.statusAreaID('Burn',this.effect[1],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 2132:
                        this.battle.combatantManager.statusAreaID('Shock',this.effect[0],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 2314:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.battle.combatantManager.statusAreaID('Weak',this.effect[1],this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                    case 2490:
                        this.battle.combatantManager.damageArea(this.effect[0]*this.userManager.hand.totalCost(),this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                    break
                    case 2629:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        if(this.userCombatant.armed){
                            this.userCombatant.armed=false
                            this.battle.tileManager.tiles[this.battle.tileManager.getTileIndex(this.userCombatant.tilePosition.x,this.userCombatant.tilePosition.y)].addType(3)
                        }
                    break
                    case 2681:
                        this.battle.combatantManager.damageArea(this.effect[0]*(this.userCombatant.elemental?3:1),this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                    break
                    case 2700:
                        this.battle.combatantManager.damageArea(this.effect[0]+this.effect[1]*this.userCombatant.getStatus('Knowledge'),this.user,this.userCombatant.team,this.userCombatant.tilePosition)
                    break
                    case 2797:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.userManager.randomEffect(2,43,[])
                    break
                    case 2903:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.battle.addEnergy(this.effect[1]*this.userManager.hand.specNumber(54),this.player)
                    break
                    case 2923:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        if(this.drawn>=2){
                            this.userCombatant.addBlock(this.effect[1])
                        }
                    break
                    case 3004:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.battle.overlayManager.overlays[58][this.player].active=true
                        this.battle.overlayManager.overlays[58][this.player].activate([this.effect[1],this.effect[2]])
                    break
                    case 3021:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                        this.userCombatant.addBarrier(this.effect[1])
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.add(findName('Dual\nDiscus',types.card),this.level,0)
                        }
                    break
                    case 3130:
                        this.userCombatant.statusEffect('Temporary Dexterity Per Turn',this.effect[0])
                    break
                    default:
                        this.battle.combatantManager.damageAreaID(this.effect[0],this.user,this.userCombatant.id,this.userCombatant.tilePosition)
                    break
                }
                //mark 7
            break
            case 14:
                switch(this.type){
                    case 2070:
                        this.userManager.allGroupEffect(64)
                    break
                    case 2071:
                        this.battle.setTurn(this.battle.turn.total+this.effect[0])
                    break
                    case 2072:
                        this.battle.setTurn(this.battle.turn.total-this.effect[0])
                    break
                    case 2073:
                        this.battle.setTurn(this.battle.turn.total*2)
                    break
                    case 2074:
                        this.battle.setTurn(this.effect[0])
                    break
                    case 2109:
                        this.battle.setTurn(this.battle.turn.total+this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                    case 2348:
                        this.battle.setTurn(this.effect[0])
                        this.userManager.draw(this.effect[1])
                    break
                }
            break
            case 15:
                switch(this.type){
                    case 1334:
                        this.targetCombatant.statusEffect('Jinx',this.effect[0]*this.energy)
                    break
                    case 1335:
                        this.targetCombatant.statusEffect('Jinx',this.effect[0])
                    break
                    case 1336:
                        this.targetCombatant.takeDamage(this.targetCombatant.getStatus('Jinx')*this.effect[0]/10,this.user)
                    break
                    case 1613:
                        this.targetCombatant.statusEffect('Jinx Next Turn',this.effect[0])
                    break
                    case 1614:
                        this.targetCombatant.multiplyStatus('Jinx',this.effect[0])
                    break
                    case 2444:
                        this.targetCombatant.takeDamage(this.targetCombatant.getStatus('Jinx'),-1)
                        this.targetCombatant.status.main[findList('Jinx',this.targetCombatant.status.name)]=0
                    break
                    case 2139:
                        this.targetCombatant.statusEffect('Jinx',this.effect[0])
                        for(let a=0,la=this.effect[2];a<la;a++){
                            this.userManager.hand.randomEffect(0)
                        }
                        this.userManager.draw(this.effect[1])
                    break
                    case 2445:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.getStatus('Jinx')>=20){
                            this.battle.addEnergy(this.effect[1],this.player)
                        }
                    break
                    case 2465:
                        this.targetCombatant.statusEffect('Jinx',this.effect[0])
                        this.userCombatant.statusEffect('Counter All',this.effect[1])
                    break
                    case 3000:
                        this.userCombatant.statusEffect('Dexterity',this.effect[0])
                        this.targetCombatant.statusEffect('Dexterity',-this.effect[1])
                    break
                    case 3001:
                        this.targetCombatant.takeDamage(this.effect[0],this.user)
                        if(this.targetCombatant.life<=0){
                            this.userCombatant.statusEffect('Dexterity',this.effect[1])
                            this.userManager.draw(this.effect[2])
                        }
                    break
                }
            break
            case 16:
                switch(this.type){
                    case 2527:
                        this.userManager.deck.randomEffect(39)
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomEdition(0,0,0,floor(random(1,7)))
                        }
                    break
                    case 2528:
                        this.userManager.deck.randomEffect(39)
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomEdition(0,0,1,floor(random(1,7)))
                        }
                    break
                    case 2529:
                        this.userManager.deck.randomEffect(39)
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.addRandomEdition(0,0,2,floor(random(1,7)))
                        }
                    break
                    case 2530:
                        this.battle.overlayManager.overlays[3][this.player].active=true
                        this.battle.overlayManager.overlays[3][this.player].activate([0,3,17,5,1])
                    break
                    case 2531:
                        this.battle.overlayManager.overlays[3][this.player].active=true
                        this.battle.overlayManager.overlays[3][this.player].activate([0,3,17,5,2])
                    break
                    case 2532:
                        this.battle.overlayManager.overlays[3][this.player].active=true
                        this.battle.overlayManager.overlays[3][this.player].activate([0,3,17,5,3])
                    break
                    case 2533:
                        this.battle.overlayManager.overlays[3][this.player].active=true
                        this.battle.overlayManager.overlays[3][this.player].activate([0,3,17,5,4])
                    break
                    case 2534:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.deck.randomEffect(30,[floor(random(1,7))])
                        }
                    break
                    case 2535:
                        this.userManager.deck.add(findName(['Yuyuko','Seiun','Elysia','Ennealis','Sukuna','Miratei','Syuua','Aria'][floor(random(0,8))],types.card),this.level,game.playerNumber+5)
                    break
                    case 2536:
                        this.userManager.allEffect(2,82)
                    break
                    case 2537:
                        this.userManager.hand.allEffectArgs(17,[floor(random(1,game.playerNumber+1))])
                    break
                    case 2538:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.deck.randomEffect(39)
                        }
                        this.battle.addCurrency(this.effect[1],this.player)
                    break
                    case 2539:
                        this.userManager.deck.randomEffect(39)
                        this.battle.overlayManager.overlays[12][this.player].active=true
                        this.battle.overlayManager.overlays[12][this.player].activate([])
                    break
                    case 2540:
                        this.userManager.deck.randomEffect(39)
                        this.battle.overlayManager.overlays[49][this.player].active=true
                        this.battle.overlayManager.overlays[49][this.player].activate([])
                    break
                    case 2541:
                        this.userManager.deck.randomEffect(39)
                        this.battle.overlayManager.overlays[52][this.player].active=true
                        this.battle.overlayManager.overlays[52][this.player].activate([])
                    break
                    case 2542:
                        this.battle.overlayManager.overlays[53][this.player].active=true
                        this.battle.overlayManager.overlays[53][this.player].activate([])
                    break
                    case 2556:
                        this.userManager.deck.unRemove()
                    break
                    case 2557:
                        this.userManager.deck.randomEffect(40,[1])
                    break
                }
            break
            case 17:
                switch(this.type){
                    case 2631:
                        this.userManager.allEffect(2,84)
                    break
                    case 2632:
                        this.userManager.allEffect(2,85)
                    break
                    case 2633:
                        this.userManager.addRandomSpec(2,this.level,53)
                        this.userManager.hand.cards[this.userManager.hand.cards.length-1].retain2=true
                    break
                    case 2635:
                        for(let a=0,la=this.effect[0];a<la;a++){
                            this.userManager.hand.randomEffect(41,[])
                        }
                    break
                    case 2640:
                        this.battle.itemManager.tempEffectiveness[this.player]=max(2,this.battle.itemManager.tempEffectiveness[this.player])
                    break
                    case 2844:
                        this.battle.itemManager.tempEffectiveness[this.player]=max(2,this.battle.itemManager.tempEffectiveness[this.player])
                        this.userCombatant.life-=this.effect[0]
                    break
                    case 2846:
                        this.userCombatant.statusEffect('Item Use Energy',this.effect[0])
                    break
                    case 2851:
                        this.battle.itemManager.activateItem(findName(['Salad','Energy Drink','Glass Shard','Molten Metal','Caffeine Pill','Attack Dust','Defense Dust','Mystery Box'][floor(random(0,8))],types.item),this.player)
                    break
                    case 2852:
                        this.userCombatant.statusEffect('Item Use Draw',this.effect[0])
                    break
                    case 2853:
                        this.battle.itemManager.combatEffectiveness[this.player]=max(2,this.battle.itemManager.combatEffectiveness[this.player])
                    break
                    case 2868:
                        this.userCombatant.statusEffect('Item Per Turn',this.effect[0])
                    break
                }
            break
            case 18:
                switch(this.type){
                    case 130:
                        this.targetCombatant.takeDamage(this.effect[0]+this.effect[1]*this.combo,this.user)
                        this.userCombatant.combo=0
                    break
                    case 2126:
                        this.targetCombatant.statusEffect('Shock',this.effect[0])
                    break
                    case 2663:
                        this.targetCombatant.takeDamage(this.effect[0]*(this.userCombatant.getStatus('Dodge')>0?3:1),this.user)
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
                    case 1623:
                        this.userManager.add(findName('Second\nFist',types.card),this.level,0)
                    break
                    case 1889:
                        this.userCombatant.statusEffect('Dodge',this.effect[1])
                    break
                    case 3051:
                        this.battle.addEnergy(this.effect[1],this.player)
                    break
                }
            break
            case 19:
                switch(this.type){
                    case 3044: case 3077:
                        this.userManager.allEffect(2,1)
                    break
                }
            break
            case 20:
                let list=[this.userManager.discard.cards,this.userManager.reserve.cards,this.userManager.hand.cards,this.userManager.exhaust.cards]
                for(let a=0,la=list.length;a<la;a++){
                    for(let b=0,lb=list[a].length;b<lb;b++){
                        if(list[a][b].id==this.id){
                            this.battle.overlayManager.overlays[70][this.player].active=true
                            this.battle.overlayManager.overlays[70][this.player].activate([list[a][b]])
                        }
                    }
                }
            break

        }
    }
}