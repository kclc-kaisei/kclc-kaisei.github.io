# mkdocs 運用手引き

## mkdocs ブランチ
このブランチ `mkdocs` は `.md` を置くところ
本導入が決まれば `main` に改名され、現在の `main` は別の名前に変更となります

### `.github/workflows`
`.yml` を管理しています
自動でbuildを行うためです

### `mkdocs.yml`
ここにタイトルやスタイル、ファビコンの設定をします
目次の設定もここで行えます

### `.gitignore`
git管理したくないファイルを指定します

### `/docs` フォルダ
ここに `.md` ファイルが配置されます

## gh-pages ブランチ
`gh-pages` は `$ mkdocs gh-deploy` で作成されるブランチ
`.html` などが自動配置されます
基本的にノータッチ
