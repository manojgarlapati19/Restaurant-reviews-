# API Endpoints

## Auth and users

- `POST /v1/auth/sync`
- `GET /v1/me`
- `PATCH /v1/me`
- `GET /v1/me/preferences`
- `PUT /v1/me/preferences`
- `GET /v1/users/:username`
- `POST /v1/users/:id/follow`
- `DELETE /v1/users/:id/follow`

## Restaurants and dishes

- `POST /v1/restaurants`
- `GET /v1/restaurants/:slug`
- `PATCH /v1/restaurants/:id`
- `GET /v1/restaurants/:id/menu`
- `POST /v1/restaurants/:id/dishes`
- `PATCH /v1/dishes/:id`
- `GET /v1/dishes/:id`
- `GET /v1/dishes/compare`

## Reviews and discovery

- `POST /v1/reviews`
- `GET /v1/reviews/:id`
- `PATCH /v1/reviews/:id`
- `POST /v1/reviews/:id/media/sign`
- `POST /v1/reviews/:id/like`
- `DELETE /v1/reviews/:id/like`
- `POST /v1/reviews/:id/comments`
- `POST /v1/bills`
- `POST /v1/reviews/:id/verify`
- `GET /v1/search`
- `POST /v1/search/parse`
- `GET /v1/discovery/feed`
- `GET /v1/discovery/map`
- `GET /v1/recommendations`
- `GET /v1/restaurants/:id/insights`
- `GET /v1/dishes/:id/insights`
