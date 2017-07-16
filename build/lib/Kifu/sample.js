"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const kifu = `開始日時：2016/11/01 10:00
終了日時：2016/11/01 17:07
棋戦：第66期王将戦挑戦者決定リーグ戦/角換わり腰掛銀
場所：東京・将棋会館
先手：糸谷哲郎八段
後手：深浦康市九段
手数----指手---------消費時間--
   1 ７六歩(77)    ( 0:00/00:00:00)
*◆糸谷 哲郎（いとだに てつろう）八段◆
*1988年10月５日生まれ、広島県広島市出身。森信雄七段門下。2006年、四段。2014年、八段。棋士番号は260。
*タイトル戦登場は３回。獲得は竜王１期。棋戦優勝は１回。
   2 ８四歩(83)    ( 0:00/00:00:00)
*◆深浦 康市（ふかうら こういち）九段◆
*1972年２月14日生まれ、長崎県出身。（故）花村元司九段門下。1991年、四段。2008年、九段。棋士番号は201。
*タイトル戦登場は８回。獲得は王位３期。棋戦優勝は９回。
   3 ２六歩(27)    ( 0:00/00:00:00)
*糸谷の通算成績は313勝149敗（0.677）、今年度成績は17勝14敗（0.548）。
   4 ８五歩(84)    ( 0:00/00:00:00)
*深浦の通算成績は784勝437敗（0.642）、今年度成績は13勝11敗（0.542）。
   5 ７七角(88)    ( 0:00/00:00:00)
*対戦成績は糸谷３勝、深浦１勝。王将戦では前期の挑戦者決定リーグで戦っており、深浦が制している。
   6 ３四歩(33)    ( 0:00/00:00:00)
*前期の王将戦は郷田真隆王将に羽生善治名人（対局当時）が挑んだ。結果は４勝２敗で郷田王将が防衛した。
   7 ８八銀(79)    ( 0:00/00:00:00)
*今期、王将戦挑戦者決定リーグ成績は下記の通り。
*豊島将之七段　３勝０敗
*羽生善治三冠　１勝０敗
*久保利明九段　１勝１敗
*糸谷哲郎八段　１勝１敗
*渡辺　明竜王　１勝１敗
*深浦康市九段　１勝２敗
*近藤誠也四段　０勝３敗
   8 ３二金(41)    ( 0:00/00:00:00)
*本日は王将戦挑戦者決定リーグが、もう１局、特別対局室の奥側で行われている。▲渡辺明竜王－△羽生善治三冠戦で好カードだ。モバイル中継もされているので、今日は王将戦挑戦者決定リーグを２局、お楽しみいただきたい。
   9 ７八金(69)    ( 0:00/00:00:00)
  10 ７七角成(22)  ( 0:00/00:00:00)
*戦型は角換わりになった。
  11 同　銀(88)    ( 0:00/00:00:00)
  12 ４二銀(31)    ( 0:00/00:00:00)
*本日の立会人は中村修九段が務める。
  13 ３八銀(39)    ( 0:00/00:00:00)
  14 ６二銀(71)    ( 0:00/00:00:00)
*両者、淡々と指し進めている。
  15 ４六歩(47)    ( 0:00/00:00:00)
  16 ６四歩(63)    ( 0:00/00:00:00)
  17 ６八玉(59)    ( 0:00/00:00:00)
  18 ４一玉(51)    ( 0:00/00:00:00)
*今日の東京は朝から、あいにくのお天気。予報では午後から晴れになっているが、果たしてどうか。
  19 ３六歩(37)    ( 0:00/00:00:00)
  20 ５二金(61)    ( 0:00/00:00:00)
  21 ３七桂(29)    ( 0:00/00:00:00)
  22 ７四歩(73)    ( 0:00/00:00:00)
*お互いの右銀（攻めの銀）が、どういった動きを見せるのか注目だ。
  23 ４七銀(38)    ( 2:00/00:02:00)
  24 ６三銀(62)    ( 0:00/00:00:00)
*本日は囲碁・将棋チャンネルにより、王将戦挑戦者決定リーグ２局の生中継がある。解説は17時からで、森下卓九段が行う。解説が開始されるまでは、対局室の映像が中継されている。
  25 ４八金(49)    ( 1:00/00:03:00)
  26 ３一玉(41)    ( 3:00/00:03:00)
  27 ２九飛(28)    ( 0:00/00:03:00)
