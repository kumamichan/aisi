/* ぴたリスト：個人的な質問の「くわしく」（診断アプリ index.html と、スタッフの登録 register.html の両方で使う）
 *  キーは「種類:選んだもの」（例 music:J-POP / hobby:釣り）。お客さまとスタッフが同じキーで同じ名前を選ぶと、共通点になる
 *  名前の一覧は 2026年時点で知名度の高いもの。足りない分は「その他」で自由に入力できる */
(function (g) {
  var POP_JP = ["Mrs. GREEN APPLE", "Official髭男dism", "Vaundy", "YOASOBI", "あいみょん", "King Gnu", "back number", "米津玄師", "Ado", "藤井風", "優里", "SEKAI NO OWARI"];
  var POP_KR = ["BTS", "SEVENTEEN", "Stray Kids", "TWICE", "NewJeans", "LE SSERAFIM", "aespa", "IVE", "BLACKPINK", "ENHYPEN", "NCT", "ILLIT"];
  var ROCK = ["ONE OK ROCK", "SUPER BEAVER", "[Alexandros]", "BUMP OF CHICKEN", "RADWIMPS", "ELLEGARDEN", "10-FEET", "マキシマム ザ ホルモン", "サカナクション", "ハンバート ハンバート"];
  var IDOL = ["Snow Man", "SixTONES", "King & Prince", "なにわ男子", "timelesz", "Travis Japan", "嵐", "乃木坂46", "櫻坂46", "日向坂46", "=LOVE", "FRUITS ZIPPER", "BE:FIRST", "JO1", "INI"];
  var WORKS = ["名探偵コナン", "ONE PIECE", "呪術廻戦", "鬼滅の刃", "【推しの子】", "SPY×FAMILY", "ポケモン", "スラムダンク", "ハイキュー!!", "ゴールデンカムイ", "スプラトゥーン", "モンスターハンター"];
  var D = {
    /* 好きな音楽 */
    "music:J-POP":        { q: "J-POPだと、よく聴くのは？", opts: POP_JP, common: "好きなアーティストが同じ" },
    "music:K-POP":        { q: "K-POPだと、よく聴くのは？", opts: POP_KR, common: "好きなアーティストが同じ" },
    "music:ロック":        { q: "ロックだと、よく聴くのは？", opts: ROCK, common: "好きなバンドが同じ" },
    "music:アニソン":      { q: "アニソンだと、よく聴くのは？", opts: ["LiSA", "Aimer", "YOASOBI", "Ado", "King Gnu", "米津玄師", "ClariS", "MY FIRST STORY"], common: "好きなアーティストが同じ" },
    "music:ヒップホップ":  { q: "ヒップホップだと、よく聴くのは？", opts: ["Creepy Nuts", "ちゃんみな", "Awich", "BAD HOP", "AK-69", "KREVA", "RIP SLYME"], common: "好きなアーティストが同じ" },
    "music:洋楽":          { q: "洋楽だと、よく聴くのは？", opts: ["Taylor Swift", "Ed Sheeran", "Bruno Mars", "Billie Eilish", "The Weeknd", "Ariana Grande", "Coldplay", "Maroon 5"], common: "好きなアーティストが同じ" },
    "music:アイドル":      { q: "アイドルだと、よく聴くのは？", opts: IDOL, common: "好きなアイドルが同じ" },
    /* 推し */
    "oshi:アイドル":            { q: "推しのアイドルは？", opts: IDOL.concat(POP_KR.slice(0, 6)), common: "推しが同じ" },
    "oshi:アーティスト・バンド": { q: "推しのアーティストは？", opts: POP_JP.slice(0, 8).concat(ROCK.slice(0, 4)), common: "推しが同じ" },
    "oshi:スポーツ":            { q: "推しのチーム・選手は？", opts: ["北海道日本ハムファイターズ", "北海道コンサドーレ札幌", "レバンガ北海道", "ヴォレアス北海道", "大谷翔平", "羽生結弦"], common: "推しが同じ" },
    "oshi:アニメ・ゲーム":      { q: "推しの作品は？", opts: WORKS, common: "推しの作品が同じ" },
    "oshi:俳優":                { q: "推しの俳優さんは？", opts: [], common: "推しが同じ" },
    "oshi:YouTuber・配信者":    { q: "推しのYouTuber・配信者は？", opts: [], common: "推しが同じ" },
    "oshi:その他":              { q: "推しはだれ？（なに？）", opts: [], common: "推しが同じ" },
    /* 趣味 */
    "hobby:釣り":                 { q: "釣りは、どこによく行く？", opts: ["石狩湾新港", "小樽", "積丹", "苫小牧", "室蘭", "留萌", "川・渓流", "湖", "船釣り"], common: "釣りでよく行く場所が同じ" },
    "hobby:キャンプ・アウトドア": { q: "キャンプやアウトドアは、どこによく行く？", opts: ["支笏湖", "洞爺湖", "定山渓", "ニセコ", "美瑛・富良野", "道東", "道南"], common: "よく行くキャンプ場所が同じ" },
    "hobby:サウナ・温泉":         { q: "サウナや温泉は、どこによく行く？", opts: ["定山渓", "登別", "洞爺湖温泉", "すすきの・狸小路のサウナ", "近所の銭湯", "道外の温泉"], common: "よく行く温泉・サウナが同じ" },
    "hobby:スノーボード・スキー": { q: "よく行くスキー場は？", opts: ["ニセコ", "ルスツ", "キロロ", "サッポロテイネ", "札幌国際", "札幌藻岩山", "富良野", "手稲・盤渓など近場"], common: "よく行くスキー場が同じ" },
    "hobby:ゴルフ":               { q: "ゴルフは、どのあたりでよく回る？", opts: ["札幌市内", "北広島", "千歳・苫小牧", "小樽", "道外・海外"], common: "ゴルフでよく行くエリアが同じ" },
    "hobby:カフェ巡り":           { q: "カフェ巡りは、どのあたりが多い？", opts: ["円山", "大通・狸小路", "札幌駅", "中島公園", "南平岸・澄川", "小樽", "郊外のカフェ"], common: "よく行くカフェのエリアが同じ" },
    "hobby:旅行":                 { q: "好きな旅行先は？", opts: ["道内", "東京", "京都・大阪", "沖縄", "九州", "韓国", "台湾", "ハワイ", "ヨーロッパ"], common: "好きな旅行先が同じ" },
    "hobby:ゲーム":               { q: "よく遊ぶゲームは？", opts: ["スプラトゥーン", "モンスターハンター", "ポケモン", "あつまれ どうぶつの森", "マリオカート", "原神", "Apex Legends", "フォートナイト"], common: "よく遊ぶゲームが同じ" },
    "hobby:アニメ・マンガ":       { q: "好きな作品は？", opts: WORKS, common: "好きな作品が同じ" },
    "hobby:映画・ドラマ":         { q: "よく観るのは？", opts: ["邦画", "洋画", "韓国ドラマ", "海外ドラマ", "日本のドラマ", "アニメ映画", "ドキュメンタリー"], common: "よく観るものが同じ" },
    "hobby:筋トレ・ジム":         { q: "筋トレは、どこでしてる？", opts: ["24時間ジム", "パーソナルジム", "公共の体育館", "家トレ"], common: "筋トレの場所が同じ" },
    "hobby:ランニング":           { q: "走るのは、どのあたり？", opts: ["豊平川沿い", "大通公園", "円山・北海道神宮", "中島公園", "モエレ沼公園", "北海道マラソンに出る"], common: "走る場所が同じ" },
    /* ペット */
    "pets:犬": { q: "わんちゃんの種類は？", opts: ["トイプードル", "チワワ", "柴犬", "ミニチュアダックスフンド", "ポメラニアン", "フレンチブルドッグ", "ゴールデン・ラブラドール", "MIX"], common: "同じ犬種" },
    "pets:猫": { q: "ねこちゃんの種類は？", opts: ["スコティッシュフォールド", "マンチカン", "アメリカンショートヘア", "ラグドール", "ブリティッシュショートヘア", "MIX・保護猫"], common: "同じ猫種" },
    /* 出身 */
    "home:北海道（札幌以外）": { q: "北海道のどこ？", opts: ["旭川", "函館", "小樽", "帯広", "釧路", "北見", "苫小牧", "江別", "千歳", "室蘭", "岩見沢"], common: "同じ出身" }
  };
  var CAT_HIDE = { music: "好きな音楽", oshi: "推し", hobby: "趣味", pets: "ペット", home: "出身" };
  function norm(s) { return String(s || "").replace(/（例）|[\s　・!！?？「」【】\[\]]/g, "").toLowerCase(); }
  /* お客さまの答え（A）とスタッフ（p）の「くわしく」を比べる → {score, common:[...]} */
  function match(A, p) {
    var out = { score: 0, common: [] }; if (!A || !p) return out;
    Object.keys(A).forEach(function (k) {
      var mine = (A[k] || []).map(norm).filter(Boolean), theirs = p[k] || [];
      if (!mine.length || !theirs.length) return;
      var hit = theirs.filter(function (t) { var n = norm(t); return n && mine.some(function (m) { return m === n || (m.length >= 3 && n.indexOf(m) >= 0) || (n.length >= 3 && m.indexOf(n) >= 0); }); });
      if (hit.length) { out.score += 1.5; out.common.push(((D[k] || {}).common || "共通点") + "（" + String(hit[0]).replace("（例）", "") + "）"); }
    });
    /* 種類が違っても、同じ名前があれば共通点（例：お客さまは推し、スタッフは好きな音楽で「Snow Man」） */
    if (!out.common.length) {
      var all = []; Object.keys(p).forEach(function (k) { (p[k] || []).forEach(function (t) { all.push(t); }); });
      var mineAll = []; Object.keys(A).forEach(function (k) { (A[k] || []).forEach(function (t) { mineAll.push(norm(t)); }); });
      var h = all.filter(function (t) { var n = norm(t); return n.length >= 2 && mineAll.indexOf(n) >= 0; });
      if (h.length) { out.score += 1; out.common.push("好きなものが同じ（" + h[0] + "）"); }
    }
    return out;
  }
  /* 音声入力（使える端末だけ。iPhoneのSafariなど使えないときは、キーボードのマイクで入力してもらう） */
  function canVoice() { return !!(g.SpeechRecognition || g.webkitSpeechRecognition); }
  function voice(input, btn) {
    var R = g.SpeechRecognition || g.webkitSpeechRecognition; if (!R) return;
    try {
      var r = new R(); r.lang = "ja-JP"; r.interimResults = false; r.maxAlternatives = 1;
      if (btn) { btn.classList.add("rec"); btn.textContent = "聞いています…"; }
      r.onresult = function (e) { var t = e.results[0][0].transcript || ""; input.value = (input.value ? input.value + "、" : "") + t; input.dispatchEvent(new Event("input", { bubbles: true })); };
      r.onend = function () { if (btn) { btn.classList.remove("rec"); btn.textContent = "🎤 話して入力"; } };
      r.onerror = r.onend;
      r.start();
    } catch (e) { if (btn) { btn.classList.remove("rec"); btn.textContent = "🎤 話して入力"; } }
  }
  g.AFF_DETAIL = { D: D, CAT_HIDE: CAT_HIDE, norm: norm, match: match, canVoice: canVoice, voice: voice };
})(window);
