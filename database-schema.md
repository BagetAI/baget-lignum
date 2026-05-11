# Lignum Database Architecture

This document outlines the structured databases provisioned for the Lignum matchmaking engine.

## 1. Artisan Directory (Master Joiners)
**ID:** `cb7a664f-0cbf-424c-8c9d-34ca7e4cf0c8`
**Purpose:** Internal registry of retired 'Compagnons du Devoir' and Master Artisans.

| Column | Type | Description |
| :--- | :--- | :--- |
| `name` | text | Full name of the artisan |
| `specialty_century` | text | Primary historical focus (e.g., 18th Century) |
| `region` | text | Geographic focus (e.g., Paris 75) |
| `certification` | text | Compagnon or Master status |
| `contact_email` | text | Private contact for Lignum operations |
| `phone` | text | Private phone for Lignum operations |
| `bio` | text | Experience summary and project focus |
| `active` | boolean | Availability status |

## 2. Molding Template Catalog
**ID:** `233c2879-62e5-4d8a-9af7-1d944592b840`
**Purpose:** Technical catalog of rare physical molding templates owned by the network.

| Column | Type | Description |
| :--- | :--- | :--- |
| `template_name` | text | Unique identifier for the profile |
| `style_period` | text | Period classification (e.g., Haussmannian) |
| `molding_type` | text | Geometric profile (e.g., Doucine) |
| `material_suitability` | text | Best wood type (Oak, Walnut, etc.) |
| `artisan_id` | text | ExternalKey of the owner artisan |

## 3. Website Leads (Form Capture)
**ID:** `9e7f377e-4694-4f23-a830-dbab8609c3f9`
**Purpose:** Public-facing lead capture for restoration requests.

---
*Last Optimized: May 11, 2026*
