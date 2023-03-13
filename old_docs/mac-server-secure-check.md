

# Mac Server Security Checklist

## Checklist

1. User account with `UID` or `GID` in range of 0 - 99.

## How to check

### User account list

Save a user account list to ascii file.

```shell
dscacheutil -q user >> userlist.lis
```

Make a table of the user account list.

```python

```