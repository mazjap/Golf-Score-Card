class GolfScoreTable extends React.Component {
    render() {
        return (
            <div class={"container"}>
                <div class={"row"}>
                    <div class={"col"} id={"header"}></div>
                </div>
                <div class={"row"}>
                    <div class={"col"}>
                        <div id={"options-container"}></div>
                    </div>
                </div>
                <div class={"row"} id={"scorecard-container"}>
                    <div class={"col"} id={"scorecard"}>
                        <div class={"table-responsive"}>
                            <table class={"table table-bordered"}>
                            </table>
                        </div>
                        <div class={"table-responsive"}>
                            <table class={"table table-bordered"}>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}