
class Blocks
  constructor: (@data) ->

    @$container = $(".cubes")

    @dims = 40
    @timer = false

    # rotation coordinates
    @rotateCoords = ["x","y","z"]
    @rotation = {x: -35, y: -45, z: 0}

    # fill out the base cubes
    for x in [0..2]
      for y in [0..2]
        for z in [0..2]
          @$container.append(@addBlock({x, y, z}, "blue"))

    # some random points for now
    npoints = @sample [ 2, 3, 4, 5 ]
    for i in [1..npoints]
      surface = @sample [0, 2]
      point = @sample [ -1, 3 ]
      points = @shuffle [ point, surface, surface]
      coords = {x: points[0], y: points[1], z: points[2]}
      @$container.append(@addBlock(coords, "blue"))

    @$container.css({width: 60 + 'px', height: 60 + 'px'})


  addBlock: (coords, color) ->
    #return false
    block = "<div class='cube' style='left: #{@dims * coords.x}px; top: #{@dims * coords.z}px; -webkit-transform: translateZ(#{@dims * coords.y}px)'>
      <div class='face front #{color}-#{@random(6)}'></div>
      <div class='face back #{color}-#{@random(6)}'></div>
      <div class='face right #{color}-#{@random(6)}'></div>
      <div class='face left #{color}-#{@random(6)}'></div>
      <div class='face top #{color}-#{@random(6)}'></div>
      <div class='face bottom #{color}-#{@random(6)}'></div>
    </div>"


  random: (range) ->
    Math.ceil(Math.random() * range)

  sample: (values) ->
    values[@random(values.length) - 1]

  order: (values) ->
    # copy values into values_copy
    values_copy = []
    for value in values
      values_copy.push value

    values.sort()

    index = []
    i = 0
    for value_copy in values_copy
      j = 0
      for value in values
        if value_copy == value
          index[i] = j
        j++
      i++

    index

  shuffle: (values) ->
    seeds = (Math.random() for value in values)
    seed_order = @order seeds
    shuffled = (values[seed] for seed in seed_order )

    shuffled

  rotate: () ->
    ###
    @rotation[@rotateCoords[0]] += @sample [ -30, 0, 30 ]
    @rotation[@rotateCoords[1]] += @sample [ -15, 0, 15 ]
    @rotation[@rotateCoords[2]] += @sample [ -0,  0, 0 ]

    switch @rotateCoords[0]
      when "x" then @rotateCoords = ["y", "z", "x"]
      when "y" then @rotateCoords = ["x", "y", "z"]
      #when "y" then @rotateCoords = ["z", "x", "y"]
      #when "z" then @rotateCoords = ["x", "y", "z"]

    rotation = "rotateX(#{@rotation.x}deg) rotateY(#{@rotation.y}deg) rotateZ(#{@rotation.z}deg)"
    @$container.css({"-webkit-transform": rotation})
    ###

    animation = "myfirst 60s infinite"
    @$container.css({"-webkit-animation": animation, animation: animation})

    true

  startRotate: () ->
    callback = @rotate.bind(this)
    @timer = setInterval( callback, 2000 )

    true

# z: top
# x: left

# extra blocks
data = [
  {x: 3, y: 2, z: 2}
  {x: -1, y: 0, z: 0}
  {x: 2, y: 0, z: 3}
  # {x: -1, y: 4, z: 3}
]

b = new Blocks data
