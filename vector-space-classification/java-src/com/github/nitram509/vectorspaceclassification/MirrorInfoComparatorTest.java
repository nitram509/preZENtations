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

import static java.lang.Math.abs;
import static java.lang.Math.max;
import static java.lang.Math.min;
import static org.testng.FileAssert.fail;

import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class MirrorInfoComparatorTest {

  private MirrorInfo[] mirrors;
  private MirrorInfoComparator mirrorInfoComparator;

  @BeforeClass
  public void setup() {
    mirrors = null;
  }

  @BeforeMethod
  public void initialize_MirrorInfoComparator_aka_compute_centroid_or_prototype_vector() {
    long maxBytesPerSecond = 0;
    if (mirrors != null) {
      for (MirrorInfo mi : mirrors) {
        maxBytesPerSecond = max(maxBytesPerSecond, mi.bytesPerSecond);
      }
    }
    // Use the fastest mirror, with 0 failures and initial rank 1 as base query
    mirrorInfoComparator = new MirrorInfoComparator(maxBytesPerSecond, 0, 1);
  }

  @Test
  public void test() {
    fail("todo ... ;-)");
  }

}
