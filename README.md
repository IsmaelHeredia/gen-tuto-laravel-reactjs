# Generador de tutoriales para guitarra

Este proyecto sirve para generar tutoriales de guitarra basado en vídeos para después crear un tutorial con imágenes ordenadas que se pueden ver en pantalla completa. Utiliza Laravel como Backend y desde el lado de Frontend, ReactJS con Vite, Material UI y Redux. La base de datos elegida para este proyecto es MySQL.

Las funciones incorporadas son : 

Inicio de sesión obligatorio para usar el sistema protegido con JWT.

Posibilidad de cambiar usuario y contraseña.

Posibilidad de cambiar el theme del sistema completo con Redux, la paleta de colores para los themes red, blue y green fueron extraídos de la siguiente [fuente](https://medium.com/@facinick/reactjs-mui5-color-themes-with-dark-light-modes-theme-color-design-27039fd3d5de). Ademas de la paleta de colores cada theme incluye un modo oscuro y claro.

Se puede agregar, editar y borrar canciones con opción de elegir géneros, dificultades y afinaciones.

Se pueden agregar, editar y borrar capturas, en las cuales se puede elegir el nombre y seleccionar una imagen local del sistema.

En el listado de las canciones se pueden filtrar por nombre, género, dificultad y afinación usando Redux lo cual permite recordar la configuración de la búsqueda al cambiar de página. Ademas se puede generar el tutorial que contendrá todas las imágenes ordenadas en una galería que puede activar la opción de pantalla completa.

En el listado de capturas esta habilitada una función para ordenar las capturas creadas, por defecto al crear una nueva se ordena automáticamente como la ultima, pero en esta ventana se pueden ordenar todas las capturas por orden.

En el menú se puede cargar una ventana que contiene un gráfico que muestra los 3 géneros mas usados con su cantidad de canciones correspondientes.

A continuación se muestran unas imágenes del sistema en funcionamiento.

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhdInkgRK_51m76PRYlnBKPCq6XMCKKwdMILGCWgELaJJ6Cej7BNRWWz_X24T5IxeGAWXN0K9PUEzMldGeT-PxzmqJA-0AKydiYblR_nX4eVE56dpRR20k5-tkWPVqa4KoK9ZmavY_HhEFqwEoJ0o5WyDV4MIXzEuhxbtyGVUJGWkMMWj6krll6TTRqhTk/s1857/1.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkxTOw8ueGMCBjGWJ0LmgOgxvJp6UuvE0RSsXhSC64dCUvEMIxn3ho6FIgK-1ycq-HuAV2zAtVyjpLGe_pyDVYxp3VzbYDRx3hZDIXZVDSH346y_CF5z8_M1rWRrOd06Zu2QNauBv5-8z3wMnTc2q8pjazUkQB2yuRC3XmHsZvGrZ2_tSckLsCSXaRkr0/s1847/2.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgGc1F4qwTE5-GHRtPL7w5DIWYIExg9rJVe28dCRNpnD00PG4DPvkbb2uFyUCQr2T2sT5f8zwSLQx4449yf6oMIM3XZnJNRG4ot1OeYNSz5z4SsZE0382ZBLqMKs08y0coW8Xwi0VUuksfL89SRFhJ7YU2-Pj88ANvcTvuoCVBS5aMJyySN3MpkvRnOlws/s1847/3.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEga8jRpJCPxINJpa0tPR6FpUzVy-AAsl9fgkqv-JzbuWYdvcJgqVmhksNwo9V7Ld_tKrQzglodWGAWC9bXpRYYpjgr1Bcm_xIDHlDKXGuOTiwrTNsNHPsMw1yEg22QqgEbpYqynmo_uEqOwOR_Oltcf0QslxzyateLgGidFNTt-I6sjo9LWKzfwKA6qCaA/s1847/4.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgSoC1weMz4bTB_nI8B5R4yr9ClRpYgUfxK0eNKKglsEg2gFgFOnj5pNe_507h-gE6-urbXrh9Cqrq5V_GhojDCeseaFGc5VRSmzumjsLoiZjG7jRn0fSXgw98xRRS_EWzYfBZgzWeiZlQr6onkvijnj8HZDg6pAChnMEF3B-Urp3tv1okWl_pQiBinZcE/s1837/5.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQbkpXYJRgDJJ1W5t7Wv5Esf00ud9xg860rN4RuPHk0RSDuq-XgNry6XVW48-Qp0SreoV2tWmJB6yElL52sXKaSALiV-aQU3uCEQdLY_33cRpcjYOeJL-Qe3J4IA3IdX_0NMFwc8exLSc1X4P9MGh80-tADEUxI9dMJGjHjcUOeI91NXoGWyPJbBgWA-8/s1837/6.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhql4agwDOTWuam-Fmwok-6cFOR8k_p1N09wdgHoErwCr6u69XZ6qAg5SGBKg9flz8c0HtDwkb0_eHpX4j_u7gNhRbgzmGH-MtND0YbbIJbD91A5VPlmF5xTcZQVU9W3CuuLwUpFc5BI_i2_YgKy8NxaAcjv9sN7hkr_2adGQrKfgTZzyXk099bG5H9Sh8/s1851/7.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgwG4tkbkxgBhBvt-nPyJwz1XWbN_G6SbjBS_zi39mpZ8OwqVp3OBOme43W52eAacpws1AjWBt4bRM1_r9yjB-j5uc68Yz2b8yYra2LFv96OjGOub9XsaEvyisbjd9voXOmi7QqW6hyphenhyphentUopPHPb4OzOAsPlQItyCFlv238QIBDj4IdI_11thd_81oxVcpc/s1851/9.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEho4qtyF8cIZWvwfOu50qCS4uAldSr3h85GGD8rqhYFZvJcs-pQqAbMQXE1n7aWy_S_gI3wrAaB0BqwJB6nj3q59VwWCZVCXCDfL-4ZDZap1ZUmDlKV1JDbi6vto5EKs3lauRLHD2Aizb5Ahv_HInDwjw-hR8NPfk5H6taw6QX_G4SuXUGU9_r_z-eeNxs/s1851/11.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPr1mf2dlW3HCoCFoGJZ_2py87xoDFM_4ry7HgLJKpBlyLPMzrwHAQiHoAuHSiNyxyX4l5w3e7aoNzcmWOcRI_zqceVaqEM-qzKnSDdwb6SxcIo7Wq8f6r0l7DFk1RvzqPvskKmHJuElBb8dYkAY6EZ7ey1rBZT2YH9YQh1Nz0mRCmxIfJYHWIQ1vLm4c/s1851/13.png)