*▲４八金から飛車を引いて、角打ちの隙をなくしている。
  28 ５四銀(63)    ( 0:00/00:03:00)
  29 ５六銀(47)    ( 0:00/00:03:00)
*▲５六銀に深浦は扇子を手にして、盤面を見ている。糸谷は脇息に左ひじをのせて前傾姿勢。
*▲２九飛から▲５六銀という手順に対して、深浦はどういった形で対応していくのか。しばし考えそうな気配を感じる。
  30 ７三桂(81)    ( 8:00/00:11:00)
*攻めの形としては、自然な△７三桂だった。
  31 ２五歩(26)    ( 0:00/00:03:00)
  32 ３三銀(42)    ( 0:00/00:11:00)
*▲２五歩には△３三銀がワンセット。先手にだけ、飛車先の歩を交換させては面白くない。
  33 １六歩(17)    ( 0:00/00:03:00)
  34 １四歩(13)    ( 1:00/00:12:00)
  35 ９六歩(97)    ( 0:00/00:03:00)
*▲１六歩に続いて、玉側の９筋の歩を突く糸谷。１筋の端歩は受けた深浦だが、９筋はどうするか。
  36 ９四歩(93)    ( 5:00/00:17:00)
*５分使って、９筋も受けた。△９四歩を突いて、深浦は腕組みをして盤面を見ている。
*先手は▲６六歩と突くか、▲７九玉も指しておきたい手だ。
  37 ３五歩(36)    ( 3:00/00:06:00)
*10時41分、早くも駒がぶつかった。いきなりの仕掛けだ。▲３五歩を見た深浦は、ペットボトルのお茶をグラスに注ぐ。そして足を崩す。
*▲６六歩は△６五歩を後手から仕掛けられる手を気にしたのか。
*「この仕掛けは、つい最近見ましたね。叡王戦だ」と中村修九段。10月30日に行われた、叡王戦の▲千田翔太五段－△佐々木勇気五段戦（結果は先手の千田五段の勝ち）が、まったく同じ形からの仕掛けだった。糸谷と千田五段は森信雄七段門下の同門だ。兄弟弟子で、同じ仕掛けを敢行したことになる。▲千田五段－△佐々木勇五段はモバイル中継が行われていた。棋譜コメントには「感想戦では先手が仕掛けて以降、後手が互角以上に戦える変化が見つからなかった」とある。さて、本局の深浦はどのような対策を見せるのか。
  38 ４四歩(43)    (23:00/00:40:00)
*11時４分の着手。△４四歩までの消費時間は▲糸谷６分、△深浦40分。
*前手コメントに記した叡王戦の▲千田五段－△佐々木勇五段は△３五同歩▲４五桂に△４二銀と進行していた。
*本局は桂を跳ねさせない△４四歩だった。
  39 ３四歩(35)    (13:00/00:19:00)
*13分の考慮で取り込んだ。
  40 同　銀(33)    ( 0:00/00:40:00)
*深浦はノータイムで、歩を取る。
  41 ４七銀(56)    ( 0:00/00:19:00)
*糸谷は後手の形を乱して銀を引く。△３六歩を受けた手だ。
  42 ４三銀(54)    ( 9:00/00:49:00)
*△４三銀右と引いて形を整えた。
*「先手は歩を持ったので、どこかで▲７五歩はあります。いきなり▲７五歩△同歩▲７四歩△６五桂▲７三歩成は△７七桂成で、ちょっとムリかな。▲７五歩の含みを持たせて、▲６六銀もあります。▲５六歩もありそうです。手が広い局面だと思います」と中村修九段。
*糸谷の考慮中に深浦が扇子を大きく広げた。使用しているのは、弟子の佐々木大地四段と書いた、師弟扇子だった。師匠の深浦が「青雲」弟子の佐々木大地四段が「大志」と揮毫した扇子だ。
*※局後の感想※
*△４三銀右に代えて△３三金が調べられる。以下▲７五歩△同歩▲７四歩△６五桂▲７三歩成△７七桂成▲同金△８一飛▲７二と△４一飛▲７三角△４二飛▲９一角成△８八角▲５六香が盤上に並ぶ。「ちょっと雑ですかね。△３三金は考えていませんでした」と糸谷。「本譜よりはいいですかね」と深浦。
  43 ３六歩打      (13:00/00:32:00)
