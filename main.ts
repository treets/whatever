namespace handling {
    //% block="move %kin to positions %pos at %vel with %acc acceleration jumping from %start to %end max %max"
    //% inlineInputMode=inline
    export function moveJump(kin: motion.Kinematic, pos: number[], vel: number, acc: number, start: number, end: number, max: number) {
        const current = kin.values();
        MotionLib.kinCmdBlend(kin.getName(), max - start, max - start);
        MotionLib.kinCmdMoveLinAbs(kin.getName(), [current[0], current[1], current[2] + max], vel, acc, acc, 0, 0);
        MotionLib.kinCmdBlend(kin.getName(), max - end, max - end);
        MotionLib.kinCmdMoveLinAbs(kin.getName(), [pos[0], pos[1], pos[2] + max], vel, acc, acc, 0, 0);
        MotionLib.kinCmdMoveLinAbs(kin.getName(), pos, vel, acc, acc, 0, 0);
    }
}