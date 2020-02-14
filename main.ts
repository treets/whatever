namespace handling {
    /**
     * A simple pick and place movement.
     * @param kin the kinematic object to be used
     * @param pos the position to be reached
     * @param vel the max velocity
     * @param acc acceleration and deceleration
     * @param start the minimum height to be reached before blending for the first movement
     * @param end the minimum height to be reached after blending for the third movement
     * @param max the total maximum height of movement
     */
    //% block="jump %kin to positions %pos at %vel with %acc acceleration blending from %startHeight to %endHeight limited by %maxHeight"
    //% inlineInputMode=inline
    export function moveJumpAbsolute(kin: motion.Kinematic, pos: number[], vel: number, acc: number, startHeight: number, endHeight: number, maxHeight: number) {
        const current = kin.values();
        MotionLib.kinCmdBlend(kin.getName(), maxHeight - startHeight, maxHeight - startHeight);
        MotionLib.kinCmdMoveLinAbs(kin.getName(), [current[0], current[1], current[2] + maxHeight], vel, acc, acc, 0, 0);
        MotionLib.kinCmdBlend(kin.getName(), maxHeight - endHeight, maxHeight - endHeight);
        MotionLib.kinCmdMoveLinAbs(kin.getName(), [pos[0], pos[1], pos[2] + maxHeight], vel, acc, acc, 0, 0);
        MotionLib.kinCmdMoveLinAbs(kin.getName(), pos, vel, acc, acc, 0, 0);
        // const xDir: AxisDir = current[0] - pos[0] > 0 ? AxisDir.NEGATIVE : AxisDir.POSITIVE;
        // control.pauseUntilAxisPositionPassed(kin.getAxis(AxisMeaning.MAIN_AXIS_X), pos[0], xDir, 0);
        // control.pauseUntilAxisPositionPassed(kin.getAxis(AxisMeaning.MAIN_AXIS_Z), pos[2], AxisDir.NEGATIVE, 0);
        while (kin.moving()) {
            common.sleep(0.001);
        }
    }
}