*11時42分の着手。
*じっと３筋に歩を打った。先手にもう１歩入れば、▲３五歩△同歩▲３六歩で、後手の銀を逮捕できる。
*先手は歩を打ったので、▲７五歩の攻め筋はなくなった。「先手は右玉にする可能性があります。好みだけでいうと、少し先手持ちです。後手に制限が多いような気がします」と中村修九段。
*先手は▲２四歩から動くのは△同歩▲同飛に△２五歩と打たれて、退路を消される。
*▲３六歩に深浦が17分使って昼食休憩。消費時間は▲糸谷32分、△深浦１時間６分。対局は12時40分に再開される。
*昼食の注文は糸谷が肉豆腐定食（みろく庵）、深浦はなし。
*※局後の感想※
*「▲３六歩は、▲２六角と打つ含みもありました」と糸谷。
*「▲３六歩に指し手が難しいです」と深浦。
  44 ３三金(32)    (19:00/01:08:00)
*対局再開。昼食休憩後の指し手。
*深浦は力強く△３三金と上がる。後手の陣形は、お世辞にも格好がよいとはいえないが、厚みで勝負だ。
*※局後の感想※
*△３三金に代えて、△５四銀が検討される。以下▲２四歩△同歩▲同飛△４三金右▲２九飛△２三歩▲７五歩△同歩▲７四歩△６五桂▲６六銀で「忙しいです。本譜は仕方がないですね」と深浦。「本譜ならば少し自信がありました」と糸谷。
  45 ６六銀(77)    ( 1:00/00:33:00)
  46 ５四銀(43)    ( 4:00/01:12:00)
*いったん引いた銀を再び腰掛ける。今度は△４三銀左とバックする余地ができた。
  47 ７五歩(76)    ( 8:00/00:41:00)
*▲７五歩から手を作る糸谷。△同歩ならば▲同銀と桂頭を狙って調子がよい。
*後手は△６三銀と引いて受ける感じだろうか。
  48 ６五歩(64)    ( 4:00/01:16:00)
*６六の銀を追い払う手。▲７七銀なら、△７五歩と歩得できる。△６五歩に、先手は▲７四歩取り込んで勝負だろう。以下△６六歩▲７三歩成△６七歩成で、激しい戦いになりそうだ。
  49 ７四歩(75)    ( 4:00/00:45:00)
*取り込んでいざ勝負。激流になりそうだ。
  50 ６六歩(65)    ( 1:00/01:17:00)
  51 ７三歩成(74)  ( 0:00/00:45:00)
*一直線の順。
  52 ６七歩成(66)  ( 1:00/01:18:00)
*午後になって、ふと外を見ると快晴になっている。
*※局後の感想※
*△６七歩成を入れずに、△８一飛と引く手があった。以下▲６四桂△４二金▲７二桂成△４一飛に▲７四角や▲６六歩の手段が考えられる。
  53 同　金(78)    ( 0:00/00:45:00)
  54 ８一飛(82)    ( 0:00/01:18:00)
*△８一飛と引いた局面は、▲桂△銀の交換で後手の駒得。先手はと金を作っている。
  55 ７二と(73)    ( 0:00/00:45:00)
*と金を活用して、飛車を追う。
*△８四飛は▲８二角と打たれてしまう。飛車を逃げるなら△４一飛だろう。
  56 ４一飛(81)    ( 4:00/01:22:00)
  57 ３五歩(36)    ( 0:00/00:45:00)
*７筋攻めから、一転して３筋。△３五同銀は▲３六歩があるので、△４三銀左と引くことになりそうだ。そこで▲２四歩や▲３四桂と打ってどうか。糸谷の攻め、深浦の受けで、しばらく局面は動いていくだろう。
  58 同　銀(34)    ( 4:00/01:26:00)
*▲３六歩で銀は捕まってしまうが、３五に先手の拠点を残しては戦えないと判断したのだろう。
*※局後の感想※
*△３五同銀で△４三銀左は▲３四桂△同銀▲同歩△３二金の順が考えられ、▲２四歩で先手の攻めが続く。
  59 ３六歩打      ( 9:00/00:54:00)
