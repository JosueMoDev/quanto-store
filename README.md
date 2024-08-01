```markdown
# Quanto Store

## Descripción

Quanto Store es una aplicación web para gestionar ventas en un restaurante.

## Stack
- Angular
- Ionic
- Firebase

## Creación del Proyecto con Angular/Ionic

1. **Instalar Angular CLI**:
    ``` npm install -g @angular/cli```

2. **Instalar Ionic CLI**:
    ```npm install -g @ionic/cli```

3. **Crear un nuevo proyecto Ionic**:
    ```ionic start quanto-store blank --type=angular```

4. **Navegar al directorio del proyecto**:
    ```cd quanto-store```
## Instalación de Dependencias

1. **Instalar dependencias del proyecto**:
    ```
    npm install
    ```

## Configuración de Firebase

1. **Crear un proyecto en Firebase**:
    - Ve a [Firebase Console](https://console.firebase.google.com/).
    - Haz clic en "Agregar proyecto" y sigue las instrucciones.

2. **Agregar Firebase a tu proyecto Ionic**:
    - En la consola de Firebase, selecciona tu proyecto.
    - Haz clic en el ícono de configuración junto a "Descripción general del proyecto" y selecciona "Configuración del proyecto".
    - En la pestaña "Tus apps", selecciona el ícono web (</>) para configurar Firebase Hosting para tu app web.
    - Sigue las instrucciones para registrar tu app y obtén el código de configuración de Firebase.

3. **Instalar Firebase y AngularFire**:
    ```
    npm install firebase @angular/fire
    ```

3. **Agregar configuración de Firebase a tu proyecto**:
    - Crea un archivo `src/environments/environment.ts` y `src/environments/environment.prod.ts` con la configuración de Firebase obtenida:

    ```typescript
    // src/environments/environment.ts
    export const environment = {
      production: false,
      firebaseConfig: {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
      }
    };
    ```

    ```typescript
    // src/environments/environment.prod.ts
    export const environment = {
      production: true,
      firebaseConfig: {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
      }
    };
    ```

7. **Configurar AngularFire en tu aplicación con standalone components**:
    - Modifica el archivo `src/main.ts` para inicializar Firebase:

    ```
    import { bootstrapApplication } from '@angular/platform-browser';
    import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
    import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

    import { routes } from './app/app.routes';
    import { AppComponent } from './app/app.component';

    import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
    import { provideFirestore, getFirestore } from '@angular/fire/firestore';
    import { environment } from './environments/environment';
    import { getAuth, provideAuth } from '@angular/fire/auth';
    import { provideHttpClient } from '@angular/common/http';
    bootstrapApplication(AppComponent, {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideRouter(routes, withPreloading(PreloadAllModules)),
        provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
        provideFirestore(() => getFirestore()),
        provideHttpClient(),
        provideAuth(() => getAuth()),
        
    ],
    }).catch((err) => console.error(err));

    ```


## Ejecutar la Aplicación

1. **Iniciar la aplicación Ionic**:
    ```
    ionic serve
    ```
     ```ng serve
    ```
## Ejecutar Pruebas

1. **Ejecutar pruebas unitarias**:
    ```
    ng test
    ```

2. **Ejecutar pruebas de extremo a extremo (E2E)**:
    ```
    ng e2e
    ```

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.
```