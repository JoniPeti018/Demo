# Reward Distribution System

Automated reward calculation and distribution for a voting-based partner program. This system manages hourly and daily reward pools, tracks voter participation, and persists results to MySQL databases. It is designed for reliability, transparency, and extensibility.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [distribute.py: Main Logic](#distributepy-main-logic)
  - [RewardCache Class](#rewardcache-class)
    - [Public Methods](#public-methods)
    - [Private Methods](#private-methods)
  - [Other Functions](#other-functions)
- [Database Tables](#database-tables)
- [Usage](#usage)
- [Logging & Monitoring](#logging--monitoring)
- [Configuration](#configuration)
- [License](#license)

---

## Overview

The Reward Distribution System automates the calculation and distribution of rewards to partners based on their voting activity. It manages reward pools, tracks voter participation, and persists results to multiple MySQL databases. The system supports both hourly and daily reward cycles, with advanced logic for reward tiers and ECC (Effective Contribution Coefficient) capping.

---

## Project Structure

```
.
├── distribute.py         # Main reward logic and scheduler
├── db.py                 # MySQL connection manager
├── config.py             # Database and system configuration
├── conf_log.py           # Logging setup
├── loader.py             # Data loading utilities
├── requirements.txt      # Python dependencies
├── logs/                 # Log files
├── build/ docs/ source/  # Sphinx documentation
└── ...                   # Other scripts and data files
```

---

## How It Works

1. **Voting data** is collected from the database.
2. **Reward pools** are updated based on recent voting activity and CC rates.
3. **Hourly and daily rewards** are calculated and distributed using tiered logic.
4. **Results** are persisted to MySQL tables for auditing and further processing.
5. **Special partners** receive additional reward transfers.
6. **Logs** are written for all major actions and distributions.
7. **Graceful shutdown** and process tracking are handled for reliability.

---

## distribute.py: Main Logic

[`distribute.py`](distribute.py) is the entry point and core logic of the reward system. It defines the [`RewardCache`](distribute.py) class, which encapsulates all reward calculation, distribution, and database operations.

### RewardCache Class

The `RewardCache` class manages:

- Hourly and daily reward pools
- Voter tracking
- Reward calculations (including ECC capping)
- Database persistence
- Logging and monitoring

#### Public Methods

- **`calculate_hourly_reward()`**  
  Calculates and distributes hourly rewards to eligible voters.  
  - Divides the hourly pool into 5 categories (top 10%, top 10, top 100, top 1000, all).
  - Assigns rewards based on position tiers.
  - Persists results and logs the distribution.

- **`calculate_daily_reward()`**  
  Calculates and distributes daily rewards with ECC cap logic.  
  - Computes ECC cap based on the top 10% partners.
  - Splits the daily pool into fixed position, ECC-based, and top 50% participation rewards.
  - Applies minimum vote requirements and CC market bonus.
  - Persists results and logs the distribution.

- **`update_cache()`**  
  Updates the reward pools with new voting data.
  - Retrieves total CC votes and voter count from the last hour.
  - Updates hourly and daily pools (25% to hourly, 75% to daily).
  - Persists updated pool amounts.

#### Private Methods

- **`_get_cc_rate()`**  
  Retrieves the current CC conversion rate from the database.

- **`_get_reward_latest_hr()`**  
  Gets voting data for the previous hour (total CC votes and unique voters).

- **`_get_hourly_voters()`**  
  Retrieves partners eligible for hourly rewards with their positions.

- **`_get_hourly_voters_with_votes()`**  
  Retrieves hourly voters with detailed vote counts by type.

- **`_get_daily_voters()`**  
  Retrieves all partners who voted today with their positions and vote counts.

- **`_calculate_ecc_cap(df)`**  
  Calculates the ECC cap as 5x the average ECC of the top 10% partners by position.

- **`_update_hourly_rewards_db(df)`**  
  Upserts hourly reward data into the `reward_list_hourly` table.

- **`_execute_upsert(rows, query, reward_type)`**  
  Executes a batched database upsert operation for reward data.

- **`_create_reward_log_entry(...)`**  
  Inserts a detailed log entry for each reward distribution into the `reward_log` table.

- **`_transfer_hourly_data(df)`**  
  Sums and transfers hourly rewards for specific partners to a remote database.

- **`_log_hourly_vote_counts(df)`**  
  Logs detailed vote counts for hourly voters for monitoring and debugging.

- **`_recover_voting_data()`**  
  Recovers voting data after restart (hourly and daily voters).

- **`_load_daily_pool()` / `_save_daily_pool()`**  
  Loads/saves the daily reward pool state from/to the database.

---

### Other Functions

- **`run_hourly(rc)`**  
  Executes the full hourly reward workflow: updates pools, calculates/distributes rewards, logs metrics.

- **`run_daily(rc)`**  
  Executes the full daily reward workflow: calculates/distributes rewards, logs metrics.

- **`custom_signal_handler(logger)`**  
  Returns a signal handler for graceful shutdown and log flushing.

- **`add_pid_to_file(filename, pid, path)`**  
  Tracks the running process ID in a JSON file for monitoring.

---

## Database Tables

- **`reward_list_hourly`**: Stores hourly reward distributions.
- **`reward_list_daily`**: Stores daily reward distributions.
- **`reward_pool_state`**: Tracks accumulated daily rewards.
- **`reward_log`**: Audit log of all distributions.
- **`reward_distribution_logs`**: JSON logs of each distribution event.
- **`cc_hourly`**: Special partner reward transfers.

---

## Usage

### Production

Run as a scheduled service:
```sh
python distribute.py
```
- Hourly rewards: every hour at :30
- Daily rewards: every day at 00:00:35

### Test Mode

Set `TEST = True` in [`distribute.py`](distribute.py) to run a single hourly and daily cycle for debugging.

### Process Tracking

The script writes its PID to `processes.json` for monitoring and safe restarts.

---

## Logging & Monitoring

- All major actions and errors are logged to file and, for distributions, to the database.
- Detailed per-partner vote counts are logged at DEBUG level for auditing.
- Graceful shutdown is handled via signal handlers.

---

## Configuration

- Database connections and system parameters are set in [`config.py`](config.py).
- Logging configuration is in [`conf_log.py`](conf_log.py).
- Python dependencies are listed in [`requirements.txt`](requirements.txt).

---

## License

MIT License (see `LICENSE` file if present).

---

**Author:** Joel  
**Contact:** See repository for details.

---

### For more details, see the code in [`distribute.py`](distribute.py) and the Sphinx documentation in the `docs/` and `build/` directories.