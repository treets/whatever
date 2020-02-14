namespace handling {
    //% block="move %kin to positions %pos at %vel with %acc acceleration jumping from %start to %end max %max"
    //% inlineInputMode=inline
    export function moveJump(kin: motion.Kinematic, pos: number[], vel: number, acc: number, start: number, end: number, max: number) {
        const current = kin.values();
        MotionLib.kinCmdBlend(kin.getName(), max - start, max - start);
        kin.move(MoveType.ABSOLUTE, [current[0], current[1], current[2] + max], vel, acc);
        MotionLib.kinCmdBlend(kin.getName(), max - end, max - end);
        kin.move(MoveType.ABSOLUTE, [pos[0], pos[1], pos[2] + max], vel, acc);
        kin.move(MoveType.ABSOLUTE, pos, vel, acc);
    }
}