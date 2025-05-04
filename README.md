## 1. Installer Node.js et npm

```bash
sudo apt install nodejs npm
```

➡️ Installe Node.js (moteur JavaScript) et npm (gestionnaire de paquets Node).

---

## 2. Vérifier que Node.js est installé

```bash
node -v
```

➡️ Affiche la version de Node.js (ex: `v18.18.2`). Cela confirme que Node.js est bien installé.

---

## 3. Installer Angular CLI (globalement)

```bash
sudo npm install -g @angular/cli
```

➡️ Installe Angular CLI globalement. C’est nécessaire pour utiliser la commande `ng`.

---

## 4. Vérifier que Angular CLI fonctionne

```bash
ng version
```

➡️ Affiche les versions de Angular CLI, Node.js, etc.

---

## 5. Se placer dans le dossier Angular

```bash
cd frontend
```

---

## 6. Installer les dépendances du projet

```bash
npm install
```

➡️ Installe toutes les dépendances listées dans `package.json`.

---

## 7. Lancer l'application Angular

```bash
ng serve --open
```

➡️ Lance le serveur de développement Angular sur `http://localhost:4200/` et ouvre le navigateur automatiquement.

Commande pour le hot reload (toute les 2 secondes)

ng serve --poll 2000

---