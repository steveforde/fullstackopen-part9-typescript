# Full Stack Open - Part 9: TypeScript

My solutions and projects from Part 9 of the University of Helsinki's Full Stack Open course. This part is all about adding type safety to full stack apps — going from "JavaScript and hope" to actually catching bugs before runtime.

## What I learned

- Setting up TypeScript properly on both a Node/Express backend and a React frontend
- Writing type guards and parsers to safely handle data coming in from API requests (you can't trust the outside world, even with types)
- Using utility types like `Omit`, `Pick`, and unions to avoid repeating type definitions everywhere

## Projects

### Patientor (patient management app)

The big one — a full-stack app for managing patient records and health entries (hospital visits, occupational healthcare, health checks). The interesting part was modeling the different entry types as a discriminated union and validating everything on the backend before it touches the data.

- **Stack:** Node.js, Express, TypeScript
- Backend validates and parses incoming requests so bad data never makes it into the system

### Course Info App

A small React app converted from plain JS to TypeScript — mostly practice for typing props, state, and component structure properly instead of letting `any` sneak in everywhere.

## Running it locally

```bash
cd patientor-backend   # or patientor-frontend
npm install
npm run dev
```
