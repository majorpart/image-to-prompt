// 友情链接数据配置（根据指南，数据驱动）
const friendLinks = [
  {
    href: 'https://aigc160.com',
    src: 'https://aigc160.com/assets/images/badge.png',
    alt: 'Image-to-Prompt featured on AIGC 160',
    height: 54,
  },
  {
    href: 'https://aixcollection.com',
    src: 'https://aixcollection.com/assets/images/badge.png',
    alt: 'Image-to-Prompt featured on AI X Collection',
    height: 54,
  },
  {
    href: 'https://trustiner.com',
    src: 'https://trustiner.com/assets/images/badge.png',
    alt: 'Image-to-Prompt featured on Trustiner',
    height: 54,
  },
  {
    href: 'https://startupaideas.com',
    src: 'https://startupaideas.com/assets/images/badge.png',
    alt: 'Image-to-Prompt featured on Startup AIdeas',
    height: 54,
  },
  {
    href: 'https://startupbenchmarks.com',
    src: 'https://startupbenchmarks.com/assets/images/badge.png',
    alt: 'Image-to-Prompt featured on Startup Benchmarks',
    height: 54,
  },
  {
    href: 'https://aitechviral.com',
    src: 'https://aitechviral.com/assets/images/badge.png',
    alt: 'Image-to-Prompt featured on AI Tech Viral',
    height: 54,
  },
  {
    href: 'https://aitoolzs.com',
    src: 'https://aitoolzs.com/assets/images/badge.png',
    alt: 'Image-to-Prompt listed on AI Toolz',
    height: 54,
  },
  {
    href: 'https://mylaunchstash.com',
    src: 'https://mylaunchstash.com/assets/images/badge.png',
    alt: 'Image-to-Prompt featured on My Launch Stash',
    height: 54,
  },
  {
    href: 'https://submitaitools.org',
    src: 'https://submitaitools.org/static_submitaitools/images/submitaitools.png',
    alt: 'Image-to-Prompt listed on Submit AI Tools – discover, submit, and explore AI tools',
    width: 200,
    height: 60,
  },
  {
    href: 'https://findly.tools/image-to-prompt-1?utm_source=image-to-prompt-1',
    src: 'https://findly.tools/badges/findly-tools-badge-light.svg',
    alt: 'Image-to-Prompt featured on Findly.tools',
    width: 175,
    height: 55,
  },
  {
    href: 'https://dofollow.tools',
    src: 'https://dofollow.tools/badge/badge_dark.svg',
    alt: 'Image-to-Prompt featured on Dofollow.Tools',
    width: 200,
    height: 54,
  },
  {
    href: 'https://launchigniter.com/product/meanings?ref=badge-meanings',
    src: 'https://launchigniter.com/api/badge/meanings?theme=light',
    alt: 'Image-to-Prompt featured on LaunchIgniter',
    width: 212,
    height: 55,
  },
  {
    href: 'https://startuptrusted.com?ref=meanings.live',
    src: 'https://startuptrusted.com/api/badge?type=featured&style=light',
    alt: 'Image-to-Prompt featured on StartupTrusted',
    width: 240,
    height: 54,
  },
  {
    href: 'https://domainrank.app/dr/imagetoprompt.app',
    src: 'https://domainrank.app/api/badge/imagetoprompt.app?theme=dark',
    alt: 'imagetoprompt.app Domain Rating on DomainRank',
    width: 360,
    height: 80,
  },
  {
    href: 'https://domainrank.app',
    type: 'text',
    alt: 'imagetoprompt.app Domain Rating on DomainRank',
    content: 'Domain Rating',
  },
  {
    href: 'https://startupfa.st',
    src: 'https://startupfa.st/images/badges/powered-by-light.svg',
    alt: 'Image-to-Prompt powered by Startup Fast',
    width: 150,
    height: 44,
  },
  {
    href: 'https://open-launch.com/projects/image-to-prompt',
    src: 'https://open-launch.com/api/badge/78c698e4-7f6b-4f73-8d16-4bbcb0a87dbe/featured-light.svg',
    alt: 'Image-to-Prompt featured on Open-Launch',
    width: 200,
    height: 50,
  },
  {
    href: 'https://startupfa.me/s/meanings?utm_source=meanings.live',
    src: 'https://startupfa.me/badges/featured-badge.webp',
    alt: 'Image-to-Prompt featured on Startup Fame',
    width: 171,
    height: 54,
  },
  {
    href: 'https://showmebest.ai',
    src: 'https://showmebest.ai/badge/feature-badge-white.webp',
    alt: 'Image-to-Prompt featured on ShowMeBestAI',
    width: 220,
    height: 60,
  },
  {
    href: 'https://indiehunt.io/project/meanings-discover-the-meanings-behind-stories',
    src: 'https://indiehunt.io/badges/indiehunt-badge-light.svg',
    alt: 'Image-to-Prompt featured on IndieHunt',
    width: 265,
    height: 58,
  },
  {
    href: 'https://earlyhunt.com/project/image-to-prompt-generator-free-ai-image-prompt-creator',
    src: 'https://earlyhunt.com/badges/earlyhunt-badge-light.svg',
    alt: 'Image-to-Prompt featured on EarlyHunt',
    width: 265,
    height: 58,
  },
  {
    href: 'https://uno.directory',
    src: 'https://uno.directory/uno-directory.svg',
    alt: 'Image-to-Prompt listed on Uno Directory',
    width: 120,
    height: 30,
  },
  {
    href: 'https://neeed.directory',
    src: 'https://neeed.directory/badges/neeed-badge-light.svg',
    alt: 'Image-to-Prompt featured on neeed.directory',
    width: 139,
  },
  {
    href: 'https://verifieddr.com/website/imagetoprompt-app',
    src: 'https://verifieddr.com/badge/imagetoprompt-app.svg',
    alt: 'Verified DR - Verified Domain Rating for imagetoprompt.app',
    width: 220,
    height: 68,
  },
  {
    href: 'https://shinylaunch.com',
    src: 'https://shinylaunch.com/static/images/badge.png',
    alt: 'Image-to-Prompt featured on ShinyLaunch',
    height: 54,
  },
  {
    href: 'https://milliondothomepage.com',
    src: 'https://milliondothomepage.com/assets/images/badge.png',
    alt: 'Image-to-Prompt featured on Million Dot Homepage',
    height: 54,
  },
  {
    href: 'https://launchclash.com',
    src: 'https://launchclash.com/static/images/badge.png',
    alt: 'Image-to-Prompt featured on LaunchClash',
    height: 54,
  },
  {
    href: 'https://tooldirs.com',
    src: 'https://tooldirs.com/badge/badge_dark.svg',
    alt: 'Image-to-Prompt featured on ToolDirs',
    width: 200,
    height: 54,
  },
  {
    href: 'https://submitmysaas.com',
    src: 'https://submitmysaas.com/featured-badge.png',
    alt: 'Image-to-Prompt featured on SubmitMySaas',
    height: 54,
  },
  {
    href: 'https://www.showmysites.com',
    src: 'https://www.showmysites.com/static/backlink/name_logo.webp',
    alt: 'Image-to-Prompt featured on ShowMySites',
    width: 200,
    height: 60,
  },
  {
    href: 'https://aidirs.best',
    src: 'https://aidirs.best/light.svg',
    alt: 'Image-to-Prompt featured on Aidirs',
    width: 200,
    height: 56,
  },
  {
    href: 'https://deeplaunch.io',
    src: 'https://deeplaunch.io/badge/badge_light.svg',
    alt: 'Image-to-Prompt featured on DeepLaunch.io',
    width: 200,
    height: 54,
  },
  {
    href: 'https://toolrain.com/item/image-to-prompt-generator',
    src: 'https://toolrain.com/badges/badge-listed-light.svg',
    alt: 'Image-to-Prompt listed on ToolRain',
    height: 60,
  },
  {
    href: 'https://aitop10.tools/',
    type: 'text',
    alt: 'Image-to-Prompt listed on AiTop10 Tools Directory',
    content: 'AiTop10 Tools Directory',
  },
  {
    href: 'https://tap4ai.org/',
    type: 'text',
    alt: 'Tap4 AI Tools Directory',
    content: 'Tap4 AI Tools Directory',
  },
  {
    href: 'https://aidirs.org/item/meanings',
    src: 'https://aidirs.org/badges/badge-listed-dark.svg',
    alt: 'Image-to-Prompt listed on AIDirs',
  },
  {
    href: 'https://toolsaiapp.com/',
    src: 'https://toolsaiapp.com/wp-content/uploads/2025/12/badge.png',
    alt: 'Image-to-Prompt featured on Tools AI App',
    height: 54,
  },
  {
    href: 'https://code.market?code.market=verified',
    src: 'https://code.market/assets/manage-product/featured-logo-bright.svg',
    alt: 'Image-to-Prompt listed on code.market',
  },
  {
    href: 'https://www.direct2app.com/item/image-to-prompt-generator',
    src: 'https://www.direct2app.com/featured-light.svg',
    alt: 'Featured badge linking to your listing on Direct2App',
    height: 54,
  },
  {
    href: 'https://aijustbetter.com/item/meanings.live',
    src: 'https://aijustbetter.com/badges/badge-dark.svg',
    alt: 'Image-to-Prompt featured on AIJustBetter.com',
    width: 212,
    height: 55,
  },
  {
    href: 'https://aihuntlist.com/tool/meanings',
    src: 'https://aihuntlist.com/badge-light.svg',
    alt: 'Image-to-Prompt featured on aihuntlist.com',
    height: 54,
  },
  {
    href: 'https://aiblog.tools',
    type: 'text',
    alt: 'Find Image-to-Prompt on AIBlog.Tools',
    content: 'Find us on AIBlog.Tools',
  },
  {
    href: 'https://aifinderplus.com/item/meanings',
    src: 'https://aifinderplus.com/badge.svg',
    alt: 'Image-to-Prompt featured on aifinderplus.com',
    height: 54,
  },
  {
    href: 'https://favtool.ai',
    src: 'https://favtool.ai/badge/light.png',
    alt: 'Image-to-Prompt featured on FavTool.ai',
    width: 200,
    height: 60,
  },
  {
    href: 'https://findyouragent.ai',
    src: 'https://findyouragent.ai/embed-badge-gradient.svg',
    alt: 'FindYourAgent Logo',
    exactVerify: true,
    imgStyle: { height: '10%', width: 'auto' },
  },
  {
    href: 'https://firstlook.tools',
    src: 'https://firstlook.tools/badge/badge_light.svg',
    alt: 'Image-to-Prompt featured on First Look',
    width: 200,
    height: 54,
  },
  {
    href: 'https://www.freeai.run',
    src: 'https://www.freeai.run/badge/badge_dark.svg',
    alt: 'Image-to-Prompt featured on FreeAI',
    width: 200,
    height: 54,
  },
  {
    href: 'https://hicyou.com',
    src: 'https://hicyou.com/badge/featured-light.svg',
    alt: 'Image-to-Prompt featured on Hicyou',
  },
  {
    href: 'https://ufind.best/products/image-to-prompt?utm_source=ufind.best',
    src: 'https://ufind.best/badges/ufind-best-badge-light.svg',
    alt: 'Image-to-Prompt featured on ufind.best',
    width: 150,
  },
  {
    href: 'https://ideakiln.com/ideas/image-to-image-ai-2',
    src: 'https://ideakiln.com/light.svg',
    alt: 'Image-to-Prompt featured on Idea Kiln',
    width: 200,
    height: 54,
  },
  {
    href: 'https://startupdirs.com',
    src: 'https://startupdirs.com/bage.png',
    alt: 'Image-to-Prompt featured on startupdirs.com',
    height: 54,
  },
  {
    href: 'https://wayfindio.com',
    src: 'https://wayfindio.com/badge/badge_light.svg',
    alt: 'Image-to-Prompt featured on Wayfindio',
    width: 200,
    height: 54,
  },
  {
    href: 'https://www.aat.ee/?ref=badge',
    src: 'https://www.aat.ee/images/badges/featured-badge-light.svg',
    alt: 'Image-to-Prompt featured on aat.ee',
    width: 200,
    height: 54,
  },
  {
    href: 'https://startupdirectory.net',
    src: 'https://startupdirectory.net/badge/featured-light.svg',
    alt: 'Image-to-Prompt featured on Startup Directory',
  },
  {
    href: 'https://newtool.site/item/image-to-image-ai',
    src: 'https://newtool.site/badges/newtool-light.svg',
    alt: 'Image-to-Prompt featured on NewTool.site',
    height: 54,
  },
  {
    href: 'https://navfolders.com',
    src: 'https://navfolders.com/badge/nav_light.svg',
    alt: 'Image-to-Prompt featured on NavFolders',
    width: 200,
    height: 54,
  },
  {
    href: 'https://aitoolstime.com/',
    src: 'https://aitoolstime.com/assets/images/badges/member-dark.svg',
    alt: 'Image-to-Prompt member of AI Tools Time',
    width: 180,
    height: 54,
  },
  {
    href: 'https://imglab.dev/item/Image-to-Prompt-u8hu',
    src: 'https://imglab.dev/svg/badge.svg',
    alt: 'Image-to-Prompt listed on imglab',
    height: 54,
  },
  {
    href: 'https://startuups.com//projects/Image-to-Prompt',
    src: 'https://startuups.com//images/badges/startuupscom.badge.svg',
    alt: 'Image-to-Prompt featured on Startuups',
    width: 150,
    height: 54,
  },
  {
    href: 'https://saasgrow.app?ref=imagetoprompt.app',
    src: 'https://saasgrow.app/api/badge?type=featured&style=light',
    alt: 'Image-to-Prompt featured on SaaSGrow',
    width: 240,
    height: 54,
  },
  {
    href: 'https://shipyardhq.dev/products/image-to-prompt-generator',
    src: 'https://shipyardhq.dev/api/embed/products/image-to-prompt-generator?theme=light&type=featured&format=svg',
    alt: 'Shipyard badge',
    imgStyle: { maxWidth: '500px', width: '100%', height: 'auto' },
  },
  {
    href: 'https://submitmatic.com',
    src: 'https://submitmatic.com/static/images/badge.png',
    alt: 'Image-to-Prompt featured on SubmitMatic',
    height: 54,
  },
  {
    href: 'https://webspot.app/item/image-to-image-ai',
    src: 'https://webspot.app/featured-light.svg',
    alt: 'Featured on Webspot',
    height: 54,
  },
  {
    href: 'https://shipgrowth.dev/item/claude',
    src: 'https://storage.shipgrowth.dev/badge-light.png',
    alt: 'Featured on ShipGrowth',
    height: 64,
  },
  {
    href: 'https://dayslaunch.com',
    src: 'https://dayslaunch.com/badages-awards.svg',
    alt: 'Featured on Days Launch',
    height: 54,
  },
  {
    href: 'https://famed.tools/products/image-to-prompt?utm_source=famed.tools',
    src: 'https://famed.tools/badges/famed-tools-badge-light.svg',
    alt: 'Featured on famed.tools',
    width: 150,
  },
  {
    href: 'https://starterbest.com',
    src: 'https://starterbest.com/badages-awards.svg',
    alt: 'Featured on Starter Best',
    height: 54,
  },
  {
    href: 'https://ainewtool.site/item/image-to-prompt-generator',
    src: 'https://ainewtool.site/badges/AInewtool-light.svg',
    alt: 'Featured on AINewTool.site',
    height: 54,
  },
  {
    href: 'https://theonestartup.com',
    src: 'https://theonestartup.com/badages-awards.svg',
    alt: 'Featured on The One Startup',
    height: 54,
  },
  {
    href: 'https://aiboom.tools',
    src: 'https://aiboom.tools/badge/badge_light.svg',
    alt: 'Featured on AIBoom.Tools',
    width: 120,
    height: 32,
  },
  {
    href: 'https://startuptostartup.com',
    src: 'https://startuptostartup.com/badages-awards.svg',
    alt: 'Featured on Startup To Startup',
    height: 54,
  },
  {
    href: 'https://toolfame.com/item/image-to-prompt-generator',
    src: 'https://toolfame.com/badge-light.svg',
    alt: 'Featured on toolfame.com',
    height: 54,
  },
  {
    href: 'https://saasfame.com/item/image-to-prompt-generator',
    src: 'https://saasfame.com/badge-light.svg',
    alt: 'Featured on saasfame.com',
    height: 54,
  },
  {
    href: 'https://aitoolfame.com/item/image-to-prompt-generator',
    src: 'https://aitoolfame.com/badge-light.svg',
    alt: 'Featured on aitoolfame.com',
    height: 54,
  },
  {
    href: 'https://twelve.tools',
    src: 'https://twelve.tools/badge0-white.svg',
    alt: 'Featured on Twelve Tools',
    width: 200,
    height: 54,
  },
  {
    href: 'https://auraplusplus.com/projects/image-to-prompt-ai-generator',
    src: 'https://auraplusplus.com/images/badges/featured-on-light.svg',
    alt: 'Featured on Aura++',
    width: 265,
    height: 58,
  },
  {
    href: 'https://similarlabs.com',
    src: 'https://similarlabs.com/similarlabs-embed-badge-light.svg',
    alt: 'Featured on SimilarLabs',
    width: 124,
    height: 40,
  },
  {
    href: 'https://toolfio.com',
    src: 'https://toolfio.com/toolfio-light-badge.png',
    alt: 'Featured on Toolfio',
    width: 200,
    height: 54,
  },
  {
    href: 'https://www.proofstories.io/directory/products/meanings/',
    src: 'https://www.proofstories.io/directory/badges/l/meanings.svg',
    alt: 'MEANINGS badge on ProofStories',
    height: 60,
  },
  {
    href: 'https://saaspa.ge/product/cmkqa7jz9000hle0401y8ac0h',
    src: 'https://saaspa.ge/api/embed/product/cmkqa7jz9000hle0401y8ac0h/badge.png?theme=white',
    alt: 'Featured on Saaspa.ge',
    width: 200,
    height: 60,
  },
  {
    href: 'https://saaspa.ge/product/cmmtuietg003ljo04n0z68dli',
    src: 'https://saaspa.ge/api/embed/product/cmmtuietg003ljo04n0z68dli/badge.png?theme=orange',
    alt: 'Featured on Saaspa.ge',
    width: 200,
    height: 60,
  },
  {
    href: 'https://submithunt.com',
    src: 'https://submithunt.com/badge.png',
    alt: 'Featured on SubmitHunt',
    width: 150,
    height: 45,
  },
  {
    href: 'https://tinylaunchpad.com/projects/meanings',
    src: 'https://tinylaunchpad.com/images/badges/tinylaunchpad-badge-light.svg',
    alt: 'Featured on TinyLaunchpad',
    width: 150,
    height: 54,
  },
  {
    href: 'https://tinylaunchpad.com/projects/image-to-prompt',
    src: 'https://tinylaunchpad.com/images/badges/featured-on-light-mode.png',
    alt: 'Featured on TinyLaunchpad',
    width: 150,
    height: 54,
  },
  {
    href: 'https://roozna.com/project/image-to-prompt',
    src: 'https://roozna.com/api/badge/image-to-prompt',
    alt: 'Featured on Roozna',
    width: 200,
    height: 50,
  },
  {
    href: 'https://wired.business',
    src: 'https://wired.business/badge0-white.svg',
    alt: 'Featured on Wired Business',
    width: 200,
    height: 54,
  },
  {
    href: 'https://launch-list.org/product/image-to-prompt',
    src: 'https://launch-list.org/badges/svg/launch_list_badge_featured.svg',
    alt: 'Launch List Badge',
    height: 50,
  },
  {
    // Fazier: use exact official embed HTML so their checker can match it
    href: 'https://fazier.com/launches/imagetoprompt.app',
    src: 'https://fazier.com/api/v1//public/badges/launch_badges.svg?badge_type=launched&theme=light',
    alt: 'Fazier badge',
    width: 120,
    fazierExact: true,
  },
  {
    href: 'https://dang.ai/',
    src: 'https://cdn.prod.website-files.com/63d8afd87da01fb58ea3fbcb/6487e2868c6c8f93b4828827_dang-badge.png',
    alt: 'Image-to-Prompt featured on Dang.ai',
    width: 150,
    height: 54,
  },
  {
    href: 'https://tinylaunch.com',
    src: 'https://tinylaunch.com/tinylaunch_badge_launching_soon.svg',
    alt: 'Image-to-Prompt featured on TinyLaunch',
    width: 120,
    height: 54,
  },
  {
    href: 'https://turbo0.com/item/image-to-prompt-generator',
    src: 'https://img.turbo0.com/badge-listed-light.svg',
    alt: 'Image-to-Prompt listed on Turbo0',
    height: 54,
  },
  {
    href: 'https://www.foundrlist.com/product/imagetopromptgenerator',
    src: 'https://www.foundrlist.com/api/badge/imagetopromptgenerator',
    alt: 'Image-to-Prompt live on FoundrList',
    width: 160,
    height: 64,
  },
  {
    href: 'https://mossai.org',
    type: 'text',
    alt: 'MossAI Tools',
    content: 'MossAI Tools',
  },
  {
    href: 'https://www.agenthunter.io?utm_source=badge&utm_medium=embed&utm_campaign=Image%20to%20Prompt',
    type: 'badgeWithText',
    src: 'https://www.agenthunter.io/logo-light.svg',
    alt: 'AgentHunter Badge',
    line1: 'AgentHunter',
    line2: 'Featured AI Agent',
    imgSize: 40,
  },
  {
    href: 'https://launchdirectories.com',
    src: 'https://launchdirectories.com/api/badge/not-listed-yet?width=200&height=50&color=white&shape=rect&certificationText=FEATURED%20ON&textStyle=uppercase&badgeType=featured-on&linkType=home&v=1753169742175',
    alt: 'Featured on LaunchDirectories',
    width: 200,
    height: 50,
  },
  {
    href: 'https://www.superlaun.ch/products/1486',
    src: 'https://www.superlaun.ch/badge.png',
    alt: 'Featured on SuperLaunch',
    width: 300,
    height: 300,
  },
  {
    href: 'https://www.superlaun.ch/products/1909',
    src: 'https://www.superlaun.ch/badge.png',
    alt: 'Featured on Super Launch',
    width: 300,
    height: 300,
  },
  {
    href: 'https://www.verifiedtools.info',
    src: 'https://www.verifiedtools.info/badge.png',
    alt: 'Verified on Verified Tools',
    width: 200,
    height: 54,
  },
  {
    href: 'https://www.ia-insights.fr/',
    type: 'iaInsightsBadge',
    alt: 'Listé sur IA-Insights',
  },
  {
    href: 'https://www.aidirectori.es',
    src: 'https://cdn.aidirectori.es/ai-tools/badges/dark-mode.png',
    alt: 'AI Directories Badge',
  },
  {
    href: 'https://aiagentsdirectory.com/agent/image-to-prompt-generator?utm_source=badge&utm_medium=referral&utm_campaign=free_listing&utm_content=image-to-prompt-generator',
    src: 'https://aiagentsdirectory.com/featured-badge.svg?v=2024',
    alt: 'Image to Prompt Generator - Featured AI Agent on AI Agents Directory',
    width: 200,
    height: 50,
  },
  {
    href: 'https://walletpartydeals.com',
    src: 'https://walletpartydeals.com/walletpartdeals.png',
    alt: 'Featured on WalletPartyDeals.',
    width: 200,
    height: 60,
    walletPartyDealsExact: true,
  },
  {
    href: 'https://goodaitools.com',
    src: 'https://goodaitools.com/assets/images/badge.png',
    alt: 'Good AI Tools',
    height: 54,
  },
  {
    href: 'https://www.aiheron.com/',
    type: 'text',
    alt: '智鹭AI导航',
    content: 'AiHeron',
  },
  {
    href: 'https://dironix.com',
    src: 'https://dironix.com/bage.png',
    alt: 'Featured on dironix.com',
    height: 54,
  },
  {
    href: 'https://right-ai.com/',
    type: 'text',
    alt: 'RightAI Tools Directory',
    content: 'RightAI Tools Directory',
  },
  {
    href: 'https://aitoolcenter.com/',
    type: 'text',
    alt: 'AI Tool Center',
    content: 'AI Tool Center',
  },
  {
    href: 'https://SeekAIs.com/',
    type: 'text',
    alt: 'SeekAIs',
    content: 'SeekAIs - AI Tools Directory',
  },
  {
    href: 'https://www.aitoolzdir.com',
    type: 'text',
    alt: 'AIToolzDir',
    content: 'AIToolzDir',
  },
  {
    href: 'https://allyourtech.ai',
    type: 'text',
    alt: 'AIToolsDirectory',
    content: 'AIToolsDirectory',
  },
  {
    href: 'https://www.seewhatnewai.com',
    type: 'text',
    alt: 'See What New AI',
    content: 'See What New AI',
  },
  {
    href: 'https://www.ontoplist.com/social-media-marketing-companies/',
    src: 'https://www.ontoplist.com/images/ontoplist31.png?id=69737af74bccf',
    alt: 'Best Social Media Marketing Companies - OnToplist.com',
  },
  {
    href: 'https://viesearch.com/',
    type: 'text',
    alt: 'Viesearch - The Human-curated Search Engine',
    content: 'Viesearch - The Human-curated Search Engine',
  },
  {
    href: 'https://allinai.tools',
    type: 'text',
    alt: 'AllTheBestAITools',
    content: 'AllinAITools',
  },
  {
    href: 'https://toolsfine.com/',
    type: 'text',
    alt: 'ToolsFine',
    content: 'ToolsFine',
  },
  {
    href: 'https://openi.cn/',
    type: 'text',
    alt: 'OpenI AI时代',
    content: 'OpenI AI时代',
  },
];

