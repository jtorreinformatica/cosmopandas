export const ETF_HOLDINGS: Record<string, string[]> = {
  // ── Macro Sectors ──────────────────────────────────────────────────────────
  XLK: ["NVDA","AAPL","MSFT","AVGO","AMD","CRM","ORCL","ACN","ADBE","CSCO","QCOM","TXN","NOW","INTC","AMAT","PANW","ADI","KLAC","LRCX","MU"],
  XLV: ["UNH","LLY","JNJ","ABBV","MRK","TMO","ABT","DHR","ISRG","BMY","AMGN","CVS","CI","SYK","MDT","REGN","VRTX","HCA","ZTS","BSX"],
  XLF: ["BRK-B","JPM","V","MA","BAC","GS","WFC","MS","BLK","SPGI","AXP","CB","PGR","MMC","CME","ICE","USB","TFC","PNC","COF"],
  XLY: ["AMZN","TSLA","HD","MCD","NKE","LOW","SBUX","TJX","BKNG","CMG","ORLY","GM","F","DHI","LEN","ROST","YUM","MAR","HLT","DG"],
  XLP: ["PG","KO","PEP","COST","WMT","PM","MO","MDLZ","CL","EL","KHC","GIS","HSY","STZ","SJM","CAG","K","HRL","TSN","CPB"],
  XLI: ["GE","CAT","RTX","HON","UPS","BA","LMT","DE","ETN","EMR","NSC","UNP","WM","ITW","PH","GD","ROK","CARR","OTIS","CTAS"],
  XLE: ["XOM","CVX","EOG","COP","SLB","MPC","PSX","VLO","PXD","OXY","HES","HAL","DVN","BKR","FANG","MRO","APA","OKE","WMB","KMI"],
  XLB: ["LIN","APD","ECL","SHW","DD","NEM","FCX","NUE","VMC","MLM","CF","MOS","IFF","AVY","EMN","ALB","CE","PPG","FMC","IP"],
  XLU: ["NEE","SO","DUK","AEP","SRE","D","EXC","XEL","PCG","ED","ETR","FE","AEE","WEC","DTE","CMS","CNP","NI","LNT","EVRG"],
  XLRE: ["AMT","PLD","EQIX","CCI","PSA","O","WELL","DLR","SBAC","AVB","EQR","SPG","VTR","ARE","MAA","ESS","UDR","EXR","CPT","INVH"],
  XLC: ["META","GOOGL","GOOG","NFLX","DIS","VZ","T","CMCSA","CHTR","EA","TTWO","OMC","PARA","IPG","FOXA","FOX","NWS","NWSA","WBD","MTCH"],

  // ── Specific Sectors ───────────────────────────────────────────────────────
  SOXX: ["NVDA","AVGO","AMD","TXN","QCOM","AMAT","KLAC","LRCX","ADI","MU","INTC","MRVL","MPWR","MCHP","ON","SWKS","WOLF","CREE","SLAB","DIOD"],
  CIBR: ["PANW","CRWD","FTNT","ZS","CYBR","OKTA","TENB","QLYS","S","VRNS","SAIL","CHKP","NET","DDOG","RPD","CACI","LDOS","SAIC","BAH","MNDT"],
  IGV: ["MSFT","ORCL","CRM","ADBE","NOW","INTU","SNPS","CDNS","ANSS","PTC","PAYC","HUBS","WDAY","VEEV","TEAM","MDB","DDOG","ZM","DOCN","BOX"],
  BOTZ: ["ISRG","ABB","FANUC","KEYC","BRKS","IRBT","OMCL","RWLK","NVDA","TER","KION","ROBO","AES","AME","CDNS","KUKA","NNDM","RBOT","THRM","ZBRA"],
  XBI: ["VRTX","REGN","GILD","BIIB","MRNA","BMRN","ALXN","EXEL","RARE","HALO","IONS","SRPT","EDIT","CRSP","NTLA","BEAM","ACAD","ARWR","ALNY","FATE"],
  IHI: ["ABT","MDT","ISRG","BSX","EW","ZBH","BAX","BDX","HOLX","NVCR","SWAV","INSP","IRTC","NVST","ALGN","PODD","ICUI","MMSI","BRKR","STE"],
  PPH: ["JNJ","ABT","ABBV","BMY","MRK","LLY","PFE","AMGN","NVO","AZN","GSK","RHHBY","SNY","TAK","VTRS","JAZZ","WBA","CVS","MCK","ABC"],
  KRE: ["WFC","USB","TFC","RF","HBAN","FITB","KEY","CFG","MTB","ZION","CMA","SNV","BOKF","WAL","EWBC","PACW","FHN","IBCP","INDB","SFBS"],
  IAK: ["BRK-B","PGR","CB","AIG","MET","PRU","AFL","TRV","HIG","ALL","UNM","GL","AIZ","ACGL","RNR","EV","RLI","CINF","WRB","ICW"],
  IAI: ["GS","MS","SCHW","BLK","TROW","BEN","IVZ","WDR","EVR","HLI","PJT","MC","LAZ","GHL","MOELIS","WTW","AON","MMC","AJG","BRO"],
  ITA: ["RTX","LMT","NOC","GD","BA","L3H","TDG","HEI","TXT","KTOS","AJRD","CW","SPR","HII","MOOG","DRS","CACI","SAIC","BAH","LDOS"],
  IYT: ["UPS","FDX","UNP","CSX","NSC","JBHT","ODFL","CHRW","XPO","SAIA","WERN","LSTR","HUBG","ARCB","MRTN","GXO","RXO","DSGR","KNX","EXPD"],
  IFRA: ["CAT","DE","ETN","EMR","ITW","PH","AME","ROK","JCI","GWW","WSO","FAST","MSA","XYL","REXN","AWK","WM","RSG","TRMK","AOS"],
  ITB: ["DHI","LEN","NVR","PHM","TOL","MDC","MHO","LGIH","SSD","BLDR","IBP","TREX","FBHS","MAS","OC","AWI","APOG","AMWD","CSL","DOOR"],
  ICLN: ["NEE","FSLR","ENPH","SEDG","RUN","SPWR","BE","PLUG","HASI","ORA","AMRC","NOVA","AES","CWEN","NRG","VST","CLNE","MAXN","ARRY","CSIQ"],
  URA: ["CCJ","NXE","DNN","URG","EU","UUUU","BQSSF","KAP","GEN","PDN","FSY","URE","SYH","BCN","TOE","AEE","AMZN","VALE","UEC","DURD"],
  PICK: ["BHP","RIO","VALE","AAL","FCX","SCCO","NEM","NUE","STLD","CLF","CMC","CENX","ATI","MP","USLM","USAC","AMR","HCC","CRS","TIE"],
  MOO: ["DE","ADM","CF","MOS","BG","FMC","CTVA","NTR","ICL","TNH","AGCO","LNN","LBTH","GPRE","CGA","SFM","CALM","HRL","SAFM","SENEA"],
  INDS: ["PLD","EXR","STAG","REXR","LPT","IIPR","TRNO","FR","EGP","DRE","DCT","KSS","PSA","AMB","LXP","ICF","VNO","IYR","TNP","MPW"],

  // ── Risk Appetite ──────────────────────────────────────────────────────────
  HYG: ["T","AMZN","CMCSA","GM","F","ORCL","CHTR","CVS","DISH","NFLX","DIS","VZ","CCL","RCL","NCLH","AMC","SPG","MPW","SBA","SBUX"],
  SMH: ["NVDA","TSMC","AVGO","TXN","QCOM","AMAT","ASML","KLAC","LRCX","ADI","MU","INTC","MRVL","MPWR","ON","MCHP","SWKS","XLNX","MXIM","SLAB"],
};

export function getHoldings(etf: string): string[] {
  return ETF_HOLDINGS[etf.toUpperCase()] ?? [];
}
