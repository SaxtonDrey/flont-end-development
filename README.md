# 開発の仕方
## 環境構築

```
$ yarn
```
## コマンド
```
$ yarn start
#=> ブラウザが開く
```

```
$ yarn build:dev
#=> developmentモードでコンパイル

$ yarn build
#=> productionモードでコンパイル
```

## webpackについて
### JS
ES6(Babel)

### CSS
別ファイルとして書き出している
Autoprefixerでブラウザプレフィックスを付与
cssnanoで圧縮

###　画像
image-webpack-loaderで圧縮後、
サイズが50KB以下のもの→url-loaderでdata-url化
サイズが50KB以上のもの→そのまま書き出し