*13時29分の着手。
*後手の銀が捕まった。深浦はどこで代償を得るか。
*▲３五歩と銀を取れば、先手は桂得に加えて、と金を作っていることになる。後手は手を作らなければ、駒損だけが残ってしまう。
*時刻は14時を回った。深浦の考慮が続いている。▲３六歩に考慮時間は50分を超えた。
  60 ５五銀(54)    (60:00/02:26:00)
*14時29分の着手。△５五銀までの消費時間は▲糸谷54分、△深浦２時間26分。
*ちょうど１時間の長考で△５五銀と出た。
  61 ３五歩(36)    ( 0:00/00:54:00)
  62 ６六歩打      ( 0:00/02:26:00)
*桂損の後手は、上から襲い掛かる。
  63 ７七金(67)    ( 0:00/00:54:00)
  64 ７六歩打      ( 0:00/02:26:00)
*後手は攻めの足が止まってしまうと、▲３四桂と打たれる。追撃していくしかない。
*※局後の感想※
*△７六歩に代えて、△６七銀と打つのは▲５九玉△６五角▲２四歩で「ちょっと負けていますね」と深浦。
  65 ７八金(77)    ( 1:00/00:55:00)
*「△６七銀▲同金△同歩成▲同玉△６六歩で、先手玉はかなり怖いんですけどね。△６六歩に『何でもないよ』と▲７六玉の可能性もありますね」と中村修九段。
  66 ６七銀打      ( 6:00/02:32:00)
  67 同　金(78)    ( 1:00/00:56:00)
  68 同　歩成(66)  ( 0:00/02:32:00)
  69 同　玉(68)    ( 0:00/00:56:00)
  70 ６六歩打      ( 0:00/02:32:00)
  71 ５八玉(67)    ( 0:00/00:56:00)
*「引いた。△７七歩成が気になるけどなぁ。▲同桂に△７六角が怖いけど。△７六角に▲５九玉△６七歩成が考えられます。△６七歩成は詰めろにはなっていないですけどね」と中村修九段。
*先手玉はかなり危険な格好になっているが、後手の攻めを余せるかどうか。後手は駒が不足しているので、慎重な攻めが要求される。
  72 ６七角打      ( 1:00/02:33:00)
  73 ５九玉(58)    ( 2:00/00:58:00)
*※局後の感想※
*「▲５九玉で、ちょっと勝ちかなと思っていました」と糸谷。
  74 ４六銀(55)    ( 0:00/02:33:00)
*△４六銀を見た中村修九段は「いきなりですか。▲４六同銀に△４五歩を突くということですか。▲同桂△同飛▲同銀に△４七桂から▲同金△５八金で、先手玉を詰まそうということですね」と話す。
  75 同　銀(47)    ( 0:00/00:58:00)
  76 ４五歩(44)    ( 0:00/02:33:00)
*「▲５五銀は△４六歩と突かれます。後手は優勢と見て踏み込んでいるのだと思います」と中村修九段。
*先手は△４五歩に手を抜いて、攻めるしかないか。
  77 ６五角打      ( 7:00/01:05:00)
*４七の地点に利かせ、後手玉を射程圏に入れる。攻防の一着。
  78 ４六歩(45)    ( 5:00/02:38:00)
*深浦は銀を取る。まだ詰めろにはなっていない。
  79 ３四桂打      ( 1:00/01:06:00)
*▲２二銀までの詰めろで桂を放つ。糸谷は１分で▲３四桂を決断した。
*△３四同金は▲同歩が△４七桂▲同角△同歩成で、後手が勝てるかどうか。また△３四同金の瞬間が怖い。▲３二銀から詰まされても文句はいえない格好だ。際どい形だが、ギリギリで助かっているか。
*△３二金打には▲４二歩や▲２四歩がある。
  80 ５四歩(53)    (31:00/03:09:00)
