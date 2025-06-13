---
title: DBR PP - Database Operations
position: 4
---

# dbrpp_db Project Documentation

## High-Level Overview

The **dbrpp_db** project is a data processing and database management system supporting a mobile application. It ingests, processes, and stores both public and private data, providing up-to-date statistics and analytics. The system is composed of several Python modules for `data loading, calculation, database access, and logging`, orchestrated by the `dbrpp_calc` script, which can be run in various modes `(debug, run, schedule)`.

## Setup and Installation

1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Configure environment variables in `.env` as needed.
4. Refer to `README.md` for further instructions.

## Directory Structure

- `calculations.py`: Main data processing and calculation logic.
- `conf_log.py`: Logging configuration and initialization.
- `config.py`: Database and application configuration.
- `db.py`: Database connection and utility functions.
- `dbrpp_calc`: Main entry point script for running/scheduling the process.
- `loader.py`: Data loading and writing functions.
- `models.py`: SQLAlchemy ORM models for database tables.
- `Private.parquet`: Input data file for private data processing.
- `processes.json`: Tracks running processes for scheduling.
- `restart.sh`: Script to restart the main process.
- `logs/`: Directory for log files.
- `pl/`: Plugins or additional scripts.
- `results.md`: Output and results documentation.

## Running the Main Script

The main script is `dbrpp_calc`. It supports several modes:
- **schedule**: Runs the process in the background, scheduled every minute.
- **debug**: Runs in debug mode, writing to a test database if available.
- **run**: Runs the process once.

```
./dbrpp_calc --help
nohup ./dbrpp_calc -m schedule > logs/stdout.log 2>&1 &
./restart.sh
```

## Logging and Configuration

- **Logging** is set up in `conf_log.py` and used throughout the project. Log files are stored in `logs/`.
- **Configuration** (database URLs, credentials, etc.) is managed in `config.py` and `.env`.

## Database and Data Model

### SQLAlchemy Models (`models.py`)

- `CC`: Stores currency data (usd, time).
- `Rates`: Stores rates (r1, r2, r3, r4, time, votes, v1, v2, v3).
- `RatesA`: Stores alternative rates (dbr_s, dbr, aa1, aa2, aa3, aa4, time).
- `DVotesAll`: Tracks all votes (created_at, ...).
- `DPartners`: Partner data.
- `DVotes`: Individual vote data.
- `Public`: Aggregated public data (time, dbr_display, btc_display, btc_color, btc_arrow, btc_pct_display, xau_display, ...).

Each model maps to a table in the database, with fields, types, and constraints as defined in `models.py`.

### Private.parquet

`Private.parquet` is a Parquet file containing private data, loaded and processed by `loader.py` for further calculations and database insertion.

## Data Processing and Calculation

- **Main flow** is in `calculations.py` and orchestrated by `dbrpp_calc`.
- `count_public_data` and `count_private_data` functions aggregate, process, and format data for public and private outputs.
- `loader.py` handles reading from `Private.parquet` and writing processed data to the database.
- `db.py` provides database connection utilities and a `ConnectionHandler` class for executing queries.

## Testing and Validation

- `format_test.py` contains unit tests for data formatting and validation functions.
- Run tests using:
  ```
  python format_test.py
  ```

## Configuration and Logging

- `config.py`: Defines database URLs, credentials, and other settings.
- `conf_log.py`: Sets up logging format, level, and output files.

## Process and Workflow

- `processes.json`: Tracks running process IDs for scheduling and management.
- `restart.sh`: Shell script to restart the main process.
- Scheduling is handled by `schedule` in `dbrpp_calc` and can be run in the background using `nohup`.

## Results and Outputs

- Output files and logs are generated in the `logs/` directory.
- `results.md` documents output formats and results for reference.

## Mermaid Diagrams

### High-Level Architecture

```mermaid
graph TD
  A[dbrpp_calc] -->|calls| B[calculations.py]
  A -->|calls| C[loader.py]
  B -->|uses| D[db.py]
  C -->|reads/writes| E[(Database)]
  C -->|reads| F[Private.parquet]
  A -->|logs| G[logs/]
  A -->|uses| H[conf_log.py]
  A -->|uses| I[config.py]
  A -->|scheduled by| J[restart.sh]
  A -->|process info| K[processes.json]
```

### Database Schema (ER Diagram)

```mermaid
erDiagram
  CC {
    TIMESTAMP time PK
    FLOAT usd
  }
  Rates {
    TIMESTAMP time PK
    FLOAT r1
    FLOAT r2
    FLOAT r3
    FLOAT r4
    INT votes
    INT v1
    INT v2
    INT v3
  }
  RatesA {
    TIMESTAMP time PK
    FLOAT dbr_s
    FLOAT dbr
    FLOAT aa1
    FLOAT aa2
    FLOAT aa3
    FLOAT aa4
  }
  DVotesAll {
    TIMESTAMP created_at PK
  }
  DPartners {
  }
  DVotes {
  }
  Public {
    TIMESTAMP time PK
    VARCHAR dbr_display
    VARCHAR btc_display
    VARCHAR btc_color
    INT btc_arrow
    VARCHAR btc_pct_display
    VARCHAR xau_display
  }
```

### Data Flow: Input to Database

```mermaid
graph LR
  F[Private.parquet] --> C[loader.py]
  C --> B[calculations.py]
  B --> E[(Database)]
```

### Main Data Processing Pipeline

```mermaid
graph TD
  Start(Start) --> Load[Load Data loader.py]
  Load --> Process[Process Data calculations.py]
  Process --> Write[Write to DB loader.py]
  Write --> End(End)
```

### Script Execution Sequence

```mermaid
sequenceDiagram
  participant User
  participant Script as dbrpp_calc
  participant Loader as loader.py
  participant Calc as calculations.py
  participant DB as Database

  User->>Script: Run dbrpp_calc
  Script->>Loader: Load data
  Loader->>Calc: Call calculation functions
  Calc->>DB: Query/update
  Loader->>DB: Write processed data
  Script->>User: Output/logs
```

### Scheduling and Restart Workflow

```mermaid
graph TD
  S[restart.sh] -->|starts| P[dbrpp_calc -m schedule]
  P -->|writes| L[logs/]
  P -->|updates| J[processes.json]
  P -->|runs| T[calculations/loader]
```