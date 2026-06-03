import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance({
  suppressNotices: ["ripHistorical", "yahooSurvey"],
});

// Extended hardcoded lists — used to supplement Yahoo's top 10
// Ordered roughly by weight/relevance; top 10 from Yahoo will override/prepend
const EXTENDED_HOLDINGS: Record<string, string[]> = {
  // ── Macro Sectors (SPDR) ───────────────────────────────────────────────────
  XLK:  ["NVDA","AAPL","MSFT","AVGO","AMD","CRM","ORCL","ACN","ADBE","CSCO","QCOM","TXN","NOW","INTC","AMAT","PANW","ADI","KLAC","LRCX","MU","MRVL","MPWR","ON","CDNS","SNPS","TEL","KEYS","ZBRA","STX","HPQ"],
  XLV:  ["UNH","LLY","JNJ","ABBV","MRK","TMO","ABT","DHR","ISRG","BMY","AMGN","CVS","CI","SYK","MDT","REGN","VRTX","HCA","ZTS","BSX","IDXX","IQV","ALNY","A","EW","RMD","GEHC","BAX","BDX","MTD"],
  XLF:  ["BRK-B","JPM","V","MA","BAC","GS","WFC","MS","BLK","SPGI","AXP","CB","PGR","MMC","CME","ICE","USB","TFC","PNC","COF","MCO","AON","MET","PRU","AFL","TRV","HIG","ALL","SCHW","FIS"],
  XLY:  ["AMZN","TSLA","HD","MCD","NKE","LOW","SBUX","TJX","BKNG","CMG","ORLY","GM","F","DHI","LEN","ROST","YUM","MAR","HLT","DG","DLTR","BBY","KMX","AZO","APTV","MGM","WYNN","RCL","CCL","NCLH"],
  XLP:  ["PG","KO","PEP","COST","WMT","PM","MO","MDLZ","CL","EL","KHC","GIS","HSY","STZ","SJM","CAG","K","HRL","TSN","CPB","CHD","CLX","SYY","MCK","CAH","ABC","WBA","KR","ACI","GO"],
  XLI:  ["GE","CAT","RTX","HON","UPS","BA","LMT","DE","ETN","EMR","NSC","UNP","WM","ITW","PH","GD","ROK","CARR","OTIS","CTAS","FAST","GWW","RSG","IR","AME","XYL","VRSK","CPRT","CHRW","FDX"],
  XLE:  ["XOM","CVX","EOG","COP","SLB","MPC","PSX","VLO","PXD","OXY","HES","HAL","DVN","BKR","FANG","MRO","APA","OKE","WMB","KMI","LNG","TRGP","CVI","DKL","HFC","MUR","CLR","PR","SM","MTDR"],
  XLB:  ["LIN","APD","ECL","SHW","DD","NEM","FCX","NUE","VMC","MLM","CF","MOS","IFF","AVY","EMN","ALB","CE","PPG","FMC","IP","PKG","SEE","AMCR","OLN","RPM","HUN","CC","SLGN","SON","ATR"],
  XLU:  ["NEE","SO","DUK","AEP","SRE","D","EXC","XEL","PCG","ED","ETR","FE","AEE","WEC","DTE","CMS","CNP","NI","LNT","EVRG","POR","IDACORP","HE","OGE","AVA","NWE","PNW","MDU","ATO","SWX"],
  XLRE: ["AMT","PLD","EQIX","CCI","PSA","O","WELL","DLR","SBAC","AVB","EQR","SPG","VTR","ARE","MAA","ESS","UDR","EXR","CPT","INVH","KIM","NNN","BXP","VNO","SLG","HR","HIW","PKI","NSA","REXR"],
  XLC:  ["META","GOOGL","GOOG","NFLX","DIS","VZ","T","CMCSA","CHTR","EA","TTWO","OMC","PARA","IPG","FOXA","FOX","NWS","NWSA","WBD","MTCH","PINS","SNAP","SPOT","ZM","ROKU","LYV","IAC","ANGI","MSGS","NWSA"],

  // ── Specific Sectors ───────────────────────────────────────────────────────
  SOXX: ["NVDA","AVGO","AMD","TXN","QCOM","AMAT","KLAC","LRCX","ADI","MU","INTC","MRVL","MPWR","MCHP","ON","SWKS","WOLF","SLAB","DIOD","AMBA","CRUS","SITM","ALGM","ACLS","COHU","POWI","AMBA","ONTO","RMBS","FORM"],
  CIBR: ["PANW","CRWD","FTNT","ZS","CYBR","OKTA","TENB","QLYS","S","VRNS","CHKP","NET","DDOG","RPD","CACI","LDOS","SAIC","BAH","MNDT","SAIL","RDWR","FEYE","CUBT","HACK","SCWX","PING","NLOK","SYMC","PFPT","MIME"],
  IGV:  ["MSFT","ORCL","CRM","ADBE","NOW","INTU","SNPS","CDNS","ANSS","PTC","PAYC","HUBS","WDAY","VEEV","TEAM","MDB","DDOG","ZM","DOCN","BOX","TWLO","APPN","PCTY","NEWR","GWRE","MANH","RNG","TYL","SNCR","EVTC"],
  BOTZ: ["ISRG","ABB","FANUC","KEYC","BRKS","IRBT","OMCL","NVDA","TER","AME","CDNS","NNDM","ZBRA","KION","RBOT","THRM","AES","RRX","IEX","ESAB","CFX","AIXI","ACMR","LSCC","IPGP","MKSI","COHU","ONTO","UCTT","FORM"],
  XBI:  ["VRTX","REGN","GILD","BIIB","MRNA","BMRN","EXEL","RARE","HALO","IONS","SRPT","EDIT","CRSP","NTLA","BEAM","ACAD","ARWR","ALNY","FATE","SGEN","RCUS","MGNX","BGNE","FOLD","XNCR","PTCT","PRTA","BLUE","KYMR","IMVT"],
  IHI:  ["ABT","MDT","ISRG","BSX","EW","ZBH","BAX","BDX","HOLX","NVCR","SWAV","INSP","IRTC","NVST","ALGN","PODD","ICUI","MMSI","BRKR","STE","NTRA","GMED","ATEC","OFIX","TMDX","MASI","NVCR","PRCT","TELA","SILK"],
  PPH:  ["JNJ","ABT","ABBV","BMY","MRK","LLY","PFE","AMGN","NVO","AZN","GSK","RHHBY","SNY","TAK","VTRS","JAZZ","WBA","CVS","MCK","ABC","CAH","DPLO","PRGO","ENDP","HLN","CTLT","DOCS","ELAN","AMPH","HALO"],
  KRE:  ["WFC","USB","TFC","RF","HBAN","FITB","KEY","CFG","MTB","ZION","CMA","SNV","BOKF","WAL","EWBC","PACW","FHN","IBCP","INDB","SFBS","FFIN","UMBF","WSFS","FBIZ","TCBK","CATY","HWC","RNST","EGBN","NBT"],
  IAK:  ["BRK-B","PGR","CB","AIG","MET","PRU","AFL","TRV","HIG","ALL","UNM","GL","AIZ","ACGL","RNR","EV","RLI","CINF","WRB","ICW","KNTK","MBIA","RDN","ESNT","NMIH","GBLI","KINS","PLMR","NODK","HCI"],
  IAI:  ["GS","MS","SCHW","BLK","TROW","BEN","IVZ","EVR","HLI","PJT","MC","LAZ","GHL","WTW","AON","MMC","AJG","BRO","LPLA","RJF","NDAQ","ICE","CME","CBOE","MKTX","VIRT","PIPR","SF","STIFL","IBKR"],
  ITA:  ["RTX","LMT","NOC","GD","BA","TDG","HEI","TXT","KTOS","CW","SPR","HII","MOOG","DRS","CACI","SAIC","BAH","LDOS","DRS","AJRD","KBR","VSE","HEICO","AVAV","FLIR","DCO","AIR","ROLL","PKI","ASTR"],
  IYT:  ["UPS","FDX","UNP","CSX","NSC","JBHT","ODFL","CHRW","XPO","SAIA","WERN","LSTR","HUBG","ARCB","MRTN","GXO","RXO","KNX","EXPD","ECHO","RADNF","HTLD","DSGR","ATSG","AAWW","CAR","HTZ","GATX","R","AL"],
  IFRA: ["CAT","DE","ETN","EMR","ITW","PH","AME","ROK","JCI","GWW","WSO","FAST","MSA","XYL","AWK","WM","RSG","AOS","CARR","OTIS","IR","RRX","CFX","ESAB","IEX","TRMK","AAON","AIRSYS","AAON","GTES"],
  ITB:  ["DHI","LEN","NVR","PHM","TOL","MDC","MHO","LGIH","SSD","BLDR","IBP","TREX","FBHS","MAS","OC","AWI","APOG","AMWD","CSL","DOOR","EXP","AZEK","BECN","GMS","PGTI","WMS","PATK","CVCO","UCP","SKY"],
  ICLN: ["NEE","FSLR","ENPH","SEDG","RUN","SPWR","BE","PLUG","HASI","ORA","AMRC","NOVA","AES","CWEN","NRG","VST","CLNE","MAXN","ARRY","CSIQ","JINKOSOLAR","DQ","VSLR","EVTL","NKLA","CHPT","BLNK","PTRA","RIDE","HYLN"],
  URA:  ["CCJ","NXE","DNN","URG","EU","UUUU","UEC","LTBR","BQSSF","ENCUF","PALAF","FCUUF","GLATF","DYLLF","VIHIF","ENCUF","APUUF","VIHIF","HSUUF","NWHUF"],
  PICK: ["BHP","RIO","VALE","FCX","SCCO","NEM","NUE","STLD","CLF","CMC","CENX","ATI","MP","AMR","HCC","CRS","HL","PAAS","MAG","WPM","FNV","RGLD","OR","SBSW","KGC","AUY","EGO","AG","SSRM","BTG"],
  MOO:  ["DE","ADM","CF","MOS","BG","FMC","CTVA","NTR","ICL","AGCO","LNN","GPRE","CALM","HRL","SAFM","SENEA","VITL","IPI","SMG","VSTO","BGS","ANDE","PEIX","REX","MGPI","INGR","LANC","JJSF","TWNK","CAKE"],
  INDS: ["PLD","EXR","STAG","REXR","LPT","IIPR","TRNO","FR","EGP","DRE","KSS","PSA","AMB","LXP","NSA","COLD","CUBE","LSI","SSS","GLP","PLYM","NXRT","PDM","NTST","MODN","GMRE","GIPR","HMLP","CURB","IRT"],

  // ── Risk Appetite ──────────────────────────────────────────────────────────
  HYG:  ["T","AMZN","CMCSA","GM","F","ORCL","CHTR","CVS","NFLX","DIS","VZ","CCL","RCL","NCLH","AMC","SPG","SBA","SBUX","DISH","MGM","RRR","CZR","FYBR","LUMN","COMM","GTN","NWSA","S","NI","FTR"],
  SMH:  ["NVDA","TSMC","AVGO","TXN","QCOM","AMAT","ASML","KLAC","LRCX","ADI","MU","INTC","MRVL","MPWR","ON","MCHP","SWKS","NXPI","ENTG","ACLS","ONTO","UCTT","COHU","ACMR","FORM","IPGP","MKSI","SITM","ALGM","CRUS"],
};

