# Contributing Guidelines

Vielen Dank, dass du zu diesem Projekt beitragen möchtest! Hier sind einige Richtlinien, um den Entwicklungsprozess klar und effizient zu gestalten.

---

## Branching-Strategie

### Main Branch (`main`)

- Enthält den stabilen, produktionsfertigen Code.

- Direkte Pushes sind **nicht erlaubt** – Änderungen erfolgen ausschließlich über Pull Requests (PRs).

- Teammitglieder können ihre eigenen PRs mergen, nachdem sie sicherstellen, dass alles funktioniert und alle Tests erfolgreich sind.

### Feature-Branches

- Für jedes neue Feature oder jede Fehlerbehebung wird ein separater Branch erstellt:

```bash
git checkout -b feature/<feature-name>
```

**Beispiele für Branch-Namen:**

- `feature/login-page`

- `fix/login-bug`

- `chore/dependency-updates`

### Branch-Aktualisierung

- Vor dem Mergen muss der Feature-Branch auf den neuesten Stand von `main` gebracht werden. Das kannst du beispielsweise wie folgt machen:

```bash
git fetch origin

git rebase origin/main
```

- Nach dem Rebase die Änderungen pushen:

```bash
git push --force
```

### Pull Requests

- **Beschreibung:** Erkläre im PR, was geändert wurde und gegebenenfalls warum.

- (**Tests:** Stelle sicher, dass alle Änderungen getestet sind, bevor du einen PR öffnest.)

---

## Commit-Strategie

### Conventional Commit Format

Wir verwenden das **Conventional Commit**-Format, um eine konsistente Commit-Historie sicherzustellen.

**Commitizen** wurde eingerichtet, um dich interaktiv durch den Prozess der Commit-Erstellung zu führen. Nutze einen der folgenden Befehle, um einen Commit zu erstellen:

- Mit **npx**:

```bash
npx cz
```

- Alternativ, falls ein Skript in der `package.json` definiert wurde:

```bash
npm run commit
```

Das Tool hilft dir dabei, Commit-Typen auszuwählen (z. B. `feat`, `fix`) und die Commit-Beschreibung korrekt zu formatieren.

### Commit-Typen

| Typ        | Beschreibung                                                                  |
| ---------- | ----------------------------------------------------------------------------- |
| `feat`     | Neue Features oder Funktionalitäten.                                          |
| `fix`      | Fehlerbehebungen.                                                             |
| `docs`     | Änderungen an der Dokumentation.                                              |
| `style`    | Code-Formatierung (keine Funktionsänderungen).                                |
| `refactor` | Code-Umstrukturierung ohne neue Features oder Bugfixes.                       |
| `chore`    | Wartung, Setup oder andere Änderungen ohne Code-Auswirkung.                   |
| `BREAKING` | Änderungen, die die API oder Funktionalität brechen. Erfordert Major Release. |

### Beispiele für Commit-Nachrichten

- **Neues Feature:**

```text
feat(login): implement login form validation
```

- **Bugfix:**

```text
fix(api): resolve timeout issue in fetch requests
```

- **Dokumentation:**

```text
docs(readme): add contributing guidelines
```

- **Code-Formatierung:**

```text
style: format codebase using Prettier
```

- **Breaking Change:**

```text
feat(auth): update authentication method

BREAKING CHANGE: The authentication method has been changed, breaking backward compatibility.
```

### Commit-Richtlinien

1. Nutze sinnvolle und präzise Beschreibungen für jeden Commit.

2. Halte Commits möglichst **klein** und thematisch **fokussiert**.

---

## Workflow

### Lokale Entwicklung

1.  **Feature-Branch erstellen:**

```bash
git checkout -b feature/<feature-name>
```

2.  **Code schreiben und testen.**

3.  **Linting und Formatierung sicherstellen:**

```bash
npm run lint

npm run format
```

4.  **Branch mit `main` synchronisieren:**

```bash
git fetch origin

git rebase origin/main
```

5.  **Änderungen committen und pushen:**

```bash
git add .

git commit -m "feat(<scope>): <short description>"

git push origin feature/<feature-name>
```

6.  **Pull Request erstellen und Beschreibung hinzufügen.**

---

## Zusätzliche Hinweise

### Linting und Formatierung

- Nutze vorerst die vorhandenen Skripte, um sicherzustellen, dass der Code sauber und konsistent ist:

```bash
npm run lint

npm run format
```

### Abhängigkeiten aktuell halten

- Falls Abhängigkeiten aktualisiert werden müssen, füge einen separaten Commit hinzu:

```text
chore(deps): update dependencies
```