![screenshot](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjv0wErI41t2TAmCOHbNy2OFtViYxFHyTcrtnp3F6gaUDKB_si0M4IITryQ3vGMm7vAjcQmsjbtYMSKHf5Dv3hUfLvgewrr_ToSILdN5b6btLG31X611c2L8usBobMVKZnpqE8YmQQeNoXdzG644KqpQVaR-L2aMD8s8WiRxNVElFIMBIvKxX4yYmLETCM/s1851/15.png)

Para la correcta instalación del sistema se deben seguir los siguiente pasos. 

En la carpeta del Backend que seria "sistema-api" se debe renombrar el archivo .env.example a solo .env y editar la configuración con los datos de tu conexión MySQL y el SECRET_KEY que seria la clave para generar el JWT.

Una vez editado el archivo .env se deben ejecutar los siguiente comandos : 

```
composer install
```
```
php artisan key:generate
```
```
php artisan migrate
```
```
php artisan db:seed --class=DatabaseSeeder
```
```
php artisan storage:link
```

Finalmente para iniciar el servidor se debe ejecutar este comando : 

```
php artisan serve --port=7777
```

En la carpeta del Frontend que seria "sistema-frontend" se debe ejecutar el siguiente comando para instalar las dependencias : 

```
npm install
```

En esa misma carpeta también se debe renombrar el archivo .env.example a solo .env y editar la configuración con la URL del Backend.

Finalmente para iniciar el servidor se debe ejecutar este comando : 

```
npm run dev
```
