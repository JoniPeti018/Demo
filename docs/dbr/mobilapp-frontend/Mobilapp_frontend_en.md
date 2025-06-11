# DBR Index Project Documentation

## 1. Project Overview & Architecture

**DBR Index** is a cross-platform Flutter app for Android, iOS, Windows, macOS, Linux, and Web. It lets users view the DBR Index, vote, and manage participation. Features include device info collection, secure storage, API communication (with isolates), localization, and responsive UI.

### Architecture Diagram

```mermaid
graph TD
  UI[UI Pages]
  Controllers[Controllers]
  Models[Data Models]
  Isolates[API Isolates]
  Storage[Persistent Storage]
  API[Remote API]
  UI --> Controllers
  Controllers --> Models
  Controllers --> Isolates
  Isolates --> API
  Controllers --> Storage
  Storage --> Models
  Models --> UI
```

## 2. Directory and File Structure

- **lib/**: Main Dart source (UI, controllers, models, API logic)
- **assets/**: Images, CSVs, resources
- **android/, ios/, windows/, linux/, macos/**: Platform-specific code/configs
- **web/**: Web build files
- **test/**: Unit/widget tests
- **pubspec.yaml**: Project config/dependencies
- **README.md**: Project intro

### Directory Structure Diagram

```mermaid
graph TD
  A[Root]
  A --> L[lib/]
  A --> AS[assets/]
  A --> AN[android/]
  A --> IO[ios/]
  A --> WI[windows/]
  A --> LI[linux/]
  A --> MA[macos/]
  A --> WE[web/]
  A --> TE[test/]
  A --> PUB[pubspec.yaml]
  L --> PAGES(lib/pages/)
  L --> CONTROLLERS(lib/controllers/)
  L --> DATACLASSES(lib/dataclasses/)
  L --> APINET(lib/apinetisolates/)
```

## 3. Main Application Flow

1. App starts in `main()` (`lib/main.dart`)
2. Initializes storage, certificates, device orientation
3. Runs `MainApp` widget, loads `MainFrame`
4. `HomePage` loads device info, checks network, loads data
5. UI updates with rates, voting, user info

### Startup Sequence

```mermaid
sequenceDiagram
  participant User
  participant App
  participant Storage
  participant API
  User->>App: Launch app
  App->>Storage: Initialize storage
  App->>App: Load certificates, set orientation
  App->>App: Run MainApp
  App->>App: Show HomePage
  App->>App: Load device info
  App->>API: Fetch online data
  App->>Storage: Load local data
  App->>User: Display HomePage UI
```

## 4. Core Data Models

- **PublicPrivateData**: User and voting data
- **Roundtrip**: API roundtrip logs
- **EventLog**: App event logs
- **VoteRecordsProcessor**: Voting records
- **VARecordsProcessor**: Voting assistant records
- **CCRecordsProcessor**: Credit/coupon records

### Data Model Relationships

```mermaid
classDiagram
  PublicPrivateData <|-- VoteRecordsProcessor
  PublicPrivateData <|-- VARecordsProcessor
  PublicPrivateData <|-- CCRecordsProcessor
  Roundtrip <.. EventLog
  PublicPrivateData : votesLastHourRemaining
  PublicPrivateData : votesTodayRemaining
  PublicPrivateData : va1
  PublicPrivateData : va2
```

## 5. Networking & Isolates

Network requests use `dio`. API calls run in Dart isolates (`lib/apinetisolates/`). Each API operation has a dedicated isolate controller for retries and error handling.

### Isolate-based API Call Flow

```mermaid
graph TD
  UI[UI Action]
  Controller[Controller]
  Isolate[API Isolate]
  Dio[Dio HTTP Client]
  API[Remote API]
  UI --> Controller
  Controller --> Isolate
  Isolate --> Dio
  Dio --> API
  API --> Dio
  Dio --> Isolate
  Isolate --> Controller
  Controller --> UI
```

## 6. State Management

State is managed via **global config** (`lib/controllers/globalconfig.dart`), **local storage** (shared_preferences, secure storage), and **in-memory state** in widgets.

## 7. UI Pages and Navigation

- **HomePage**: Dashboard, voting, rates
- **SettingsPage**: Settings, language, VA config
- **InfoPage**: App info, version, device details
- **StatPage**: Statistics/history
- **ActivationPage**: Activation code entry
- **FssIssuePage**: Data reset warning

### Navigation Flowchart

```mermaid
graph TD
  HomePage --> SettingsPage
  HomePage --> InfoPage
  HomePage --> StatPage
  HomePage --> ActivationPage
  SettingsPage --> InfoPage
  HomePage --> FssIssuePage
```

## 8. Voting and Switch Logic

Voting is handled by `_pressVote` in `HomePage`, sending votes to the backend via isolate. VA switches are managed similarly. Both update local state and trigger API calls, with dialogs for errors.

## 9. Persistent Storage

Uses `shared_preferences` and `flutter_secure_storage` for user/device data, votes, settings, activation codes.

## 10. Localization and Language Handling

Localization uses CSV files in `assets/data/locales-keywords.csv`. The app loads language strings at runtime; users can select language. The `Languages` controller manages translations.

## 11. Error Handling and Logging

Errors/logs are collected in data classes and sent to the backend via API isolates. User errors show dialogs; network/server issues are logged.

## 12. Platform-Specific Details

- **Android:** `android/`, Gradle configs, AndroidManifest.xml
- **iOS:** `ios/`, Xcode project, Info.plist, storyboards
- **Windows/Linux/macOS:** `windows/`, `linux/`, `macos/`, CMake configs
- **Web:** `web/`, index.html, manifest.json

## 13. Build, Run, and Test

- Build/run: `flutter run`
- Build for platform: `flutter build <platform>`
- Test: `flutter test`

## 14. Assets and Resources

Assets: images (icons), CSVs for localization, certificates. Referenced in `pubspec.yaml`, loaded at runtime.

## 15. Security

Sensitive data (API keys, device IDs) stored in `flutter_secure_storage`, never hardcoded. Backend uses HTTPS; device info sent only as needed.

## 16. Extending and Maintaining

- Follow modular structure (controllers, models, UI widgets)
- Add features in separate widgets/controllers
- Update localization files for new UI text
- Write tests in `test/`
- Keep dependencies up to date in `pubspec.yaml`