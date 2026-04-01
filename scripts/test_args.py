"""Tiny script to verify CLI args (use with the extension's Run with Arguments)."""

import sys


def main() -> None:
    print("argv:", sys.argv)
    print("arg count:", len(sys.argv))


if __name__ == "__main__":
    main()
