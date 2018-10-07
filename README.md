# Домашнее задание «Адаптивная вёрстка» и «Работа с сенсорным пользовательским вводом»
Домашнее задание #1 для Школы разработки интерфейсов - 2018 II

## Демо
Онлайн демонстрация
[https://rinagorsha.github.io/shri-2018-homework/hw1](https://rinagorsha.github.io/shri-2018-homework/hw1)

#### Локальный сервер
```
$ npm run serve
```

#### Билд
Итоговый билд будет лежать в папке `dist`
```
$ npm run compile
```

## Комментарии по верстке
Верстка адаптивная (responsive): страница корректно отображается на экранах любых размеров.
Брейкпойнты для медиа-запросов были выбраны как что-то среднее между размерами экранов популярных устройств и размеров, когда адаптивный макет начинал выглядеть некорректно.

Данные для карточек берутся из лежащего в корне `events.json`. На лету данные не подставляются, нужно перезапусить сборку.

Карточка с камерой интерактивная:
* Движение пальцем позволяет перемещаться по картинке
* Pinch позволяет приближать и оттдалять картинку
* Поворот позволяет менять яркость изображения

Карточка с камерой имеет адаптивное изображение: для десктопных устройств отображается крупное изображение, для мобильных - поменьше.

### Использованные технологии
* В качестве шаблонизатора использовался pug, в качестве css-препроцессора — stylus, позволяющие писать меньше кода, чем ванильные css и html.
* Autoprefixer для кросс-браузерности.

## Задание

[Ссылка на макет](https://shri-msk-2018-reviewer.github.io/shri-18-smarthouse-task-1/)

Нужно сверстать страницу ленты событий умного дома.
Предоставляется базовый дизайн ленты для экрана. Изменения размеров и компоновки карточек на других размерах экрана необходимо придумать и реализовать самостоятельно. Верстка должна быть максимально адаптивной.
