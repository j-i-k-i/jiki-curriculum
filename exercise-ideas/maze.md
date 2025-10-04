# Maze Exercise Ideas

## Overview

These exercises use maze navigation to teach fundamental programming concepts. Each exercise requires ONE solution that works for MULTIPLE different maze scenarios.

---

## Exercise 1: First Steps

**Learning Objective:** Sequential execution, function calls

**Available Functions:**

- `move()` - Move forward one cell
- `turn_left()` - Turn 90 degrees left

**Problem:** Navigate from start to goal by calling functions in sequence.

**Example Solution:**

```python
# Commands execute top to bottom
move()
move()
turn_left()
move()
turn_left()
turn_left()
turn_left()  # This makes a right turn
move()
move()
```

**Scenarios the solution must handle:**

1. **Straight Line:** Start → → → → Goal (5 moves)
2. **L-Shape:** Start → → ↓ ↓ Goal (2 moves, turn right, 2 moves)
3. **Zigzag:** Start → → ↓ ← ← Goal (mix of moves and turns)

**Key Concepts:**

- Programs run line by line
- Each function call produces one action
- Planning a sequence of steps

---

## Exercise 2: Stop Repeating Yourself

**Learning Objective:** For loops to eliminate repetition

**Available Functions:**

- `move()` - Move forward one cell
- `turn_left()` - Turn 90 degrees left

**Problem:** Navigate long corridors without typing `move()` dozens of times.

**Example Solution:**

```python
# Use loops for repetition
for i in range(10):
    move()

turn_left()

for i in range(5):
    move()

# Turn right (3 lefts)
for i in range(3):
    turn_left()

for i in range(7):
    move()
```

**Scenarios the solution must handle:**

1. **Long Corridor:** 20 cells straight
2. **L with Long Sides:** 15 cells → turn → 12 cells
3. **Rectangle:** 10 → turn → 5 → turn → 10 → turn → 5

**Key Concepts:**

