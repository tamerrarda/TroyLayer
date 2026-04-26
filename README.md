# TroyLayer

Sunum Linki: https://drive.google.com/drive/folders/1HItLVeR56sOk13I1uwE1YNPn85xZqi4t?usp=share_link

Troy Layer, Troy kartına sahip kullanıcıların uluslararası e-ticaret platformlarında ödeme yapamaması sorununu çözmek amacıyla geliştirilmiş, blokzincir tabanlı bir ödeme altyapısı projesidir. Troy Layer, bu boşluğu Troy'un yurt içi ödeme altyapısını blokzincir tabanlı bir mutabakat katmanına bağlayarak kapatır. Sistem altta gösterildiği sırayla çalışır.

Kullanıcı TRY cinsinden ödeme yapar > paynion onayı gelir > akıllı kontrattan para gönderilir > mutlu bir alışveriş deneyimi

Kullanıcının Troy kartıyla başlattığı TRY işlemi Paynion tarafından işlenir; işlemin onaylanmasının ardından Paynion, HMAC imzalı bir webhook bildirimi ileterek zincir üstü mutabakat sürecini tetikler. Webhook doğrulamasının tamamlanmasıyla birlikte x402 protokolü devreye girer ve TroyPool smart contract'ının USDC rezervinden satıcı adresine doğrudan transfer gerçekleştirilir. Satıcı ödemesi zincir üstünde teyit edildikten sonra aggregator ile gerçek zamanlı veriler üzerinden en iyi kur belirlenerek TRY tutarı USDC'ye çevrilir ve pool arka planda asenkron biçimde yenilenir. Kullanıcı yalnızca TRY ödeme deneyimini yaşarken satıcı kripto altyapısına ihtiyaç duymaksızın USDC alır; kur dönüşümü ve zincir üstü mutabakatın tamamı kullanıcıdan bağımsız şekilde yürütülür.

---
