export function getMetaTraderWebTerminalLink(c: any) {
  var b = [];
  Boolean(c.mobile) && b.push('m=1');
  var a = c.version;
  (4 != a && 5 != a) || b.push('version=' + a);
  (a = c.login) && b.push('login=' + a);
  (a = c.server) && b.push('trade_server=' + a);
  (a = c.servers) && b.push('servers=' + a.join(','));
  a = c.startMode;
  ('open_demo' !== a && 'create_demo' !== a) || b.push('startup_mode=' + a);
  Boolean(c.demoAllServers) && b.push('demo_all_servers=1');
  Boolean(c.demoAllowPhone) && b.push('demo_show_phone=1');
  a = c.language || c.lang;
  -1 !==
    'en ru de es pt zh ja ar bg fr id ms pl th tr vi ko hi uz uk da hu fa sk hr cs et sr sl nl fi el he it lv lt ro sv mn zt tg'.indexOf(
      a,
    ) && b.push('lang=' + a);
  a = c.colorScheme;
  ('black_on_white' !== a && 'yellow_on_black' !== a && 'green_on_black' !== a) || b.push('color_scheme=' + a);
  (a = c.utmCampaign) && b.push('utm_campaign=' + a);
  (a = c.utmSource) && b.push('utm_source=' + a);
  !1 === c.savePassword && b.push('save_password=off');
  (a = c.symbols) && a.length && b.push('symbols=' + a.join(','));
  (a = c.demoType) && b.push('demo_type=' + a);
  (a = c.demoName) && b.push('demo_name=' + a);
  (a = c.demoFirstName) && b.push('demo_first_name=' + a);
  (a = c.demoSecondName) && b.push('demo_second_name=' + a);
  (a = c.demoEmail) && b.push('demo_email=' + a);
  (a = c.demoLeverage) && b.push('demo_leverage=' + a);
  return 'https://trade.mql5.com/trade' + (b.length ? '?' + b.join('&') : '');
}