// Cache with 24h TTL
const cache = new Map<string, { tickers: string[]; ts: number }>();
const HOLDINGS_TTL = 24 * 60 * 60 * 1000;

// Request queue to avoid Yahoo rate limiting
let queue = Promise.resolve();
function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const result = queue.then(() => fn());
  queue = result.then(
    () => new Promise((r) => setTimeout(r, 200)),
    () => new Promise((r) => setTimeout(r, 200))
  );
  return result;
}

async function fetchTopHoldings(etf: string): Promise<string[]> {
  try {
    return await enqueue(async () => {
      const data = await yahooFinance.quoteSummary(etf, {
        modules: ["topHoldings"],
      });
      return (data.topHoldings?.holdings ?? [])
        .map((h: { symbol?: string }) => h.symbol)
        .filter((s): s is string => typeof s === "string" && s.length > 0);
    });
  } catch {
    return [];
  }
}

export async function getHoldings(etf: string): Promise<string[]> {
  const key = etf.toUpperCase();
  const cached = cache.get(key);
  if (cached && Date.now() - cached.ts < HOLDINGS_TTL) return cached.tickers;

  // Fetch live top 10 from Yahoo
  const liveTop = await fetchTopHoldings(key);

  // Merge with extended list: live top 10 first, then fill with hardcoded extras
  const extended = EXTENDED_HOLDINGS[key] ?? [];
  const liveSet = new Set(liveTop);
  const extras = extended.filter((t) => !liveSet.has(t));
  const merged = [...liveTop, ...extras];

  cache.set(key, { tickers: merged, ts: Date.now() });
  return merged;
}

export async function prefetchHoldings(etfs: string[]): Promise<void> {
  for (const etf of etfs) {
    await getHoldings(etf);
  }
}