function renderFriendLink(link, key) {
  const isTextLink = link.type === 'text';
  const isBadgeWithText = link.type === 'badgeWithText';
  const isIaInsightsBadge = link.type === 'iaInsightsBadge';

  // IA-Insights 官方徽章样式（白底、蓝色 IA 方块 + 文案）
  if (isIaInsightsBadge) {
    return (
      <a
        key={key}
        href={link.href}
        target="_blank"
        rel="noopener"
        title={link.alt}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          background: '#ffffff',
          border: '1.5px solid #e1e4e8',
          borderRadius: '8px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '13px',
          color: '#24292e',
          textDecoration: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            background: '#0066cc',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '11px',
            fontWeight: 700,
          }}
        >
          IA
        </span>
        <span>
          Listé sur <strong>IA-Insights</strong>
        </span>
      </a>
    );
  }

  // WalletPartyDeals 验证要求与官方代码完全一致（id、title、rel、img style）
  if (link.walletPartyDealsExact) {
    return (
      <a
        key={key}
        href={link.href}
        id="WalletPartyDeals-badge"
        target="_blank"
        rel="noopener noreferrer"
        title="Featured on WalletPartyDeals"
      >
        <img
          src={link.src}
          alt={link.alt}
          style={{ borderRadius: '10px', width: '200px', height: '60px' }}
        />
      </a>
    );
  }

  // Fazier 徽章：必须和官方 embed 代码完全一致，避免检测失败
  if (link.fazierExact) {
    return (
      <a key={key} href={link.href} target="_blank">
        <img
          src={link.src}
          width={link.width}
          alt={link.alt}
        />
      </a>
    );
  }

  // 文本类友情链接（如 Domain Rating）使用最简单的 <a> 结构，兼容验证工具
  if (isTextLink) {
    return (
      <a key={key} href={link.href} target="_blank" title={link.alt || link.content} rel="noopener noreferrer">
        {link.content}
      </a>
    );
  }

  // 带文字徽章（如 AgentHunter）：图片 + 两行文案，使用官方提供的样式
  if (isBadgeWithText) {
    const size = link.imgSize ?? 40;
    return (
      <a
        key={key}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="friend-links-item"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          padding: '0.5rem 0.75rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontFamily: 'sans-serif',
          transition: 'all 0.2s',
        }}
      >
        <img
          src={link.src}
          alt={link.alt}
          width={size}
          height={size}
          style={{ height: `${size}px`, width: `${size}px` }}
          loading="lazy"
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{link.line1}</p>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#111827', fontWeight: 600 }}>{link.line2}</p>
        </div>
      </a>
    );
  }

  // 部分站点（如 FindYourAgent）验证要求与官方代码完全一致，使用极简结构
  if (link.exactVerify) {
    return (
      <a key={key} href={link.href} target="_blank" style={{ textDecoration: 'none' }}>
        <img
          src={link.src}
          alt={link.alt}
          style={link.imgStyle || undefined}
        />
      </a>
    );
  }

  return (
    <a
      key={key}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="friend-links-item"
      title={link.alt}
    >
      <img
        src={link.src}
        alt={link.alt}
        width={link.width}
        height={link.height}
        style={link.imgStyle}
        loading="lazy"
        className="h-10 max-h-12 w-auto max-w-[160px] object-contain opacity-80 hover:opacity-100 transition-opacity"
      />
    </a>
  );
}

export default function FriendLinks() {
  return (
    <section
      className="border-t border-gray-800 bg-gray-900 py-6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 滚动容器 - 所有链接都在初始 HTML 中（SEO 友好） */}
        <div className="friend-links-scroll-container">
          <div className="friend-links-scroll-track">
            {friendLinks.map((link, index) =>
              renderFriendLink(link, `link-${index}`),
            )}
            {friendLinks.map((link, index) =>
              renderFriendLink(link, `link-duplicate-${index}`),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

