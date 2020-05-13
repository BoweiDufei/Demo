import 'package:flutter/material.dart';
import '../../provide/current_index_provide.dart';
import 'package:provide/provide.dart';

class DemoFiveWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.blueGrey,
      child: Center(
        child: Container(
          width: 100,
          height: 100,
          child: RaisedButton(
            onPressed: () {
              // Navigator.popUntil(context, predicate);
              Provide.value<CurrentIndexProvide>(context).logOut();
            },
          ),
        ),
      ),
    );
  }
}