*△５四歩までの消費時間は▲糸谷１時間６分、△深浦３時間９分。
*「△５四歩は筋ですね。▲２二銀と打たせるのは気持ちが悪いんですけどね」と中村修九段。▲５四同角ならば、４七の受けに利かなくなる。△３四金と桂を取って△４七桂を狙えば、後手が勝勢だ。
*△５四歩を着手して、深浦は記録係から棋譜を受け取って目を通す。
*▲２二銀△３二玉▲５四角のときにどうするか。そこで△４三金寄は▲３三銀打△同桂▲２一銀打△同飛▲同銀不成から後手玉が詰む。▲５四角に４三に駒を打つのは、攻め駒不足に陥ってしまう。
*※局後の感想※
*△５四歩に代えて△３二金打ならば、難しかった。△３二金打以下▲４二歩△同金右▲２四歩△４七歩成▲同金△２四歩▲４八玉△３四金▲同歩△３五桂▲５六銀で「大変ですかね」と深浦。「少し指せると思うのですが、指せば大変ですね」と糸谷。
*また△３二金打に▲４二歩△同金右▲２二銀△同金▲４二桂成△同飛▲５一銀△３二金寄▲４二銀成△同金で明快ではなかった。
  81 ２二銀打      (30:00/01:36:00)
*30分の考慮で▲２二銀と打つ。
  82 ３二玉(31)    ( 0:00/03:09:00)
  83 ６八歩打      ( 0:00/01:36:00)
*▲２二銀を決めて、受けに回った。
*後手は桂を入手して、△４七桂と打ちたいが、△８九角成と桂を取るのは、角のラインがなくなって、先手玉の脅威が緩和される。
*△３四金と桂を取るのは▲６七歩△４七桂▲４九玉で、先手が余せそうだ。
*▲６八歩に深浦は口もとにハンカチを当てて考えている。
  84 ４七歩成(46)  (18:00/03:27:00)
*△４七歩成を▲同金は△５八金までの詰み。▲６七歩と角を取るのも△５八銀▲同金△同と▲同玉△６八金からの即詰みがある。
*※局後の感想※
*△４七歩成に代えて△３四金▲同歩△４七桂▲同角△３四角成▲３三歩が検討されて「これはまずいですね」と深浦。
  85 ３三銀成(22)  ( 3:00/01:39:00)
  86 同　玉(32)    ( 0:00/03:27:00)
  87 ２二銀打      ( 0:00/01:39:00)
*△４三玉で、後手の飛車の利きを消して、▲６七歩と角を取るのだろう。
  88 ４四玉(33)    (18:00/03:45:00)
*深浦は△４四玉を選んだ。４筋に逃げたことで、飛車の利きが止まった。
  89 ６七歩(68)    ( 0:00/01:39:00)
  90 ４八と(47)    ( 0:00/03:45:00)
  91 同　玉(59)    ( 0:00/01:39:00)
*先手玉がすっきりした印象だ。後手は金銀４枚でいかに先手玉に迫っていくか。
  92 ３六金打      ( 2:00/03:47:00)
*「４五に銀を打てるけど、大丈夫ということか」と中村修九段。
*後手玉は中段で頑張っているが、かなり危険な格好だ。しかし即詰みはないようだ。
*中村修九段は▲４五歩に△５三玉の順を考えている。
  93 ４五金打      ( 6:00/01:45:00)
  94 ５三玉(44)    ( 0:00/03:47:00)
  95 ４二歩打      ( 0:00/01:45:00)
*飛車に当てながら▲５四金までの詰みを狙う。先手が優勢になっている。
  96 ４七歩打      ( 4:00/03:51:00)
  97 ５八玉(48)    ( 0:00/01:45:00)
  98 ６四玉(53)    ( 0:00/03:51:00)
  99 ６六歩(67)    ( 0:00/01:45:00)
*▲７三銀△７五玉▲８四角までの詰めろになっている。
 100 ７八銀打      ( 5:00/03:56:00)
*この手で100手に達した。△７八銀までの消費時間は▲糸谷１時間45分、△深浦３時間56分。
*深浦は△７八銀と形を作った。
 101 ７三銀打      ( 0:00/01:45:00)
*この局面で深浦が投了した。終局時刻は17時7分。消費時間は、▲糸谷１時間45分、△深浦３時間56分。
*勝った糸谷はリーグ成績２勝１敗、敗れた深浦は１勝３敗になった。
*投了以下△７五玉に▲８四角までの即詰み。
 102 投了          ( 0:00/03:56:00)`;
exports.sample = Parser_1.parseText(kifu);
//# sourceMappingURL=sample.js.map