- `for` loops repeat actions
- `range(n)` counts from 0 to n-1
- DRY principle (Don't Repeat Yourself)

---

## Exercise 3: The Right Hand Rule

**Learning Objective:** Algorithm implementation with conditionals

**Available Functions:**

- `move()` - Move forward one cell
- `turn_left()` - Turn 90 degrees left
- `turn_right()` - Turn 90 degrees right
- `ahead_clear()` - Returns True if no wall ahead
- `left_clear()` - Returns True if no wall to the left
- `right_clear()` - Returns True if no wall to the right
- `at_goal()` - Returns True if at goal

**Problem:** Solve ANY maze using the right-hand rule (always keep a wall on your right).

**Example Solution:**

```python
# Right hand rule: always try to turn right first
while not at_goal():
    if right_clear():
        # Turn right and move
        turn_right()
        move()
    elif ahead_clear():
        # Go straight
        move()
    elif left_clear():
        # Turn left and move
        turn_left()
        move()
    else:
        # Dead end - turn around
        turn_left()
        turn_left()
```

**Scenarios the solution must handle:**

1. **Simple Path:** One route, no branches
2. **Maze with Dead Ends:** Multiple wrong turns possible
3. **Maze with Loops:** Contains cycles
4. **Complex Maze:** Multiple intersections and paths

**Key Concepts:**

- While loops for unknown iterations
- If/elif/else decision chains
- Following a consistent algorithm
- Boolean functions for sensing environment

---

## Exercise 4: Custom Movement Function

**Learning Objective:** Creating functions with parameters

**Available Functions:**

- `move()` - Move forward one cell
- `turn_left()` - Turn 90 degrees left
- `turn_right()` - Turn 90 degrees right
- Students define their own functions!

**Problem:** Create a `move_multiple(n)` function that moves n spaces, then use it to navigate.

**Example Solution:**

```python
# Define a function that takes a parameter
def move_multiple(steps):
    for i in range(steps):
        move()

def turn_around():
    turn_left()
    turn_left()

# Now use your functions
move_multiple(5)
turn_right()
move_multiple(3)
turn_around()
move_multiple(7)
turn_left()
move_multiple(2)
```

**Scenarios the solution must handle:**

1. **Variable Distances:** 5 forward, right, 3 forward, etc.
2. **Long Stretches:** 15 forward, left, 20 forward
3. **Mixed Pattern:** Combination of single moves and multiple moves

**Key Concepts:**

- Function definition with parameters
- Wrapping loops in functions for reusability
- Abstraction (hiding complexity)
- Building higher-level operations from primitives

---

## Exercise 5: Follow the Instructions

**Learning Objective:** Processing lists/arrays

**Available Functions:**

- `move()` - Move forward one cell
- `turn_left()` - Turn 90 degrees left
- `turn_right()` - Turn 90 degrees right

**Problem:** Execute a list of instructions to reach the goal.

**Example Solution:**

```python
# List of instructions to follow
instructions = [
    "move", "move", "move", "right",
    "move", "move", "left",
    "move", "move", "move", "move",
    "right", "move", "move"
]

# Process each instruction
for instruction in instructions:
    if instruction == "move":
        move()
    elif instruction == "left":
        turn_left()
    elif instruction == "right":
        turn_right()
```

**Scenarios the solution must handle:**

1. **Short Path:** ["move", "move", "right", "move", "move"]
2. **Long Path:** 20+ instructions
3. **Many Turns:** Alternating moves and turns
4. **Straight Path:** Mostly "move" instructions

**Key Concepts:**

- Lists/arrays to store data
- Iterating through collections
- Using loop variable
- Conditional execution based on data

---

## Exercise 6: Read the Floor

**Learning Objective:** Reading and responding to environmental data

**Available Functions:**

- `move()` - Move forward one cell
- `turn_left()` - Turn 90 degrees left
- `turn_right()` - Turn 90 degrees right
- `get_floor_symbol()` - Returns symbol on current cell ('→', '←', '↑', '↓', 'S', 'G', or '')
- `at_goal()` - Returns True if at goal

**Problem:** Follow directional symbols painted on the floor to reach the goal.

**Example Solution:**

```python
while not at_goal():
    symbol = get_floor_symbol()

    # Move first (we're reading where we are)
    if symbol == '→':
        # Make sure we're facing right
        # (Assume we track direction, or just move and adjust)
        move()
    elif symbol == '↓':
        turn_right()
        move()
    elif symbol == '←':
        turn_left()
        turn_left()
        move()
    elif symbol == '↑':
        turn_left()
        move()
    elif symbol == 'S':
        # Stop sign - wait or special action
        turn_left()
        turn_left()  # Turn around
        move()
    else:
        # No symbol, continue forward
        if ahead_clear():
            move()
        else:
            turn_left()
```

**Scenarios the solution must handle:**

1. **Clear Path:** Arrows form continuous path to goal
2. **Sparse Markers:** Some cells have no symbols
3. **Direction Changes:** Path with many turns indicated by arrows
4. **Stop Signs:** 'S' symbols requiring special behavior

**Key Concepts:**

- Reading environmental state
- Switch/if-else chains for multiple cases
- Responding to external data
- Symbol interpretation

---

## Additional Exercise Ideas

### Exercise 7: Counting Steps

**Concept:** Variables for counting and limits

**Available Functions:**

- `move()`, `turn_left()`, `get_step_count()`, `reset_steps()`

**Problem:** Reach goal within step limit, reset if exceeding limit.

---

### Exercise 8: Breadcrumb Trail

**Concept:** Leaving and reading markers

**Available Functions:**

- `move()`, `turn_left()`, `drop_breadcrumb()`, `see_breadcrumb_ahead()`

**Problem:** Navigate without revisiting cells (use breadcrumbs to track).

---

### Exercise 9: Conditional Pathfinding

**Concept:** Complex boolean logic

**Available Functions:**

- `move()`, `turn_left()`, `ahead_clear()`, `left_clear()`, `right_clear()`, `at_dead_end()`

**Problem:** Navigate using combined conditions (e.g., "if path ahead AND path to right").

---

### Exercise 10: The Learning Maze

**Concept:** Pattern recognition and adaptation

**Available Functions:**

- `move()`, `turn_left()`, `remember_pattern()`, `recall_pattern()`

**Problem:** Maze that requires recognizing and repeating successful patterns.

---

## Design Principles

1. **One Solution, Multiple Scenarios:** Each exercise solution must work for different maze layouts
2. **Progressive Complexity:** Each exercise introduces ONE new concept
3. **Clear Learning Goals:** Focus on programming concepts, not maze algorithms
4. **Visual Feedback:** Every action has immediate visual result
5. **15-30 Minute Completion:** Balanced challenge level

## Concept Progression Path

1. **Sequential Execution** → Basic program flow
2. **Loops** → Eliminating repetition
3. **Conditionals** → Making decisions
4. **Functions** → Creating abstractions
5. **Collections** → Working with data
6. **Algorithms** → Systematic problem-solving
7. **State** → Tracking and responding to change

Each concept builds on previous ones, creating a natural learning progression from simple command sequences to complex problem-solving.
