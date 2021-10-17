function ShowingCountDown () {
    if (ThisLED > 0) {
        ThisLED += -1
        ring.setPixelColor(ThisLED, neopixel.rgb(0, 0, 0))
        ring.show()
        for (let index = 0; index < 1; index++) {
            if (ThisLED < 10) {
                basic.showString("" + (ThisLED))
            } else {
                basic.pause(500)
            }
            basic.pause(100)
        }
    } else {
        ThisLED = 0
        Mode = ""
        tShowingLEDIcon = 1
        pThisRunTime = input.runningTime()
        for (let index = 0; index < 2; index++) {
            BlinkPointLight()
            basic.pause(100)
        }
    }
}
function TestCountdown () {
    if (Mode == "CountDown") {
        for (let index = 0; index <= 15; index++) {
            ThisLED = MountOfLED - 1 - index
            ring.setPixelColor(ThisLED, neopixel.rgb(0, 0, 0))
            ring.show()
            basic.pause(1000)
        }
        for (let index = 0; index < 4; index++) {
            basic.showString("B")
            basic.pause(100)
            basic.clearScreen()
            basic.pause(100)
        }
        Mode = ""
    }
}
function BlinkPointLight () {
    basic.showIcon(IconNames.Yes)
    basic.pause(200)
    basic.clearScreen()
}
input.onButtonPressed(Button.A, function () {
    radio.sendValue("GID", GroupNum)
    radio.sendValue("ModeID", 1)
    tShowingLEDIcon = 1
    basic.showNumber(1)
    basic.pause(200)
    basic.clearScreen()
})
function FadingOutAll () {
    tThisBrightness = Brightness
    pRoundNumber = 5
    while (tThisBrightness > 0) {
        for (let index = 0; index <= MountOfLED - 1; index++) {
            ring.setPixelColor(index, neopixel.colors(NeoPixelColors.Blue))
            ring.setBrightness(tThisBrightness)
            ring.show()
        }
        tThisBrightness += -10
        pRoundNumber += -1
        basic.pause(200)
    }
}
function BroadcastingNewSystemEvents () {
    if (Mode == "") {
        radio.sendValue("GID", GroupNum)
        radio.sendValue("ModeID", 1)
        pThisRunTime = input.runningTime()
        basic.pause(100)
        pRoundNumber += 1
        basic.showNumber(pRoundNumber)
    }
}
input.onButtonPressed(Button.AB, function () {
    radio.sendValue("GID", GroupNum)
    radio.sendValue("ModeID", 0)
    tShowingLEDIcon = 1
    basic.showNumber(0)
    basic.pause(100)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    radio.sendValue("GID", GroupNum)
    radio.sendValue("ModeID", 2)
    tShowingLEDIcon = 1
    basic.showNumber(2)
    basic.pause(100)
    basic.clearScreen()
})
input.onGesture(Gesture.Shake, function () {
    radio.sendValue("GID", GroupNum)
    radio.sendValue("ModeID", 3)
    tShowingLEDIcon = 1
    basic.showNumber(3)
    basic.pause(100)
    basic.clearScreen()
})
function RefillingTheRing () {
    ring.setPixelColor(ThisLED, neopixel.colors(NeoPixelColors.Blue))
    ring.show()
    basic.pause(200)
    ThisLED += 1
    pThisRunTime = input.runningTime()
}
function TurningAllOff () {
    for (let index = 0; index <= MountOfLED - 1; index++) {
        ring.setPixelColor(index, neopixel.rgb(0, 0, 0))
        ring.show()
    }
    for (let index = 0; index < 2; index++) {
        basic.showIcon(IconNames.No)
        basic.pause(100)
        basic.clearScreen()
        basic.pause(50)
    }
}
radio.onReceivedValue(function (name, value) {
    if (name == "ModeID") {
        // Receiving "10" from devices for resetting the timer.
        if (value == 10) {
            if (tShowingLEDIcon == 1) {
                Mode = ""
                basic.showString("R")
                tShowingLEDIcon = 0
                pThisRunTime = input.runningTime()
            }
        }
        if (value == 0) {
            Mode = "AllOff"
            basic.showNumber(value)
        }
        if (value == 4) {
            Mode = "FadingOut"
            basic.showNumber(value)
        }
        if (value == 1) {
            Mode = "AllOn"
            basic.showNumber(value)
        }
        if (value == 2) {
            if (ThisLED == MountOfLED) {
                Mode = "CountDown"
            }
        }
        if (value == 3) {
            if (ThisLED < MountOfLED && ThisLED > 0) {
                basic.showNumber(value)
                basic.pause(100)
                basic.clearScreen()
                Mode = "Reverse"
            }
        }
    }
})
function TurningAllOn () {
    tThisBrightness = 10
    for (let index = 0; index < 4; index++) {
        for (let index = 0; index <= MountOfLED - 1; index++) {
            ring.setPixelColor(index, neopixel.colors(NeoPixelColors.Blue))
            ring.setBrightness(tThisBrightness)
            ring.show()
        }
        basic.pause(100)
        tThisBrightness += 10
    }
    basic.pause(50)
    for (let index = 0; index < 2; index++) {
        basic.showString("F")
        basic.clearScreen()
        basic.pause(100)
    }
}
function Trashing () {
    let index = 0
    while (true) {
        ring.setBrightness(Brightness)
        basic.showNumber(pRoundNumber)
        basic.pause(100)
        basic.clearScreen()
    }
    for (let index = 0; index <= MountOfLED - 1; index++) {
        ring.setPixelColor(index, neopixel.colors(NeoPixelColors.Blue))
        ring.setBrightness(0)
        ring.show()
    }
    if (index < 10) {
        basic.pause(10)
    } else {
        basic.pause(10)
    }
    basic.clearScreen()
    tThisBrightness = tThisBrightness + index * (Brightness / MountOfLED)
}
let tThisBrightness = 0
let Mode = ""
let tShowingLEDIcon = 0
let pThisRunTime = 0
let pRoundNumber = 0
let ThisLED = 0
let ring: neopixel.Strip = null
let MountOfLED = 0
let Brightness = 0
let GroupNum = 0
radio.setGroup(1)
GroupNum = 1
Brightness = 50
MountOfLED = 16
ring = neopixel.create(DigitalPin.P0, MountOfLED, NeoPixelMode.RGB)
ring.setBrightness(Brightness)
ThisLED = 0
// Set the interval for triggering the event automatically
let pIntervalMinutes = 6.8 * 60
pRoundNumber = 0
pThisRunTime = input.runningTime()
// A (1/0, 1 to to show) variable for displaying the icons on LED without interfering with NeoPixel.
tShowingLEDIcon = 1
Mode = ""
let ModeID = -1
// The Key input (0-12) from LittleBit's Keyboard
let Inputkey = -1
basic.forever(function () {
    if (pins.analogReadPin(AnalogPin.P0) >= 0 && pins.analogReadPin(AnalogPin.P0) != Inputkey) {
        Inputkey = pins.analogReadPin(AnalogPin.P0)
        ModeID = Math.round(Math.map(pins.analogReadPin(AnalogPin.P0), 259, 455, 0, 12))
        pins.analogWritePin(AnalogPin.P13, Math.round(Math.map(ModeID, 0, 12, 0, 110)))
        radio.sendValue("GID", GroupNum)
        radio.sendValue("ModeID", ModeID)
        basic.showNumber(ModeID)
    }
    if (Mode == "" && ModeID >= 0) {
        if (input.runningTime() > pThisRunTime + 1 * (pIntervalMinutes * 1000)) {
            BroadcastingNewSystemEvents()
            tShowingLEDIcon = 1
        }
    }
    if (Mode == "AllOff") {
        TurningAllOff()
        Mode = ""
        pThisRunTime = input.runningTime()
    }
    if (Mode == "FadingOut") {
    	
    }
    if (Mode == "AllOn") {
        TurningAllOn()
        basic.pause(5000)
        Mode = "CountDown"
        pThisRunTime = input.runningTime()
        ThisLED = MountOfLED
    }
    if (Mode == "CountDown") {
        if (tShowingLEDIcon == 1) {
            basic.showIcon(IconNames.Chessboard)
            basic.pause(200)
            basic.showIcon(IconNames.Target)
            basic.pause(200)
            basic.showIcon(IconNames.Diamond)
            basic.pause(500)
            basic.showIcon(IconNames.SmallDiamond)
            tShowingLEDIcon = 0
        }
        ShowingCountDown()
    }
    if (Mode == "Reverse") {
        while (ThisLED < MountOfLED) {
            RefillingTheRing()
        }
        basic.showIcon(IconNames.Happy)
        basic.pause(2000)
        FadingOutAll()
        basic.pause(2000)
        basic.clearScreen()
        Mode = ""
        pThisRunTime = input.runningTime()
        ThisLED = MountOfLED
        if (ThisLED < MountOfLED) {
            basic.pause(200)
            ThisLED += 1
            if (ThisLED == MountOfLED) {
            	
            } else {
                for (let index = 0; index < 2; index++) {
                    BlinkPointLight()
                    basic.pause(100)
                }
            }
        }
    }
})
