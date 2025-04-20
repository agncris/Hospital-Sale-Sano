# 🏥 Hospital Sale Sano

## Descripción

Hospital Sale Sano es una aplicación web para la gestión hospitalaria. Permite a los usuarios gestionar citas médicas, consultar información sobre doctores y servicios, y realizar el registro y autenticación de usuarios.

## Características

- **🔒 Autenticación de usuarios**: Los usuarios pueden registrarse e iniciar sesión.
- **👨‍⚕️ Gestión de doctores**: Los administradores pueden agregar, editar y eliminar doctores.
- **📅 Reservas de citas**: Los pacientes pueden reservar citas con doctores.
- **🌐 Interfaz amigable**: Utiliza React y Bootstrap para una experiencia de usuario fluida.

## Tecnologías utilizadas

- **Frontend**: React, Vite, Bootstrap
- **Backend**: Node.js (simulado en este proyecto)
- **Gestión de estado**: Context API de React
- **Estilos**: CSS y Bootstrap

## 📂 Cómo Ejecutar el Proyecto

1. Clona el repositorio:

   ```bash
   git clone https://github.com/agncris/Hospital-front.git
   cd Hospital-front
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Construye el proyecto para producción:

   ```bash
   npm run build
   ```

5. Previsualiza la construcción de producción:
   ```bash
   npm run preview
   ```

## Estructura del proyecto

hospital-sale-sano/
├── public/ # Archivos públicos
├── src/ # Código fuente de la aplicación
│ ├── components/ # Componentes de React
│ ├── context/ # Contextos de React para gestión de estado
│ ├── styles/ # Archivos CSS
│ └── App.jsx # Componente principal
├── .env # Variables de entorno
├── .gitignore # Archivos y carpetas a ignorar por Git
├── package.json # Dependencias y scripts del proyecto
└── vite.config.js # Configuración de Vite

## 🌐 Cómo Probar la Funcionalidad Offline

1. Abre la aplicación en tu navegador.
2. Ve a Herramientas de Desarrollador → Aplicación → Service Workers.
3. Asegúrate de que el Service Worker esté activo.
4. Simula el modo offline y verifica que:
   - Los archivos en caché se sirvan correctamente.
   - Los datos de IndexedDB (e.g., citas) sean accesibles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:
   ```bash
   git checkout -b feature/nombre-de-tu-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Descripción de tus cambios"
   ```
4. Sube tus cambios a la rama:
   ```bash
   git push origin feature/nombre-de-tu-funcionalidad
   ```
5. Abre un pull request.

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Autor

👤 **Cristian**  
[GitHub](https://github.com/agncris)

---

¡Gracias por tu interés en el proyecto! 😊
