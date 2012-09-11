/*******************************************************************************
 * Copyright (c) 2008, 2012 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     martin.kirst@s1998.tu-chemnitz.de - fixed and improved sort algorithm
 *******************************************************************************/
package com.github.nitram509.vectorspaceclassification;

public class MirrorInfo {

  public static final long UNKNOWN_RATE = -1;

  long bytesPerSecond = UNKNOWN_RATE;
  int failureCount = 0;

  final int initialRank;
  final String locationString;

  public MirrorInfo(String location, int initialRank) {
    this.initialRank = initialRank;
    this.locationString = location;
  }

  @Override
  public String toString() {
    return "Mirror(" + locationString + ',' + failureCount + ',' + bytesPerSecond + ')';
  }

}