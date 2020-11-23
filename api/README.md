1. users
- get all users (GET) - admin
- get online users - admin
- get online all - adimn
- signup (POST)
- login (POST) - {{ always update user_login_token in database }}
- verify (POST)
- forgot password (POST) - open
- reset password (POST) - open [secluded] - user can reset password
- get user details (GET) - user & admin
- update user (PATCH) - user & admin

2. admin  -- {{ another subdomain }}
- login (POST) - open

3. categories (food, vegetables, fruits)
- get categories & link to particular - open
- get a category & products under them - open
- add category (POST) - admin
- update category (PATCH) - admin
- delete (DELETE) - admin

4. products {1 image ** can still update image}
- get all products (GET) - admin only
- get product detail (GET) - open
- add product (POST) - admin
- patch product (PATCH) - admin
- delete product (DELETE) - admin


5. orders
- create order (POST) - only user (*must be verified/paid for*)
- all orders (GET) - only admin
- unfulfilled orders (GET) - only admin                  {{ ?status=fulfilled }}
- fulfilled orders (GET) - only admin                    {{ ?status=unfulfilled }}
- cancelled orders (GET) - only admin
- history of orders  (GET) for user - user & admin                   {{ ?user=id&status=unfulfilled }}
- get order details (GET) - user & admin
- update order to fulfilled (PATCH) - only admin - cancel unfulfilled order (PATCH) - user ({ An order can only be cancelled within 30min. after placing order })

6. feedback (chat)
- get messages (GET) - user & admin
- send message (POST) to user/admin - user & admin
- get unanswered messages (GET) - only admin

7. cart

8. market (chat)
- get market status (r open/closed) - open
- update market status (1/0) - only admin
