# Project Themes - Design Framework

## Overview

This document defines what makes a good project theme for Jiki exercises. Project themes are the visual contexts (games, puzzles, utilities) that students interact with while learning programming concepts. Each theme should support **10-20 individual exercises** that progressively teach different concepts within the same familiar world.

## Core Principles

### 1. Visual State Visibility (ESSENTIAL)

**All state must be visible and obvious.** Students should be able to see the effects of their code instantly and unambiguously.

**Good Examples:**

- Space Invaders: Paddle position and direction are visually obvious
- Maze: Character position and facing direction are clear
- Digital Clock: Time display updates visually
- Wordle: Letter states (correct/present/absent) use color coding

**Why This Matters:**

- Reinforces the connection between code and effect
- Makes debugging intuitive (students see what's wrong)
- Builds mental models of how state works

### 2. Challenge in Logic, Not Precision

**The difficulty should be in applying programming concepts, not achieving pixel-perfect visuals.**

**What Works:**

- Tic-Tac-Toe: Use logic to determine game state, draw simple shapes
- Maze: Navigate using conditionals, not precise movements

**What Doesn't Work:**

- Freeform drawing: Students spent time tweaking coordinates instead of learning concepts
- Pixel-perfect positioning requirements
- Challenges where "getting it to look right" overshadows the coding lesson

**Key Insight:** If students are frustrated by visual details rather than the programming concept, the theme needs adjustment.

### 3. Non-Interactive Execution Model

**CRITICAL CONSTRAINT:** Students write code, run it, and see results. They cannot interact during execution (no real-time input, no clicking during playback).

**Implications:**

- No multiplayer or real-time competitive mechanics
- No "click when ready" interactions during code execution
- All logic must be pre-written before execution
- Games should be deterministic or use pre-defined scenarios

**Good Patterns:**

- Maze: Pre-written navigation sequence that plays out
- Space Invaders: Pre-programmed paddle movement and shooting logic
- Wordle: Algorithm that evaluates all guesses at once

**Bad Patterns:**

- Interactive games requiring user input during execution
- Real-time reaction-based mechanics
- Click-to-advance scenarios

### 4. Theme Longevity (10-20 Exercises)

Each theme should support **multiple exercises** teaching different concepts in the same visual context.

**Example - Maze Theme Progression:**

1. **Maze 1:** Call movement functions sequentially (function calls)
2. **Maze 2:** Use loops to reduce repetition (for loops)
3. **Maze 3:** Navigate corners efficiently (nested loops)
4. **Maze 4:** Solve maze automatically using conditionals (if/else)
5. **Maze 5:** Handle multiple paths (complex conditionals)
6. **Maze 6-7:** Store maze state, track visited cells (variables, arrays)
7. **Maze 8-10:** Generate maze layouts, optimize solutions (functions, algorithms)

**Benefits:**

- Students build familiarity with the theme
- Reduced cognitive load (same context, new concept)
- Progress feels meaningful (same world, increasing mastery)

### 5. Single Concept Per Exercise

Each exercise introduces **ONE new programming concept**, though it may use previously learned concepts.

**Example - Space Invaders Progression:**

- **Exercise 1:** Move paddle left/right (variables: position)
- **Exercise 2:** Paddle bounces at edges (conditionals)
- **Exercise 3:** Add direction flag (state variables)
- **Exercise 4:** Shoot at specific positions (function calls with parameters)
- **Exercise 5:** Hit detection (boolean logic)
- **Exercise 6:** Alien respawning (arrays, iteration)

**Why This Works:**

- Clear learning objective per exercise
- Explicit concept teaching + reinforcement through practice
- Students internalize concepts through repeated exposure across themes

### 6. 15-30 Minute Completion Time

Each exercise should take **15-30 minutes** for a student working at a reasonable pace.

**Too Short (<10 min):** Concept may not be reinforced enough
**Too Long (>45 min):** Frustration increases, engagement drops

**Calibration Tips:**

- Test with target audience
- Include 2-4 scenarios per exercise (different test cases)
- Ensure challenge is in applying the concept, not debugging syntax

## Technical Constraints

### 300x300px Display Area

All themes render in a **300x300 pixel** canvas.

**Design Implications:**

- **Retro aesthetic works well**: Simple sprites, pixel art, geometric shapes
- **Limited detail**: Focus on clear, readable visuals
- **Grid-based layouts**: Work naturally (maze: 6x6, 8x8, 10x10 grids)
- **Free-form positioning**: Also viable (Space Invaders, Breakout)

**Examples of Effective Use:**

- **Maze**: 8x8 grid, each cell ~37x37px, character is 60% of cell size
- **Space Invaders**: Paddle 10% height, 11 positions across width
- **Tic-Tac-Toe**: 3x3 grid, simple X/O shapes
- **Digital Clock**: Large digits, minimal background elements

**Anti-Patterns:**

- Tiny text that's hard to read
- Too many visual elements (cluttered, confusing)
- Detail that doesn't serve the learning goal

### Animation Timing

Animations should feel **natural to the theme**, not necessarily fast or slow.

**Guidelines:**

- **Movement**: 200-300ms for character movement (feels responsive)
- **Rotations**: 150ms for 90-degree turns (smooth but not sluggish)
- **Fast actions**: 50-100ms for instantaneous effects (shooting, placing objects)
- **State changes**: 1ms for instant updates (text changes, color shifts)

**Key Principle:** Animation timing should match the "reality" of the theme. A paddle sliding across the screen should feel different from a maze character taking discrete steps.

## Theme Categories

### 1. Game-Based Themes

**Definition:** Themes modeled after classic video games with clear win/loss conditions.

**Examples from Prototype:**

- **Space Invaders**: Paddle movement, shooting, alien destruction
- **Breakout**: Paddle, ball physics, block destruction
- **Wordle**: Word guessing, letter state feedback
- **Tic-Tac-Toe**: Board state, win detection

**Strengths:**

- Highly engaging (familiar game mechanics)
- Clear objectives and success criteria
- Natural progression from simple (move paddle) to complex (game AI)
- Rich state management opportunities (score, lives, game status)

**Concept Capacity:**

- **Variables**: Score, position, lives, game state
- **Conditionals**: Win/loss detection, collision detection, edge cases
- **Loops**: Iterating over game objects (aliens, blocks)
- **Functions**: Modular game logic (check_collision, update_score)
- **Arrays**: Multiple objects (alien grid, block layout)
- **State Flags**: Direction, game_over, paused

**Challenges:**

- Can become complex quickly
- Need to ensure non-interactive execution model works
- May require more setup code (game initialization)

**Best For:** Mid-to-advanced exercises where students have foundational knowledge.

### 2. Puzzle-Based Themes

**Definition:** Themes focused on problem-solving with clear start and end states.

**Examples from Prototype:**

- **Maze**: Navigate from start to goal, avoiding obstacles

**Potential Extensions:**

- **Sokoban-style**: Push boxes to targets
- **Pathfinding challenges**: Find shortest route
- **Logic puzzles**: Sudoku solver, pattern matching

**Strengths:**

- Clear problem definition (start → goal)
- Excellent for teaching algorithms and logic
- Naturally scaffolded difficulty (simple → complex layouts)
- Low visual complexity (focus on logic)

**Concept Capacity:**

- **Loops**: Repetitive movements
- **Conditionals**: Path decisions, obstacle avoidance
- **Functions**: Reusable movement sequences
- **Recursion**: Advanced pathfinding
- **Arrays/Data Structures**: Representing the puzzle state

**Challenges:**

- Can feel repetitive if not varied enough
- Need creative puzzle designs to maintain engagement

**Best For:** Foundational concepts (loops, conditionals) and algorithm practice.

### 3. Composition/Building Themes

**Definition:** Themes where students create objects and assemble them into a complete scene or structure.

**Examples from Prototype:**

- **House**: Create Door, Window, Roof, Sky objects with properties (OOP)
- **Weather**: Compose weather icons from shapes

**Potential Extensions:**

- **City Builder**: Construct buildings with different properties
- **Robot Assembly**: Build robots from components
- **Scene Composition**: Create multi-layered scenes (background, midground, foreground)

**Strengths:**

- Excellent for teaching OOP (classes, objects, properties, methods)
- Visual feedback is immediate and satisfying (see what you've built)
- Encourages creative thinking within constraints
- Natural progression from simple objects to complex compositions

**Concept Capacity:**

- **Classes**: Define reusable object types (Door, Window)
- **Instances**: Create multiple objects from classes
- **Properties**: Object state (position, size, color, brightness)
- **Methods**: Object behaviors (change_brightness, move)
- **Composition**: Combining objects into complex structures

**Challenges:**

- Requires careful API design (what properties/methods to expose)
- Can become drawing-focused if not structured well
- Need clear success criteria (not just "build a house")

**Best For:** OOP introduction and reinforcement, creative problem-solving with structure.

### 4. Utility/Transformation Themes

**Definition:** Themes focused on data transformation, formatting, and practical utilities.

**Examples from Prototype:**

- **Digital Clock**: Convert time to 12-hour format, display formatted
- **Wordle**: String manipulation, character comparison

**Potential Extensions:**

- **Calculator**: Arithmetic operations, result display
- **Temperature Converter**: Celsius ↔ Fahrenheit with visual thermometer
- **Color Mixer**: RGB ↔ HSL conversion with color preview
- **Text Formatter**: String operations with visual output

**Strengths:**

- Practical, real-world applications
- Focus on data types and transformations
- Good for string/number manipulation practice
- Clear input → output relationship

**Concept Capacity:**

- **Data Types**: Strings, numbers, booleans
- **String Methods**: Concatenation, slicing, formatting
- **Math Operations**: Arithmetic, rounding, conversions
- **Functions**: Pure functions with clear inputs/outputs
- **Conditionals**: Format logic (AM/PM, singular/plural)

**Challenges:**

- Can feel less "game-like" (potentially less engaging)
- Need creative visualization to avoid boring text displays
- May require more abstract thinking

**Best For:** Data type fundamentals, string/number operations, pure functions.

### 5. Hybrid Themes

**Definition:** Themes that combine elements from multiple categories.

**Examples from Prototype:**

- **Tic-Tac-Toe**: Drawing (composition) + logic (game state) + utility (win detection)
  - Students draw board using shapes
  - Implement game logic
  - Display winner

**Potential Extensions:**

- **Animated Charts**: Data visualization + animation
- **Interactive Stories**: Text output + visual scenes
- **Music Sequencer**: Pattern creation + audio-visual feedback

**Strengths:**

- Flexible, can teach multiple concept types
- Engaging due to variety
- Can feel more "complete" than single-category themes

**Concept Capacity:**

- Combines capacities from component categories
- Good for synthesis exercises (applying multiple concepts together)

**Challenges:**

- Risk of complexity overload
- Need clear focus to avoid confusion
- May require more scaffolding

**Best For:** Capstone exercises, synthesis of multiple concepts.

## Evaluation Framework

Use these criteria to evaluate potential new themes:

### 1. Concept Capacity Score

**Question:** How many distinct programming concepts can this theme naturally teach?

**Scoring:**

- **Low (1-3 concepts):** Limited use, needs refresh with new theme often
- **Medium (4-7 concepts):** Good for focused concept practice
- **High (8+ concepts):** Excellent theme longevity, can support full progression

**Evaluation Method:**
List out specific concepts this theme can teach. Consider:

- Variables (position, state, counters)
- Conditionals (win/loss, edge cases)
- Loops (iteration, repetition)
- Functions (modularity, parameters)
- Data structures (arrays, objects)
- Algorithms (pathfinding, sorting)
- OOP (classes, instances, methods)

**Example - Maze Theme:**
✓ Variables (position, direction)
✓ Loops (repeated movements)
✓ Conditionals (path decisions)
✓ Functions (reusable movement sequences)
✓ Arrays (represent maze grid)
✓ Algorithms (pathfinding)
→ **High capacity** (6+ concepts)

**Example - Simple Thermometer:**
✓ Variables (temperature value)
✓ Conditionals (color based on temp)
✓ Functions (conversion formula)
→ **Low capacity** (3 concepts)

### 2. Visual Clarity Score

**Question:** How clearly does the visual representation communicate state to students?

**Scoring:**

- **Excellent:** All state is visually obvious, no ambiguity
- **Good:** Most state is clear, minor elements may need explanation
- **Fair:** Some state requires inference or text labels
- **Poor:** Visual representation is confusing or misleading

**Evaluation Checklist:**

- [ ] Can students see all relevant state variables visually?
- [ ] Are state changes animated clearly?
- [ ] Does the 300x300px constraint allow sufficient detail?
- [ ] Would a colorblind student understand the state?
- [ ] Are visual elements distinct and recognizable?

**Example - Space Invaders:**
✓ Paddle position: Clear (visual position)
✓ Paddle direction: Clear (movement animation)
✓ Alien status: Clear (present/destroyed)
✓ Score: Clear (displayed text)
→ **Excellent clarity**

**Example - Abstract Data Structures:**
✗ Array contents: Not inherently visual
✗ Pointers/references: Abstract concept
→ **Poor clarity** (would need creative visualization)

### 3. Progression Potential Score

**Question:** Can this theme support 10-20 exercises with clear difficulty progression?

**Scoring:**

- **Excellent (10+ exercises):** Natural progression from simple to complex
- **Good (7-9 exercises):** Solid progression, may need creative scenarios
- **Fair (4-6 exercises):** Limited progression, better as supplementary theme
- **Poor (1-3 exercises):** One-off exercise, not a sustainable theme

**Evaluation Method:**
Outline a potential exercise sequence:

1. Simplest possible exercise (concept 1)
2. Add one complication (concept 2)
3. Combine concepts 1 + 2
4. Introduce concept 3
5. Complex combination
   ... continue to 10+

**Example - Breakout:**

1. Move paddle left/right
2. Ball bounces off walls
3. Paddle hits ball (collision detection)
4. Blocks arranged in grid
5. Block destruction on hit
6. Multi-ball power-up
7. Different block types (HP)
8. Score tracking
9. Lives system
10. Level progression
    → **Excellent progression** (10+ natural exercises)

**Example - Simple Color Picker:**

1. Display color from RGB values
2. Convert RGB to hex
3. ... limited natural extensions
   → **Fair progression** (useful but limited)

### 4. Engagement Factor Score

**Question:** Will students find this theme motivating and enjoyable?

**Scoring:**

- **High:** Intrinsically motivating, clear goals, satisfying feedback
- **Medium:** Interesting but may not excite all students
- **Low:** Feels like "work," lacks immediate appeal

**Evaluation Factors:**

- **Familiarity:** Is it based on something students know? (games, apps)
- **Clear Goals:** Do students understand what success looks like?
- **Immediate Feedback:** Do actions have obvious consequences?
- **Sense of Progress:** Does it feel rewarding to complete?
- **Creative Freedom:** Can students experiment and explore?

**Example - Game Themes (Space Invaders, Maze):**
✓ Familiar game mechanics
✓ Clear win conditions
✓ Immediate visual feedback
✓ Satisfying progression
→ **High engagement**

**Example - Tax Calculator:**
✗ Unfamiliar/boring context for many students
✓ Clear input/output
✗ Limited creative exploration
→ **Low engagement** (functional but not exciting)

### 5. Implementation Complexity Score

**Question:** How difficult is it to build and maintain this theme?

**Scoring:**

- **Low Complexity:** Simple rendering, minimal state, straightforward logic
- **Medium Complexity:** Moderate animation, some game logic, manageable state
- **High Complexity:** Complex physics, many interactions, large state management

**Evaluation Checklist:**

- Animation complexity (simple translations vs. physics)
- Number of interacting elements (one character vs. grid of objects)
- State management needs (few variables vs. complex nested state)
- Edge cases and error handling (simple bounds checking vs. complex collision)

**Example - Maze:**
✓ Simple grid rendering
✓ Basic movement animations
✓ Straightforward state (position, direction)
✓ Minimal edge cases
→ **Low complexity** (good candidate)

**Example - Physics Simulation:**
✗ Complex calculations
✗ Continuous collision detection
✗ Many interacting forces
→ **High complexity** (probably avoid)

**Note:** Prefer low-to-medium complexity themes. High complexity themes may not be worth the maintenance burden.

## Concept Mapping

This section maps programming concepts to themes that can effectively teach them. Use this when selecting themes for specific learning objectives.

### Variables

**What to Teach:**

- Variable declaration and assignment
- Reading and updating values
- Variable naming and scope
- Different data types (numbers, strings, booleans)

**Effective Themes:**

- **Space Invaders**: Paddle position, laser position, score
- **Maze**: Character position (row, col), step count
- **Digital Clock**: Hours, minutes, formatted time
- **Breakout**: Paddle position, ball coordinates, lives

**Exercise Examples:**

- Track player position as they move
- Update score when aliens are hit
- Store current time and format for display

**Why These Work:** Visual state changes make variable updates obvious and immediate.

### Loops (For/While)

**What to Teach:**

- Repetition and iteration
- Loop counters and ranges
- When to use loops vs. manual repetition
- Breaking out of loops

**Effective Themes:**

- **Maze**: Repeat movement sequences (move forward 5 times)
- **Space Invaders**: Iterate through alien grid
- **Breakout**: Create block layouts (nested loops for rows/cols)
- **House**: Create multiple windows in a row

**Exercise Examples:**

- Move forward 10 times using a loop
- Draw 5 aliens in a row
- Create 3 rows of blocks with 8 blocks each
- Place windows at regular intervals

**Why These Work:** Repetitive visual patterns make loop concepts concrete.

### Conditionals (If/Else)

**What to Teach:**

- Boolean logic and comparisons
- If/else decision making
- Complex conditions (and/or)
- Edge case handling

**Effective Themes:**

- **Maze**: Navigate around obstacles (if path is clear, move forward)
- **Space Invaders**: Bounce paddle at edges, detect hits
- **Digital Clock**: Format AM/PM based on hour
- **Tic-Tac-Toe**: Determine winner

**Exercise Examples:**

- If next cell is open, move forward; else turn
- If paddle is at edge, reverse direction
- If hour >= 12, display "PM"; else display "AM"
- If three in a row, display "Winner"

**Why These Work:** Decision points have clear visual consequences.

### Functions

**What to Teach:**

- Function definition and calling
- Parameters and arguments
- Return values
- Code reusability and modularity

**Effective Themes:**

- **Maze**: Define reusable movement patterns (turn_around, move_forward_twice)
- **Digital Clock**: Formatting functions (format_hour, add_leading_zero)
- **Breakout**: Utility functions (create_block, calculate_bounce_angle)
- **Wordle**: Letter checking functions (is_correct_position, is_in_word)

**Exercise Examples:**

- Define move_forward_and_turn() and call it multiple times
- Create format_time(hours, minutes) that returns formatted string
- Write calculate_position(row, col) to convert grid to pixels

**Why These Work:** Visual repetition highlights the value of reusable code.

### State Variables and Flags

**What to Teach:**

- Using variables to track state (not just data)
- Boolean flags for on/off states
- Direction/mode flags
- State transitions

**Effective Themes:**

- **Space Invaders**: Direction flag (moving_right), game_over flag
- **Maze**: Direction facing (up/down/left/right)
- **Breakout**: Ball direction (dx, dy), game_active flag
- **House**: Light on/off, day/night mode

**Exercise Examples:**

- Paddle bounces: use direction flag to alternate movement
- Maze: track which direction character is facing
- House: turn lights on at sunset (sunset flag)

**Why These Work:** These themes have natural state that changes based on conditions.

### Arrays and Collections

**What to Teach:**

- Creating and accessing arrays
- Iterating through collections
- Adding/removing elements
- Multi-dimensional arrays (grids)

**Effective Themes:**

- **Space Invaders**: Alien grid (2D array)
- **Breakout**: Block layout (2D array)
- **Maze**: Grid representation (2D array), visited cells (array)
- **Wordle**: Guesses array, letter states array

**Exercise Examples:**

- Iterate through alien grid to draw all aliens
- Store list of guesses in array
- Represent maze as 2D array (0 = path, 1 = wall)
- Track visited cells to avoid revisiting

**Why These Work:** Visual grids and collections map naturally to array data structures.

### Object-Oriented Programming

**What to Teach:**

- Classes and instances
- Properties and methods
- Constructors
- Encapsulation

**Effective Themes:**

- **House**: Door, Window, Roof classes with properties (position, size, color)
- **Breakout**: Ball, Paddle, Block classes with methods (move, check_collision)
- **Space Invaders**: Alien class with state (alive/dead) and methods (respawn)
- **Wordle**: WordleGame class managing game state

**Exercise Examples:**

- Create Door class with constructor(x, y, width, height)
- Add change_brightness() method to house components
- Define Alien class with respawn() method
- Create multiple instances: door1 = Door(10, 20, 30, 50)

**Why These Work:** Visual objects map intuitively to code objects with properties and behaviors.

### String Manipulation

**What to Teach:**

- String concatenation
- String methods (substring, split, replace)
- String formatting
- Character access

**Effective Themes:**

- **Digital Clock**: Format time strings (add leading zeros, AM/PM)
- **Wordle**: Compare strings, extract characters
- **Tic-Tac-Toe**: Display messages ("Player X wins!")
- **Weather**: Format temperature strings

**Exercise Examples:**

- Convert 13:45 to "1:45 PM"
- Check if letter is in word at specific position
- Display winner message based on game state

**Why These Work:** Text output provides immediate visual feedback for string operations.

### Algorithms

**What to Teach:**

- Problem-solving strategies
- Step-by-step logic
- Optimization
- Algorithm design

**Effective Themes:**

- **Maze**: Pathfinding algorithms (BFS, DFS for advanced)
- **Tic-Tac-Toe**: Win detection algorithm, minimax (advanced)
- **Wordle**: Guess evaluation algorithm
- **Breakout**: Collision detection algorithm

**Exercise Examples:**

- Implement algorithm to solve any maze
- Detect three-in-a-row for tic-tac-toe
- Calculate which letters are correct/present/absent

**Why These Work:** Clear problem definition with verifiable correct solutions.

## Anti-Patterns (What to Avoid)

### 1. Freeform Drawing

**Problem:** Challenge becomes visual precision, not programming logic.

**Example - What Didn't Work:**

- Basic drawing exercises: "Draw a house using rectangles and triangles"
- Students spent time adjusting coordinates to make it "look right"
- Learning was about positioning, not programming concepts

**Why It Failed:**

- No clear success criteria (when is the house "correct"?)
- Frustration from pixel-tweaking
- Doesn't reinforce programming concepts effectively

**Better Alternative:**

- **Structured composition** (like House theme with OOP)
- Use predefined classes that handle positioning
- Focus on object creation and composition, not coordinates

**Acceptable Use Cases:**

- Drawing as a _means_ to another end (draw tic-tac-toe board for game logic)
- Programmatic drawing (loops to create patterns, algorithms to generate shapes)
- Drawing with constraints (draw shapes that follow specific rules)

### 2. Pixel-Perfect Requirements

**Problem:** Success depends on exact coordinate matching, creating frustration.

**Example:**

- "Move the character to exactly (142, 87)"
- Students struggle with off-by-one errors in positioning
- Visual feedback doesn't help (looks right but is "wrong")

**Why It Fails:**

- Arbitrary precision requirements
- Doesn't teach concepts, just accuracy
- Frustrating for beginners

**Better Alternative:**

- **Grid-based positioning** (move to cell [2, 3], not pixel 142, 87)
- **Tolerance ranges** (within 5 pixels is "correct")
- **Relative positioning** (move 3 steps right, not to absolute position)

### 3. Real-Time Interaction

**Problem:** Violates non-interactive execution constraint.

**Example:**

- "Click when the ball reaches the paddle"
- "Press spacebar to jump"
- Real-time reaction games

**Why It Fails:**

- Students can't interact during code execution
- Requires event handlers beyond beginner scope
- Doesn't work with write-code-then-run model

**Better Alternative:**

- **Pre-programmed sequences** (write code that determines when to act)
- **Conditional logic** (if ball_position == 5, then hit)
- **Deterministic scenarios** (same input always produces same output)

### 4. Complex Physics Simulations

**Problem:** Too much hidden complexity, difficult to understand and debug.

**Example:**

- Realistic gravity and acceleration
- Continuous collision detection
- Angular momentum and rotation physics

**Why It Fails:**

- Students can't easily predict outcomes
- Debugging is difficult (why did the ball bounce that way?)
- Implementation complexity is high

**Better Alternative:**

- **Discrete movement** (grid-based, step-by-step)
- **Simple collision** (paddle hit = reverse direction)
- **Predictable rules** (ball always bounces at 90 degrees)

**Acceptable Use Cases:**

- Very simple physics for advanced students
- Physics as background (students don't implement it)

### 5. Too Many Simultaneous Elements

**Problem:** Visual clutter and cognitive overload in 300x300px space.

**Example:**

- 50 aliens moving independently
- Complex multi-layered scenes
- Too much information displayed at once

**Why It Fails:**

- Hard to see individual state changes
- Cluttered visuals are confusing
- Difficult to debug (what went wrong?)

**Better Alternative:**

- **Limit visible elements** (5-11 aliens, not 50)
- **Focus on clarity** (each element should be distinct)
- **Progressive complexity** (start with few elements, add more later)

### 6. Abstract or Invisible State

**Problem:** Violates the core principle of visual state visibility.

**Example:**

- Teaching data structures with no visual representation
- Internal counters or flags that aren't displayed
- State that students have to "imagine"

**Why It Fails:**

- Students can't verify their code is working
- Breaks the visual learning model
- Makes debugging impossible

**Better Alternative:**

- **Always visualize state** (if it exists, show it)
- **Use creative visualization** (data structures as visual grids/trees)
- **Display all relevant information** (counters, flags, status)

### 7. Overly Familiar (No Room for Creativity)

**Problem:** Theme is so constrained there's only one solution.

**Example:**

- Exact replication of a specific pattern
- No room for alternative approaches
- Single "correct" implementation

**Why It Fails:**

- Feels like busy work
- Discourages exploration
- Students can't apply their own thinking

**Better Alternative:**

- **Multiple valid solutions** (many ways to solve the maze)
- **Creative constraints** (build a house, but choose your own colors/sizes)
- **Optimization challenges** (solve it, then solve it better)

### 8. Culturally Specific or Exclusive

**Problem:** Theme relies on cultural knowledge not all students share.

**Example:**

- US-specific games or references
- Themes requiring specific cultural context
- Language-dependent content (beyond code keywords)

**Why It Fails:**

- Excludes international students
- Creates unnecessary barriers to learning
- Programming concepts are universal; themes should be too

**Better Alternative:**

- **Universal themes** (simple games, puzzles, utilities)
- **Geometric/abstract themes** (no cultural context needed)
- **Widely recognized concepts** (clock, weather, basic games)

## Design Guidelines

### Starting a New Theme

Follow these steps when creating a new project theme:

#### Step 1: Identify the Learning Goal

**Question:** What specific concept(s) will this theme teach?

**Action:**

- List the primary concept (e.g., "loops")
- List supporting concepts it can reinforce (e.g., "variables," "conditionals")
- Verify the theme can naturally teach these without forcing it

**Example - Maze Theme:**

- **Primary:** Loops (repeated movement)
- **Supporting:** Variables (position), conditionals (obstacles), functions (movement patterns)
- **Natural fit:** Yes, navigation inherently involves repetition and decisions

#### Step 2: Sketch the Visual Representation

**Question:** What will students see? How will state be displayed?

**Action:**

- Draw a rough 300x300px mockup (can be paper sketch)
- Label all visual elements
- Identify what state each element represents
- Verify all state is visible

**Example - Space Invaders:**

```
┌─────────────────────────────────┐
│  👾 👾 👾 👾 👾 👾 👾 👾 👾 👾 👾  │ ← Aliens (status: alive/dead)
│  👾 👾 👾 👾 👾 👾 👾 👾 👾 👾 👾  │
│                                   │
│              ↑                    │ ← Shot (position)
│                                   │
│          ▬▬▬▬▬                   │ ← Paddle (position)
│                                   │
│  Score: 0                         │ ← Score (number)
└─────────────────────────────────┘
```

**Checklist:**

- [ ] All state variables have visual representation
- [ ] Elements are large enough to see clearly
- [ ] Layout fits comfortably in 300x300px
- [ ] Colors/shapes are distinct (colorblind-friendly)

#### Step 3: Design Exercise Progression

**Question:** What's the learning journey from simplest to most complex?

**Action:**

- List 10-15 potential exercises in difficulty order
- Ensure each introduces ONE new concept
- Verify natural progression (each builds on previous)
- Identify which exercises are essential vs. optional

**Template:**

```
Exercise 1 (Simplest - Foundation):
  - Concept: [Basic concept]
  - Task: [What students do]
  - Success: [Clear win condition]

Exercise 2 (Add one complication):
  - Concept: [Build on Exercise 1]
  - Task: [Slightly harder]
  - Success: [Clear win condition]

Exercise 3-4 (Combination):
  - Concept: [Combine concepts 1+2]
  ...

Exercise 10+ (Advanced):
  - Concept: [Complex application]
  - Task: [Challenging but achievable]
  - Success: [Clear win condition]
```

**Example - Breakout:**

```
1. Move paddle left/right (variables)
2. Ball bounces off walls (conditionals)
3. Paddle collision (collision detection)
4. Single block destruction (arrays, iteration)
5. Full block grid (nested loops)
6. Multiple balls (array of objects)
7. Different block types (properties, conditionals)
8. Score tracking (accumulators)
9. Lives system (state management)
10. Level progression (complex state)
```

#### Step 4: Define Available Functions/Classes

**Question:** What functions or classes will students use to interact with this theme?

**Action:**

- List all functions students can call (snake_case, will convert to camelCase in JS)
- Define parameters for each function
- Write clear descriptions
- Ensure functions align with learning goals

**Guidelines:**

- **Keep it simple:** 3-7 functions for early exercises
- **Expand gradually:** Add more functions in advanced exercises
- **Match theme:** Function names should feel natural (move, shoot, not action1, action2)
- **Clear effects:** Each function should have obvious visual feedback

**Example - Maze:**

```typescript
availableFunctions = [
  {
    name: "move", // Python: move(), JS: move()
    parameters: [],
    description: "Move forward one cell in current direction"
  },
  {
    name: "turn_left", // Python: turn_left(), JS: turnLeft()
    parameters: [],
    description: "Rotate 90 degrees counter-clockwise"
  },
  {
    name: "turn_right", // Python: turn_right(), JS: turnRight()
    parameters: [],
    description: "Rotate 90 degrees clockwise"
  }
];
```

**Advanced Example - House (OOP):**

```typescript
availableClasses = [
  {
    name: "Door",
    constructor: ["left", "top", "width", "height", "z_index"],
    methods: [{ name: "change_brightness", params: ["brightness"] }]
  },
  {
    name: "Window",
    constructor: ["left", "top", "width", "height", "z_index"],
    methods: [
      { name: "turn_lights_on", params: [] },
      { name: "turn_lights_off", params: [] }
    ]
  }
];
```

#### Step 5: Create Test Scenarios

**Question:** How will we verify student code works correctly?

**Action:**

- Define 2-4 scenarios per exercise (different initial states)
- Write success conditions for each scenario
- Ensure scenarios test edge cases
- Make scenarios progressively harder

**Purpose of Scenarios:**

- Same student code should solve all scenarios
- Different starting conditions test robustness
- Edge cases verify complete understanding

**Example - Maze Exercise:**

```typescript
scenarios = {
  simple: {
    name: "Straight Path",
    description: "Navigate directly to the goal",
    grid: [
      [2, 0, 0, 0, 0], // 2 = start
      [1, 1, 1, 1, 0], // 1 = wall
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 0, 0, 3] // 3 = goal
    ],
    startPosition: [0, 0],
    successCondition: (state) => state.position === "4,4"
  },

  withTurns: {
    name: "Path with Turns",
    description: "Navigate a winding path",
    grid: [
      [2, 0, 1, 0, 0],
      [0, 0, 1, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 1, 1, 0, 0],
      [1, 1, 1, 1, 3]
    ],
    startPosition: [0, 0],
    successCondition: (state) => state.position === "4,4"
  }

  // 2-4 total scenarios per exercise
};
```

#### Step 6: Prototype and Test

**Question:** Does this theme actually work? Is it engaging and teachable?

**Action:**

- Build a minimal prototype (1-2 exercises)
- Test with target audience (if possible)
- Verify visual clarity at 300x300px
- Check that exercises take 15-30 minutes
- Iterate based on feedback

**Testing Checklist:**

- [ ] Visual state is clear and unambiguous
- [ ] Exercises are neither too easy nor too hard
- [ ] Animations feel natural and appropriately paced
- [ ] Success conditions are obvious
- [ ] Students understand what to do without excessive explanation
- [ ] Debugging is straightforward (students can see what went wrong)
- [ ] Exercises are engaging and motivating

**Red Flags:**

- Students ask "how do I know if it worked?" → visual state isn't clear
- Students spend time tweaking coordinates → too precision-focused
- Students finish in <5 minutes → too easy, concept not reinforced
- Students give up after 45 minutes → too hard, needs scaffolding
- Students seem bored → not engaging, needs more immediate feedback

#### Step 7: Document and Refine

**Question:** Is the theme ready for broader use?

**Action:**

- Document exercise progression in `.todo/exercises.md`
- Write clear descriptions for each exercise
- Create reference solutions (multiple approaches if possible)
- Note any gotchas or common mistakes
- Add to theme registry

**Documentation Template:**

```markdown
## [Theme Name]

### Overview

[Brief description of the theme and its visual representation]

### Learning Goals

- Primary concepts: [list]
- Supporting concepts: [list]

### Exercise Progression

1. **[Exercise Name]** (Concept: Variables)
   - Task: [What students do]
   - New Concept: [What's introduced]
   - Functions Available: [list]
   - Success Criteria: [How to win]

2. **[Exercise Name]** (Concept: Loops)
   - Task: [What students do]
   - New Concept: [What's introduced]
   - Functions Available: [list]
   - Success Criteria: [How to win]

[... continue for all exercises]

### Visual Layout

[ASCII art or description of the 300x300px layout]

### Technical Notes

- Animation timings: [list key durations]
- State representation: [how state maps to visuals]
- Edge cases: [anything to watch for]
- Common student mistakes: [what to help students avoid]
```

### Adapting Existing Game/Puzzle Concepts

Many classic games and puzzles can be adapted for Jiki. Here's how to evaluate and modify them:

#### Evaluation Questions

1. **Does it have clear, visual state?**
   - Can all game state be shown in 300x300px?
   - Are state changes obvious?

2. **Can it work non-interactively?**
   - Can students pre-write all logic?
   - Does it work without real-time input?

3. **Does it teach programming concepts?**
   - What concepts does it naturally support?
   - Can it support 10+ exercises?

4. **Is it culturally universal?**
   - Will students worldwide recognize it?
   - Does it require specific cultural knowledge?

#### Adaptation Strategies

**Strategy 1: Simplify Mechanics**

Original games are often too complex. Strip down to core mechanics.

**Example - Adapting Pac-Man:**

- **Original:** Real-time movement, ghost AI, power-ups, score, lives, multiple levels
- **Simplified for Jiki:**
  - Grid-based movement (like maze)
  - Pre-programmed path (not real-time)
  - Collectibles at specific positions (no ghosts initially)
  - Focus: pathfinding and collection logic
  - Later exercises can add "ghost" patterns (if position == ghost_position, game over)

**Strategy 2: Make Deterministic**

Remove randomness or make it controllable.

**Example - Adapting Tetris:**

- **Original:** Random piece generation, real-time falling
- **Adapted for Jiki:**
  - Pre-defined piece sequence (students know what's coming)
  - Turn-based (place piece, then it settles)
  - Focus: spatial reasoning, array manipulation
  - Success: clear N rows

**Strategy 3: Focus on Subset**

Teach one aspect of a complex game.

**Example - Adapting Chess:**

- **Original:** Full chess rules, strategy, multiple pieces
- **Adapted for Jiki:**
  - **Exercise 1:** Knight movement only (L-shaped paths)
  - **Exercise 2:** Rook movement (straight lines)
  - **Exercise 3:** Bishop movement (diagonals)
  - Focus: algorithm for valid moves, not full chess game

**Strategy 4: Reverse the Challenge**

Instead of playing the game, have students build/solve it.

**Example - Adapting Sudoku:**

- **Original:** Solve sudoku puzzle
- **Adapted for Jiki:**
  - **Exercise:** Write validator (is this sudoku solution correct?)
  - Focus: nested loops, array access, conditionals
  - Visual: highlight invalid cells in red
  - Later: solve simple sudoku programmatically

#### Quick Adaptation Checklist

- [ ] Can be made non-interactive (pre-programmed)
- [ ] Core mechanic is simple enough for beginners
- [ ] Visual state fits in 300x300px clearly
- [ ] Supports 10+ progressive exercises
- [ ] Doesn't require pixel-perfect precision
- [ ] Teaches specific programming concepts
- [ ] Success/failure is obvious
- [ ] Culturally universal

## Example Theme Breakdown: Maze

Let's walk through the complete design of the Maze theme as a reference.

### Concept

Teach programming fundamentals through navigation challenges.

### Visual Design (300x300px)

```
┌─────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓  S  ·  ·  ·  ·  ▓  ·  ·  ▓ │  S = Start (green)
│ ▓▓▓  ▓▓▓▓▓▓▓  ▓  ▓  ▓▓▓  ▓ │  ▓ = Wall (dark)
│ ▓  ·  ·  ·  ·  ·  ·  ·  ·  ▓ │  · = Path (light)
│ ▓  ▓▓▓  ▓  ▓▓▓▓▓▓▓▓▓  ▓  ▓ │  G = Goal (gold)
│ ▓  ·  ·  ▓  ·  👤 ·  ·  ·  ▓ │  👤 = Character
│ ▓  ▓▓▓▓▓▓▓  ▓  ▓▓▓▓▓▓▓  ▓ │     (rotates based on direction)
│ ▓  ·  ·  ·  ▓  ·  ·  ·  G  ▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
└─────────────────────────────────┘
```

- **Grid:** 8x8 or 10x10 cells
- **Cell Size:** ~30-37px per cell
- **Character:** 60% of cell size, rotates to show direction
- **Colors:** High contrast (dark walls, light paths, green start, gold goal)

### Available Functions

```typescript
availableFunctions = [
  {
    name: "move",
    description: "Move forward one cell in current direction",
    visualEffect: "Character slides to next cell (200ms animation)"
  },
  {
    name: "turn_left",
    description: "Rotate 90 degrees counter-clockwise",
    visualEffect: "Character rotates (150ms animation)"
  },
  {
    name: "turn_right",
    description: "Rotate 90 degrees clockwise",
    visualEffect: "Character rotates (150ms animation)"
  }
];
```

**Later exercises may add:**

```typescript
{
  name: "is_path_clear",
  description: "Check if next cell is a path (not wall)",
  returnValue: "Boolean"
},
{
  name: "is_at_goal",
  description: "Check if character is at the goal",
  returnValue: "Boolean"
}
```

### Exercise Progression (15 exercises planned)

**1. Maze - Basic Movement**

- **Concept:** Function calls, sequential execution
- **Task:** Navigate a straight path (5 moves forward)
- **Functions:** `move()`, `turn_left()`, `turn_right()`
- **Grid:** Straight corridor
- **Success:** Reach goal

**2. Maze - First Turn**

- **Concept:** Combining function calls
- **Task:** Navigate L-shaped path
- **Functions:** Same as #1
- **Grid:** One 90-degree turn
- **Success:** Reach goal

**3. Maze - Multiple Turns**

- **Concept:** Longer sequences
- **Task:** Navigate S-shaped path
- **Functions:** Same
- **Grid:** Multiple turns
- **Success:** Reach goal

**4. Maze - Introducing Loops**

- **Concept:** For loops (repetition)
- **Task:** Long straight corridor (10+ cells)
- **Functions:** Same
- **Grid:** Very long straight path
- **Success:** Reach goal
- **Key:** Students realize loops are better than typing `move()` 10 times

**5. Maze - Loops with Turns**

- **Concept:** Combining loops and individual calls
- **Task:** Pattern: move 5, turn, move 5, turn
- **Functions:** Same
- **Grid:** Rectangular path
- **Success:** Reach goal

**6. Maze - Nested Patterns**

- **Concept:** Nested loops (optional)
- **Task:** Create a square spiral
- **Functions:** Same
- **Grid:** Square spiral layout
- **Success:** Reach goal

**7. Maze - Conditional Movement**

- **Concept:** Conditionals (if/else)
- **Task:** Navigate unknown maze (if path clear, move; else turn)
- **Functions:** Add `is_path_clear()`
- **Grid:** Simple maze with choices
- **Success:** Reach goal

**8. Maze - Auto-Solver**

- **Concept:** While loops, conditionals
- **Task:** Solve any maze with right-hand rule
- **Functions:** Add `is_at_goal()`
- **Grid:** Various mazes (test multiple scenarios)
- **Success:** Algorithm that solves all scenarios

**9. Maze - Path Tracker**

- **Concept:** Arrays, state tracking
- **Task:** Store visited cells
- **Functions:** Same
- **Grid:** Maze with multiple paths
- **Success:** Reach goal without revisiting cells

**10. Maze - Shortest Path**

- **Concept:** Algorithms, optimization
- **Task:** Find shortest path to goal
- **Functions:** Same + `get_position()`
- **Grid:** Maze with multiple routes
- **Success:** Solve in minimum moves

**11-15:** Advanced topics (pathfinding algorithms, maze generation, etc.)

### State Variables

```typescript
state = {
  characterRow: number,        // 0 to gridSize-1
  characterCol: number,        // 0 to gridSize-1
  direction: "up"|"right"|"down"|"left",
  rotation: number,            // 0, 90, 180, -90 degrees
  grid: number[][],            // 0=path, 1=wall, 2=start, 3=goal
  gameResult: "playing"|"win"  // Success state
}
```

**Visual Mapping:**

- `characterRow, characterCol` → Character position on grid
- `direction` → Character sprite rotation
- `rotation` → CSS transform for smooth rotation
- `grid` → Rendered grid cells (colored based on value)
- `gameResult` → Success overlay when "win"

### Scenarios (Example for Exercise #7)

```typescript
scenarios = {
  straightWithChoice: {
    name: "Straight with One Choice",
    grid: [
      [2, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 3]
    ],
    startPosition: [0, 0],
    startDirection: "down"
  },

  multipleChoices: {
    name: "Multiple Decision Points",
    grid: [
      [2, 0, 1, 0, 0],
      [0, 0, 1, 0, 1],
      [0, 1, 0, 0, 1],
      [0, 0, 0, 1, 0],
      [1, 1, 0, 0, 3]
    ],
    startPosition: [0, 0],
    startDirection: "down"
  }
};
```

### Why This Theme Works

✅ **Visual Clarity:** Position and direction are immediately obvious
✅ **Concept Capacity:** Teaches 8+ concepts (sequences, loops, conditionals, functions, arrays, algorithms)
✅ **Progression:** Natural difficulty curve from simple to complex
✅ **Engagement:** Clear goal (reach the exit), satisfying when solved
✅ **Non-Interactive:** Pre-written navigation code executes automatically
✅ **Fits 300x300px:** Grid scales well, characters are clear
✅ **Universal:** Mazes are culturally universal
✅ **Low Complexity:** Simple rendering, straightforward state

### Potential Extensions

- **Collectibles:** Pick up items along the path (arrays)
- **Multiple characters:** Coordinate two characters (functions, modularity)
- **Time limits:** Optimize for fewest moves (optimization)
- **Maze generation:** Create your own mazes (algorithms, 2D arrays)
- **Enemies:** Avoid moving obstacles (state tracking, conditionals)

## Brainstormed Theme Ideas

Here are additional theme ideas that fit the Jiki framework:

### 1. Snake Game

**Category:** Game-Based
**Concept Capacity:** High (7+ concepts)

**Core Mechanic:** Control a snake that grows when eating food.

**Visual (300x300px):**

- Grid: 15x15 cells (~20px each)
- Snake: Connected segments
- Food: Single cell (different color)
- Walls: Grid boundaries

**Concepts:**

- Arrays (snake body segments)
- State variables (direction, length, score)
- Conditionals (collision detection, food eating)
- Loops (update each segment position)
- Game logic (win/loss conditions)

**Progression:**

1. Move snake in straight line
2. Turn snake left/right
3. Grow when eating food
4. Collision detection (walls)
5. Self-collision detection
6. Pathfinding to food
7. Optimal path algorithm

**Strengths:** Familiar, clear visual state, great for arrays
**Challenges:** Moderate complexity in segment management

### 2. Traffic Light Simulator

**Category:** Utility/Transformation
**Concept Capacity:** Medium (4-6 concepts)

**Core Mechanic:** Control traffic light patterns and timing.

**Visual (300x300px):**

- Traffic light (red/yellow/green circles)
- Timer display
- Car flow counter
- Intersection visualization

**Concepts:**

- State machines (light states)
- Timing and delays
- Conditionals (when to change light)
- Variables (timer, car count)
- Functions (change_light, reset_timer)

**Progression:**

1. Cycle through light colors
2. Add timing delays
3. Handle two-way intersection
4. Optimize for traffic flow
5. Emergency vehicle priority
6. Four-way intersection logic

**Strengths:** Clear state, practical application, good for state machines
**Challenges:** May feel less game-like

### 3. Pixel Art Creator

**Category:** Composition/Building
**Concept Capacity:** High (7+ concepts)

**Core Mechanic:** Create patterns and images using programmatic drawing.

**Visual (300x300px):**

- Grid: 20x20 or 30x30 pixels
- Color palette
- Current pixel color indicator

**Concepts:**

- Nested loops (iterate rows and columns)
- Arrays (store pixel colors)
- Functions (draw_row, draw_checkerboard)
- Conditionals (color based on position)
- Patterns and algorithms

**Progression:**

1. Fill single color
2. Checkerboard pattern
3. Gradient patterns
4. Symmetric designs
5. Algorithmic art (fractals, spirals)
6. Image compression (run-length encoding)

**Strengths:** Creative, visual, great for nested loops and patterns
**Challenges:** Risk of becoming freeform drawing (mitigate with clear pattern goals)

### 4. Vending Machine

**Category:** Utility/Transformation
**Concept Capacity:** Medium (5-7 concepts)

**Core Mechanic:** Manage inventory, calculate change, dispense items.

**Visual (300x300px):**

- Item slots with quantities
- Coin/bill display
- Selected item highlight
- Change calculation display

**Concepts:**

- Variables (inventory counts, money)
- Conditionals (sufficient funds? in stock?)
- Functions (calculate_change, dispense_item)
- Arrays (item list, prices)
- Error handling (insufficient funds, out of stock)

**Progression:**

1. Display items and prices
2. Accept payment and dispense
3. Calculate change
4. Handle insufficient funds
5. Track inventory
6. Restock logic
7. Sales reporting

**Strengths:** Practical, clear state, good for conditionals and error handling
**Challenges:** Less visually dynamic

### 5. Tower of Hanoi

**Category:** Puzzle-Based
**Concept Capacity:** Medium-High (6+ concepts)

**Core Mechanic:** Move disks between three pegs following rules.

**Visual (300x300px):**

- Three vertical pegs
- Disks of different sizes (stacked)
- Move counter

**Concepts:**

- Recursion (advanced)
- Functions (move_disk)
- Arrays/stacks (disk positions)
- Conditionals (valid move?)
- Algorithms (optimal solution)

**Progression:**

1. Move single disk
2. Move 2 disks manually
3. Move 3 disks manually
4. Write move_disk function
5. Implement recursive solution
6. Optimize for minimum moves
7. Visualize algorithm steps

**Strengths:** Classic algorithm problem, great for recursion
**Challenges:** Recursion is advanced; needs careful scaffolding

### 6. Simon Says (Pattern Memory)

**Category:** Game-Based
**Concept Capacity:** Medium (5-6 concepts)

**Core Mechanic:** Display pattern, student code recreates it.

**Visual (300x300px):**

- Four colored buttons (grid)
- Pattern display
- Score counter

**Concepts:**

- Arrays (pattern sequence)
- Loops (iterate through pattern)
- Functions (flash_button)
- Timing (delays between flashes)
- Comparison (check if sequence matches)

**Progression:**

1. Display single button
2. Display sequence of 2
3. Display sequence of N
4. Verify user sequence matches
5. Add timing constraints
6. Generate random patterns
7. Increasing difficulty (speed, length)

**Strengths:** Simple visual, good for arrays and iteration
**Challenges:** Pattern matching may be abstract

### 7. Elevator Simulator

**Category:** Utility/Transformation
**Concept Capacity:** High (7+ concepts)

**Core Mechanic:** Manage elevator movement between floors.

**Visual (300x300px):**

- Building (vertical floors)
- Elevator car (position)
- Floor buttons (lit when requested)
- Direction indicator (up/down)

**Concepts:**

- State variables (current floor, direction, door state)
- Queues (requested floors)
- Conditionals (door logic, direction changes)
- Functions (move_to_floor, open_doors)
- Optimization (minimize trips)

**Progression:**

1. Move to specific floor
2. Handle multiple requests
3. Optimize direction (go up first, then down)
4. Door open/close timing
5. Express elevator (skip floors)
6. Multiple elevators (advanced)

**Strengths:** Rich state management, practical scenario
**Challenges:** State complexity can escalate

### 8. Plotter/Turtle Graphics

**Category:** Composition/Building
**Concept Capacity:** High (8+ concepts)

**Core Mechanic:** Control a "turtle" that draws as it moves.

**Visual (300x300px):**

- Turtle (position, rotation)
- Drawing canvas (path traced)
- Pen up/down indicator

**Concepts:**

- Variables (position, angle)
- Functions (forward, turn, pen_up, pen_down)
- Loops (repeated patterns)
- Geometry (angles, distances)
- Recursion (fractal patterns)

**Progression:**

1. Draw straight line
2. Draw square (loop + turns)
3. Draw triangle, pentagon, etc. (parameterized)
4. Draw circle (many small segments)
5. Draw spiral
6. Draw fractal tree (recursion)
7. Create custom shapes with functions

**Strengths:** Creative, visually satisfying, excellent for functions and loops
**Challenges:** Risk of becoming freeform (mitigate with specific goals: "draw perfect hexagon")

### 9. Card Deck Manager

**Category:** Utility/Transformation
**Concept Capacity:** Medium-High (6-7 concepts)

**Core Mechanic:** Manage, shuffle, and display a deck of cards.

**Visual (300x300px):**

- Card representations (suit, value)
- Deck pile
- Dealt cards area
- Discard pile

**Concepts:**

- Arrays (deck of cards)
- Shuffling algorithms
- Functions (draw_card, shuffle_deck)
- Loops (deal N cards)
- Objects (card with suit and value)
- Sorting algorithms

**Progression:**

1. Create ordered deck
2. Display cards
3. Draw card from deck
4. Shuffle deck (simple)
5. Deal hands
6. Sort hand by value
7. Implement card games (war, blackjack logic)

**Strengths:** Rich data structures, practical algorithms
**Challenges:** Visual representation of 52 cards in 300x300px (may need abstraction)

### 10. Garden/Farm Simulator

**Category:** Composition/Building
**Concept Capacity:** Medium-High (6-8 concepts)

**Core Mechanic:** Plant, grow, and harvest crops in a grid.

**Visual (300x300px):**

- Grid: 6x6 or 8x8 plots
- Plants at different growth stages
- Resources (water, seeds)
- Harvest counter

**Concepts:**

- 2D arrays (grid of plots)
- State (growth stage per plot)
- Loops (water all plants, harvest ready plants)
- Conditionals (is_ready_to_harvest?)
- Functions (plant_seed, water_plant, harvest)
- Time/turn-based progression

**Progression:**

1. Plant single seed
2. Plant row of seeds
3. Water plants (change growth stage)
4. Harvest when ready
5. Different plant types (different growth times)
6. Optimize planting strategy
7. Resource management (limited water)

**Strengths:** Visual progression, clear state changes, accessible theme
**Challenges:** Turn-based progression needs clear mechanism

---

## Summary

Good project themes for Jiki share these characteristics:

**Essential:**

- ✅ Visual state visibility
- ✅ Non-interactive execution model
- ✅ Challenge in logic, not precision
- ✅ Support for 10-20 exercises
- ✅ 300x300px clarity

**Highly Desirable:**

- ✅ Clear goals and win conditions
- ✅ Culturally universal
- ✅ Immediate, satisfying feedback
- ✅ Natural concept progression
- ✅ Low-to-medium implementation complexity

**Avoid:**

- ❌ Freeform drawing without constraints
- ❌ Pixel-perfect requirements
- ❌ Real-time interaction
- ❌ Complex physics simulations
- ❌ Abstract/invisible state

**Process:**

1. Identify learning concept
2. Sketch visual representation
3. Design 10+ exercise progression
4. Define functions/classes
5. Create test scenarios
6. Prototype and test
7. Document and refine

Use this framework when evaluating new theme ideas or designing exercises. The goal is always to make programming concepts visible, tangible, and engaging through thoughtfully designed visual contexts.
